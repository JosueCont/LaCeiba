import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV4 from "./Layouts/LayoutV4";

const NotificationsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Notificaciones</Text>


                <NotificationItem mb={4}/>

                <NotificationItem mb={4}/>
                <NotificationItem mb={4}/>
                <Text textAlign={'center'} mb={4} color={Colors.green} fontSize={'sm'}>Ayer</Text>

                <NotificationItem mb={4}/>
                <NotificationItem mb={4}/>
                <NotificationItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default NotificationsScreen;