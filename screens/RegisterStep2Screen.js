import React, {useEffect, useState} from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {connect} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import {tryFindPartner} from "../api/Requests";
import {setAttribute} from "../redux/ducks/navigationDuck";

const RegisterStep2Screen = ({navigation, navigationDuck, setAttribute}) => {

    const [movil, setMovil] = useState(null);
    const [retry, setRetry] = useState(null);

    useEffect(() => {
        setMovil(navigationDuck.user.celular)
    }, [navigationDuck.user.claveSocio])

    const astericks = (w, show = 1) => {
        return w.substring(0, show) + '*'.repeat(w.length - 1);
    }

    const validateMovil = async () => {
        if (movil.length === 10) {
            navigation.navigate('RegisterStep3Screen')
        } else {
            setRetry(true)
        }
    }


    const tryFindPartnerFunction = async () => {
        try {
            const response = await tryFindPartner('/' + navigationDuck.user.claveSocio);

            const userUpdate = {
                ...navigationDuck.user,
                ...response.data
            }

            await setAttribute('user', userUpdate)
            setMovil(response.data.celular)
            setRetry(false)
        } catch (e) {
            alert(e.toString())
        }
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son estas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={2}>
                        {
                            navigationDuck.user.nombreSocio.split(' ').map((item, index) => {
                                return astericks(navigationDuck.user.nombreSocio.split(' ')[index]) + ' '
                            })
                        }


                    </Text>
                    <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={1}>
                        {
                            astericks(navigationDuck.user.email.split('@')[0], 2) + '@' + navigationDuck.user.email.split('@')[1]

                        }
                    </Text>
                    <Button mb={2} onPress={() => validateMovil()}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Cancelar</Button>
                </View>
            </View>
            <ModalInfo
                visible={retry}
                setVisible={(v) => {
                    tryFindPartnerFunction();
                }}
                text={`Tus datos son incorrectos, contacta a administracion para actualizar tus datos y poder continuar con tu registro. \n\n contacto@clublahacienda.com`}
                textButton={'Intentar de nuevo'}
                iconType={'exclamation'}
                title={'Aviso'}
            />
        </Layout>
    )
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState, {setAttribute})(RegisterStep2Screen)