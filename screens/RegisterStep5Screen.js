import React, {useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerPartner, signIn} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from "react-redux";
import {loggedAction} from "../redux/ducks/appDuck";
import ModalInfo from "./Modals/ModalInfo";

const RegisterStep5Screen = ({navigation, loggedAction, navigationDuck, route}) => {
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [dataValues, setDataValues] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().required("El correo electrónico es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe ser de al menos 8 caracteres."),
            passwordConfirm: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    });

    const registerPartnerFuncion = async (values) => {
        try {
            const data = {
                firstName: navigationDuck.user.firstName,
                lastName: navigationDuck.user.lastName,
                email: values.email,
                password: values.password,
                confirm: values.passwordConfirm
            }

            const headers = {
                Accept: "application/json",
                Authorization: `Bearer ${route.params.access_token}`
            }

            const response = await registerPartner(data, {headers: headers});

            setDataValues(response.data)
            setModalCompletedVisible(true)
        } catch (e) {
            console.log(e.response)
        }
    }

    const saveData = async () => {

        try {
            const data = {
                email: values.email,
                password: values.password,
                refresh: true
            }
            const response = await signIn(data)
            await AsyncStorage.setItem('@user', JSON.stringify(dataValues))
            await loggedAction()
        } catch (e) {
            console.log(e)
            alert(e)
        }

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

const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState, {loggedAction})(RegisterStep5Screen);