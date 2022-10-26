import React, {useState} from 'react'
import {Button, ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";
import ModalConfirmRejectBook from './Modals/ModalConfirmRejectBook';
import { useEffect } from 'react';

const BookingDetailScreen = ({route, navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const {service, state} = route?.params;
    const [openModal, setOpenModal] = useState(false);
    const [actionBook, setActionBook] = useState(null);
    
    const AcceptBooking = async () =>{
        //await api
        setOpenModal(false);
        navigation.goBack();
    }

    const RejectBooking = async () =>{
        //await api
        setOpenModal(false);
        navigation.goBack();
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
                <ScrollView flexGrow={1} pt={10}>
                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>CAMPO DE GOLF</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>ID DE RESERVACIÓN: H5L36</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <View mx={10} mb={6} alignItems={'center'} >
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>FECHA Y HORA</Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            Miércoles 27 de julio a las

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            9:30 am
                        </Text>
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>SOCIOS</Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            Alejandrino Dzul
                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            Eduardo Couoh
                        </Text>
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>INVITADOS</Text>
                        
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={15}>
                            Isabel Olais
                        </Text>
                    </View>
                    {
                        state == 'p' && 
                        <>
                            <Button onPress={() => {setActionBook("Confirm"); setOpenModal(true);}} mb={4}>Confirmar</Button>
                            <Button onPress={() => {setActionBook("Reject"); setOpenModal(true);}} mb={4}>Rechazar</Button>
                        </>                        
                    }
                    {
                        state == 'c' && 
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
                data={{date: '12/02/2022', hour: '10:20', people: [{name: 'Eduardo Couoh'}]}} 
                onAccept={actionBook == "Confirm" ? AcceptBooking : RejectBooking}>
                
            </ModalConfirmRejectBook>
        </View>
        
    )
}

export default BookingDetailScreen;