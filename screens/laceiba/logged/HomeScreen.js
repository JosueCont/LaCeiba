import React, {useEffect, useState} from "react";
import { StyleSheet, Dimensions,View, Text, TouchableOpacity, ImageBackground } from "react-native";
import HeaderHome from "../../../components/laceiba/Headers/HeaderHome";
import { ColorsCeiba } from "../../../Colors";
import { getFontSize } from "../../../utils";
import ButtonsActions from "../../../components/laceiba/Home/ButtonsActions";
import Registered from "../../../components/laceiba/Home/Registered";
import NextReservationList from "../../../components/laceiba/Home/NextReservationList";
import Options from "../../../components/laceiba/Options";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../api/Requests";
import { setInfoBooking } from "../../../redux/ducks/bookingDuck";

const {height, width} = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const user = useSelector(state => state.appDuck.user)
    const [loading, setLoading] = useState(false) 

    useEffect(() => {
        getData()
    },[])

    const getData = async() => {
        try {
            setLoading(true)
            Promise.all([
                getBookingConfig()
            ])
        } catch (e) {
            console.log('error', e)
        } finally{
            setLoading(false)
        }
    }

    const getBookingConfig = async() => {
        try {
            const response = await getAllServices();
            console.log('response', response?.data)
            dispatch(setInfoBooking(response?.data))
        } catch (e) {
            console.log('error',e)
            
        }
    }
    const people = [
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
        {image: require('../../../assets/iconPerson.png')},
    ]
    const reservations = [
        {name:'Tee time', hour: moment(), hole:'1',status:'Confirmado',image: require('../../../assets/provitionalReservation.png') },
        {name:'Tee time', hour: moment(), hole:'18',status:'Pendiente',image: require('../../../assets/provitionalReservation.png') },
        {name:'Tee time', hour: moment(), hole:'1', status:'Cancelado',image: require('../../../assets/provitionalReservation.png') },

    ]
    const genders = {
    'H':'Bienvenido',
    'M':'Bienvenida'
    }
    return(
        <>
            <HeaderHome>
                <Text style={styles.lblTitle}>{genders[user?.gender]} {user?.fullName}</Text>
                <ButtonsActions />
                <Registered people={people}/>
                <NextReservationList reservations={reservations}/>
            </HeaderHome>
            <View style={{position:'absolute', top:10, width: width}}>
                <Options />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: ColorsCeiba.darkGray, 
        fontSize: getFontSize(24), 
        fontWeight:'400', 
        textTransform:'capitalize',
        marginBottom:30,
        marginLeft:20, 
        marginTop:24
    },
})

export default HomeScreen;