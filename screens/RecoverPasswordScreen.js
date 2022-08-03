import React from "react";
import {Button, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RecoverPasswordScreen = () => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>¿Olvidaste tu contraseña?</Text>
                    <Text textAlign={'center'} mb={2}>Recuperar contraseña</Text>
                    <Input mb={4}/>
                    <Text mb={6} textAlign={'center'} fontSize={'xs'}>Te enviaremos un correo para{'\n'}que puedas actualizar tu{'\n'}contraseña</Text>
                    <Button>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RecoverPasswordScreen