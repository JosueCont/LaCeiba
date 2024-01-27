import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Image, Text, View} from "native-base";
import React from "react";
import {Colors} from "../Colors";
import {ImageBackground} from "react-native";
import iconPersonSmall from "../assets/iconPersonSmall.png";
import { imageImport } from "../organizations/assets/ImageImporter";
import Constants from "expo-constants";


const BookingConfirmScreen = ({navigation}) => {
    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8} pt={10}>

                <View flex={1}>
                    <View alignItems={'center'} mb={10}>
                        <ImageBackground borderRadius={60} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={iconPersonSmall} width={'50%'} resizeMode={'contain'}/>
                        </ImageBackground>
                    </View>

                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'lg'}>NOMBRE DE USUARIO</Text>
                    <Text mb={5} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>¡Tu reservación está lista!</Text>
                    <View my={5} width={'90%'} alignSelf={'center'} borderWidth={1} borderColor={Colors.secondary}/>
                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'lg'}>ID DE RESERVACIÓN: H5L36</Text>
                    <View my={5} width={'90%'} alignSelf={'center'} borderWidth={1} borderColor={Colors.secondary}/>

                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>Campo de golf</Text>
                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>Martes 27 de agosto</Text>
                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>9:00 am a 11:00 am</Text>
                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>2 socios y 2 invitados</Text>
                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>Profesor: Nombre y apellido</Text>
                    <View width={'90%'} alignSelf={'center'} borderWidth={1} my={5} borderColor={Colors.secondary}/>

                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>Puedes consultar los detalles de tu reservación en tu correo y en la sección</Text>
                    <Text mb={10} textAlign={'center'} color={Colors.secondary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>“Mis reservaciones”</Text>
                    <Button onPress={() => navigation.navigate('BookingConfirmScreen')}>Reservar</Button>
                </View>

            </View>

        </LayoutV4>
    )
}

export default BookingConfirmScreen;