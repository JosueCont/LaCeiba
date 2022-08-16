import React, {useState} from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {forgotPassword} from "../api/Requests";
import ModalInfo from "./Modals/ModalInfo";

const RecoverPasswordScreen = () => {
    const [modalRequestSentVisible, setModalRequestSentVisible] = useState(null)

    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (formValue) => {
            console.log(formValue)
            forgotPasswordFunction(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El correo electrónico es obligatorio"),
        })
    });


    const forgotPasswordFunction = async (values) => {
        try {
            const response = await forgotPassword(values)
            setModalRequestSentVisible(true)

        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>¿Olvidaste tu contraseña?</Text>

                    <FormControl isInvalid={errors.email} mb={4}>
                        <Text textAlign={'center'} mb={2}>Recuperar contraseña</Text>
                        <Input autoCapitalize={'none'} autoCorrect={false} onChangeText={(v) => setFieldValue('email', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Text mb={6} textAlign={'center'} fontSize={'xs'}>Te enviaremos un correo para{'\n'}que puedas actualizar tu{'\n'}contraseña</Text>
                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
            <ModalInfo
                visible={modalRequestSentVisible}
                setVisible={setModalRequestSentVisible}
                title={'Solicitud enviada'}
                text={'Hemos enviado un email con las instrucciones para recuperar tu contraseña'}
            />

        </Layout>
    )
}


export default RecoverPasswordScreen