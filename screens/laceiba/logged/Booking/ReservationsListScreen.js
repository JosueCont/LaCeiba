import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { ColorsCeiba } from "../../../../Colors";
import { getFontSize } from "../../../../utils";
import ReservationItem from "../../../../components/laceiba/Home/ReservationItem";

const {height, width} = Dimensions.get('window');

const ReservationsListScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {reservations} = route?.params
    const option = useSelector(state => state.bookingDuck.option)
    const booking = useSelector(state => state.bookingDuck.dataBooking)


    useEffect(() => {
        console.log('filtra', navigation?.getParent())
    },[option])

    return(
        <HeaderBooking>
            <View style={styles.container}>
                <View style={styles.contActions}>
                    <Text style={styles.lblTitle}>Reservaciones</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('BookingServicesScreen',{screen:'CreateBooking'})} //Posiblemente regresar a navigation.navigate('CreateBooking')
                        style={styles.btn}>
                        <Text style={styles.lbl}>+ Nueva reserva</Text>
                    </TouchableOpacity>
                </View>
                {reservations.filter(item => item?.area?.service?.id === booking[option]?.id).length > 0 ? (
                    <FlatList 
                        data={reservations.filter(item => item?.area?.service?.id === booking[option]?.id)}
                        keyExtractor={(_, index) => (index+1).toString()}
                        renderItem={({item, index}) => (
                            <TouchableOpacity style={{marginBottom:30}} onPress={() => navigation.navigate('BookingServicesScreen', {screen: 'DetailReservation', params: {reservation: item, route: 'ReservationsScreen'}})}>
                                <ReservationItem item={item} index={index}/>
    
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