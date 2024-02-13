import React, {useState} from "react";
import {Button, FormControl, Icon, Input, Select, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerConfirmUser, registerPartner, signIn} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from "react-redux";
import {loggedAction} from "../redux/ducks/appDuck";
import ModalInfo from "./Modals/ModalInfo";
import Constants from "expo-constants";
import {Alert, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {errorCapture, genders} from "../utils";
import * as Notifications from 'expo-notifications';
import { Colors } from "../Colors";

const RegisterStep4Screen = ({navigation, loggedAction, navigationDuck, route}) => {
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [dataValues, setDataValues] = useState(null);
    const {touched, handleSubmit, errors, setFieldValue, setFieldTouched} = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
            gender: ''
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({
            email: Yup.string().trim().required('El correo es obligatorio').email('Ingrese un correo válido'),
            password: Yup
                .string()
                .matches(/\w*[a-z]\w*/, "La contraseña debe contener al menos una minúscula")
                .matches(/\w*[A-Z]\w*/, "La contraseña debe contener al menos una mayúscula")
                .matches(/\d/, "La contraseña debe contener al menos un número")
                .min(8, ({min}) => `La contraseña debe ser de al menos ${8} caracteres.`)
                .max(12, ({max}) => `La contraseña debe contener como máximo ${12} caracteres.`)
                .required("La contraseña es obligatoria"),
            passwordConfirm: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    })
    const [showPasssword, setShowPassword] = useState(null)
    const [showPassswordConfirm, setShowPasswordConfirm] = useState(null)

    console.log(navigationDuck)

    const aliasGenerate = (email) => {
        return email.split('@')[0] + '+' + getRandomInt(100).toString() + '@' + email.split('@')[1];
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const registerPartnerFuncion = async (values) => {
        try {
            let data = {
                firstName: navigationDuck.user.firstName,
                lastName: navigationDuck.user.lastName,
                email: values.email,//Constants.expoConfig.extra.debug === true ? aliasGenerate(Constants.expoConfig.extra.debugEmail) : navigationDuck.user.email,
                password: values.password,
                confirm: values.passwordConfirm,
                claveSocio: navigationDuck.user.claveSocio,
                countryCode: route?.params?.countryCode ? '+' + route?.params?.countryCode : '',
                phone: navigationDuck.user?.celular && navigationDuck.user?.celular.length > 0 ? navigationDuck.user.celular : navigationDuck.user.telefono
            }
            if(values.gender !== ''){
                data = {...data, gender: values.gender}
            }

            // Verificamos que la información proporcionada sea válida y obtenemos un token para el registro
            const responseConfirm = await registerConfirmUser();
            if (responseConfirm.data.isValid === false) {
                Alert.alert(
                    '',
                    'No se pudieron verificar sus datos',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    {cancelable: false},
                )
                return
            }

            // Agregamos el token al header
            const headers = {
                Accept: "application/json",
                Authorization: `Bearer ${responseConfirm.data.access_token}`
            }
            console.log(data)

            // Solicitamos la creación de la cuenta del usuariocon los datos proporcionados email, género, password
            const response = await registerPartner(data, {headers: headers});

            console.log('registerPartnerFuncion', response.data)
         /*   if (Constants.expoConfig.extra.debug === true) {
                alert(data['email'].toString())
            }*/


            setDataValues(data)
            setModalCompletedVisible(true)
        } catch (e) {
            console.log(e)
           // alert(e.data.message.toString())
        }
    }

    const saveData = async () => {

        try {
            const data = {
                email: dataValues.email,
                password: dataValues.password,
                refresh: true,
                pushToken: navigationDuck.pushToken,
                gender: dataValues.gender,
            }
            const response = await signIn(data)
           // await AsyncStorage.setItem('@user', JSON.stringify(response.data))
           // await loggedAction(response.data)
            await askForPermissionPushNotifications(response.data)
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
        }
    }

    const askForPermissionPushNotifications = async (loggedData) => {
        const {status} = await Notifications.getPermissionsAsync();
        console.log('Registesr noytification status:',status)
        if (status === 'granted') {
            await AsyncStorage.setItem('@user',JSON.stringify(loggedData))
            await loggedAction(loggedData)
        } else {
            navigation.navigate('AskForPushNotificationsScreen', {loggedData, screenOk: 'HomeScreen', screenReject: 'HomeScreen'})
        }
    }

    return (
        <Layout overlay={true}>
            <View flex={0.1} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Registro</Text>
                    <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={Colors.secondary} mb={8}/>
                    <FormControl isInvalid={errors.email} mb={4}>
                        <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                        <Input
                            autoCapitalize={'none'}
                           // autoCorrect={false}
                            keyboardType={'email-address'}
                           // defaultValue={navigationDuck.user.email}
                            onChangeText={(v) => setFieldValue('email', v)}
                          //  editable={false}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl mb={4}>
                        <Text textAlign={'center'} mb={2}>Género</Text>
                        <Select
                            onValueChange={(v) => {
                                setFieldValue('gender', v)
                            }}
                            onClose={()=> setFieldTouched('gender', true)}>
                            {Object.keys(genders).map(key => <Select.Item key={key} label={genders[key]} value={key}/>)}
                        </Select>
                    </FormControl>
                    <FormControl isInvalid={errors.password} mb={4}>
                        <Text textAlign={'center'} mb={2}>Contraseña</Text>
                        <Input
                            onChangeText={(v) => setFieldValue('password', v)}
                            type={showPasssword ? "text" : "password"}
                            InputRightElement={
                                <TouchableOpacity onPress={() => setShowPassword(!showPasssword)}>
                                    <Icon as={<MaterialIcons name={showPasssword ? "visibility" : "visibility-off"}/>} size={5} mr="2" color="muted.400"/>
                                </TouchableOpacity>
                            }
                        />
                        <FormControl.ErrorMessage>
                            {errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.passwordConfirm} mb={4}>
                        <Text textAlign={'center'} mb={2}>Repetir contraseña</Text>
                        <Input
                            onChangeText={(v) => setFieldValue('passwordConfirm', v)}
                            type={showPassswordConfirm ? "text" : "password"}
                            InputRightElement={
                                <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPassswordConfirm)}>
                                    <Icon as={<MaterialIcons name={showPassswordConfirm ? "visibility" : "visibility-off"}/>} size={5} mr="2" color="muted.400"/>
                                </TouchableOpacity>
                            }
                        />
                        <FormControl.ErrorMessage>
                            {errors.passwordConfirm}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button onPress={() => handleSubmit()} mb={2}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Regresar</Button>
                </View>
            </View>
            <ModalInfo
                visible={modalCompletedVisible}
                setVisible={() => {
                    saveData();
                    setModalCompletedVisible(false)
                }}
                text={'Registro\ncompletado'}
                textButton={'Terminar'}
                close={false}
            />
        </Layout>
    )
}

const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState, {loggedAction})(RegisterStep4Screen);