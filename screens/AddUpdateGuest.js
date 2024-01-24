import React, { useState } from "react";
import {Button, Icon, Input, Text, View,FormControl,WarningOutlineIcon} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import { createGuest, editGuest } from "../api/Requests";
import { useEffect } from "react";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from "@react-navigation/native";

const AddUpdateGuest = ({navigation, route}) => {

    const [nameGuest, setNameGuest] = useState(null);
    const [emailGuest, setEmailGuest] = useState(null);
    const [editedName, setEditedName] = useState(false);
    const [editedEmail, setEditedEmail] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('Se agregó al usuario correctamente');
    const [success, setSuccess] = useState(false);
    const [isInvalidName ,setIsInvalidName] = useState(false);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setEditedEmail(false);
            setEditedName(false);
        }, [])
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsInvalidName(null)
            // setNameGuest(null)
            // setEmailGuest(null)
        });
        return unsubscribe;
     }, [navigation]);

    useEffect(()=>{
        console.log(editedName);
    }, [editedName])

    useEffect(()=>{
        console.log(nameGuest);
    }, [nameGuest])

    useEffect(()=>{
        validateParams();
    },[route.params])

    const validateParams = () => {
        if(route.params?.data){
            setNameGuest(route.params?.data?.name);
            setEmailGuest(route.params?.data?.email);
            setModalInfoVisible(false);
            setEditedEmail(false);
            setEditedName(false);
        }else{
            setNameGuest(null);
            setEmailGuest(null);
            setModalInfoVisible(false);
            setEditedEmail(false);
            setEditedName(false);
        }
    }

    const addGuest = async () => {
        try {
            setLoading(true);
            let regexName = new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]{3}(([a-zA-ZÀ-ÿ\u00f1\u00d1\\s])+)?$");
                if (!regexName.test(nameGuest)) {
                        setIsInvalidName(true)
                        setNameGuest(null)
                        setLoading(false);
                        return
                }
                setIsInvalidName(false)
                const guestFounded = route?.params?.guests?.find(guest => guest.name == nameGuest);
            if(guestFounded){
                setTextModal("Ya existe un invitado con ese nombre");
                setSuccess(false);
                setModalInfoVisible(true);
                setLoading(false);
                return;
            }
            const bodyString = {
                name: nameGuest,
                email: emailGuest
            }
            const response = await createGuest(bodyString, [route.params?.userId])
            setTextModal("Se agregó al usuario correctamente");
            console.log(response?.data);    
            setSuccess(true);
            setModalInfoVisible(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setTextModal(error.data.message);
            if(error.data.code === 400){
                if(error.data.errors?.length > 0){
                    setTextModal(error.data.errors[0]);
                }
            }
            setSuccess(false);
            setModalInfoVisible(true);
            setLoading(false);
        }
    }

    const updateGuest = async () => {
        try {
            setLoading(true);
            const guestFounded = route?.params?.guests?.find(guest => guest.name == nameGuest);
            if(guestFounded && editedName){
                setTextModal("Ya existe un invitado con ese nombre");
                setSuccess(false);
                setModalInfoVisible(true);
                setLoading(false);
                return;
            }
            const bodyString = {}
            if(editedName){
                bodyString['name'] = nameGuest;
            }
            if(editedEmail){
                bodyString['email'] = emailGuest;
            }
           // console.log(bodyString);
            const response = await editGuest(bodyString, [route.params?.userId, route?.params?.data?.id])
            setTextModal("Se modificó al usuario correctamente");
          //  console.log(response?.data);
            setSuccess(true);
            setModalInfoVisible(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("ERR: ", error?.data);
            setTextModal(error.data.message);
            if(error.data.code === 400){
                if(error.data.errors?.length > 0){
                    setTextModal(error.data.errors[0]);
                }
            }
            setSuccess(false);
            setModalInfoVisible(true);
        }
    }

    const cleanData = () => {
        setEmailGuest(null);
        setNameGuest(null);
    }

    const returnNavigation = () => {
        if(success)
            navigation.goBack();
    }

    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                

                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5} textTransform={'uppercase'}>
                    {route.params.data ? 'Editar invitado' : 'Nuevo invitado'}
                </Text>
                <Text color={Colors.primary} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Nombre completo
                </Text>
                <Input mb={0} value={nameGuest} onChangeText={(v)=>{setNameGuest(v); setEditedName(true);}}>
                </Input>
                <FormControl isInvalid={isInvalidName}>
                <FormControl.ErrorMessage fontSize={'xs'} leftIcon={<WarningOutlineIcon size="xs" />}>
               Ingrese un nombre valido sin espacios y al menos 3 caracteres
                </FormControl.ErrorMessage>
                </FormControl>
                <Text color={Colors.primary} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mt={5} mb={5}>
                    Correo electrónico
                </Text>
                <Input mb={5} value={emailGuest} onChangeText={(v)=>{setEmailGuest(v); setEditedEmail(true);}}>
                </Input>
                <Button mb={5} isLoading={loading} opacity={(!nameGuest) ? 0.5 : 1} disabled={!nameGuest} 
                    onPress={() => {if(route.params.data) {
                                        updateGuest()} 
                                    else {
                                        addGuest()
                                    }}}>
                        {route.params.data ? 'Actualizar' : 'Agregar'}
                </Button>
                <Button onPress={() => {cleanData(); navigation.goBack();}}>Regresar</Button>
            </View>
            
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={textModal} action={returnNavigation}>

            </ModalInfo>
        </LayoutV3>
    )
}


export default AddUpdateGuest;