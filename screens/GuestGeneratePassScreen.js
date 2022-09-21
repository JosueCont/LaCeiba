import React, {useState} from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import {ImageBackground} from "react-native";
import imagePerson2 from '../assets/imagePerson2.png'
import calendar from '../assets/calendar.png'
import LayoutV4 from "./Layouts/LayoutV4";
import {generateGuestsQR} from "../api/Requests";
import ModalInfo from "./Modals/ModalInfo";


const GuestGeneratePassScreen = ({navigation, route}) => {

    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);

    const generateQuestQRFunction = async () => {
        try {
            const data = {
                "idInvitado": "2",
                "guestName": "Eduardo Couoh",
                "guestEmail": "couoheduardo@icloud.com",
                "expirationDate": "2022-09-24"
            }
            const response = await generateGuestsQR(data)
            console.log(response.data)
            navigation.navigate('GuestGeneratePassSuccessScreen')
        } catch (ex) {
            console.log(ex)
            if (ex.status === 400) {
                setModalText('El invitado tiene 3 invitaciones este mes')
                setModalVisible(true);
            } else {
                setModalText(ex.data.message)
                setModalVisible(true);
            }

        }
    }

    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={20}>
                <View alignItems={'center'} mt={10} mb={6}>
                    <ImageBackground borderRadius={60} source={imagePerson2} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                    </ImageBackground>
                </View>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{route.params.guest.nombre} {route.params.guest.apellidoPaterno}</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'} adjustsFontSizeToFit numberOfLines={1}>GENERAR PASE DE ACCESO</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'} adjustsFontSizeToFit numberOfLines={2}>Seleccione la fecha que desea {'\n'}asignar el acceso a este invitado</Text>
                <View alignItems={'center'} mb={6}>
                    <ImageBackground source={calendar} style={{height: 300, width: 300, alignItems: 'center', justifyContent: 'center'}}>
                    </ImageBackground>
                </View>

                <Button onPress={() => generateQuestQRFunction()} mb={6}>Generar pase y enviar</Button>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>Este pase será enviado a:</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>{route.params.guest.mail}</Text>
            </View>

            <ModalInfo text={modalText} visible={modalVisible} setVisible={setModalVisible} textButton={'Entendido'} iconType={'exclamation'} close={true}/>
        </LayoutV4>
    )
}


export default GuestGeneratePassScreen;