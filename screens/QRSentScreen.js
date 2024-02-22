import React from "react";
import {Button, Icon, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";

const QRSentScreen = ({navigation}) => {


    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'checkcircleo'} color={Colors.secondary} size={'6xl'}/>
                </View>

                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    El código QR ha sido enviado a su correo con éxito
                </Text>

                <Button onPress={() => navigation.goBack()}>Terminar</Button>
            </View>

        </LayoutV3>
    )
}


export default QRSentScreen;