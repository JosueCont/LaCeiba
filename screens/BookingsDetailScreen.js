import React, {useState} from 'react'
import {Button, ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";
import ModalConfirmRejectBook from './Modals/ModalConfirmRejectBook';
import moment from "moment";
import {setReservationStatus} from "../api/Requests";

const BookingDetailScreen = ({route, navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const {service, state, invitation, booking} = route?.params;
    const [openModal, setOpenModal] = useState(false);
    const [actionBook, setActionBook] = useState(null);

    console.log(route.params)
    const AcceptBooking = async () => {
        //await api
        try {
            setOpenModal(false);
            let data = {
                status: 'CONFIRMED'
            };
            const response = await setReservationStatus(data, [route.params.invitation.id])
            console.log(response.data)
            //navigation.goBack();
        } catch (e) {
            console.log(e)
        }

    }

    const RejectBooking = async () => {
        //await api
        try {
            setOpenModal(false);
            let data = {
                status: 'REJECTED'
            };
            const response = await setReservationStatus(data, [route.params.invitation.id])
            console.log(response.data)

            //navigation.goBack();
        } catch (e) {

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
            <View flex={1} mx={10}>
                <ScrollView flexGrow={1} pt={10} showsVerticalScrollIndicator={false}>
                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>CAMPO DE GOLF</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>ID DE RESERVACIÓN: H5L36</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <View mx={10} mb={6} alignItems={'center'}>
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>FECHA Y HORA</Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            {moment(invitation?.booking?.dueDate, "YYYY-MM-DD").format("DD-MM-YYYY")}

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            {moment(invitation?.booking?.dueTime,"HH:mm").format("hh:mm a")}
                        </Text>
                        {
                            booking.invitations.filter((currentBooking)=> currentBooking.user != null).length > 0 &&
                            <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>SOCIOS</Text>
                        }
                        {
                            booking.invitations.map((currentBooking, index)=>{
                                
                                return(
                                    currentBooking.user &&
                                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                                        {currentBooking?.user?.firstName.toUpperCase()} {currentBooking?.user?.lastName.toUpperCase()}
                                    </Text>
                                    
                                );
                            })
                        }
                        {
                            booking.invitations.filter((currentBooking)=> currentBooking.user == null).length > 0 &&
                            <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>INVITADOS</Text>
                        }
                        {
                            booking.invitations.map((currentBooking, index)=>{
                                
                                return(
                                    currentBooking.guestName &&
                                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                                        {currentBooking?.guestName}
                                    </Text>
                                    
                                );
                            })
                        }
                    </View>
                    {
                        invitation?.status == 'PENDING' && 
                        <>
                            <Button onPress={() => {setActionBook("Confirm"); setOpenModal(true);}} mb={4}>Confirmar</Button>
                            <Button onPress={() => {setActionBook("Reject"); setOpenModal(true);}} mb={4}>Rechazar</Button>
                        </>                        
                    }
                    {
                        invitation.status == 'CONFIRMED' && 
                        <>
                            <Button onPress={() => navigation.navigate("QRScreen")} mb={4}>Código QR</Button>
                        </>
                    }
                    <Button onPress={() => navigation.goBack()} mb={'20'}>Regresar</Button>


                </ScrollView>

            </View>
            <ModalConfirmRejectBook 
                visible={openModal}
                setVisible={setOpenModal}
                type={actionBook}
                title={actionBook == "Confirm" ? "Confirmación de la reservación" : "Rechazar reservación"}
                data={{date: moment(invitation?.booking?.dueDate,"YYYY-MM-DD").format("DD-MM-YYYY"), hour: moment(invitation?.booking?.dueTime,"HH:mm").format("hh:mm a"), numPeople: booking?.invitations?.length }} 
                onAccept={actionBook == "Confirm" ? AcceptBooking : RejectBooking}>
                
            </ModalConfirmRejectBook>
        </View>
        
    )
}

export default BookingDetailScreen;