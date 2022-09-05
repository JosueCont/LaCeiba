import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconCall from "../assets/iconCall.png";

const DirectoryItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'}>
                <Text textAlign={'center'} color={Colors.green} fontSize={'xs'}>Nombre del puesto</Text>
            </View>
            <View>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconCall} style={{width: 30, height: 30}}></Image>
                </View>

            </View>
            <View flex={1} justifyContent={'center'}>
                <Text textAlign={'center'} color={Colors.green} fontSize={'xs'}>9999 85 421 322</Text>
            </View>
        </View>
    )
}


export default DirectoryItem;