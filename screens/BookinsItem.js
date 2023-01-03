import React from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import bgButton from "../assets/bgButton.png";
import {ImageBackground} from "react-native";
import iconBooking from '../assets/iconBooking.png';
import pin from '../assets/pin.png';

import moment from "moment";
import {connect} from "react-redux";

const BookinsItem = ({navigation, mb = 2, data, dataInvitation, dataBooking, appDuck}) => {

    const {service, state} = data;


    return (
        <View flexDirection={'row'} height={100} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground source={bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                    <Image source={dataInvitation.booking?.fixedGroupId ? pin : iconBooking} width={21} height={21}></Image>
                </ImageBackground>
            </View>

            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'12'} bold={true} width={'90%'}>{dataInvitation?.booking?.area.service.name}</Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'}>
                    {moment(dataInvitation?.booking?.dueDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
                </Text>
                <Text color={Colors.green} fontSize={'10'} width={'90%'}>
                    {moment(dataInvitation?.booking?.dueTime, "HH:mm").format("hh:mm a")}
                </Text>
                {
                    dataBooking?.hostedBy?.id !== appDuck.user.id &&
                    <Text color={Colors.green} fontSize={'8'}>
                        Invitado por {dataBooking?.hostedBy?.firstName}
                    </Text>
                }

            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'} pr={2}>
                {
                    dataBooking.deletedAt ?
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