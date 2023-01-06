import React from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV4 from "./Layouts/LayoutV4";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";

const NotificationDetail = ({navigation, route}) => {

    const {title, detail, type} = route?.params;

    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>{title}</Text>
                <View flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                <ImageBackground source={bgButton} style={{width: 105, height: 25, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Text fontSize={'sm'}>{type}</Text>
                </ImageBackground>
                </View>
                

                <View mb={10} mt={10} flexDirection={'row'} bgColor={Colors.green} borderRadius={20}>
                    <Text ml={10} mr={10} mt={10} mb={10} >{detail} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took</Text>
                </View>

                <Button mb={10} onPress={()=>{navigation.goBack();}}>
                    De acuerdo
                </Button>
                
            </View>

        </LayoutV4>
    )
}


export default NotificationDetail;