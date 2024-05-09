import React,{ useCallback, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import AddBookItem from "../../../../components/laceiba/Booking/AddBookItem";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TablePlayers from "../../../../components/laceiba/Booking/TablePlayers";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import { getCounter, setAtributeBooking, setDataBooking } from "../../../../redux/ducks/bookingDuck";
import { cacheBookHour } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";

const {height, width} = Dimensions.get('window');

const CreatePetitionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const focused = useIsFocused()
    const [rentCar, setRentCar] = useState(0)
    const [holes, setHoles ] = useState(0)
    const [countCar, setCountCar] = useState(0)
    const [countPlayers, setCountPlayers] = useState(1)
    const [modalExpiredTime, setModalExpired] = useState(false)
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const players = useSelector(state => state.bookingDuck.players)
    const user = useSelector(state => state.appDuck.user)
    const minutes = useSelector(state => state.bookingDuck.minutes)
    const seg = useSelector(state => state.bookingDuck.seconds)
    const timeExpired = useSelector(state => state.bookingDuck.timeExpired)

    const {item, counterRef} = route?.params;
    
    useEffect(() => {
        let myPlayer = {
            status: 'Confirmado',
            nombre:`${user?.firstName}`,
            apellidoPaterno: user?.lastName,
            membership: user?.partner,
            id: user?.partner?.id,
            userId: user?.id
        }
        dispatch(setAtributeBooking({prop:'players', value: [myPlayer]}))
    },[])

    useEffect(() => {
        console.log('iniciar', counterRef)
        //if(counterRef.current === null){
            setReservedTime()
        //}
    },[focused])

    const setReservedTime = async() => {
        try {
            let dataSend = {
                dueDate: infoBooking?.date,
                dueTime: infoBooking?.hour?.time
            }
            console.log('dataSend', dataSend)
            console.log('minutes',minutes,'seconds', seg)
            const response = await cacheBookHour(dataSend,[user.id, infoBooking?.area?.id])
            console.log('response', response)
            dispatch(getCounter(infoBooking?.activity?.timeToConfirm * 60, counterRef))
        } catch (e) {
            console.log('error reservar',e)
        }
    }

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
                <View style={{alignItems:'center', marginBottom:25}}>
                    <Text style={{color: ColorsCeiba.aqua}}>Tiempo para reservar: {minutes < 10 ? `0${minutes}` : minutes}:{seg < 10 ? `0${seg}` : seg} {minutes <= 0 ? 'sec' : 'min'}.</Text>
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
                    players={players.length}
                    type={2}
                    counter={countPlayers}
                    optionSelect={holes}
                    setOption={(index) => setHoles(index)}
                    onMinus={onMinusPlayers}
                    onPlus={onPlusPlayers}
                />
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddPlayers', {players: countPlayers})}
                    style={styles.btn}>
                    <Text style={styles.lbl}>+ Añadir jugadores</Text>
                </TouchableOpacity>

                <TablePlayers players={players} showDelete={true}/>

                <BtnCustom 
                    title="Hacer reserva"
                    disable={players.length < countPlayers}
                    onPress={() => {
                        timeExpired ? setModalExpired(true) :navigation.navigate('DetailBooking',{holes,})
                    }}
                />

                <ModalInfo
                    visible={modalExpiredTime}
                    setVisible={() => {
                        setModalExpired(false)
                        setTimeout(() => {
                            dispatch(setDataBooking({}))
                            dispatch(setAtributeBooking({prop:'timeExpired', value:false}))
                            navigation.goBack()
                        },200)
                    }}
                    close={false}
                    title="Aviso"
                    text="Se ha terminado el tiempo, vuelve a seleccionar horario"
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
        width: width*.65,
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:17
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
        alignSelf:'center',
        marginBottom:10
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    }
})

export default CreatePetitionScreen;