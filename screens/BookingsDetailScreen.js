import React, {useEffect, useRef, useState} from 'react'
import {Button, Checkbox, Icon, Image, ScrollView, Skeleton, Spinner, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN, Modal, StyleSheet} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";
import ModalConfirmRejectBook from './Modals/ModalConfirmRejectBook';
import moment from 'moment-timezone'
import {cancelBooking, getAdditionals, getOneInvitation, setReservationStatus} from "../api/Requests";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import { Table, Row } from 'react-native-table-component';
import {AntDesign} from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from "expo-sharing"

moment.tz.setDefault("America/Mexico_City");

const BookingDetailScreen = ({route, navigation, appDuck}) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const {invitation_id} = route?.params;
    const [openModal, setOpenModal] = useState(false);
    const [actionBook, setActionBook] = useState(null);
    const [invitation, setInvitation] = useState(null);
    const [loading, setLoading] = useState(null);
    const [additionals, setAdditionals] = useState([]);
    const [groupValues, setGroupValues] = useState([]);
    const [modalCancelVisible, setModalCancelVisible] = useState(null);
    const [modalCancelInformationVisible, setModalCancelInformationVisible] = useState(null)
    const [modalCancelSucess, setModalCancelSucess] = useState(false);
    const [dueDate, setDueDate] = useState(null)
    const [dateNow, setDateNow] = useState(null)
    const [modalQRPreview, setModalQrPreview] = useState(null)
    const [imageQRCode, setImageQRCode] = useState(null)
    const [qrCode, setQrCode] = useState('')
    const [qrOwnerName, setQrOwnerName] = useState('')
    const isFocused = useIsFocused();

    const imgRef = useRef();

    useEffect(() => {
        if (isFocused) {
            console.log('getInvitation')
            setInvitation(null)
            getInvitation()
        }
    }, [isFocused])

    useEffect(()=>{
        if (invitation) {
            setDueDate(invitation?.booking?.dueDate)
            setDateNow(moment().format('YYYY-MM-DD'))

            if (invitation.booking.area.service.isGolf) {
                if (invitation?.status === 'PENDING') {
                    getAdditionalsFunction()
                } else {
                    // console.log(invitation?.additionals)
                    setAdditionals(invitation?.additionals)
                }
            }
        }
    }, [invitation])


    const AcceptBooking = async () => {
        try {
            setOpenModal(false);
            let data = {
                status: 'CONFIRMED',
            };
            if (groupValues.length > 0) {
                data['additionals'] = groupValues
            }
            const response = await setReservationStatus(data, [invitation.id])
            console.log(response.data)
            navigation.goBack();
        } catch (e) {
            console.log(JSON.stringify(e))
        }

    }

    const RejectBooking = async () => {
        try {
            setOpenModal(false);
            let data = {
                status: 'REJECTED'
            };
            const response = await setReservationStatus(data, [invitation.id])
            console.log(response.data)
            navigation.goBack();
        } catch (e) {

        }
    }

    const getAdditionalsFunction = async () => {
        try {
            setLoading(true)
            const response = await getAdditionals('', [appDuck.user.id]);
            setAdditionals(response.data)
            setLoading(false)
        } catch (e) {
            alert(JSON.stringify(e))
            console.log(e)
        }
    }

    const getInvitation = async () => {
        try {
            console.log('getInvitation')
            setLoading(true)
            const response = await getOneInvitation('', [invitation_id]);
            console.log('=== INVITATION ===',response.data)
            setInvitation(response.data)
            setLoading(false)
        } catch (e) {
            alert(JSON.stringify(e))
            console.log(e)
        }
    }

    const cancelFunction = async () => {
        try {
            setLoading(true)

            const response = await cancelBooking('', [invitation.booking.id])
            if(response.status === 200){
                setLoading(false)
                setModalCancelVisible(false)
                setModalCancelSucess(true)
            }
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }
    }

    const styles = StyleSheet.create({
        container: { width: '100%',backgroundColor: 'transparent' },
        head: {  height: 40,  backgroundColor: 'transparent'},
        wrapper: { flexDirection: 'row' },
        title: {backgroundColor: 'transparent',},
        row: {  height: 120 },
        textHead: {textAlign: 'center' ,color: Colors.green, fontWeight:'bold' },
        text: { textAlign: 'center' ,color: Colors.green, fontWeight:'normal', fontSize: 10 },
        textRow: { textAlign: 'center' ,color: Colors.green }

      });

      const statusCell = (status) => {
        const statusText = status == "PENDING" ? "Pendiente" : status == "CONFIRMED" ? "Confirmado" : "Rechazado";
        const icon = status == "PENDING" ? "exclamationcircleo" : status == "CONFIRMED" ? "checkcircleo" : "close";
        const color = status == "PENDING" ? Colors.yellow : status == "CONFIRMED" ? Colors.green : Colors.red;
        return (
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Icon as={AntDesign} name={icon} color={color} size={'sm'} mr={2} />
                <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={12} textAlign={'center'}>{statusText}</Text>
            </View>
        )
      }

      const qrCell = (bookingInvitation) => {
        return (
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>{onModalQrPreview(bookingInvitation)}}>
                    <Icon as={AntDesign} name={'qrcode'} color={Colors.green} size={'sm'} />
                </TouchableOpacity>
            </View>
        )
      }

      const onModalQrPreview = (bookingInvitation) =>{
        if(bookingInvitation.user){
            if(bookingInvitation.user.id === invitation.booking.hostedBy.id){
                navigation.navigate("QRScreenInvitation", {invitation:invitation })
            }else{
                const qr = invitation.qrs.find(qr => qr.userId === bookingInvitation.user.id)
                if(qr){
                    setImageQRCode(qr.url)
                    setQrCode(qr.accesCode)
                    setQrOwnerName(bookingInvitation.user.fullName)
                    setModalQrPreview(true)
                }
            }
        }else if(bookingInvitation.guestId){
            const qr = invitation.qrs.find(qr => qr.idInvitado === bookingInvitation.guestId && qr.qrType === 1)
            if(qr){
                setImageQRCode(qr.url)
                setQrCode(qr.accesCode)
                setQrOwnerName(bookingInvitation.guestName)
                setModalQrPreview(true)
            }
        }
      }

      const shareQr = async () =>{
        try{
            const uri = await captureRef(imgRef,{
                format:'png',
                quality: 0.9
            })
            
            Sharing.shareAsync("file://" +uri)
        }catch(e){

        }
    }

    return (
        <View flex={1}>
            <View bgColor={Colors.green}>
                <SliderCustom
                    height={200}
                    items={[
                        {image: ImageRN.resolveAssetSource(require('../assets/imageGolf2.png')).uri},

                    ]}
                    position={sliderPosition}
                    setPosition={setSliderPosition}/>
            </View>
            {!invitation && <Spinner color={Colors.green} size={'lg'} /> ||
                <View flex={1}>
                    <View flex={1} mx={10}>
                        <ScrollView flexGrow={1} pt={10} showsVerticalScrollIndicator={false}>
                            <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={22} textAlign={'center'}>{invitation.booking?.area?.service?.name}</Text>
                            {!invitation?.booking?.area?.service?.isGolf &&  <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={17} textAlign={'center'}>({invitation.booking.area.name})</Text> }
                            {invitation?.booking?.numHoles &&  <>
                                <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={17} textAlign={'center'}>{invitation.booking.numHoles} HOYOS, INICIANDO EN EL {invitation.booking.area?.name?.toUpperCase()}  </Text>
                                <View borderWidth={1} borderColor={Colors.yellow} my={4}/>
                            </> }
                            <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={16} textAlign={'center'}>ID DE RESERVACIÓN: {invitation.booking.id}</Text>
                            {invitation.booking?.fixedGroupId && <Text color={Colors.green} textAlign={'center'} fontFamily={'titleConfortaaRegular'} fontSize={15}>(Grupo fijo)</Text>}
                            <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                            <View mx={10} mb={6} alignItems={'center'}>
                                <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>FECHA Y HORA</Text>
                                <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                                    {moment(invitation?.booking?.dueDate, "YYYY-MM-DD").format("DD/MM/YYYY")}

                                </Text>
                                <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                                    {moment(invitation?.booking?.dueTime, "HH:mm").format("hh:mm a")}
                                </Text>
                            </View>
                                {
                                    invitation?.booking?.invitations.filter((currentBooking) => currentBooking.user != null).length > 0 &&
                                    <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>SOCIOS</Text>
                                }
                                {
                                    <View style={{width: '100%'}}>
                                        <View style={{width: '100%'}} mt={5} mb={10}>
                                            <Table style={styles.container} borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
                                                <Row data={['Estatus', 'Socio', 'Qr']} flexArr={[2.5, 3]} style={styles.head} textStyle={styles.textHead}/>
                                                {
                                                    invitation?.booking?.invitations?.map((currentBooking, index) => {
                                                        const partner = currentBooking?.user?.firstName.toUpperCase() + " " + currentBooking?.user?.lastName.toUpperCase();
                                                        return (
                                                            currentBooking?.user ?
                                                            <Row data={[statusCell(currentBooking?.status), partner, qrCell(currentBooking)]} flexArr={[2.5, 3]} style={styles.head} textStyle={styles.text}/>
                                                            :
                                                            <></>
                                                        );
                                                    })
                                                }
                                            </Table>
                                        </View>
                                    </View>
                                }
                                {
                                    invitation?.booking?.invitations.filter((currentBooking) => currentBooking.user == null).length > 0 &&
                                    <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>INVITADOS</Text>
                                }
                                <View style={{width: '100%'}}>
                                    <View style={{width: '100%'}} mt={5} mb={10}>
                                        <Table style={styles.container} borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
                                            <Row data={['Invitado', 'Qr']} flexArr={[2.5, 3]} style={styles.head} textStyle={styles.textHead}/>
                                            {
                                                invitation?.booking?.invitations?.map((currentBooking, index) => {

                                                    return (
                                                        currentBooking.guestName ?
                                                        <Row data={[currentBooking?.guestName, qrCell(currentBooking)]} flexArr={[2.5, 3]} style={styles.head} textStyle={styles.text}/>
                                                        :
                                                        <></>
                                                    );
                                                   /*  return (
                                                        currentBooking.guestName &&
                                                        <Text key={index} textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                                                            {currentBooking?.guestName}
                                                        </Text>

                                                    ); */
                                                })
                                            }
                                        </Table>
                                    </View>
                                </View>

                            {
                                invitation?.status === 'PENDING' && additionals.length > 0  && !invitation?.booking?.deletedAt &&
                                <View mb={10} pl={2}>
                                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                        Adicionales
                                    </Text>
                                    {
                                        loading === true ?
                                            <Skeleton height={45} borderRadius={30}></Skeleton> :
                                            loading === false &&
                                            <Checkbox.Group
                                                onChange={(v) => {
                                                    console.log(v, 453)
                                                    setGroupValues(v)
                                                }}
                                                _checkbox={{
                                                    bgColor: 'white',
                                                    borderWidth: 0.5,
                                                    _checked: {
                                                        bgColor: Colors.green,
                                                        borderColor: Colors.green
                                                    },
                                                    _icon: {
                                                        color: '#fff'
                                                    }
                                                }}>

                                                {
                                                    additionals.map((item, idx) => {
                                                        return (
                                                            <Checkbox key={idx} value={item} my={2} _text={{color: '#000'}}>
                                                                {_.upperFirst(item.descServicio.toLowerCase())}
                                                            </Checkbox>
                                                        )
                                                    })
                                                }
                                            </Checkbox.Group>
                                    }

                                </View>
                            }

                            {
                                (invitation?.status === 'CONFIRMED' && additionals.length > 0) &&
                                <View mb={6}>
                                    <Text mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>SERVICIOS ADICIONALES</Text>
                                    {
                                        additionals.map((item, idx) => {
                                            return (
                                                <Text key={idx} textAlign={'center'} color={Colors.green}>
                                                    {_.upperFirst(item.descServicio.toLowerCase())}
                                                </Text>

                                            )
                                        })
                                    }
                                </View>
                            }
                            {
                                invitation?.status == 'PENDING' &&  !invitation?.booking?.deletedAt &&
                                <View>
                                    <Button onPress={() => {
                                        setActionBook("Confirm");
                                        setOpenModal(true);
                                    }} mb={4}>Confirmar</Button>
                                    <Button colorScheme={'red'} onPress={() => {
                                        setActionBook("Reject");
                                        setOpenModal(true);
                                    }} mb={4}>Rechazar</Button>
                                </View>
                            }
                            {
                                invitation?.status == 'CONFIRMED' &&  !invitation.booking?.deletedAt &&invitation?.qr?.url &&
                                <View>
                                    <Button onPress={() => navigation.navigate("QRScreenInvitation", {invitation:invitation })} mb={4}>Código QR</Button>

                                    {!invitation.booking?.fixedGroupId && invitation?.booking?.hostedBy.id === appDuck.user.id && !invitation?.booking?.deletedAt &&

                                        <Button
                                            colorScheme={'red'}
                                            onPress={() => {
                                                if ( dueDate > dateNow) {
                                                    setModalCancelVisible(true)
                                                } else {
                                                    setModalCancelInformationVisible(true)
                                                }


                                            }}
                                            mb={4}>Cancelar reservación</Button>

                                    }
                                </View>
                            }
                             {
                                 invitation?.booking?.deletedAt &&
                                <View>

                                        <Button
                                            colorScheme={'red'}
                                            mb={4}>Reservación cancelada</Button>                        
                                </View>
                            }
                            <Button onPress={() => navigation.navigate('ReservationsScreen')} mb={'20'}>Regresar</Button>


                        </ScrollView>

                    </View>
                    <ModalConfirmRejectBook
                        visible={openModal}
                        setVisible={setOpenModal}
                        type={actionBook}
                        title={actionBook == "Confirm" ? "Confirmación de la reservación" : "Rechazar reservación"}
                        data={{date: moment(invitation?.booking?.dueDate, "YYYY-MM-DD").format("DD-MM-YYYY"), hour: moment(invitation?.booking?.dueTime, "HH:mm").format("hh:mm a"), numPeople: invitation?.booking?.invitations?.length}}
                        onAccept={actionBook == "Confirm" ? AcceptBooking : RejectBooking}>

                    </ModalConfirmRejectBook>
                    <ModalAsk
                        setVisible={setModalCancelVisible}
                        visible={modalCancelVisible}
                        text={'¿Desea cancelar esta reservación?'}
                        title={'Cancelar reservación'}
                        textButton={'Sí'}
                        textNoButton={'No'}
                        iconType={'exclamation'}
                        close={true}
                        action={() => {
                            cancelFunction()                    // setModalCancelVisible(false)
                        }}/>
                    <ModalInfo setVisible={setModalCancelInformationVisible} visible={modalCancelInformationVisible} close={true} iconType={'exclamation'} textButton={'Entendido'} text={'Por favor comuníquese con administración para realizar la cancelación de esta reservación'}>

                    </ModalInfo>

                    <ModalInfo setVisible={setModalCancelSucess} visible={modalCancelSucess} close={false}  iconType={'check'} textButton={'Entendido'} text={'Reservación cancelada con exito'} action={() => {
                            setModalCancelSucess(false)
                            navigation.goBack()
                        }}>
                    </ModalInfo>
                    <Modal 
                        visible={modalQRPreview} 
                        animationType="slide"
                        transparent={false}
                        onRequestClose={() => {
                            setModalQrPreview(!modalQRPreview)
                        }}
                        >
                        <View pt={10} pb={10} flex={1} style={{ backgroundColor: Colors.greenLight }}>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <ViewShot ref={imgRef}>
                                    <View padding={2} style={{ backgroundColor: Colors.greenLight }}>
                                        <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'}>
                                            {qrOwnerName}
                                        </Text>
                                        {
                                            !imageQRCode === true ?
                                                <Skeleton width={150} height={150}/>
                                                :
                                                <Image source={{uri: imageQRCode}} width={280} height={280}/>
                                        }
                                        <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'}>
                                            Código: {qrCode}
                                        </Text>
                                    </View>
                                </ViewShot>
                                <Button width={280} mt={6} mb={4} onPress={shareQr}>Compartir</Button>
                            </View>
                            <View flex={0.25} justifyContent={'center'} alignItems={'center'}>
                                <Button
                                    style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: Colors.greenV4, borderRadius: 60}} 
                                    onPress={() =>{ setModalQrPreview(!modalQRPreview)  }}
                                >
                                    <Icon as={AntDesign} name={'close'} color={'white'} size={'lg'}></Icon>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </View>

    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookingDetailScreen);