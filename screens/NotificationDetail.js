import React from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV4 from "./Layouts/LayoutV4";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import { getOneNotification, setNotificationRead } from "../api/Requests";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";
import { useEffect } from "react";

const NotificationDetail = ({navigation, route}) => {

    const {notification} = route?.params;
    const [notificationDetail, setNotificationDetail] = useState(null);

    useEffect(()=>{
            if(notification){
                setNotificationDetail(null);
                getNotificationDetail();
            }}
    , [notification]);

    const getNotificationDetail = async () => {
        try {
            const response = await getOneNotification('', [notification])
            setNotificationDetail(response?.data);
            if(!response?.data?.isRead){
                const bodyRead = {
                    isRead: true
                }
                const responseRead = await setNotificationRead(bodyRead, [notification])
                console.log(responseRead?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const typeCategory = (cat) => {
        const type = {
          'PROMOTION': 'Promoción',
          'REMINDER': 'Recordatorio',
          'NOTICE': 'Aviso'
        };
        return type[cat] ?? "Sin categoria";
    }

    return (
        <LayoutV4>
            {notificationDetail && <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={10} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'3xl'}>{notificationDetail?.template?.title.toUpperCase()}</Text>
                <View flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                <ImageBackground  style={{width: 175, height: 45, borderRadius:60, alignItems: 'center', justifyContent: 'center', backgroundColor:'#FFB718'}}>
                    <Text color={'#0A5839'} fontSize={'md'}>{typeCategory(notificationDetail?.template?.category)}</Text>
                </ImageBackground>
                </View>

                <View mt={10} flexDirection={'row'} justifyContent={'center'}>
                    <Text color={Colors.green}>Contenido:</Text>
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
                
             

                <View mt={10} mb={10} flexDirection={'row'} justifyContent={'center'}>
                <View>
                   <Button width={'100%'} style={{borderRadius:60}} padding={3} mt={5} onPress={()=>{navigation.goBack();}}>
                    De acuerdo
                </Button>                   
                </View>
                </View>
               
                
            </View>}

        </LayoutV4>
    )
}


export default NotificationDetail;