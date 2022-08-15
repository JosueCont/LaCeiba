import React from "react";
import {Button, Image, Text, View} from "native-base";
import QR from '../assets/QR.png'
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";

const QRScreen = ({navigation}) => {


    return (
        <LayoutV3>

            <View flex={1}>
                <View mx={20} mt={20}>

                    <View alignItems={'center'} mb={10}>
                        <Image source={QR} width={230} height={230}/>

                    </View>

                    <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                        Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                    </Text>

                    <Button mb={4} onPress={() => console.log('....')}>Descargar</Button>
                    <Button onPress={() => navigation.goBack()}>Terminar</Button>
                </View>
            </View>
        </LayoutV3>
    )
}


export default QRScreen;