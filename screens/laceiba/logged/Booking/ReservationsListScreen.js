import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { CommonActions, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { ColorsCeiba } from "../../../../Colors";
import { getFontSize } from "../../../../utils";
import ReservationItem from "../../../../components/laceiba/Home/ReservationItem";
import { getAllBookings, getAllInvitations } from "../../../../api/Requests";
import moment from "moment";
import { Spinner } from "native-base";

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



    useEffect(() => {
        //console.log('filtra', navigation?.getParent())
        getReservations()
    },[focused])

    const getReservations = async() => {
        try {
            setLoaading(true)
            const queryString = `?userId=${user?.user?.id}&limit=100`;
            const response = await getAllBookings(`?limit=${100}`);
            const reserv = await getAllInvitations(queryString)
            console.log('reservaciones', response?.data, 'second fomr', reserv?.data)
            const myReservations = response?.data?.items.filter((item) =>  item?.invitations?.some(person => person?.user?.id === user?.id)).sort(getsortList)
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

    return(
        <HeaderBooking isScrolling={false}>
            <View style={styles.container}>
                <View style={styles.contActions}>
                    <Text style={styles.lblTitle}>Reservaciones</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('BookingServicesScreen',{screen:'CreateBooking', params:{route:'ListReservations'}})} //Posiblemente regresar a navigation.navigate('CreateBooking')
                        style={styles.btn}>
                        <Text style={styles.lbl}>+ Nueva reserva</Text>
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
        borderColor: ColorsCeiba.darkGray,
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