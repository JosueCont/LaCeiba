import React from "react";
import {Image, Text, View} from "native-base";
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
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>

                <Text color={Colors.green} fontSize={'xs'}>
                    30/julio/2022
                </Text>

            </View>
        </View>
    )
}


export default BookinsItem;