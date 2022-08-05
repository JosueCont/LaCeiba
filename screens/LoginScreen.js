import React from "react";
import {Button, Image, Input, Text, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";
import {signIn} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loggedAction} from "../redux/ducks/appDuck";
import {connect} from "react-redux";

const LoginScreen = ({loggedAction}) => {


    const loginFunction = async () => {
        try {
            let data = {
                email: 'admin@admin.com',
                password: 'Password123'
            }
            const response = await signIn(data)
            await AsyncStorage.setItem('@user', JSON.stringify(response.data))
            await loggedAction()
        } catch (ex) {
            console.log(ex)
        }

    }

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
                    <Button onPress={() => loginFunction()}>Entrar</Button>
                </View>
            </View>
        </Layout>
    )
}


const mapState = (state) => {
    return {}
}
export default connect(mapState, {loggedAction})(LoginScreen);