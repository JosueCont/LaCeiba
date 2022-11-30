import React, {useEffect, useState} from "react";
import {Button, Skeleton, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {connect} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import {registerSendConfirmEmail, tryFindPartner} from "../api/Requests";
import {setAttribute} from "../redux/ducks/navigationDuck";
import {errorCapture} from "../utils";

const RegisterStep2Screen = ({navigation, navigationDuck, setAttribute}) => {

    const [movil, setMovil] = useState(null);
    const [retry, setRetry] = useState(null);
    const [loading, setLoading] = useState(null);
    const [loadingNext, setLoadingNext] = useState(null);

    useEffect(() => {
        console.log(navigationDuck.user.celular, 16)
        setMovil(navigationDuck.user.celular)
    }, [navigationDuck.user.claveSocio])

    const astericks = (w, show = 1) => {
        return w.substring(0, show) + '*'.repeat(w.length - 1);
    }

    const validateMovil = async () => {
        console.log(movil, 24)

        if (movil.length === 10) {
            try {
                setLoadingNext(true)
                let data = {
                    "name": "Eduardo Couoh",
                    "email": "couoheduardo@icloud.com"
                }

                const response = await registerSendConfirmEmail(data)

                console.log(response.data)
                setLoadingNext(false)
                navigation.navigate('RegisterStep3Screen')
            } catch (e) {
                let v = await errorCapture(e);
                alert(v.value)
                setLoadingNext(false)
            }

        } else {
            setRetry(true)
        }
    }


    const tryFindPartnerFunction = async () => {
        try {
            setLoading(true)
            const response = await tryFindPartner('/' + navigationDuck.user.claveSocio);

            console.log(response.data)
            const userUpdate = {
                ...navigationDuck.user,
                ...response.data
            }

            await setAttribute('user', userUpdate)
            setMovil(response.data.celular)
            setRetry(false)
        } catch (e) {
            alert(e.toString())
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son estas sus iniciales?</Text>

                    {
                        loading === true ?
                            <Skeleton h={20}/> :
                            <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={2}>
                                {
                                    navigationDuck.user.nombreSocio.split(' ').map((item, index) => {
                                        return astericks(navigationDuck.user.nombreSocio.split(' ')[index]) + ' '
                                    })
                                }
                            </Text>
                    }

                    {
                        loading === true ?
                            <Skeleton h={20}/> :
                            <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={1}>
                                {
                                    astericks(navigationDuck.user.email.split('@')[0], 2) + '@' + navigationDuck.user.email.split('@')[1]

                                }
                            </Text>
                    }
                    {
                        loading === true ?
                            <Skeleton h={20}/> :
                            <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={1}>
                                {
                                    navigationDuck.user.celular
                                }
                            </Text>
                    }

                    <Button mb={2} onPress={() => validateMovil()} isLoading={loadingNext}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Cancelar</Button>
                </View>
            </View>
            <ModalInfo
                visible={retry}
                setVisible={(v) => {
                    tryFindPartnerFunction();
                }}
                text={`Tus datos son incorrectos, contacta a administración para actualizar tus datos y poder continuar con tu registro. \n\n contacto@clublahacienda.com`}
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