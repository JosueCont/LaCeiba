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
                <Button onPress={() => navigation.navigate('VerifyAccountScreen')} mb={2}>Verificar Cuenta</Button>
                <Button onPress={() => setModalInfoVisible(true)} mb={2}>Modal Informativo</Button>
                <Button onPress={() => setModalResendSMSVisible(true)} mb={2}>Modal Reenviar SMS</Button>
                <Button onPress={() => setModalCompletedVisible(true)} mb={2}>Modal Registro Completado</Button>
                <Button onPress={() => navigation.navigate('RegisterStep2Screen')} mb={2}>Registro Pantalla 2</Button>
                <Button onPress={() => setModalRequestSentVisible(true)} mb={2}>Modal Solicitud Enviada</Button>
                <Button onPress={() => navigation.navigate('RecoverPasswordScreen')} mb={2}>Pantalla Recuperar Contraseña</Button>
                <Button onPress={() => navigation.navigate('RegisterStep3Screen')} mb={2}>Pantalla solicitar movil</Button>
                <Button onPress={() => navigation.navigate('RegisterStep4Screen')} mb={2}>Pantalla verificar code</Button>
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