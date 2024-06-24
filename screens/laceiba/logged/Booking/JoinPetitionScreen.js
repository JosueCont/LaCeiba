import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import RequestJoinItem from "../../../../components/laceiba/Booking/RequestJoinItem";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import moment from "moment";
import { deleteRequestGuest, getListRequestGuests, postJoinBookingRequest, putAcceptRequestGuest } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";
import ModalAsk from "../../../Modals/ModalAsk";
const {height, width} = Dimensions.get('window');

const JoinPetitionScreen = () => {
    const navigation = useNavigation();
    const focused = useIsFocused();
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const appDuck = useSelector(state => state.appDuck)
    const [loading, setLoading] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [dataRequests, setDataRequests] = useState([])
    const [update, setUpdate] = useState(false)
    const [eror, setError] = useState('')
    const [txt, setTxt] = useState('')
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalAsk, setModalAsk] = useState(false)
    const requested = {
        schedule: '8:00 am',
        people:[
            {name:'Josué Contreras',},
            {name:'Alvaro Uribe'},
            {name:'Alberto Noah'},
            {name:'Alex Dzul'}
        ]
    }
    
    useEffect(() => {
        getRequests()
    },[focused])

    useEffect(() => {
        if(update) getRequests()
    },[update])

    const getRequests = async() => {
        try {
            const response = await getListRequestGuests(`?bookingId=${infoBooking?.hour?.booking?.id}`)
            console.log('pendientes solicitudes', response?.data)
            setUpdate(false)
            setDataRequests(response?.data.filter(item => item.status === 'PENDING'))
        } catch (e) {
            console.log('error',e)
        }
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

    const onCancelRequest = async() => {
        try {
            let dataSend = {
                status: 'REJECTED'
            }
            const person = dataRequests.find(item => item?.user?.id === appDuck.user.id)
            console.log('dataSend', dataSend, person)
            const response = await putAcceptRequestGuest(dataSend, [person?.id])
        } catch (e) {
            console.log('error',e)
        }
    }

    const onDeleteRequest = async() => {
        try {
            setModalAsk(false)
            setLoading(true)
            const person = dataRequests.find(item => item?.user?.id === appDuck.user.id)
            console.log('eliminando', person)
            const response = await deleteRequestGuest('',[person?.id])
            console.log('reponse eliminar', response?.data)
            setModalSuccess(true)
            setTxt('Se ha eliminado la solicitud.')
            setError('Se ha eliminado la solicitud, ya no aparecerá al host tu petición.')
            setUpdate(true)
        } catch (e) {
            console.log('error',e)
            setModalError(true)
            setTxt('Error al eliminarla solicitud')
            setError('No se ha podido eliminar la solicitud.')
        }finally {
            setLoading(false)
        }
    }

    const onNewRequest = async() => {
        try {
            setLoading(true)
            const person = dataRequests.find(item => item?.user?.id === appDuck.user.id)
            console.log('eliminando', person)
            const response = await deleteRequestGuest('',[person?.id])
            onjoinBooking()
        } catch (e) {
            console.log('errpr',e)
            setModalError(true)
            setTxt('Error al crear nueva solicitud')
            setError('No se ha podido crear la nueva solicitud.')
        }
    }

    return(
        <HeaderBooking disabledOptions={true} showFilters={false}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(infoBooking?.date,'YYYY-MM-DD').format('dddd MMMM D')} - {infoBooking?.area?.name}</Text>
                    <View style={styles.btnHoles}>
                        <Text>{infoBooking?.hour?.booking?.numHoles} Hoyos</Text>
                    </View>
                </View>
                <RequestJoinItem requested={infoBooking} />
                {dataRequests.some(item => item?.user?.id === appDuck.user.id) ? 
                    dataRequests.find(item => item?.user?.id === appDuck.user.id && item?.status === 'REJECTED') ? (
                        <View>
                            <Text style={styles.lbl}>Tu solicitud ha sido rechazada.</Text>
                            <BtnCustom 
                                title="Volver a solicitar"
                                disable={loading}
                                loading={loading}
                                onPress={() => onNewRequest()}
                            />
                    </View>
                    ): (
                    <View>
                        <Text style={styles.lbl}>Ya has solicitado, unirte a esta reservación.</Text>
                        <BtnCustom 
                            title="Eliminar solicitud"
                            disable={loading}
                            loading={loading}
                            onPress={() => setModalAsk(true)}
                        />
                    </View>
                ):(
                    <BtnCustom 
                        title="Petición para unirse a grupo"
                        disable={loading}
                        loading={loading}
                        onPress={() => onjoinBooking()}
                    />
                )}

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
            <ModalInfo
                visible={modalSuccess}
                setVisible={() => {
                    setModalSuccess(false)
                }}
                close={false}
                title={txt}
                text={eror}
            />
            <ModalAsk 
                visible={modalAsk}
                setVisible={() => setModalAsk(false)}
                action={() => onDeleteRequest()}
                text="¿Desea eliminar la solicitud?"
                textButton="Si"
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
    },
    lbl:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(15),
        fontWeight:'400', marginBottom:10,
        textAlign:'center'
    }
})

export default JoinPetitionScreen;