import React, { useEffect, useState } from "react";
import {Button, CircleIcon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import { TouchableOpacity } from "react-native";
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
            <View flexDirection={'row'} height={70} justifyContent={'center'} alignItems={'center'} bgColor={isRead ? '#fff' : Colors.lightGray} borderRadius={50} paddingX={4} mx={1} mb={mb}
              style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation:3
        }}>
 
        <View flex={.1} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} height={'60%'} alignSelf={'center'} >
            {!isRead && <CircleIcon color={Colors.secondary} mx={1}/>}
            </View>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Text textAlign={'center'}  mb={1} color={Colors.textColor} fontSize={'md'}>{notification?.template?.title.length<=18? notification?.template?.title : `${notification?.template?.title.slice(0,18)}...`}</Text>
                <Text  color={Colors.textColor} fontSize={'xs'}>{typeCategory(notification?.template?.category)}</Text>
                {/* <Text color={Colors.primary} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
 
            <View flex={.2} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} height={'60%'} alignSelf={'center'} >
                <TouchableOpacity onPress={()=>onDelete(notification)}>
                            <Image source={iconTrash} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
                

            </View>
        </View>
        </TouchableOpacity>
        
    )
}


export default NotificationItem;