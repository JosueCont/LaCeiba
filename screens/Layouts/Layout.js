import React from 'react';
import {ImageBackground, Platform} from "react-native";
import bgGolfV2 from "../../assets/bgGolfV2.png";
import {KeyboardAvoidingView, View} from "native-base";
import Constants from 'expo-constants';
import { imageImport } from '../../organizations/assets/ImageImporter';

const Layout = ({children, overlay = false}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


            <View flex={1}>
                <ImageBackground source={imageImport(Constants.expoConfig.slug).loginRegisterBg} style={{flex: 1}}>
                    {
                        overlay === true &&
                        <View style={{
                            height: "100%",
                            width: "100%",
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}/>
                    }


                    {children}


                </ImageBackground>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Layout