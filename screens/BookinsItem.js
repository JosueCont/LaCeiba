import React from "react";
import {Image, Text, View, Button} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from '../assets/iconsReservations/iconGolfHit.png';

const BookinsItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={iconGolfHit}></Image>
                </ImageBackground>
            </View>

            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'sm'} width={'90%'}>Campo de golf</Text>
                <Text color={Colors.green} fontSize={'10'}>
                    Invitado por Eduardo
                </Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>

                <Text color={Colors.green} fontSize={'xs'}>
                    30/julio/2022
                </Text>
                <Text mb={2} color={Colors.green} fontSize={'xs'}>
                    10:20 pm
                </Text>
                <Button width={12} height={2} mb={1} fontSize={5} onPress={()=>{navigation.navigate("BookingConfirmScreen")}} >Confirmado</Button>
            </View>
        </View>
    )
}


export default BookinsItem;