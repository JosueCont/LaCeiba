import React from "react";
import {Button, Icon, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";

const QRNonPaymentScreen = ({navigation, route}) => {
    
    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'exclamationcircleo'} color={Colors.secondary} size={'6xl'}/>
                </View>

                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    {route?.params?.message}
                </Text>
                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    {route?.params?.responseError?.message}
                </Text>
                
                <Text color={Colors.primary} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    Le invitamos a contactar a la administración
                </Text>

                <Button onPress={() => navigation.goBack()}>Regresar</Button>
            </View>

        </LayoutV3>
    )
}


export default QRNonPaymentScreen;