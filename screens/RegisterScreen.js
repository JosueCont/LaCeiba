import React from "react";
import {Button, FormControl, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {registerPartner} from "../api/Requests";
import {useFormik} from "formik";
import * as Yup from "yup";

const RegisterScreen = ({navigation}) => {
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            numberAction: '',
            numberPartner: ''
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            numberAction: Yup.string().required("El número de acción es obligatorio"),
            numberPartner: Yup.string().required("El nombre del socio es obligatorio")
        })
    });

    const registerPartnerFuncion = async (values) => {
        try {
            const data = {
                userId: values.numberAction,
                name: values.numberPartner,
            }
            const response = await registerPartner(data);
            navigation.navigate('RegisterStep2Screen', {data, ...response.data})
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Registrar</Text>
                    <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={'#FFB718'} mb={8}/>
                    <FormControl isInvalid={errors.numberAction} mb={4}>
                        <Text textAlign={'center'} mb={2}>Número de acción</Text>
                        <Input
                            returnKeyType={'done'}
                            keyboardType={'number-pad'}
                            onChangeText={(v) => setFieldValue('numberAction', v)}/>

                        <FormControl.ErrorMessage>
                            {errors.numberAction}
                        </FormControl.ErrorMessage>
                    </FormControl>


                    <FormControl isInvalid={errors.numberPartner} mb={4}>
                        <Text textAlign={'center'} mb={2}>Nombre de socio</Text>
                        <Input onChangeText={(v) => setFieldValue('numberPartner', v)}/>
                        <FormControl.ErrorMessage>
                            {errors.numberPartner}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterScreen