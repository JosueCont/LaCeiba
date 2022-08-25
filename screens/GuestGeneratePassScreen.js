import React from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import {ImageBackground} from "react-native";
import imagePerson2 from '../assets/imagePerson2.png'
import calendar from '../assets/calendar.png'
import LayoutV4 from "./Layouts/LayoutV4";


const GuestGeneratePassScreen = ({navigation}) => {


    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={20}>
                <View alignItems={'center'} mt={10} mb={6}>
                    <ImageBackground borderRadius={60} source={imagePerson2} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                    </ImageBackground>
                </View>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Patricia Juárez</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'} adjustsFontSizeToFit numberOfLines={1}>GENERAR PASE DE ACCESO</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'} adjustsFontSizeToFit numberOfLines={2}>Seleccione la fecha que desea {'\n'}asignar el acceso a este invitado</Text>
                <View alignItems={'center'} mb={6}>
                    <ImageBackground source={calendar} style={{height: 300, width: 300, alignItems: 'center', justifyContent: 'center'}}>
                    </ImageBackground>
                </View>

                <Button onPress={() => navigation.navigate('GuestGeneratePassSuccessScreen')} mb={6}>Generar pase y enviar</Button>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>Este pase será enviado a:</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>xxxx@gmail.com</Text>
            </View>

        </LayoutV4>
    )
}


export default GuestGeneratePassScreen;