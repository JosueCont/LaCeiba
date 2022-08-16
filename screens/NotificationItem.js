import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";

const NotificationItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={0.4} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55}} borderRadius={60}>

                </ImageBackground>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'md'}>Campo de golf</Text>
                <Text color={Colors.green} fontSize={'xs'} width={'90%'}>Los datos de su reservación han sido actualizados</Text>
            </View>
        </View>
    )
}


export default NotificationItem;