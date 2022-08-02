import React from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const VerifyAccountScreen = () => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son éstas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>M***** L**** {'\n'}F****** H********</Text>

                    <Button mb={2}>Continuar</Button>
                    <Button>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default VerifyAccountScreen