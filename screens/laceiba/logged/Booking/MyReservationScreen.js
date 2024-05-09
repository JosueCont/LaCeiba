import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import RequestJoinItem from "../../../../components/laceiba/Booking/RequestJoinItem";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import moment from "moment";
import { postJoinBookingRequest } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";

const MyReservationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const appDuck = useSelector(state => state.appDuck)
    const [loading, setLoading] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [eror, setError] = useState('')
   
    const {infoBooking} = route?.params

    return(
        <HeaderBooking disabledOptions={true}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')} - {infoBooking?.area?.name}</Text>
                    <View style={styles.btnHoles}>
                        <Text>18 Hoyos</Text>
                    </View>
                </View>
                <RequestJoinItem requested={infoBooking} myReservation={true}/>

            <ModalInfo
                visible={modalError}
                setVisible={() => {
                    setModalError(false)
                }}
                close={true}
                title="Error al solicitar unirse"
                text={eror}
                iconType="exclamation"
            />
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20, 
        marginTop: 25
    },
    lblTitle:{
        color: ColorsCeiba.blackBtns, 
        fontSize: getFontSize(20), 
        fontWeight:'400',
        textTransform:'capitalize',
        marginBottom:10
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:8
    },
    btnHoles:{
        width: 95,
        height:29,
        borderRadius:20,
        borderWidth: 1,
        borderColor: ColorsCeiba.darkGray,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default MyReservationScreen;