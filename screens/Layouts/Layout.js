import React from 'react';
import {ImageBackground, Platform} from "react-native";
import bgGolfV2 from "../../assets/bgGolfV2.png";
import {KeyboardAvoidingView, View} from "native-base";

const Layout = ({children, overlay = false}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>


            <View flex={1}>
                <ImageBackground source={bgGolfV2} style={{flex: 1}}>
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