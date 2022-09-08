import React, {useEffect, useState} from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {connect} from "react-redux";

const RegisterStep2Screen = ({navigation, navigationDuck}) => {

    const [movil, setMovil] = useState(null);

    useEffect(() => {
        setMovil(navigationDuck.user.celular)
    }, [navigationDuck.user.claveSocio])

    const astericks = (w) => {
        return w.substring(0, 1) + '*'.repeat(w.length - 1);
    }

    const validateMovil = async () => {
        if (movil.length === 10) {
            navigation.navigate('RegisterStep3Screen')
        } else {
            alert('Número movil incorrecto')
        }
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son éstas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={2}>
                        {
                            navigationDuck.user.nombreSocio.split(' ').map((item, index) => {
                                return astericks(navigationDuck.user.nombreSocio.split(' ')[index]) + ' '
                            })
                        }
                    </Text>
                    <Button mb={2} onPress={() => validateMovil()}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState)(RegisterStep2Screen)