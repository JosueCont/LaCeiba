import React, { useEffect, useState } from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from "../assets/iconsReservations/iconGolfHit.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconNotificationRead from '../assets/IconNotificationRead.png'
import iconRead from '../assets/iconRead.png';
import iconTrash from '../assets/iconTrash.png';


const NotificationItem = ({navigation, mb = 5, notification, onDelete}) => {

    const [isRead, setIsRead] = useState(false);

    useEffect(()=>{
        console.log(notification?.isRead);
        setIsRead(notification?.isRead);
    }, [notification?.isRead])

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
            <View flexDirection={'row'} height={70} justifyContent={'center'} alignItems={'center'} bgColor={'#fff'} borderRadius={50} paddingX={4} mb={mb}
              style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation:3
        }}>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Text textAlign={'center'}  mb={1} color={Colors.green} fontSize={'md'}>{notification?.template?.title.length<=18? notification?.template?.title : `${notification?.template?.title.slice(0,18)}...`}</Text>
                <Text  color={Colors.green} fontSize={'xs'}>{typeCategory(notification?.template?.category)}</Text>
                {/* <Text color={Colors.green} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
 
            <View flex={.3} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} height={'60%'} alignSelf={'center'} >
                {!isRead && <Image source={IconNotificationRead}/> || <Image source={iconRead}/>}
                <TouchableOpacity onPress={()=>onDelete(notification)}>
                            <Image source={iconTrash} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
                

            </View>
        </View>
        </TouchableOpacity>
        
    )
}


export default NotificationItem;