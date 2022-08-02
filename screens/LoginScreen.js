import React from "react";
import {Button, Image, Input, Text, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";

const StartScreen = () => {


    return (
        <Layout overlay={true}>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>Bienvenido</Text>

                    <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                    <Input mb={4}/>
                    <Text textAlign={'center'} mb={2}>Contraseña</Text>
                    <Input mb={4}/>
                    <Text textAlign={'center'} mb={6}>¿Olvidaste tu contraseña?</Text>
                    <Button>Entrar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default StartScreen