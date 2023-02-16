import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconGroupSmall from "../assets/iconGroupSmall.png";
import iconBallReady from "../assets/iconBallReady.png";

const TransactionItem = ({navigation, mb = 2, yellow = false}) => {


    return (
        <View flexDirection={'row'} height={50} bgColor={yellow ? Colors.yellow : '#fff'} borderRadius={50} mb={mb}>
            <View flex={2} justifyContent={'center'} pl={5}>
                <Text color={Colors.green} fontSize={'xs'} textAlign={'center'}>Vie 17 febrero 2023</Text>
                <Text color={Colors.green} fontSize={'2xs'} textAlign={'center'}>11:30 am a 12:30 pm</Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={yellow ? 'white' : Colors.yellow}/>
            <View flex={1} justifyContent={'center'} flexDirection={'row'}>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconGroupSmall} style={{width: 20, height: 20}}></Image>
                </View>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconBallReady} style={{width: 20, height: 20}}></Image>
                </View>
            </View>
            <View flex={1} justifyContent={'center'} pr={5}>
                <Text color={Colors.green} fontSize={'xs'} textAlign={'center'}>Score: 0</Text>
            </View>
        </View>
    )
}


export default TransactionItem;