import React, {useState} from "react";
import {Button, View} from "native-base";
import Layout from "./Layouts/Layout";
import ModalInfo from "./Modals/ModalInfo";
import ModalResendSMS from "./Modals/ModalResendSMS";
import {loggedOutAction} from "../redux/ducks/appDuck";
import {connect} from "react-redux";

const ComponentsScreen = ({navigation, loggedOutAction}) => {

    const [modalInfoVisible, setModalInfoVisible] = useState(null)
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null)
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [modalRequestSentVisible, setModalRequestSentVisible] = useState(null)


    return (
        <Layout overlay={true}>
            <View flex={1} justifyContent={'center'} mx={10}>
                <Button onPress={() => setModalInfoVisible(true)} mb={2}>Modal informativo</Button>
                <Button onPress={() => setModalRequestSentVisible(true)} mb={2}>Modal solicitud enviada</Button>
                <Button onPress={() => navigation.navigate('HomeScreen')} mb={2}>Home screen</Button>
                <Button onPress={() => navigation.navigate('QRSentScreen')} mb={2}>QR enviado</Button>
                <Button onPress={() => navigation.navigate('QRNonPaymentScreen')} mb={2}>QR falta de pago</Button>
                <Button onPress={() => navigation.navigate('NotificationsScreen')} mb={2}>Notificaciones</Button>
                <Button onPress={() => loggedOutAction()}>Cerrar sesión</Button>

            </View>
            <ModalInfo
                visible={modalInfoVisible}
                setVisible={setModalInfoVisible}
                text={`Verificación\nexitosa`}
            />
            <ModalResendSMS
                visible={modalResendSMSVisible}
                setVisible={setModalResendSMSVisible}
                text={'Verificación\nfallida'}
            />
            <ModalInfo
                visible={modalCompletedVisible}
                setVisible={setModalCompletedVisible}
                text={'Registro\ncompletado'}
                textButton={'Terminar'}
            />
            <ModalInfo
                visible={modalRequestSentVisible}
                setVisible={setModalRequestSentVisible}
                title={'Solicitud enviada'}
                text={'Hemos enviado un email con las instrucciones para recuperar tu contraseña'}
            />
        </Layout>
    )
}

const mapState = () => {
    return {}
}

export default connect(mapState, {loggedOutAction})(ComponentsScreen)