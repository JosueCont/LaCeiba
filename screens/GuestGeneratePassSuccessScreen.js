import React from "react";
import {Button, Icon, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";

const GuestGeneratePassSuccessScreen = ({navigation}) => {


    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'checkcircleo'} color={Colors.yellow} size={'6xl'}/>
                </View>

                <Text color={Colors.green} fontSize={'2xl'} textAlign={'center'} fontFamily={'titleConfortaaRegular'} mb={10}>
                    Pase generado correctamente
                </Text>

                <Button onPress={() => navigation.navigate('GuestsScreen')}>De acuerdo</Button>
            </View>

        </LayoutV3>
    )
}


export default GuestGeneratePassSuccessScreen;