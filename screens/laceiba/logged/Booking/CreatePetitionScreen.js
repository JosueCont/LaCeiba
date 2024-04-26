import React,{ useCallback, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddBookItem from "../../../../components/laceiba/Booking/AddBookItem";
import { useSelector } from "react-redux";
import moment from "moment";

const CreatePetitionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [rentCar, setRentCar] = useState(0)
    const [holes, setHoles ] = useState(0)
    const [countCar, setCountCar] = useState(0)
    const [countPlayers, setCountPlayers] = useState(1)
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)

    const {item} = route?.params;

    const types = {
        1: ColorsCeiba.aqua,
        2: ColorsCeiba.lightYellow,
        3: ColorsCeiba.lightgray
    }

    const onMinusCar =  useCallback(() =>{
        setCountCar(prevState => prevState -1)
    },[])

    const onPlusCar =  useCallback(() =>{
        setCountCar(prevState => prevState +1)
    },[])

    const onMinusPlayers =  useCallback(() =>{
        setCountPlayers(prevState => prevState -1)
    },[])

    const onPlusPlayers =  useCallback(() =>{
        setCountPlayers(prevState => prevState +1)
    },[])

    const getColor = (status) => {
        if(status.booking?.invitations.find((reservation) => reservation?.user?.id === appDuck.user.id)){
            return ColorsCeiba.aqua
        }else if(status?.fullBooking){
            return ColorsCeiba.lightgray
        }else if(status.booking !== null){
            return ColorsCeiba.lightYellow
        }else{
            return ColorsCeiba.white
        }
    } 
    
    return(
        <HeaderBooking disabledOptions={true}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')} - {infoBooking?.area?.name}</Text>
                    <View style={[styles.contSchedule,{backgroundColor: getColor(item)}]}>
                        <Text>{item?.time}</Text>
                    </View>
                </View>
                {/*<AddBookItem 
                    question="¿Quieres rentar carrito?"
                    showSubtitle={false}
                    type={1}
                    counter={countCar}
                    optionSelect={rentCar}
                    setOption={(index) => setRentCar(index)}
                    onMinus={onMinusCar}
                    onPlus={onPlusCar}
                />*/}
                <AddBookItem 
                    question="¿Cuántos jugadores?"
                    type={2}
                    counter={countPlayers}
                    optionSelect={holes}
                    setOption={(index) => setHoles(index)}
                    onMinus={onMinusPlayers}
                    onPlus={onPlusPlayers}
                />
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddPlayers')}
                    style={styles.btn}>
                    <Text style={styles.lbl}>+ Añadir jugadores</Text>
                </TouchableOpacity>
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
        marginBottom:29
    },
    contSchedule:{
        width: 74,
        height: 26,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15,
        
    },
    btn:{
        width: 176,
        height:30,
        borderRadius:20,
        borderColor: ColorsCeiba.darkGray,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    }
})

export default CreatePetitionScreen;