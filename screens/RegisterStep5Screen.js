import React, {useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerPartnerLogin} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from "react-redux";
import {loggedAction} from "../redux/ducks/appDuck";
import ModalInfo from "./Modals/ModalInfo";

const RegisterStep5Screen = ({navigation, loggedAction}) => {
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [dataValues, setDataValues] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit: (formValue) => {
            registerPartnerLoginFuncion(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().required("El correo electrónico es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe ser de al menos 8 caracteres."),
            passwordConfirm: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    });

    const registerPartnerLoginFuncion = async (values) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm
            }
            const response = await registerPartnerLogin(data);
            setDataValues(response.data)
            setModalCompletedVisible(true)
        } catch (e) {
            console.log(e)
        }
    }

    const saveData = async () => {
        await AsyncStorage.setItem('@user', JSON.stringify(dataValues))
        await loggedAction()
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <FormControl isInvalid={errors.email} mb={4}>
                        <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                        <Input
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            onChangeText={(v) => setFieldValue('email', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} mb={4}>
                        <Text textAlign={'center'} mb={2}>Contraseña</Text>
                        <Input type={'password'} onChangeText={(v) => setFieldValue('password', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.passwordConfirm} mb={4}>
                        <Text textAlign={'center'} mb={2}>Repetir contraseña</Text>
                        <Input type={'password'} onChangeText={(v) => setFieldValue('passwordConfirm', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.passwordConfirm}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
            <ModalInfo
                visible={modalCompletedVisible}
                setVisible={() => {
                    saveData();
                    setModalCompletedVisible(false)
                }}
                text={'Registro\ncompletado'}
                textButton={'Terminar'}
                close={false}
            />
        </Layout>
    )
}

const mapState = () => {
    return {}
}

export default connect(mapState, {loggedAction})(RegisterStep5Screen);