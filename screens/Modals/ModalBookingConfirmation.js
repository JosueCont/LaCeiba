import React, {useEffect, useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, FormControl, Icon, Input, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import moment from "moment";
import {MaterialIcons} from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalBookingConfirmation = ({visible, setVisible, date, hour, people, onConfirm, partnerHost, timeLeft= null}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [customSend, setCustomSend] = useState(false)
    const [customMail, setCustomMail] = useState('')
    const {touched, handleSubmit, errors, setFieldValue, setFieldTouched} = useFormik({
        initialValues: {
            email: partnerHost.email,
        },
        enableReinitialize: true,
        validateOnChange: true,
        validationSchema: Yup.object({
            email: Yup.string().email("Ingrese un correo válido").required("Ingrese el correo de envío"),
        }),
        onSubmit: (formValue) => {
            const specificEmail  = formValue.email
            console.log('formValue', specificEmail, customMail)
            onConfirm(customMail)
            setCustomSend(false)
            setCustomMail('')
            setFieldValue('email', '')
            setFieldTouched('email', false)
            setVisible(false)
        },
    });

    useEffect(()=>{
        if(partnerHost?.email){
            setFieldValue('email', partnerHost?.email)
            setCustomMail(partnerHost?.email)
        }
    },[partnerHost])


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
                                        setCustomSend(false)
                                        setFieldValue('email', partnerHost.email)
                                        setFieldTouched('email', false)
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                    {/*<View mb={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>*/}
                    {/*    <Icon as={AntDesign} name={'questioncircleo'} color={Colors.yellow} size={'2xl'}/>*/}
                    {/*</View>*/}
                    {!customSend ?
                        <View width={'100%'}>
                            <Text style={styles.modalText} fontSize={'2xl'} fontFamily={'titleConfortaaBold'} textAlign={'center'} color={Colors.yellow}>Confirmación de la {'\n'}reservación</Text>
                            <View my={3} alignSelf={'center'} width={200} borderWidth={1} borderColor={Colors.yellow}/>

                            <Text style={styles.modalText} fontSize={'xl'} fontFamily={'titleConfortaaBold'}>Fecha y hora:</Text>
                            <Text style={styles.modalText} fontSize={'md'} fontFamily={'titleConfortaaRegular'}>{moment(date).format('LL')}</Text>
                            <Text style={styles.modalText} mb={6} fontSize={'md'} fontFamily={'titleConfortaaRegular'}>{moment(hour, 'HH:mm').format('hh:mm A')} </Text>

                            <Text style={styles.modalText} fontSize={'xl'} fontFamily={'titleConfortaaBold'}>Número de personas</Text>
                            <Text style={styles.modalText} mb={6} fontSize={'md'} fontFamily={'titleConfortaaRegular'}>{people.length + 1} personas </Text>

                            <View flexDirection={'row'}>
                                <View flex={6} p={2}>
                                    <Button mb={6} colorScheme={'green'}  isDisabled={!hour} onPress={() => {
                                        onConfirm();
                                        setVisible(false)
                                    }}>
                                        <Text textAlign={'center'}>Confirmar y enviar invitaciones individuales</Text>
                                        </Button>
                                    <Button colorScheme={'green'} variant={'link'} rightIcon={<Icon as={MaterialIcons} name={'arrow-forward-ios'} color={'white'} />} onPress={() => {
                                        setCustomSend(true);
                                    }}>
                                        <Text textAlign={'center'}>Enviar todo a un correo</Text>
                                    </Button>
                                    {/* <Button mb={2} colorScheme={'green'} onPress={() => setVisible(false)}>Regresar</Button> */}
                                </View>
                            </View>

                        </View>
                    : 
                        <View width={'100%'}>
                                <Input placeholder="Ingrese correo de envío"
                                    autoCapitalize={'none'}
                                    defaultValue={customMail}
                                    onChangeText={(v) => {
                                        setFieldValue('email', v)
                                        setCustomMail(v)
                                        setFieldTouched('email', true)
                                    }}
                                    onBlur={()=> setFieldTouched('email', true)}
                                />
                            <FormControl isInvalid={errors.email} mb={2}>
                                <FormControl.ErrorMessage>
                                    <Text color={'white'}>{errors.email && touched.email ? errors.email : ''}</Text>
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <View flexDirection={'row'}>
                                <View flex={6} p={2}>
                                    <Button mb={6} colorScheme={'green'} isDisabled={!hour} onPress={() => handleSubmit()}>
                                        <Text textAlign={'center'}>Confirmar y enviar invitaciones a este correo</Text>
                                    </Button>
                                    <Button colorScheme={'green'} variant={'link'} leftIcon={<Icon as={MaterialIcons} name={'arrow-back-ios'} color={'white'} />} onPress={() => {
                                        setCustomSend(false)
                                    }}>
                                        <Text textAlign={'center'}>Regresar</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    }
                    {hour && <View width={'100%'}>{timeLeft}</View>}
                </View>
            </View>
        </Modal>

    );
};


export default ModalBookingConfirmation;