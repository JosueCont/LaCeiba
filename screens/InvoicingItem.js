import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconDownload from "../assets/iconDownload.png";
import iconView from "../assets/iconView.png";

const InvoicingItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'}>
                <Text textAlign={'center'} color={Colors.primary} fontSize={'xs'}>15/agosto/2022</Text>
            </View>
            <View flex={0.4} mx={5} flexDirection={'row'}>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconDownload} style={{width: 30, height: 30}}></Image>
                </View>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconView} style={{width: 30, height: 30}}></Image>
                </View>
            </View>
        </View>
    )
}


export default InvoicingItem;