import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { errorCapture, getFontSize } from "../../../../utils";
import HeeaderBookingImage from "../../../../components/laceiba/Headers/HeaderBookingImage";
import { ColorsCeiba } from "../../../../Colors";
import moment from "moment";
import TablePlayers from "../../../../components/laceiba/Booking/TablePlayers";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import { MaterialIcons } from '@expo/vector-icons';
import { setDataBooking } from "../../../../redux/ducks/bookingDuck";
import ModalInfo from "../../../Modals/ModalInfo";
import { bookService, cacheBookHour, getUserDebt } from "../../../../api/Requests";


const DetailBokingScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const players = useSelector(state => state.bookingDuck.players)
    const user = useSelector(state => state.appDuck.user)
    //const [isRunning, setIsRunning] = useState(true)
    //const [minutes, setMinutes] = useState(0)
    //const [seg, setSeconds] = useState(0)
    //const [timeExpired, setTimeExpired] = useState(false)
    //const countdownInterval = useRef(null); 
    const minutes = useSelector(state => state.bookingDuck.minutes)
    const seg = useSelector(state => state.bookingDuck.seconds)
    const timeExpired = useSelector(state => state.bookingDuck.timeExpired)
    const [modalExpiredTime, setModalExpired] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingTwo, setloadingTwo] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [isError, setError] = useState(false)
    const [modalError, setModalError] = useState(false)
    
    const {holes } = route?.params
    //useEffect(() => {
    //    if(isRunning && seg === 0 && minutes === 0){
    //        if (countdownInterval.current !== null) {
    //            clearInterval(countdownInterval.current); // Limpieza usando .current
    //        }
    //        setIsRunning(false);
    //        setReservedTime()
    //        //startCounter(10) //infoBooking?.activity?.timeToConfirm * 60
    //        
    //    }else{
    //        setTimeExpired(false)
    //    }
    //    // console.log("codePage",isRunning, seg, minutes)
    //},[])

   /* const setReservedTime = async() => {
        try {
            let dataSend = {
                dueDate: infoBooking?.date,
                dueTime: infoBooking?.hour?.time
            }
            const response = await cacheBookHour(dataSend,[user.id, infoBooking?.area?.id])
            startCounter(infoBooking?.activity?.timeToConfirm * 60)
            console.log('response', response)
        } catch (e) {
            console.log('error',e)
        }
    }

    const startCounter = (totalSeconds) => {
        if (countdownInterval.current !== null) {
            clearInterval(countdownInterval.current); // Usa .current aquí
            console.log("clear")
        }
        let counter = totalSeconds;
        console.log("setInterval")
        countdownInterval.current = setInterval(() => { // Cambio aquí
            if (counter >= 0) {
                setMinutes(Math.floor(counter / 60));
                setSeconds(counter % 60);
                counter--;
            } else {
                setTimeExpired(true)
                clearInterval(countdownInterval.current); // Usa .current aquí
                console.log('Tiempo terminado');
                setIsRunning(true);

                // Considera si necesitas llamar a getCodeQR aquí
            }
        }, 1000);
    };*/
    const onMakeReservation = async(myEmail) => {
        try {
            myEmail ? setloadingTwo(true) : setLoading(true)
            let dataSend = {
                "dueDate": infoBooking?.date,
                "dueTime": infoBooking?.hour?.time,
                "areaId": infoBooking?.area?.id,
                "numPeople": players.length,
            }

            if(players.length > 1 && players.filter(item => item.userId && item?.userId  !== user?.id).length>0 ) dataSend.users = players?.filter((item) => item.userId && item?.userId !== user?.id).map((item) => item?.userId)
            if(players.filter((item) => item?.idInvitado).length > 0){
                dataSend.guests = players.filter(item => item?.idInvitado).map(item => ({
                    guestId: +item?.idInvitado,
                    guestName: `${item?.nombre} ${item?.apellidoPaterno}`,
                    guestEmail: item?.mail,
                    points: 1
                }))

            } 
            if(infoBooking?.activity?.isGolf) dataSend.numHoles = holes !=0 ? 18 : 9

            if(myEmail) dataSend.specificEmail = user?.email
            //console.log('dataSend',dataSend, user)
            const hasDebt = await getUserDebt('',[user?.partner?.id])
            if(hasDebt?.data > 0){
                setModalError(true)
                setMessageError('Lo sentimos usted presenta un adeudo en su estado de cuenta, por favor contactar administración para más detalle.')
            }else{
                const response = await bookService(dataSend,[user?.id])
                console.log('response bokking',response?.data)
                navigation.navigate('BookingSuccess', {people: players, date: infoBooking?.date, hour: infoBooking?.hour?.time})

            }
        } catch (e) {
            console.log('error',e)
            setModalExpired(true)
            setError(true)
            setMessageError(e?.data?.message)
        } finally{
            setLoading(false)
            setloadingTwo(false)
        }
    }
    return(
        <HeeaderBookingImage>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Reserva {infoBooking?.activity?.name}</Text>
                <Text style={{marginTop:20, fontSize: getFontSize(16), marginBottom:8}}>Fecha y hora</Text>
                <Text style={styles.lbl}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')}</Text>
                <Text style={styles.lbl}>{infoBooking?.hour?.time} hrs.</Text>
                {infoBooking?.activity?.isGolf ? <Text style={styles.lbl}>Salida hoyo {infoBooking?.area?.name === 'Tee 1' ? '1' : '10'}</Text>
                : <Text style={styles.lbl}>{infoBooking?.area?.name}</Text>}
               {infoBooking?.activity?.isGolf && <Text style={styles.lbl}>{holes !=0 ? '18' : '9'} hoyos</Text>}
                
            </View>
            <View style={{justifyContent:'center', marginHorizontal:20, marginBottom:38}}>
                <TablePlayers players={players} showDelete={false}/>

            </View>
            {/*<View style={{alignItems:'center', marginBottom:17}}>
                <Text style={{color: ColorsCeiba.aqua}}>Tiempo para reservar: {minutes < 10 ? `0${minutes}` : minutes}:{seg < 10 ? `0${seg}` : seg} {minutes <= 0 ? 'sec' : 'min'}.</Text>
            </View>*/}

            <View>
                <BtnCustom 
                    title="Confirmar y enviar invitaciones individuales" 
                    loading={loading}
                    onPress={() => {
                        if(timeExpired)setModalExpired(true)
                        else onMakeReservation()
                    }}
                />
                <View style={{position:'absolute', right:50, top:8}}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>
            </View>
            <View style={{marginTop:13}}>
                <BtnCustom 
                    title="Confirmar y enviar invitaciones a mi correo" 
                    bgColor={ColorsCeiba.white} 
                    spinnerColor={ColorsCeiba.darkGray}
                    color={ColorsCeiba.darkGray}
                    loading={loadingTwo}
                    onPress={() => {
                        if(timeExpired)setModalExpired(true)
                        else onMakeReservation(true)
                    }}
                />
                <View style={{position:'absolute', right:50, top:8}}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
            </View>

            <ModalInfo
                visible={modalExpiredTime}
                setVisible={() => {
                    setModalExpired(false)
                    if(isError){
                        setError(false)
                    }else{
                        setTimeout(() => {
                            dispatch(setDataBooking({}))
                            navigation.navigate('CreateBooking', {holes: holes})
                        },200)

                    }
                }}
                close={false}
                title="Aviso"
                text={isError ? messageError : "Se ha terminado el tiempo, vuelve a seleccionar horario"}
            />
            <ModalInfo 
                visible={modalError}
                setVisible={() => setModalError(false)}
                title="Aviso"
                text={messageError}
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

export default DetailBokingScreen;