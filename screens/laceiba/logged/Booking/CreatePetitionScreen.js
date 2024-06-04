import React,{ useCallback, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useIsFocused, useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
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
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const [countPlayers, setCountPlayers] = useState(2)
    const [modalExpiredTime, setModalExpired] = useState(false)
    const players = useSelector(state => state.bookingDuck.players)
    const user = useSelector(state => state.appDuck.user)
    const minutes = useSelector(state => state.bookingDuck.minutes)
    const seg = useSelector(state => state.bookingDuck.seconds)
    const timeExpired = useSelector(state => state.bookingDuck.timeExpired)
    const points = useSelector(state => state.bookingDuck.points)
    const [pointsUsed, setUsedPoints] = useState(0)

    const {item, counterRef} = route?.params;

    const typesDays = {
        'Sunday': 'domingo',
        'Monday':'lunes',
        'Tuesday':'martes',
        'Wednesday':'miércoles',
        'Thursday':'jueves',
        'Friday':'viernes',
        'Saturday':'sábado'

    }

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
        console.log('infoBooking',infoBooking,)
    },[])

    useEffect(() => {
        if(focused) getTotalPoints()
    },[focused])

    useFocusEffect(
        useCallback(() => {
            if(focused){
                //if(players.length < infoBooking?.area?.minPeople){
                if(infoBooking?.area?.minPeople && Array.isArray(players) && players.length > 0){
                    const newCountPlayers = Math.max(infoBooking.area.minPeople, players.length);
                    setCountPlayers(newCountPlayers)
                    //if(players.length < infoBooking?.area?.minPeople){
                    //    setCountPlayers(infoBooking?.area?.minPeople)
                    //}else setCountPlayers(players.length)
                }
                //}else{
    //
                //}
            }
        },[focused, players.length, infoBooking])

    )
        
        useEffect(() => {
            if(players.length > 1) getTotalPointsUsed()
        },[players])

    const getTotalPoints = async() => {
        try {
            const response = await getPoints('',[user?.id])
            //console.log('puntos totales',response?.data?.totalPoints)
            setAtributeBooking({prop:'points', value: response?.data?.totalPoints})
        } catch (e) {
            console.log('error',e)
        }
    } 
    const getTotalPointsUsed = () => {
        let guests = players.filter(item => item?.idInvitado)
        if(guests.length > 0){
            let date = moment(infoBooking?.date,'YYYY-MM-DD').format('dddd')
            let points = guests.length * (infoBooking?.area?.calendarDays?.find(item => typesDays[item?.day] === date).points)
            //console.log('usuarios', guests.length, points )
            setUsedPoints(points)

        }else setUsedPoints(0)
    }

    /*const setReservedTime = async() => {
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
    }*/

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
        if(status?.booking !=null && status?.booking?.invitations.find((reservation) => reservation?.user?.id === user.id)){
            return ColorsCeiba.aqua
        }else if(status?.fullBooking){
            return ColorsCeiba.lightgray
        }else if(status.booking !== null){
            return ColorsCeiba.lightYellow
        }else{
            return ColorsCeiba.white
        }
    } 
    console.log('counter', countPlayers, 'players', players)
    return(
        <HeaderBooking disabledOptions={true} showFilters={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>{infoBooking?.activity?.name}</Text>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')} - {infoBooking?.area?.name}</Text>
                    <View style={[styles.contSchedule,{backgroundColor: getColor(item)}]}>
                        <Text>{item?.time}</Text>
                    </View>
                </View>
                {/*<View style={{alignItems:'center', marginBottom:25}}>
                    <Text style={{color: ColorsCeiba.aqua}}>Tiempo para reservar: {minutes < 10 ? `0${minutes}` : minutes}:{seg < 10 ? `0${seg}` : seg} {minutes <= 0 ? 'sec' : 'min'}.</Text>
                </View>*/}
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
                {countPlayers > 0 && players.length > 0 &&<AddBookItem 
                    question="¿Cuántos jugadores?"
                    players={players.length}
                    isGolf={infoBooking?.activity?.isGolf}
                    maxLimit={infoBooking?.area?.maxPeople}
                    minLimit={infoBooking?.area?.minPeople}
                    type={2}
                    counter={countPlayers}
                    optionSelect={holes}
                    setOption={(index) => setHoles(index)}
                    onMinus={onMinusPlayers}
                    onPlus={onPlusPlayers}
                />}
                {(infoBooking?.area?.maxPeople - players.length) > 0 && players.length != countPlayers && <TouchableOpacity 
                    onPress={() => navigation.navigate('AddPlayers', {players: countPlayers, isFromEdit: false})}
                    style={styles.btn}>
                    <Text style={styles.lbl}>+ Añadir jugadores</Text>
                </TouchableOpacity>}

                <TablePlayers players={players} showDelete={true}/>
                    
                {infoBooking?.activity?.isGolf && 
                <View>
                    <Text style={{alignSelf:'center', marginVertical:10, fontSize: getFontSize(16)}}>Green Fees</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:15}}>
                        <View>
                            <Text>Disponibles:</Text>
                            <Text style={{textAlign:'center', marginTop:5}}>{points.toString()}</Text>
                        </View>
                        <View>
                            <Text>A utilizar:</Text>
                            <Text style={{textAlign:'center', marginTop:5}}>{pointsUsed.toString()}</Text>
                        </View>

                    </View>
                </View>}
                <BtnCustom 
                    title="Hacer reserva"
                    disable={players.length !== countPlayers}
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