import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation, CommonActions, useRoute, useIsFocused } from "@react-navigation/native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeeaderBookingImage from "../../../../components/laceiba/Headers/HeaderBookingImage";
import moment from "moment";
import TableUserReservation from "../../../../components/laceiba/Booking/TableUserReservation";
import { useSelector } from "react-redux";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import ModalQR from "../../../Modals/ModalQr";
import { cancelBooking, deleteGuestsBooking, deletePartnersBooking, getAllBookings, getListRequestGuests, getReservationInfoId, setReservationStatus } from "../../../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAsk from "../../../Modals/ModalAsk";
import ModalInfo from "../../../Modals/ModalInfo";
import { Spinner } from "native-base";
import _, { lastIndexOf } from "lodash";
import ModalConfirmRejectBook from "../../../Modals/ModalConfirmRejectBook";

const DetailReservationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const focused = useIsFocused()

    const {reservation} = route?.params

    const [players, setPlayers] = useState([])
    const user = useSelector(state => state.appDuck.user)
    const [showModalQr, setShowModal] = useState(false)
    const [ dataSelected, setDataSelected ] = useState(null)
    const [dataReserve, setDataReserve] = useState(null)
    const [idDelete, setIdDelete] = useState(null)
    const [modalDetele, setModalDelete] = useState(false)
    const [update, setUpdate] = useState(false)
    const [invitations, setInvitations] = useState([])
    const [modalCancel, setModalCancel] = useState(false)
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [modalError, setModalerror] = useState(false)
    const [txtError, setTxtEror] = useState('')
    const [loading, setLoading] = useState(false)
    const [greenFees, setGreenFees] = useState(0)
    const [modalAction, setModalAction] = useState(false)
    const [actionBook, setActionBook] = useState(null);
    const [loadingAccept, setLoadingOk] = useState(false)
    const [guestsRequest, setGuestRequest] = useState([])
    const currentDay = moment().format('YYYY-MM-DD');

    useEffect(() => {
        //getDataPlayers()
        getDataReservation()
        if(reservation?.hostedId === user?.id && !moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay))
            getRequestGuests()
    },[focused])

    useEffect(() => {
        if(update) getDataReservation()
    },[update])

    const getRequestGuests = async() => {
        try {
            const response = await getListRequestGuests(`?bookingId=${reservation?.id}`);
            setGuestRequest(response?.data.filter(item => item?.status === 'PENDING'))
        } catch (e) {
            console.log('error,',e)
        }
    }

    const getDataReservation = async() => {
        try {
            //console.log('reservation', reservation)
            setLoading(true)
            const response = await getAllBookings(`?bookingId=${reservation?.id}&limit=1`)
            //console.log('informacion reservacion', response?.data, 'id',reservation?.id,)
            setDataReserve(response?.data?.items[0])
            getDataPlayers(response?.data?.items[0])
            setUpdate(false)
        } catch (e) {
            console.log('error', e)
        }finally{
            setLoading(false)
        }
    } 

    const getDataPlayers = (reserve) => {
       // console.log('reserve',reserve)
        let allPlayers = reserve?.invitations.map((invitation,index) => {
            let qrData = reserve.qrs.find(qr => qr?.userId !== null ? qr?.userId === invitation?.user?.id : qr?.idInvitado === invitation?.guestId);
            return {
                ...invitation,
                ...qrData
            };
        })
        let userObject = allPlayers.find(item => item?.user != null && item?.user?.id === user?.id);
        //console.log('all userObject',userObject)

        let filteredArray = allPlayers.filter(item => item.user != null ? item?.user?.id !== user?.id : item?.idInvitado !== user?.id);
        setInvitations(filteredArray)

        //console.log('dataTable',allPlayers)
        setPlayers([userObject, ...filteredArray])

        if(reserve?.guests.length > 0){
            let uniqueGuestIds = new Set();
            let totalPoints = 0;
            
            reserve?.guests.forEach(item => {
              if (!uniqueGuestIds.has(item.guestId)) {
                totalPoints += item.points;
                uniqueGuestIds.add(item.guestId);
              }
            });

            setGreenFees(totalPoints)
        }
    }

    const onDeletePartner = async() => {
        try {
            setModalDelete(false)
            let dataSend = {
                partners: [idDelete?.user?.id]
            }
            const response = await deletePartnersBooking(dataSend,[reservation?.id])
            //console.log('delete',response?.data)
            setUpdate(true)
        } catch (e) {
            console.log('error',e)
        }
    }

    const onDeleteGuess = async() => {
        try {
            setModalDelete(false)
            let dataSend ={
                guests: [
                    {
                      "guestId": idDelete?.guestId,
                      "guestName": idDelete?.guestName,
                      "guestEmail": idDelete?.guestEmail,
                      "points": 1
                    }
                ]
            }
            const response = await deleteGuestsBooking(dataSend, [reservation?.id])
            setUpdate(true)
            //console.log('delete guess',response?.data)
        } catch (e) {
            console.log('error',e)
        }
    }

    const onDeleteReservation = async() => {
        try {
            setModalCancel(false)
            setLoadingCancel(true)
            const response = await cancelBooking('',[reservation?.id])
            //console.log('cancelado',response?.data)
            navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'HomeScreen', params: {screen: 'HomeScreen'}}]
            }))
        } catch (e) {
            console.log('error cancel',e)
            setModalerror(true)
            setTxtEror(e?.data?.message)

        } finally {
            setLoadingCancel(false)
        }
    }

    const getFindUser = () => {
        //console.log('pending', dataReserve?.invitations?.filter(item => item.status === 'PENDING' && item?.user?.id === user?.id).length > 0)
        return dataReserve?.invitations?.filter(item => item.status === 'PENDING' && item?.user?.id === user?.id).length > 0
    }

    const AcceptBooking = async() => {
        try {
            setModalAction(false)
            setLoadingOk(true)
            let dataSend = {
                status: 'CONFIRMED',
                additionals:[
                    {
                        claveServicio: dataReserve?.invitations?.find(item => item?.user?.id === user?.id)?.user?.partner?.claveSocio,
                        descServicio: dataReserve?.area?.service?.name
                    }
                ]
            }
            //console.log('dataSend accept', dataSend, dataReserve?.invitations?.find(item => item?.user?.id === user?.id)?.id)
            const response = await setReservationStatus(dataSend, [dataReserve?.invitations?.find(item => item?.user?.id === user?.id)?.id])
            //console.log('response ok',response?.data)
            setUpdate(true)
        } catch (e) {
            console.log('error aceptar',e)
            setModalerror(true)
            setTxtEror(e?.data?.message)

        } finally {
            setLoadingOk(false)
        }
    }

    const RejectBooking = async() => {
        try {
            setModalAction(false)
            setLoadingCancel(true)
            let dataSend ={
                status: 'REJECTED'
            }
            //console.log('dataSend reject', dataSend)
            const response = await setReservationStatus(dataSend, [dataReserve?.invitations?.find(item => item?.user?.id === user?.id)?.id])
            navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'HomeScreen', params: {screen: 'HomeScreen'}}]
            }))
            //console.log('response reje', response?.data)
        } catch (e) {
            console.log('error cancelar',e)
            setModalerror(true)
            setTxtEror(e?.data?.message)
        } finally {
            setLoadingCancel(false)
        }
    }

    return(
        <HeeaderBookingImage>
            <View style={styles.container}>
                <Text>Reserva {dataReserve?.area?.service?.name}</Text>
                <Text style={{marginTop:20, fontSize: getFontSize(16), marginBottom:8}}>Fecha y hora</Text>
                <Text style={[styles.lbl, {textTransform:'capitalize'}]}>{moment(reservation?.dueDate,'YYYY-MM-DD').format('dddd D MMMM')}</Text>
                <Text style={styles.lbl}>{reservation?.dueTime} hrs.</Text>
                <Text style={styles.lbl}>{reservation?.area?.service?.isGolf && 'Salida:'} {reservation?.area?.name}</Text>
                {reservation?.area?.service?.isGolf && <Text style={styles.lbl}>{reservation?.numHoles} hoyos</Text>}
                {greenFees > 0 && <Text style={styles.lbl}>Green Fees utilizados: {greenFees.toString()}</Text>}
                {dataReserve?.hostedBy?.id === user?.id && !moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay) && guestsRequest.length > 0 && (
                    <View style={{marginVertical:10, borderBottomWidth:1, borderBottomColor: ColorsCeiba.darkGray, paddingBottom:10}}>
                        <Text style={styles.lbl}>Hay {guestsRequest.length} {guestsRequest.length > 1 ? 'socios' : 'socio'} que {guestsRequest.length > 1 ? 'desean' : 'desea'} unirse a la reservación. </Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ModalListGuest', {guestsRequest, dataReserve})}
                            style={{alignSelf:'center', paddingVertical:5, paddingHorizontal:20, borderRadius:30, borderColor: ColorsCeiba.darkGray, borderWidth:1, marginTop:10}}>
                            <Text>Ver solicitudes</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {reservation?.deletedBy !=null ? (
                <View style={{height: 200, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(18), marginBottom:10}}>La reservación fue cancelada</Text>
                    <Text  style={[styles.lbl, {textTransform:'capitalize'}]}>Por: {reservation?.deletedBy?.fullName}</Text>
                    <Text  style={styles.lbl}>Fecha de la cancelación {moment(reservation?.deletedAt).local().format('DD MMMM YYYY')}</Text>
                </View>
            ):(
                <View>

                    {(dataReserve?.area?.maxPeople - dataReserve?.invitations.length) > 0 && dataReserve?.hostedBy?.id === user?.id && !moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay) &&
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AddPlayers', {players: dataReserve?.area?.maxPeople - 1, isFromEdit:true, invitations: invitations, idReservation:reservation?.id, isGolf: dataReserve?.area?.service?.isGolf})}
                        style={styles.btn}>
                        <Text style={styles.lblBtn}>+ Añadir jugadores</Text>
                    </TouchableOpacity>}
                    <View style={{marginVertical:15,}}>
                        {loading ? (
                            <View style={{height:150, justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'sm'} color={ColorsCeiba.darkGray}/>
                            </View>
                        ):(
                            <TableUserReservation 
                                players={players} 
                                hostId={dataReserve?.hostedBy?.id}
                                showQr={(item) => {
                                    console.log('a mostrar ', item)
                                    setDataSelected(item)
                                    setShowModal(true)
                                }}
                                onDeletePlayer={(item) => {
                                    console.log('a eliminar',item)
                                    setIdDelete(item)
                                    setModalDelete(true)
                                }}
                                isPast={moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay)}
                            />
        

                        )}
                    </View>
                    {getFindUser() ? !moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay) && (
                        <View>
                            <View style={{marginBottom:15}}>
                                <BtnCustom 
                                    title="Aceptar invitación" 
                                    bgColor={ColorsCeiba.darkGray}
                                    onPress={() => {
                                        setModalAction(true)
                                       setActionBook('Confirm')
                                    }}
                                    loading={loadingAccept}
                                />
            
                            </View>
                            <View style={{marginBottom:15}}>
                                <BtnCustom 
                                    title="Rechazar invitación" 
                                    bgColor={ColorsCeiba.white}
                                    color={ColorsCeiba.darkGray}
                                    spinnerColor={ColorsCeiba.darkGray}
                                    onPress={() => {
                                        setModalAction(true)
                                        setActionBook("Reject");
                                    }}
                                    loading={loadingCancel}
                                />
                                </View>
                        </View>
                    ): dataReserve?.invitations.find(item => item?.status === 'CONFIRMED' && item?.user?.id === user?.id) &&(
                        <View style={{marginBottom:15}}>
                            <BtnCustom 
                                title="Código QR" 
                                bgColor={ColorsCeiba.darkGray}
                                onPress={() => {
                                    let myUser = players.find(item => item.userId === user?.id)
                                    console.log(myUser)
                                    setShowModal(true)
                                    setDataSelected(myUser)
                                }}
                            />
        
                        </View>
                    )}
                    {dataReserve?.hostedBy?.id === user?.id && !moment(reservation?.dueDate, 'YYYY-MM-DD').isBefore(currentDay) &&
                        <BtnCustom 
                            title="Cancelar reservación" 
                            bgColor={ColorsCeiba.white}
                            color={ColorsCeiba.darkGray}
                            onPress={() => setModalCancel(true)}
                            spinnerColor={ColorsCeiba.darkGray}
                            loading={loadingCancel}
                        />
                    }
                </View>
            )}

                <ModalQR 
                    visible={showModalQr}
                    setVisible={() => setShowModal(false)}
                    dataQr={dataSelected}
                    dataReservation={reservation}
                />
                <ModalAsk 
                    visible={modalDetele}
                    setVisible={() => setModalDelete(false)}
                    action={() => idDelete?.user !== null ? onDeletePartner() : onDeleteGuess()}
                    text="¿Está seguro de eliminar el usuario de la reservación?"
                    textButton="Si"
                />
                <ModalAsk 
                    visible={modalCancel}
                    setVisible={() => setModalCancel(false)}
                    action={() => onDeleteReservation()}
                    text="¿Desea eliminar la reservación?"
                    textButton="Si"
                />
                <ModalInfo 
                    visible={modalError}
                    setVisible={() => setModalerror(false)}
                    text={txtError}
                    iconType="exclamation"
                />

                <ModalConfirmRejectBook 
                    visible={modalAction}
                    setVisible={() => setModalAction(false)}
                    type={actionBook}
                    title={actionBook == "Confirm" ? "Confirmación de la reservación" : "Rechazar reservación"}
                    data={{date: moment(dataReserve?.dueDate, "YYYY-MM-DD").format("DD-MM-YYYY"), hour: moment(dataReserve?.dueTime, "HH:mm").format("hh:mm a"), numPeople: dataReserve?.invitations?.length}}
                    onAccept={actionBook == "Confirm" ? AcceptBooking : RejectBooking}
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
    lblBtn:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    }
})

export default DetailReservationScreen;