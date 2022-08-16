import React from "react";
import {Button, Icon, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";

const QRNonPaymentScreen = ({navigation}) => {


    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'exclamationcircleo'} color={Colors.yellow} size={'6xl'}/>
                </View>

                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    No se puede generar código por adeudo
                </Text>
                <Text color={Colors.green} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    Le invitamos a contactar a la administración
                </Text>

                <Button onPress={() => navigation.goBack()}>Regresar</Button>
            </View>

        </LayoutV3>
    )
}


export default QRNonPaymentScreen;