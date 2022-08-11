import React from 'react';
import {ImageBackground} from "react-native";
import bgGolfV2 from "../../assets/bgGolfV2.png";
import {KeyboardAvoidingView, View} from "native-base";


const Layout = ({children, overlay = false}) => {
    return (
        <KeyboardAvoidingView flexGrow={1} behavior={'height'}>


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