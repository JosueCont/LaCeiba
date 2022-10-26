import React from "react";
import {Image, Text, View, Button} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from '../assets/iconsReservations/iconGolfHit.png';

const BookinsItem = ({navigation, mb = 2, data}) => {

    const {service, state} = data;

    return (
        <View flexDirection={'row'} height={100} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={iconGolfHit}></Image>
                </ImageBackground>
            </View>

            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'12'} bold={true} width={'90%'}>{service}</Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'} >
                    30/julio/2022
                </Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'} >
                    10:20 pm
                </Text>
                <Text color={Colors.green} fontSize={'8'}>
                    Invitado por Eduardo
                </Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Button bgColor={state == "p" ? Colors.yellow : state == "c" ? Colors.green : Colors.red} width={'88'} height={'10'} size={"xs"} >{ state == 'p' ? "Pendiente" : state == 'c' ? "Confirmado" : "Rechazado"}</Button>
            </View>
        </View>
    )
}


export default BookinsItem;