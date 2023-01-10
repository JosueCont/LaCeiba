import React from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV4 from "./Layouts/LayoutV4";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import { getOneNotification } from "../api/Requests";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";

const NotificationDetail = ({navigation, route}) => {

    const {notification} = route?.params;
    const [notificationDetail, setNotificationDetail] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            setNotificationDetail(null);
            getNotificationDetail();
        }, [])
    );

    const getNotificationDetail = async () => {
        try {
            const response = await getOneNotification('', [notification?.id])
            console.log(response?.data);
            setNotificationDetail(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LayoutV4>
            {notificationDetail && <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>{notificationDetail?.template?.title}</Text>
                <View flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                <ImageBackground source={bgButton} style={{width: 105, height: 25, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Text fontSize={'xs'}>{notificationDetail?.template?.category}</Text>
                </ImageBackground>
                </View>

                <View mt={10} flexDirection={'row'} justifyContent={'center'}>
                    <Text color={Colors.green}>Contenido</Text>
                </View>
                
                <View mt={5} width={'100%'} height={300} fontSize={'2xl'} borderRadius={50}>
                    <WebView 
                        originWhitelist={['*']}
                        style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', fontSize: '610px'}}
                        source={{html: `<html><head><style>
                        body { width: 100%; display: grid; justify-content: center; justify-items: center; font-size: 150%; overflow: scroll; }
                        </style><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body> 
                        ${notificationDetail?.template?.content} 
                        </body></html>`}}>
                    </WebView>
                </View>
                
                <View alignContent={'center'} justifyContent={'center'} mb={10} mt={10} flexDirection={'row'} bgColor={Colors.green} borderRadius={20}>
                    
                    {/* <Text textAlign={'center'} ml={10} mr={10} mt={10} mb={10} >{notificationDetail?.template?.content}</Text> */}
                </View>

                <Button mb={10} onPress={()=>{navigation.goBack();}}>
                    De acuerdo
                </Button>
                
            </View>}

        </LayoutV4>
    )
}


export default NotificationDetail;