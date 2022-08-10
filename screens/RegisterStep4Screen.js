import React, {useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerConfirmPhone} from "../api/Requests";
import ModalResendSMS from "./Modals/ModalResendSMS";

const RegisterStep4Screen = ({navigation}) => {
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: (formValue) => {
            console.log(formValue)
            registerConfirmPhoneFuncion(formValue)

        },
        validateOnChange: false,
        validationSchema: Yup.object({
            code: Yup.number().integer().required("Código de verificación es obligatorio"),
        })
    });

    const registerConfirmPhoneFuncion = async (values) => {
        try {
            const data = {
                code: parseInt(values.code)
            }
            const response = await registerConfirmPhone(data);
            console.log(response.data)
            if (response.data.confirm === true) {
                navigation.navigate('RegisterStep5Screen')
            } else {

                setModalResendSMSVisible(true)
                console.log(response.data)
            }
        } catch (e) {
            setModalResendSMSVisible(true)
        }
    }


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Confirmar codigo de validacion</Text>

                    <FormControl isInvalid={errors.code} mb={4}>
                        <Text textAlign={'center'} mb={2}>Escriba los 5 digitos enviados</Text>
                        <Input onChangeText={(v) => setFieldValue('code', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.code}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
            <ModalResendSMS
                visible={modalResendSMSVisible}
                setVisible={setModalResendSMSVisible}
                text={'Verificación fallida'}
                textButton={'Reenviar SMS'}
                textButtonCancel={'Cancelar'}
            />
        </Layout>
    )
}


export default RegisterStep4Screen