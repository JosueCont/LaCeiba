import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { CommonActions, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { ColorsCeiba } from "../../../../Colors";
import { getFontSize } from "../../../../utils";
import ReservationItem from "../../../../components/laceiba/Home/ReservationItem";
import { getAllBookings, getAllInvitations, getUserDebt } from "../../../../api/Requests";
import moment from "moment";
import { Spinner } from "native-base";
import ModalInfo from "../../../Modals/ModalInfo";

const {height, width} = Dimensions.get('window');

const ReservationsListScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const focused = useIsFocused()
    //const {reservations} = route?.params
    const option = useSelector(state => state.bookingDuck.option)
    const booking = useSelector(state => state.bookingDuck.dataBooking)
    const [reservations, setReservations] = useState([])
    const [loading, setLoaading] = useState(true)
    const user = useSelector(state => state.appDuck.user)
    const [hasDebt, setHasDebt] = useState(false)
    const [showModal, setShowModal] = useState(false)



    useEffect(() => {
        //console.log('filtra', navigation?.getParent())
        getDataDebt()
    },[focused])
    
    useEffect(() => {
        getReservations()
    },[focused, option])

    const getDataDebt  = async() => {
        try {
            const response = await getUserDebt('',[user?.partner?.id])
            if(response?.data  > 0) setHasDebt(true) //cambiar a true
                else setHasDebt(false)
        } catch (e) {
            console.log('error',e)
        }
    }

    const getReservations = async() => {
        try {
            setLoaading(true)
            const response = await getAllBookings(`?limit=${100}&userId=${user?.id}&serviceId=${booking[option]?.id}`);
            //console.log('reservaciones', response?.data)
            const myReservations = response?.data?.items.sort(getsortList)
            //console.log('lista ordenada',myReservations)
            setReservations(myReservations)

        } catch (e) {
            console.log('error',e)
        }finally{
            setLoaading(false)
        }
    }

    const getsortList = (elementoA, elementoB) => {
        const fechaA = moment(elementoA.dueDate);
        const fechaB = moment(elementoB.dueDate);

        // Comparar las fechas
        if (fechaA.isAfter(fechaB)) {
            return -1; // elementoA viene antes que elementoB
        } else if (fechaA.isBefore(fechaB)) {
            return 1; // elementoA viene después de elementoB
        } else {
            return 0; // Las fechas son iguales
        }
    }

    const setIsDisabled = () => {
        return !user?.partner?.membership?.accessToGolf || hasDebt
    }

    return(
        <HeaderBooking isScrolling={false}>
            <View style={styles.container}>
                <View style={styles.contActions}>
                    <Text style={styles.lblTitle}>Reservaciones</Text>
                    <TouchableOpacity
                        disabled={hasDebt} 
                        onPress={() => booking[option]?.isGolf && setIsDisabled() ? setShowModal(true): navigation.navigate('BookingServicesScreen',{screen:'CreateBooking', params:{route:'ListReservations'}})} //Posiblemente regresar a navigation.navigate('CreateBooking')
                        style={[styles.btn, {borderColor: hasDebt ? ColorsCeiba.lightgray : ColorsCeiba.darkGray,}]}>
                        <Text style={[styles.lbl, {color:  hasDebt ? ColorsCeiba.lightgray : ColorsCeiba.darkGray}]}>+ Nueva reserva</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Spinner size={'sm'} color={ColorsCeiba.darkGray}/>
                    </View>
                ):reservations.filter(item => item?.area?.service?.id === booking[option]?.id).length > 0 ? (
                    <FlatList 
                        data={reservations.filter(item => item?.area?.service?.id === booking[option]?.id)}
                        contentContainerStyle={{paddingBottom:35}}
                        keyExtractor={(_, index) => (index+1).toString()}
                        renderItem={({item, index}) => (
                            <TouchableOpacity style={{marginBottom:30}} onPress={() => navigation.navigate('BookingServicesScreen', {screen: 'DetailReservation', params: {reservation: item, route: 'ReservationsScreen'}})}>
                                <ReservationItem item={item} index={index} img={booking[option]?.fileUrl}/>
    
                            </TouchableOpacity>
                        )}
                    />

                ):(
                    <View style={{height:300, width: width-20, justifyContent:'center', alignItems:'center'}}>
                        <Text>No hay reservaciones</Text>
                    </View>
                )}
            </View>
            <ModalInfo 
                visible={showModal}
                title="Aviso"
                text="Tu membresía no incluye acceso al campo de golf"
                setVisible={() => setShowModal(false)}
                iconType="exclamation"
            />
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        marginHorizontal:20
    },
    contActions:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:25
    },
    btn:{
        width: 176,
        height:30,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginBottom:10
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
    lblTitle:{
        fontSize: getFontSize(20),
        color: ColorsCeiba.darkGray
    }
})

export default ReservationsListScreen;