import React from "react";
import {Image, Text, View, Button} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconGolfHit from '../assets/iconsReservations/iconGolfHit.png';
import moment from "moment";

const BookinsItem = ({navigation, mb = 2, data, dataInvitation}) => {

    const {service, state} = data;
    const {booking} = dataInvitation;

    return (
        <View flexDirection={'row'} height={100} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={iconGolfHit}></Image>
                </ImageBackground>
            </View>

            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'12'} bold={true} width={'90%'}>{service}</Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'} >
                    {moment(dataInvitation?.booking?.dueDate,"YYYY-MM-DD").format("DD-MM-YYYY")}
                </Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'} >
                    {moment(dataInvitation?.booking?.dueTime,"HH:mm").format("hh:mm a")}
                </Text>
                <Text color={Colors.green} fontSize={'8'}>
                    Invitado por Eduardo
                </Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Button bgColor={state == "p" ? Colors.yellow : state == "CONFIRMED" ? Colors.green : Colors.red} width={'88'} height={'10'} size={"xs"} >{ state == 'p' ? "Pendiente" : state == 'CONFIRMED' ? "Confirmado" : "Rechazado"}</Button>
            </View>
        </View>
    )
}


export default BookinsItem;