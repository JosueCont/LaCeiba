import React,{useEffect,useState} from "react";
import { View, Text, Button, FormControl, Input, Icon, Spinner } from "native-base";
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { Colors, ColorsCeiba } from "../../../Colors";
import { useFormik } from "formik";
import {MaterialIcons} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import * as Yup from 'yup'
import { signIn } from "../../../api/Requests";
import ModalInfo from "../../Modals/ModalInfo";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { loggedAction } from "../../../redux/ducks/appDuck";

const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPasssword, setShowPassword] = useState(false)
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const navigationDuck = useSelector(state => state.navigationDuck)
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

    const loginFunction = async(data) => {
        try {
            setLoading(true)
            data['refresh'] = true;
            
            if (_.has(navigationDuck, 'pushToken') && Constants?.expoConfig?.extra?.sendDeviceToken) {

                const deviceData = {
                    token: navigationDuck.pushToken
                }
                const os = Platform.OS=== 'ios' ?  deviceData.os = 'ios' :  deviceData.os = 'android'
                data['device'] = deviceData;
            }
            const response = await signIn(data)
            console.log('response',response?.data)
            response.data.user['pushToken'] = navigationDuck.pushToken

            if(response.data.user.ghin){
                await AsyncStorage.setItem('ghin',response?.data?.user?.ghin)

            }else{
                await AsyncStorage.setItem('ghin','')
            }

            await askForPermissionPushNotifications(response.data)

        } catch (e) {
            console.log('error',e)
            setModalInfoVisible(true)
        }finally{
            setLoading(false)
        }
    }

    const askForPermissionPushNotifications = async (loggedData) => {
        const {status} = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            await AsyncStorage.setItem('@user',JSON.stringify(loggedData))
            await dispatch(loggedAction(loggedData))
        } else {
            navigation.navigate('PermissionsNotifications', {loggedData, screenOk: 'HomeScreen', screenReject: 'HomeScreen'})
        }
    }

    return(
        <ImageBackground 
            source={require('../../../assets/laceibaLogin.png')}
            style={styles.container}>
            <KeyboardAvoidingView 
                style={{}} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined }
                keyboardVerticalOffset={Platform.select({ios: 20, android:20 }) }>
                {showForm ? (
                    <View>
                        <FormControl isInvalid={errors.email} mb={2}>
                            <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                            <Input
                                autoCapitalize={'none'}
                                //style={styles.input}
                                width={width*.8}
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

                        <FormControl isInvalid={errors.password} mb={5}>
                            <Text textAlign={'center'} mb={2}>Contraseña</Text>
                            <Input
                                type={showPasssword ? "text" : "password"}
                                style={styles.input}
                                onChangeText={(v) => setFieldValue('password', v)}
                                onBlur={()=> setFieldTouched('password', true)}
                                //size={'xl'}
                                width={width*.8}
                                //mb={4}
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

                        <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()} >
                            {loading ? <Spinner size={'sm'} color={'white'}/> : <Text >Entrar</Text>}
                        </TouchableOpacity>
                    </View>
                ):(
                    <TouchableOpacity style={styles.btn} onPress={() => setShowForm(true)}>
                        <Text >Iniciar sesión</Text>
                    </TouchableOpacity>

                )}
            </KeyboardAvoidingView>

            <ModalInfo 
                close={true}
                visible={modalInfoVisible}
                setVisible={setModalInfoVisible}
                title={'Aviso'}
                text={'El nombre de usuario o la contraseña son incorrectos.'}
                textButton={'Entendido'}
                iconType={'exclamation'}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'flex-end', 
        alignItems:'center', 
        paddingBottom:50
    },
    btn:{
        backgroundColor: ColorsCeiba.blackBtns,
        height:39,
        width: width *.8,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width: width*.8, 
        backgroundColor: ColorsCeiba.white, 
        height:40, 
        borderRadius:10
    }
})

export default LoginScreen