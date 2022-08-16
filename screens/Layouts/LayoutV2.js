import React from 'react';
import {ImageBackground, Platform} from "react-native";
import bgQR from "../../assets/bgQR.png";
import {KeyboardAvoidingView, View} from "native-base";

const LayoutV2 = ({children, overlay = false}) => {
    return (
        <KeyboardAvoidingView flexGrow={1} behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>


            <View flex={1}>
                <ImageBackground source={bgQR} style={{flex: 1}}>
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

export default LayoutV2