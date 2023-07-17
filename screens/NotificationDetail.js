import React from "react";
import {Button, Text, View, Spinner} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV3 from "./Layouts/LayoutV3";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import { getOneNotification, setNotificationRead } from "../api/Requests";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";
import { useEffect } from "react";

const NotificationDetail = ({navigation, route}) => {

    const {notification} = route?.params;
    const [source, setSource] = useState(null);
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
            console.log(response.data)
            setSource({html: response?.data?.template?.content})

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
        <LayoutV3>
            {notificationDetail && <View flex={1}>

                <Text textAlign={'center'} mt={10} mb={10} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'3xl'}>{notificationDetail?.template?.title.toUpperCase()}</Text>
                <View flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                <ImageBackground  style={{width: 175, height: 45, borderRadius:60, alignItems: 'center', justifyContent: 'center', backgroundColor:'#FFB718'}}>
                    <Text color={'#0A5839'} fontSize={'md'}>{typeCategory(notificationDetail?.template?.category)}</Text>
                </ImageBackground>
                </View>

                <View mt={10} flexDirection={'row'} justifyContent={'center'}>
                    <Text color={Colors.green}>Contenido:</Text>
                </View>
                
                <View flex={1}>
                    <WebView
                        automaticallyAdjustContentInsets={false}
                        bounces={false}
                        startInLoadingState={true}
                        mixedContentMode={'always'}
                        style={{width: '100%', backgroundColor: 'transparent'}}
                        allowsFullscreenVideo={true}
                        javaScriptEnabled={true}
                        renderLoading={() => (
                            <View width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                <Spinner size={'lg'} key={'abc'} color={Colors.green}/>
                            </View>
                        )}
                        source={{html: `<html><head><style>
                        body {color: #146842; text-align:justify; padding: 5px; line-height: 20px;}
                        </style><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body> 
                        ${notificationDetail?.template?.content} 
                        </body></html>`}}
                        scalesPageToFit={true}
                        originWhitelist={['*']}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={true}
                        contentMode={'mobile'}
                        >
                    </WebView>

                
                </View>
                
             

                <View mt={10} mb={10} flexDirection={'row'} justifyContent={'center'}>
                <View>
                   <Button width={'100%'} style={{borderRadius:60}} padding={3} mt={5} onPress={()=>{navigation.goBack();}}>
                    Regresar
                </Button>                   
                </View>
                </View>
               
                
            </View>}

        </LayoutV3>
    )
}


export default NotificationDetail;