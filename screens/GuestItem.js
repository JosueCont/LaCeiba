import React from "react";
import {Icon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import {MaterialIcons} from "@expo/vector-icons";

import iconPerson from "../assets/iconPerson.png";

const GuestItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                <Image source={iconPerson} style={{width: 55, height: 55}} borderRadius={60}/>
            </View>

            <View flex={1} flexDirection={'row'}>
                <View justifyContent={'center'} mr={2}>
                    <Text color={Colors.green} fontSize={'md'} justifyItems={'center'}>Raúl Rosas</Text>
                </View>
                <View justifyContent={'center'}>
                    <Icon as={MaterialIcons} name={'circle'} color={Colors.yellow}/>
                </View>
            </View>
        </View>
    )
}


export default GuestItem;