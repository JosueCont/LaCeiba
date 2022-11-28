import React from "react";
import {Button, Image, Text, View} from "native-base";
import qrExample from '../assets/qrExample.png'
import LayoutV2 from "./Layouts/LayoutV2";

const QRInstructionsScreen = ({navigation}) => {


    return (
        <LayoutV2 overlay={false}>
            <View flex={1}>
                <View mx={20} mt={20}>
                    <View alignItems={'center'} mb={10}>
                        <Image source={qrExample} width={230} height={230} borderRadius={180}/>
                    </View>
                    <Text fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                        Aquí puedes consultar{'\n'}tu código para ingresar{'\n'}al club
                    </Text>
                    <Button mb={4} onPress={() => navigation.navigate('QRScreen', {card: true})}>Código QR</Button>
                    <Button onPress={() => navigation.goBack()}>Regresar</Button>
                </View>
            </View>
        </LayoutV2>
    )
}

export default QRInstructionsScreen;