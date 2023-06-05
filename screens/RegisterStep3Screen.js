import React, {useEffect, useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerConfirmEmail, registerSendConfirmEmail} from "../api/Requests";
import ModalResendSMS from "./Modals/ModalResendSMS";
import Constants from "expo-constants";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {errorCapture} from "../utils";

const RegisterStep3Screen = ({navigation, route, navigationDuck}) => {
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null);
    const [resendEnable, setResendEnable] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const isFocused = useIsFocused();

    console.log(route.params)
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: (formValue) => {
            console.log(formValue)
            registerConfirmPhoneFuncion(formValue)

        },
        validateOnChange: true,
        validationSchema: Yup.object({
            code: Yup.number().integer().required("Código de verificación es obligatorio"),
        })
    });


    const registerConfirmPhoneFuncion = async (values) => {
        try {
            // const data = {
            //     phone: route.params.phone,
            //     code: values.code
            // }

            let data = {
                email: Constants.manifest.extra.debug === true ? Constants.manifest.extra.debugEmail : navigationDuck.user.email,
                code: values.code
            }
            const response = await registerConfirmEmail(data);
            if (response.data.isValid === true) {

                navigation.navigate('RegisterStep4Screen', {
                    access_token: response.data.access_token,
                })
            } else {
                console.log(60)

                setModalResendSMSVisible(true)
                console.log(response.data)
            }
        } catch (e) {
            setModalResendSMSVisible(true)
        }
    }


    const registerSendConfirmPhoneFunctionV2 = async () => {
        try {
            let data = {
                name: navigationDuck.user.firstName + ' ' + navigationDuck.user.lastName,
                email: Constants.manifest.extra.debug === true ? Constants.manifest.extra.debugEmail : navigationDuck.user.email,
            }
            const response = await registerSendConfirmEmail(data);
            console.log(data, response)
            setResendEnable(false)
            setTimeLeft(30)
            console.log(response.data)
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
        }
    }


    const resentEnableFunction = () => {
        setTimeout(() => {
            setResendEnable(true)
        }, 30000)
    }


    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(0)
            setResendEnable(true)
        }
        if (!timeLeft) return;
        const intervalId = setInterval(() => {

            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        if (isFocused) {
            setTimeLeft(30)
        }
    }, [isFocused])


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Confirmar código de validación</Text>

                    <FormControl isInvalid={errors.code} mb={4}>
                        <Text textAlign={'center'} mb={2}>Escriba los 5 dígitos enviados</Text>
                        <Input
                            returnKeyType={'done'}
                            keyboardType={'number-pad'}
                            maxLength={5}
                            onChangeText={(v) => setFieldValue('code', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.code}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button mb={2} onPress={() => handleSubmit()}>Continuar</Button>
                    <Button onPress={() => registerSendConfirmPhoneFunctionV2()} isDisabled={!resendEnable}><Text fontSize={12}>Reenviar {timeLeft !== 0 && `(${timeLeft})`}</Text></Button>

                </View>
            </View>
            <ModalResendSMS
                visible={modalResendSMSVisible}
                setVisible={setModalResendSMSVisible}
                text={'Verificación fallida'}
                textButton={'Reenviar'}
                textButtonCancel={'Cancelar'}
                action={(v) => {
                    if (v === true) {
                        registerSendConfirmPhoneFunctionV2()
                        setModalResendSMSVisible(false)
                    } else {
                        setModalResendSMSVisible(false)
                    }
                }}
            />
        </Layout>
    )
}

const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState)(RegisterStep3Screen)