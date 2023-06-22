import React, {useEffect, useState} from "react";
import {Button, FormControl, Input, Select, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {findPartner, registerConfirmUser} from "../api/Requests";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {setAttribute} from "../redux/ducks/navigationDuck";
import {ScrollView} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import _ from 'lodash';
import * as Notifications from "expo-notifications";
import { Alert} from 'react-native';
import Constants from "expo-constants";

const RegisterScreen = ({navigation, setAttribute}) => {
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalUserExists, setModalUserExists] = useState(null);
    const [sentInformation, setSentInformation] = useState(false);


    const {touched, handleSubmit, errors, setFieldValue, setFieldTouched} = useFormik({
        initialValues: {
            numberAction: '',
            namePartner: '',
            lastNamePartner: '',
            relationship: ''
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({

            numberAction: Yup
                .string()
                .trim()
                .required("El número de acción es obligatorio"),
            namePartner: Yup
                .string()
                .trim()
                .required("El nombre del socio es obligatorio"),
            lastNamePartner: Yup
                .string()
                .trim()
                .required("El apellido del socio es obligatorio"),
            relationship: Yup
                .string()
                .trim()
                .required("El parentesco es obligatorio"),
        })
    });

    useEffect(() => {
        getPushToken()
    }, [])

    const registerPartnerFuncion = async (values) => {

        try {
            setSentInformation(true);

            const queryString = `?userId=${values.numberAction}&firstName=${values.namePartner}&lastName=${values.lastNamePartner}&parent=${values.relationship}`;

            const response = await findPartner(queryString);


           /* if(response.data.email ==='' || !response.data.email){
                Alert.alert(
                    '',
                    'No tiene un correo especificado',
                    [
                      {
                        text: 'Ok'
                      },
                    ],
                    {cancelable: false},
                  );                
                  return
            }*/

            const userUpdate = {
                ...response.data,
                firstName: _.startCase(values.namePartner),
                lastName: _.startCase(values.lastNamePartner)
            }
            console.log(userUpdate)
          //  return
            setSentInformation(false);
            setAttribute('user', userUpdate)
            navigation.navigate('RegisterStep4Screen')

        } catch (e) {
            console.log(e)
            setSentInformation(false);;
            if (e.status === 404) {
                setModalErrorVisible(true)
            } else if (e.status === 400) {
                setModalUserExists(true)

            } else {
                alert(e.status)
            }
        }
    }

    const getPushToken = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token)
        setAttribute('pushToken', token.data)
    }


    return (
        <Layout overlay={true}>
            <View flex={1}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                    </View>
                    <View flex={1}>
                        <View mx={55} mt={10}>
                            <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Registrar</Text>
                            <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={'#FFB718'} mb={8}/>
                            <FormControl isInvalid={errors.numberAction} mb={4}>
                                <Text textAlign={'center'} mb={2}>Número de acción</Text>
                                <Input
                                    maxLength={4}
                                    returnKeyType={'done'}
                                    keyboardType={'number-pad'}
                                    onChangeText={(v) => setFieldValue('numberAction', v)}
                                    onBlur={()=> setFieldTouched('numberAction', true)}/>

                                <FormControl.ErrorMessage>
                                    {errors.numberAction && touched.numberAction ? errors.numberAction :''}
                                </FormControl.ErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.namePartner} mb={4}>
                                <Text textAlign={'center'} mb={2}>Nombre(s) de socio</Text>
                                <Input onChangeText={(v) => setFieldValue('namePartner', v)}
                                       onBlur={()=> setFieldTouched('namePartner', true)}/>
                                <FormControl.ErrorMessage>
                                    {errors.namePartner && touched.namePartner ? errors.namePartner :''}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.lastNamePartner} mb={4}>
                                <Text textAlign={'center'} mb={2}>Apellido(s) de socio</Text>
                                <Input onChangeText={(v) => setFieldValue('lastNamePartner', v)}
                                       onBlur={()=> setFieldTouched('lastNamePartner', true)}/>
                                <FormControl.ErrorMessage>
                                    {errors.lastNamePartner && touched.lastNamePartner ? errors.lastNamePartner :''}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.relationship} mb={4}>
                                <Text textAlign={'center'} mb={2}>Parentesco</Text>
                                <Select
                                    onValueChange={(v) => {
                                        setFieldValue('relationship', v)
                                    }}
                                    onClose={()=> setFieldTouched('relationship', true)}
                                    placeholder="Seleccionar">
                                    <Select.Item label={'Titular'} value={'0'}/>
                                    <Select.Item label={'Hijo(a) titular'} value={'1'}/>
                                    <Select.Item label={'Hijo(a) membresista'} value={'2'}/>
                                    <Select.Item label={'Esposo(a) titular'} value={'3'}/>
                                    <Select.Item label={'Esposo(a) membresista'} value={'4'}/>
                                    <Select.Item label={'Cotitular'} value={'5'}/>
                                </Select>
                                <FormControl.ErrorMessage>
                                    {errors.relationship && touched.relationship ? errors.relationship :''}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Button disabled={sentInformation} onPress={() => handleSubmit()} mb={2}>Continuar</Button>
                            <Button onPress={() => navigation.goBack()}>Regresar</Button>

                        </View>
                    </View>
                </ScrollView>
            </View>
            <ModalInfo text={'Número de acción o nombre del socio no encontrado o no coinciden, inténtalo nuevamente.'} iconType={'exclamation'} textButton={'Entendido'} visible={modalErrorVisible} setVisible={setModalErrorVisible}/>
            <ModalInfo text={'El usuario ya se encuentra registrado.'} iconType={'exclamation'} textButton={'Entendido'} visible={modalUserExists} setVisible={setModalUserExists}/>

        </Layout>
    )
}

const mapState = () => {
    return {}
}

export default connect(mapState, {setAttribute})(RegisterScreen)