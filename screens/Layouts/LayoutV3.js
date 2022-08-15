import React from 'react';
import {KeyboardAvoidingView, View} from "native-base";

const LayoutV3 = ({children, overlay = false}) => {
    return (
        <KeyboardAvoidingView flexGrow={1} behavior={'height'}>


            <View flex={1}>
                <View style={{flex: 1}}>
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
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LayoutV3