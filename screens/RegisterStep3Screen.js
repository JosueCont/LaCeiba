import React from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerSendConfirmPhone} from "../api/Requests";

const RegisterStep3Screen = ({navigation}) => {

    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            phone: '',
        },
        onSubmit: (formValue) => {
            registerSendConfirmPhoneFunction(formValue)

        },
        validateOnChange: false,
        validationSchema: Yup.object({
            phone: Yup.string().required("El número móvil es obligatorio"),
        })
    });

    const registerSendConfirmPhoneFunction = async (values) => {
        try {
            const data = {
                phone: '+52' + values.phone
            }
            const response = await registerSendConfirmPhone(data);
            console.log(response.data)
            navigation.navigate('RegisterStep4Screen', {phone: response.data.to})
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
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Verificar número móvil</Text>


                    <FormControl isInvalid={errors.phone} mb={4}>
                        <Text textAlign={'center'} mb={2}>Ingresa tu número móvil</Text>
                        <Input
                            keyboardType={'phone-pad'}
                            returnKeyType={'done'}
                            onChangeText={(v) => setFieldValue('phone', v)}/>

                        <FormControl.ErrorMessage>
                            {errors.phone}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Text mb={6} textAlign={'center'} fontSize={'xs'}>Recibirás un SMS con el código de confirmación</Text>


                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep3Screen