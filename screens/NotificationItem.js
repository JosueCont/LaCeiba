import React from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from "../assets/iconsReservations/iconGolfHit.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const NotificationItem = ({navigation, mb = 2, title="Campo de golf", detail="Los datos de su reservación han sido actualizados", type= 'Promoción', readed=true}) => {


    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('NotificationDetail', {title: title, detail: detail, type: type });}}>
            <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={iconGolfHit}></Image>
                </ImageBackground>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'}>
                <Text mb={1} color={Colors.green} fontSize={'md'}>{title}</Text>
                <ImageBackground source={bgButton} style={{width: 105, height: 25, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Text fontSize={'sm'}>{type}</Text>
                </ImageBackground>
                {/* <Text color={Colors.green} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
            <View flex={0.5} justifyContent={'center'}>
                
                {readed && <ImageBackground source={bgButton} style={{width: 65, height: 25, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Text fontSize={'sm'}>Leido</Text>
                </ImageBackground>}
                {/* <Text color={Colors.green} fontSize={'xs'} width={'90%'}>{detail}</Text> */}
            </View>
        </View>
        </TouchableOpacity>
        
    )
}


export default NotificationItem;