import React, {useEffect, useState} from "react";
import {Button, Skeleton, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {connect} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import {registerSendConfirmEmail, tryFindPartner} from "../api/Requests";
import {setAttribute} from "../redux/ducks/navigationDuck";
import {errorCapture} from "../utils";
import Constants from "expo-constants";

const RegisterStep2Screen = ({navigation, navigationDuck, setAttribute}) => {

    const [movil, setMovil] = useState(null);
    const [retry, setRetry] = useState(null);
    const [loading, setLoading] = useState(null);
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        console.log(navigationDuck.user.celular, 16)
        setMovil(navigationDuck.user.celular)
    }, [navigationDuck.user.claveSocio])

    const astericks = (w, show = 1) => {
        console.log(w, w.length);
        if(w.length > 0){
            return w.substring(0, show) + '*'.repeat(w.length - 1);
        }
    }

    const validateMovil = async () => {
        console.log(movil, 24)

        // if (movil.length === 10) {
            

        // } else {
        //     setRetry(true)
        // }
        try {
            setLoadingNext(true)

            let data = {
                name: navigationDuck.user.firstName + ' ' + navigationDuck.user.lastName,
                email: Constants.expoConfig.extra.debug === true ? Constants.expoConfig.extra.debugEmail : navigationDuck.user.email,
            }

            const response = await registerSendConfirmEmail(data)

            console.log(response.data)
            setLoadingNext(false)
            navigation.navigate('RegisterStep3Screen')
        } catch (e) {
            console.log(e);
            let v = await errorCapture(e);
            alert(v.value)
            setLoadingNext(false)
        }
    }


    const tryFindPartnerFunction = async () => {
        try {
            setLoading(true)
            const response = await tryFindPartner('/' + navigationDuck.user.claveSocio);

            const userUpdate = {
                ...navigationDuck.user,
                ...response.data
            }

            await setAttribute('user', userUpdate)
            if(response.data.celular.length >0){
                console.log(response.data.celular);
                setMovil(response.data.celular);
            }else{
                console.log(response.data.telefono);
                setMovil(response.data.telefono);
            }
            
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

                    <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={2}>Le enviaremos un código de verificación al correo:</Text>

                    {
                        loading === true ?
                            <Skeleton h={20}/> :
                            <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={1}>
                                {
                                    astericks(navigationDuck.user.email.split('@')[0], 2) + '@' + navigationDuck.user.email.split('@')[1]

                                }
                            </Text>
                    }
                    {/*{
                        loading === true ?
                            <Skeleton h={20}/> :
                            <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={1}>
                                {
                                    navigationDuck.user.celular ? navigationDuck.user.celular : navigationDuck.user.telefono
                                }
                            </Text>
                    }*/}

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