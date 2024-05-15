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
import { cancelBooking, deleteGuestsBooking, deletePartnersBooking, getAllBookings, getReservationInfoId } from "../../../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAsk from "../../../Modals/ModalAsk";
import ModalInfo from "../../../Modals/ModalInfo";
import { Spinner } from "native-base";
import _ from "lodash";

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


    useEffect(() => {
        //getDataPlayers()
        getDataReservation()
    },[focused])

    useEffect(() => {
        if(update) getDataReservation()
    },[update])

    const getDataReservation = async() => {
        try {
            //console.log('reservation', reservation)
            setLoading(true)
            const response = await getAllBookings(`?bookingId=${reservation?.id}&limit=1`)
            //console.log('informacion reservacion', response, 'id',reservation?.id)
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
        console.log('reserve',reserve)
        let allPlayers = reserve?.invitations.map((invitation,index) => {
            let qrData = reserve.qrs.find(qr => qr?.userId !== null ? qr?.userId === invitation?.user?.id : qr?.idInvitado === invitation?.guestId);
            return {
                ...invitation,
                ...qrData
            };
        })
        let userObject = allPlayers.find(item => item.userId != null && item?.userId === user?.id);
        //console.log('all userObject',userObject)

        let filteredArray = allPlayers.filter(item => item.userId != null ? item?.userId !== user?.id : item?.idInvitado !== user?.id);
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
            console.log('cancelado',response?.data)
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

    return(
        <HeeaderBookingImage>
            <View style={styles.container}>
                <Text>Reserva {dataReserve?.area?.service?.name}</Text>
                <Text style={{marginTop:20, fontSize: getFontSize(16), marginBottom:8}}>Fecha y hora</Text>
                <Text style={styles.lbl}>{moment(reservation?.dueDate,'YYYY-MM-DD').format('dddd MMMM D')}</Text>
                <Text style={styles.lbl}>{reservation?.dueTime} hrs.</Text>
                <Text style={styles.lbl}>Salida: {reservation?.area?.name}</Text>
                <Text style={styles.lbl}>{reservation?.numHoles} hoyos</Text>
                <Text style={styles.lbl}>Green Fees utilizados: {greenFees.toString()}</Text>
            </View>
            {reservation?.deletedBy !=null ? (
                <View style={{height: 200, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(18), marginBottom:10}}>La reservación fue cancelada</Text>
                    <Text  style={[styles.lbl, {textTransform:'capitalize'}]}>Por: {reservation?.deletedBy?.fullName}</Text>
                    <Text  style={styles.lbl}>Fecha de la cancelación {moment(reservation?.deletedAt).local().format('DD MMMM YYYY')}</Text>
                </View>
            ):(
                <View>

                    {(dataReserve?.area?.maxPeople - dataReserve?.invitations.length) > 0 &&
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AddPlayers', {players: dataReserve?.area?.maxPeople - 1, isFromEdit:true, invitations: invitations, idReservation:reservation?.id})}
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
                            />
        

                        )}
                    </View>
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
                    <BtnCustom 
                        title="Cancelar reservación" 
                        bgColor={ColorsCeiba.white}
                        color={ColorsCeiba.darkGray}
                        onPress={() => setModalCancel(true)}
                        spinnerColor={ColorsCeiba.darkGray}
                        loading={loadingCancel}
                    />
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
                    text="¿Esta seguro de eliminar el usuario de la reservación?"
                />
                <ModalAsk 
                    visible={modalCancel}
                    setVisible={() => setModalCancel(false)}
                    action={() => onDeleteReservation()}
                    text="¿Desea eliminar la reservación?"
                />
                <ModalInfo 
                    visible={modalError}
                    setVisible={() => setModalerror(false)}
                    text={txtError}
                    iconType="exclamation"
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