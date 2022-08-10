import React from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";

const RecoverPasswordScreen = () => {
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (formValue) => {
            console.log(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El correo electrónico es obligatorio"),
        })
    });

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
        </Layout>
    )
}


export default RecoverPasswordScreen