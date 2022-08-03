import React from "react";
import {Button, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterStep4Screen = () => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Confirmar codigo de validacion</Text>

                    <Text textAlign={'center'} mb={2}>Escriba los 5 digitos enviados</Text>
                    <Input mb={4}/>
                    <Button>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep4Screen