import React, { useEffect } from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from "../assets/iconsReservations/iconGolfHit.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconNotificationRead from '../assets/IconNotificationRead.png'


const NotificationItem = ({navigation, mb = 5, notification}) => {


      const typeCategory = (cat) => {
        const type = {
          'PROMOTION': 'Promoción',
          'REMINDER': 'Recordatorio',
          'NOTICE': 'Aviso'
        };
        return type[cat] ?? "Sin categoria";
    }

    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('NotificationDetail', {notification: notification.id});}}>
            <View flexDirection={'row'} justifyContent={'center'} padding={2} bgColor={'#fff'} borderRadius={50} mb={5}>
          
            <View justifyContent={'center'} alignItems={'center'}>
                <Text textAlign={'center'}  mb={1} color={Colors.green} fontSize={'md'}>{notification?.template?.title.length<=18? notification?.template?.title : `${notification?.template?.title.slice(0,18)}...`}</Text>
                <Text  color={Colors.green} fontSize={'xs'}>{typeCategory(notification?.template?.category)}</Text>
                {/* <Text color={Colors.green} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
            <View position={'absolute'} right={'5'} top={'5'} justifyContent={'center'} alignItems={'center'}>
                    <Image source={IconNotificationRead}></Image>
            </View>
        </View>
        </TouchableOpacity>
        
    )
}


export default NotificationItem;