import React from "react";
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import LayoutV3 from "../Layouts/LayoutV3";
import {Colors} from "../../Colors";
import * as Notifications from 'expo-notifications';

const AskForPushNotificationsScreen = ({navigation}) => {

    const askPermission = async () => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('LoginScreen')
        } else if (status === 'denied') {
            alert('El permiso fue denegado anteriormente, para activar dirigete a Settings/Club La Hacienda/Notifications/Allow Notifications ');
        } else {
            alert('Failed to get push token for push notification!');
        }
    }

    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'Safety'} color={Colors.yellow} size={'6xl'}/>
                </View>

                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    Se requieren permisos para poder recibir notificaciones.
                </Text>


                <Button onPress={() => askPermission()} mb={2}>Permitir</Button>
                <Button onPress={() => navigation.goBack()}>Regresar</Button>
            </View>

        </LayoutV3>
    )
}


export default AskForPushNotificationsScreen;