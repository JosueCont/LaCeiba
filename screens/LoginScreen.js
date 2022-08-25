import React, {useState} from "react";
import {Button, FormControl, Image, Input, Text, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";
import {signIn} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loggedAction} from "../redux/ducks/appDuck";
import {connect} from "react-redux";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {TouchableOpacity} from "react-native";
import ModalInfo from "./Modals/ModalInfo";

const LoginScreen = ({loggedAction, navigation}) => {
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (formValue) => {
            loginFunction(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        })
    });

    const loginFunction = async (data) => {
        try {
            data['refresh'] = true;
            const response = await signIn(data)
            console.log(response.data)
            await AsyncStorage.setItem('@user', JSON.stringify(response.data))
            await loggedAction(response.data)
        } catch (ex) {
            console.log(ex)
            setModalInfoVisible(true)
        }

    }


    return (
        <Layout overlay={true}>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>Bienvenido</Text>


                    <FormControl isInvalid={errors.email} mb={2}>
                        <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                        <Input autoCapitalize={'none'} mb={4} onChangeText={(v) => setFieldValue('email', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>


                    <FormControl isInvalid={errors.password} mb={2}>
                        <Text textAlign={'center'} mb={2}>Contraseña</Text>
                        <Input mb={4} type="password" onChangeText={(v) => setFieldValue('password', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>


                    <TouchableOpacity onPress={() => navigation.navigate('RecoverPasswordScreen')}>

                        <Text textAlign={'center'} mb={6}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <Button onPress={() => handleSubmit()}>Entrar</Button>
                </View>
            </View>
            <ModalInfo
                close={true}
                visible={modalInfoVisible}
                setVisible={setModalInfoVisible}
                title={'Aviso'}
                text={'El nombre de usuario o la contraseña son incorrectos.'}
                textButton={'Entendido'}
                iconType={'exclamation'}
            />
        </Layout>
    )
}


const mapState = (state) => {
    return {}
}
export default connect(mapState, {loggedAction})(LoginScreen);