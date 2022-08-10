import React from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterStep2ScreenNOT = ({navigation, route}) => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son éstas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>
                        {
                            route.params.partner.split(' ').slice(0, 2).join(' ') + `\n` + route.params.partner.split(' ').slice(2, 4).join(' ')

                        }
                    </Text>

                    <Button mb={2} onPress={() => navigation.navigate('RegisterStep4Screen')}>Continuar</Button>
                    <Button>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep2ScreenNOT