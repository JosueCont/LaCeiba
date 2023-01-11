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
          
            <View width={'85%'} justifyContent={'center'} alignItems={'center'}>
                <Text  mb={1} color={Colors.green} fontSize={'md'}>{notification?.template?.title}</Text>
                <Text  color={Colors.green} fontSize={'xs'}>{typeCategory(notification?.template?.category)}</Text>
                {/* <Text color={Colors.green} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
            <View width={'10%'}  justifyContent={'center'} alignItems={'center'}>
                    <Image source={IconNotificationRead}></Image>
                </View>
        </View>
        </TouchableOpacity>
        
    )
}


export default NotificationItem;