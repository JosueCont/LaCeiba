import React, {useState} from "react";
import {Button, FormControl, Input, Select, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerSendConfirmPhone} from "../api/Requests";
import {connect} from "react-redux";
import {CountriesArray} from "../CountriesArray";
import Constants from "expo-constants";
import _ from "lodash";

const RegisterStep3Screen = ({navigation, navigationDuck}) => {
    const [phoneDebug, setPhoneDebug] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            countryCode: ''
        },
        onSubmit: (formValue) => {
            registerSendConfirmPhoneFunction(formValue)

        },
        validateOnChange: true,
        validationSchema: Yup.object({
            countryCode: Yup.string().required("El país es obligatorio")
        })
    });

    const registerSendConfirmPhoneFunction = async (values) => {
        try {
            const data = {
                phone: Constants.manifest.extra.debug === true ? '+' + values.countryCode + phoneDebug : '+' + values.countryCode + navigationDuck.user.celular
            }

            console.log(data)
            const response = await registerSendConfirmPhone(data);
            console.log(response.data)
            navigation.navigate('RegisterStep4Screen',
                {
                    countryCode: values.countryCode,
                    phone: response.data.to
                })
        } catch (e) {
            console.log(e)
            if (_.has(e, 'status')) {
                alert(e.data.message)
            } else {
                alert(JSON.stringify(e))
            }

        }
    }


    console.log(navigationDuck)

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>


                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Verificar número móvil</Text>


                    <FormControl isInvalid={errors.countryCode} mb={4}>
                        <Text textAlign={'center'} mb={2}>Selecciona el país</Text>
                        <Select
                            onValueChange={(v) => {
                                setFieldValue('countryCode', v)
                            }}
                            placeholder="Seleccionar">
                            {
                                CountriesArray.map((item) => {
                                    return (
                                        <Select.Item label={item.nombre} value={item.phone_code}/>
                                    )
                                })
                            }
                        </Select>

                        <FormControl.ErrorMessage>
                            {errors.countryCode}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    {
                        Constants.manifest.extra.debug === true &&
                        <FormControl mb={4}>
                            <Text textAlign={'center'} mb={2}>Phones</Text>
                            <Select
                                onValueChange={(v) => {
                                    setPhoneDebug(v)
                                }}
                                placeholder="Seleccionar">
                                <Select.Item label={'Lalo'} value={'9991979545'}/>
                                <Select.Item label={'Lucks'} value={'9995759065'}/>
                                <Select.Item label={'Isa'} value={'9991744806'}/>
                            </Select>
                        </FormControl>
                    }


                    <FormControl mb={4}>
                        <Text textAlign={'center'} mb={2}>Ingresa tu número móvil</Text>
                        <Input
                            keyboardType={'phone-pad'}
                            returnKeyType={'done'}
                            defaultValue={navigationDuck.user.celular}
                            maxLength={10}
                            editable={false}
                        />
                    </FormControl>

                    <Text mb={6} textAlign={'center'} fontSize={'xs'}>Recibirás un SMS con el código de confirmación</Text>


                    <Button onPress={() => handleSubmit()}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState)(RegisterStep3Screen)