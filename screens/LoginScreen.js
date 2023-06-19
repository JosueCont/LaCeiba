import React, {useEffect, useState} from "react";
import {Button, FormControl, Icon, Image, Input, ScrollView, Text, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";
import {signIn} from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loggedAction} from "../redux/ducks/appDuck";
import {connect} from "react-redux";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {TouchableOpacity, Platform} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import {MaterialIcons} from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';
import {setAttribute} from "../redux/ducks/navigationDuck";
import _ from "lodash";

const LoginScreen = ({loggedAction, navigation, setAttribute, navigationDuck}) => {
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const [showPasssword, setShowPassword] = useState(null)
    const {touched, handleSubmit, errors, setFieldValue, setFieldTouched} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (formValue) => {
            loginFunction(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        })
    });


    useEffect(() => {
        getPushToken()

    }, [])

    const loginFunction = async (data) => {
        try {
            data['refresh'] = true;
            if (_.has(navigationDuck, 'pushToken')) {

                const deviceData = {
                    token: navigationDuck.pushToken
                }
                const os = Platform.OS=== 'ios' ?  deviceData.os = 'ios' :  deviceData.os = 'android'
                data['device'] = deviceData;
            }
            const response = await signIn(data)
           // console.log(data)


            response.data.user['pushToken'] = navigationDuck.pushToken

           // console.log(response)
            if(response.data.user.ghin){
                await AsyncStorage.setItem('ghin',response?.data?.user?.ghin)

            }else{
                await AsyncStorage.setItem('ghin','')
            }
           // await AsyncStorage.setItem('@user',JSON.stringify(response.data))
            //await loggedAction(response.data)
            await askForPermissionPushNotifications(response.data)

        } catch (ex) {
            console.log(ex)
            setModalInfoVisible(true)
        }

    }

    const askForPermissionPushNotifications = async (loggedData) => {
        const {status} = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            await AsyncStorage.setItem('@user',JSON.stringify(loggedData))
            await loggedAction(loggedData)
        } else {
            navigation.navigate('AskForPushNotificationsScreen', {loggedData, screenOk: 'HomeScreen', screenReject: 'HomeScreen'})
        }
    }


    const getPushToken = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        setAttribute('pushToken', token.data)        
    }


    return (
        <Layout overlay={true}>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1}>
                <ScrollView contentContainerStyle={{flexGrow: 1}} >
                <View mx={55} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>Bienvenido</Text>


                    <FormControl isInvalid={errors.email} mb={2}>
                        <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                        <Input
                            autoCapitalize={'none'} mb={4}
                            onChangeText={(v) => {
                                setFieldValue('email', v)
                                setFieldTouched('email', true)
                            }}
                            onBlur={()=> setFieldTouched('email', true)}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email && touched.email ? errors.email : ''}
                        </FormControl.ErrorMessage>
                    </FormControl>


                    <FormControl isInvalid={errors.password} mb={2}>
                        <Text textAlign={'center'} mb={2}>Contraseña</Text>
                        <Input
                            type={showPasssword ? "text" : "password"}
                            onChangeText={(v) => setFieldValue('password', v)}
                            onBlur={()=> setFieldTouched('password', true)}
                            mb={4}
                            InputRightElement={
                                <TouchableOpacity onPress={() => setShowPassword(!showPasssword)}>
                                    <Icon as={<MaterialIcons name={showPasssword ? "visibility" : "visibility-off"}/>} size={5} mr="2" color="muted.400"/>
                                </TouchableOpacity>
                            }
                        />
                        <FormControl.ErrorMessage>
                            {errors.password && touched.password && errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>


                    <TouchableOpacity onPress={() => navigation.navigate('RecoverPasswordScreen')}>

                        <Text textAlign={'center'} mb={6}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <Button mb={10} onPress={() => handleSubmit()}>Entrar</Button>
                </View>
                </ScrollView>
            </View>
            <ModalInfo
                close={true}
                visible={modalInfoVisible}
                setVisible={setModalInfoVisible}
                title={'Aviso'}
                text={'El nombre de usuario o la contraseña son incorrectos.'}
                textButton={'Entendido'}
                iconType={'exclamation'}
            />
        </Layout>
    )
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}
export default connect(mapState, {loggedAction, setAttribute})(LoginScreen);