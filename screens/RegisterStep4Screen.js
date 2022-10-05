import React, {useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerConfirmPhone, registerSendConfirmPhone} from "../api/Requests";
import ModalResendSMS from "./Modals/ModalResendSMS";
import Constants from "expo-constants";
import {connect} from "react-redux";

const RegisterStep4Screen = ({navigation, route, navigationDuck}) => {
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null);
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
                phone: Constants.manifest.extra.debug === true ? '+' + route.params.countryCode + Constants.manifest.extra.debugPhone : '+' + values.countryCode + navigationDuck.user.celular
            }

            console.log(data)
            const response = await registerSendConfirmPhone(data);
            console.log(response.data)
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