import React from "react";
import {Button, Image, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";
import * as Notifications from 'expo-notifications';
import { Linking } from "react-native";
import Constants from "expo-constants"
import { imageImport } from "../organizations/assets/ImageImporter";

const StartScreen = ({navigation}) => {

    return (
        <Layout>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imageImport(Constants.expoConfig.slug).logo} size={150}/>
            </View>
            <View flex={1}>
                <View mx={20} mt={20}>
                    <Button mb={2} onPress={() => navigation.navigate('LoginScreen')}>Iniciar sesión</Button>
                    <Button mb={2} onPress={() => navigation.navigate('RegisterScreen')}>Registrar</Button>
                </View>

            </View>
        </Layout>
    )
}


export default StartScreen;