import React from "react";
import {Button, Image, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Constants from 'expo-constants';
import Layout from "./Layouts/Layout";

const StartScreen = ({navigation}) => {

    return (
        <Layout>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1}>
                <View mx={20} mt={20}>
                    <Button mb={2} onPress={() => navigation.navigate('LoginScreen')}>Iniciar sesión</Button>
                    <Button mb={2} onPress={() => navigation.navigate('RegisterScreen')}>Registrar</Button>
                    {
                        Constants.manifest.extra.debug === true &&
                        <Button onPress={() => navigation.navigate('ComponentsScreen')}>Componentes</Button>

                    }

                </View>

            </View>
        </Layout>
    )
}


export default StartScreen;