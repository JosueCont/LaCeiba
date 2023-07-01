import React, {useState, useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MaterialIcons} from "@expo/vector-icons";
import { updateUserPassword } from "../../api/Requests";
import {connect} from "react-redux";
import {errorCapture} from "../../utils";

const ModalChangePassword = ({visible, setVisible, appDuck,action, partner}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    
    const {touched, handleSubmit, errors, setFieldValue, setFieldTouched} = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        },
        onSubmit: (formValue) => {
            updatePassword(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({
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

    const updatePassword = async(values)=>{
        let queryStringParams = [appDuck.user.id]

        let data ={
            password: values.password,
            confirm: values.passwordConfirm
        }

        try {
            const response = await updateUserPassword(data,queryStringParams);
            console.log(response)
            if (response.status=== 201) {
                setVisible(false);
                action(true)
             }
         } catch (e) {
            let v = await errorCapture(e);
            if(v.object?.errors && v.object?.errors.length > 0){
                alert(v.object?.errors[0])
            }else{
                alert(v.value)
            }
             console.log(v)
             action(false)
         }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView} onLayout={(event) => {
                    const {x, y, height, width} = event.nativeEvent.layout;
                    setHeightGradient(height)
                }}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={[Colors.greenV5, Colors.greenV2]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: heightGradient,
                            borderRadius: 20
                        }}
                    />
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.greenV4, borderRadius: 60}}
                                      onPress={() =>{ 
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>

                        <Text style={styles.modalText}  mb={3} fontSize={'lg'} >Cambiar contraseña</Text>
                        <Text style={styles.modalText}  mb={8}  >“La app le solicitará volver a ingresar con su nueva contraseña”</Text>
                         <FormControl isInvalid={errors.password} mb={4}>
                            <Text textAlign={'center'} mb={2}>Contraseña</Text>
                            <Input  width={'100%'}
                                onChangeText={(v) => setFieldValue('password', v)}
                                type={showPasssword ? "text" : "password"}
                                InputRightElement={
                                    <TouchableOpacity onPress={() => setShowPassword(!showPasssword)}>
                                        <Icon as={<MaterialIcons name={showPasssword ? "visibility" : "visibility-off"}/>} size={5} mr="2" color="muted.400"/>
                                    </TouchableOpacity>
                                }
                            />
                            <FormControl.ErrorMessage color={'white'}>
                                {errors.password}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.passwordConfirm} mb={4}>
                            <Text textAlign={'center'} mb={2}>Repetir contraseña</Text>
                            <Input width={'100%'}
                                onChangeText={(v) => setFieldValue('passwordConfirm', v)}
                                type={showPassswordConfirm ? "text" : "password"}
                                InputRightElement={
                                    <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPassswordConfirm)}>
                                        <Icon as={<MaterialIcons name={showPassswordConfirm ? "visibility" : "visibility-off"}/>} size={5} mr="2" color="muted.400"/>
                                    </TouchableOpacity>
                                }
                            />
                            <FormControl.ErrorMessage color={'white'}>
                                {errors.passwordConfirm}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button onPress={() => handleSubmit()}>Cambiar</Button> 

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ModalChangePassword);