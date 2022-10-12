import React, {useEffect, useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerConfirmPhone, registerSendConfirmPhone} from "../api/Requests";
import ModalResendSMS from "./Modals/ModalResendSMS";
import Constants from "expo-constants";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";

const RegisterStep4Screen = ({navigation, route, navigationDuck}) => {
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null);
    const [resendEnable, setResendEnable] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const isFocused = useIsFocused();

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
            const data = {
                phone: route.params.phone,
                code: values.code
            }
            const response = await registerConfirmPhone(data);
            console.log(response.data)
            if (response.data.isValid === true) {
                navigation.navigate('RegisterStep5Screen',
                    {
                        countryCode: route.params.countryCode,
                        phone: route.params.phone,
                        access_token: response.data.access_token,
                    })
            } else {

                setModalResendSMSVisible(true)
                console.log(response.data)
            }
        } catch (e) {
            setModalResendSMSVisible(true)
        }
    }


    const registerSendConfirmPhoneFunctionV2 = async () => {
        try {

            const data = {
                phone: Constants.manifest.extra.debug === true ? '+' + route.params.countryCode + route.params.phone : '+' + values.countryCode + navigationDuck.user.celular
            }

            console.log(data)
            const response = await registerSendConfirmPhone(data);
            setResendEnable(false)
            setTimeLeft(30)
            console.log(response.data)
        } catch (e) {
            console.log(e)
            alert(JSON.stringify(e))
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
                        <Text textAlign={'center'} mb={2}>Escriba los 4 dígitos enviados</Text>
                        <Input
                            returnKeyType={'done'}
                            keyboardType={'number-pad'}
                            maxLength={4}
                            onChangeText={(v) => setFieldValue('code', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.code}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button mb={2} onPress={() => registerSendConfirmPhoneFunctionV2()} isDisabled={!resendEnable}><Text fontSize={12}>Reenviar SMS {timeLeft !== 0 && `(${timeLeft})`}</Text></Button>

                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
            <ModalResendSMS
                visible={modalResendSMSVisible}
                setVisible={(v) => {
                    registerSendConfirmPhoneFunctionV2()
                    setModalResendSMSVisible(v)
                }}
                text={'Verificación fallida'}
                textButton={'Reenviar SMS'}
                textButtonCancel={'Cancelar'}
            />
        </Layout>
    )
}

const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState)(RegisterStep4Screen)