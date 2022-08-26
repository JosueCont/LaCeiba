import React from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterStep2Screen = ({navigation, route}) => {


    const astericks = (w) => {
        return w.substring(0, 1) + '*'.repeat(w.length - 1);
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son éstas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>
                        {
                            route.params.user.firstName.split(' ').map((item, index) => {
                                return astericks(route.params.user.firstName.split(' ')[index]) + ' '
                            })

                        }
                    </Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>
                        {
                            route.params.user.lastName.split(' ').map((item, index) => {
                                return astericks(route.params.user.lastName.split(' ')[index]) + ' '
                            })

                        }

                    </Text>
                    <Button mb={2} onPress={() => navigation.navigate('RegisterStep3Screen')}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep2Screen