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
import Constants from "expo-constants";

const RegisterStep5Screen = ({navigation, loggedAction, navigationDuck, route}) => {
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [dataValues, setDataValues] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            password: Yup
                .string()
                .matches(/\w*[a-z]\w*/, "la contraseña debe contener al menos una minúscula")
                .matches(/\w*[A-Z]\w*/, "la contraseña debe contener al menos una mayúscula")
                .matches(/\d/, "la contraseña debe contener al menos un número")
                .min(8, ({min}) => `La contraseña debe ser de al menos ${8} caracteres.`)
                .max(12, ({max}) => `La contraseña debe contener como máximo ${12} caracteres.`)
                .required("La contraseña es obligatoria"),
            passwordConfirm: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    })

    console.log(navigationDuck)

    const aliasGenerate = (email) => {
        return email.split('@')[0] + '+' + getRandomInt(100).toString() + '@' + email.split('@')[1];
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const registerPartnerFuncion = async (values) => {
        try {
            const data = {
                firstName: navigationDuck.user.firstName,
                lastName: navigationDuck.user.lastName,
                email: Constants.manifest.extra.debug === true ? aliasGenerate(Constants.manifest.extra.debugEmail) : navigationDuck.user.email,
                password: values.password,
                confirm: values.passwordConfirm,
                claveSocio: navigationDuck.user.claveSocio,
                countryCode: '+' + route.params.countryCode,
                phone: navigationDuck.user.celular,
            }

            const headers = {
                Accept: "application/json",
                Authorization: `Bearer ${route.params.access_token}`
            }

            const response = await registerPartner(data, {headers: headers});

            console.log(response.data)

            setDataValues(data)
            setModalCompletedVisible(true)
        } catch (e) {
            console.log(e.response)
            alert(e.toString())
        }
    }

    const saveData = async () => {

        try {
            const data = {
                email: dataValues.email,
                password: dataValues.password,
                refresh: true
            }
            console.log(data)
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
                            defaultValue={navigationDuck.user.email}
                            editable={false}
                        />
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