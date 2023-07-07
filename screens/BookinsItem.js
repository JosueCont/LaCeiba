import React, {useEffect} from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconBooking from '../assets/iconBooking.png';
import pin from '../assets/pin.png';

import moment from "moment";
import {connect} from "react-redux";

const BookinsItem = ({navigation, mb = 2, data, dataInvitation, dataBooking, appDuck}) => {

    useEffect(()=>{
        console.log(dataInvitation)
    },[dataInvitation])
    const {service, state} = data;


    return (
        <View flexDirection={'row'} height={79} bgColor={'#fff'} borderRadius={50} mb={mb} mx={4}
              style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation:3
              }}>
            <View flex={.75} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={dataInvitation.booking?.fixedGroupId ? pin : iconBooking} width={21} height={21}></Image>
                </ImageBackground>
            </View>

            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'12'} bold={true} width={'95%'} numberOfLines={2}>{dataInvitation?.booking?.area.service.name}</Text>
                <Text color={Colors.green} fontSize={'10'} width={'95%'}>
                    {moment(dataInvitation?.booking?.dueDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
                </Text>
                <Text color={Colors.green} fontSize={'10'} width={'95%'}>
                    {moment(dataInvitation?.booking?.dueTime, "HH:mm").format("hh:mm a")}
                </Text>
                {
                    dataBooking?.hostedBy?.id !== appDuck.user.id &&
                    <Text color={Colors.green} fontSize={'8'}>
                        Invitado por {dataBooking?.hostedBy?.firstName}
                    </Text>
                }

            </View>
            <View borderLeftWidth={1.5} height={'60%'} alignSelf={'center'} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'} pr={1.5}>
                {
                    dataBooking?.deletedAt || dataInvitation?.booking?.deletedAt ?
                        <Button bgColor={Colors.red} size={"xs"}>
                            Cancelado
                        </Button> :
                        <Button bgColor={dataInvitation.booking?.fixedGroupId ? Colors.black : dataInvitation.status == "PENDING" ? Colors.yellow : dataInvitation.status == "CONFIRMED" ? Colors.green : Colors.orange} size={"xs"}>
                            {dataInvitation.booking?.fixedGroupId ? "    Fijo    " : dataInvitation.status == 'PENDING' ? "Pendiente" : dataInvitation.status == 'CONFIRMED' ? "Confirmado" : "Rechazado"}
                        </Button>
                }

            </View>
        </View>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookinsItem);