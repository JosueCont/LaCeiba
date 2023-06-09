import React, {useEffect} from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconGroupSmall from "../assets/iconGroupSmall.png";
import iconBallReady from "../assets/iconBallReady.png";
import moment from "moment";


const TransactionItem = ({navigation, mb = 2, yellow = false, dataMatche}) => {

    return (
        <View flexDirection={'row'} height={50} bgColor={yellow ? Colors.yellow : '#fff'} borderRadius={50} mb={mb}>
            <View flex={2} justifyContent={'center'} pl={5}>
                <Text color={Colors.green} fontSize={'xs'} mr={2} textAlign={'center'}>{moment(dataMatche?.booking?.dueDate).format('LL')}</Text>
                <Text color={Colors.green} fontSize={'2xs'} textAlign={'center'}>{moment(dataMatche?.booking?.dueTime, "HH:mm").format("hh:mm a")}</Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} borderColor={yellow ? 'white' : Colors.yellow}/>
            <View flex={1} justifyContent={'center'} flexDirection={'row'}>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconGroupSmall} style={{width: 20, height: 20}}></Image>
                </View>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconBallReady} style={{width: 20, height: 20}}></Image>
                </View>
            </View>
            <View flex={1} justifyContent={'center'} pr={5}>
                <Text color={Colors.green} fontSize={'xs'} textAlign={'center'}>Score: {dataMatche?.round1 + dataMatche?.round2} </Text>
            </View>
        </View>
    )
}


export default TransactionItem;