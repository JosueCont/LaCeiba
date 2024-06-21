import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useNavigation } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import RequestJoinItem from "../../../../components/laceiba/Booking/RequestJoinItem";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import moment from "moment";
import { postJoinBookingRequest } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";
const {height, width} = Dimensions.get('window');

const JoinPetitionScreen = () => {
    const navigation = useNavigation();
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const appDuck = useSelector(state => state.appDuck)
    const [loading, setLoading] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [eror, setError] = useState('')
    const requested = {
        schedule: '8:00 am',
        people:[
            {name:'Josué Contreras',},
            {name:'Alvaro Uribe'},
            {name:'Alberto Noah'},
            {name:'Alex Dzul'}
        ]
    }

    const onjoinBooking = async() => {
        try {
            setLoading(true)
            let dataSend = {
                "userId": appDuck.user.id,
                "bookingId": infoBooking?.hour?.booking?.id
            }
                console.log('dataSend', dataSend)
            const response = await postJoinBookingRequest(dataSend)
            if(response?.data?.bookingId) navigation.navigate('JoinSend',{booking: response?.data})
            console.log('te has unido a ', response)
        } catch (e) {
           console.log('errr',e)
           setModalError(true)
           setError(e?.data?.message) 
        }finally{
            setLoading(false)
        }
    }

    return(
        <HeaderBooking disabledOptions={true} showFilters={false}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')} - {infoBooking?.area?.name}</Text>
                    <View style={styles.btnHoles}>
                        <Text>18 Hoyos</Text>
                    </View>
                </View>
                <RequestJoinItem requested={infoBooking} />
                <BtnCustom 
                    title="Petición para unirse a grupo"
                    disable={loading}
                    loading={loading}
                    onPress={() => onjoinBooking()}
                />

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
        marginBottom:10,
        width: width * .7
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

export default JoinPetitionScreen;