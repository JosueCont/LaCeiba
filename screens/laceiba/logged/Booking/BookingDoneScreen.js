import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getFontSize } from "../../../../utils";
import HeeaderBookingImage from "../../../../components/laceiba/Headers/HeaderBookingImage";
import { ColorsCeiba } from "../../../../Colors";
import moment from "moment";
import TablePlayers from "../../../../components/laceiba/Booking/TablePlayers";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import { MaterialIcons } from '@expo/vector-icons';
import { setAtributeBooking, setDataBooking } from "../../../../redux/ducks/bookingDuck";
import ModalInfo from "../../../Modals/ModalInfo";

const BookingDoneScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const players = useSelector(state => state.bookingDuck.players)

    const {holes} = route?.params

    return(
        <HeeaderBookingImage goHome={true}>
            <View style={styles.container}>
                <Text>LA RESERVACIÓN HA SIDO GENERADA CON ÉXITO</Text>
                <Text style={{marginTop:20, fontSize: getFontSize(16), marginBottom:8}}>Fecha y hora</Text>
                <Text style={styles.lbl}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')}</Text>
                <Text style={styles.lbl}>{infoBooking?.hour?.time}</Text>
                <Text style={styles.lbl}>Salida hoyo 1</Text>
                <Text style={styles.lbl}>{holes !=0 ? '18' : '9'} hoyos</Text>
            </View>
            <View style={{justifyContent:'center', marginHorizontal:20, marginBottom:38}}>
                <TablePlayers players={players} showDelete={false}/>

            </View>
            <BtnCustom 
                title="De acuerdo" 
                onPress={() => {
                    dispatch(setAtributeBooking({prop:'createBooking', value:{}}))
                    navigation.navigate('House')
                }}
            />
        </HeeaderBookingImage>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center', 
        marginTop:40, 
        marginBottom:15
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'400'
    },
    lbl:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(14),
        marginBottom:5
    }
})

export default BookingDoneScreen;