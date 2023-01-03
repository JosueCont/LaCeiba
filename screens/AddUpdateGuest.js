import React, { useState } from "react";
import {Button, Icon, Input, Text, View} from "native-base";
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

    useFocusEffect(
        React.useCallback(() => {
            setEditedEmail(false);
            setEditedName(false);
        }, [])
    );

    useEffect(()=>{
        console.log(editedName);
    }, [editedName])


    useEffect(()=>{
        if(route.params.data){
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
    },[route.params])

    const addGuest = async () => {
        try {
            const guestFounded = route?.params?.guests?.find(guest => guest.name == nameGuest);
            if(guestFounded){
                setTextModal("Ya existe un invitado con ese nombre");
                setSuccess(false);
                setModalInfoVisible(true);
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
        } catch (error) {
            console.log(error?.data);
            switch (error?.data?.message) {
                case 'Guest name or email already exists for this user':
                    setTextModal("El nombre o email ya existen en un invitado");
                    break;
                default:
                    setTextModal("Los parámetros son incorrectos, vuelve a intentarlo");
                    break;
            }
            
            setSuccess(false);
            setModalInfoVisible(true);
            
        }
    }

    const updateGuest = async () => {
        try {
            const guestFounded = route?.params?.guests?.find(guest => guest.name == nameGuest);
            if(guestFounded && editedName){
                setTextModal("Ya existe un invitado con ese nombre");
                setSuccess(false);
                setModalInfoVisible(true);
                return;
            }
            const bodyString = {}
            if(editedName){
                bodyString['name'] = nameGuest;
            }
            if(editedEmail){
                bodyString['email'] = emailGuest;
            }
            console.log(bodyString);
            const response = await editGuest(bodyString, [route.params?.userId, route?.params?.data?.id])
            setTextModal("Se modificó al usuario correctamente");
            console.log(response?.data);    
            setSuccess(true);
            setModalInfoVisible(true);
        } catch (error) {
            console.log("ERR: ", error?.data);
            switch (error?.data?.message) {
                case 'Guest name or email already exists for this user':
                    setTextModal("El nombre o email ya existen en un invitado");
                    break;
                case 'Guest name is already exists for this user':
                    setTextModal("El nombre ya existe en un invitado");    
                    break;
                case 'Guest email is already exists for this user':
                    setTextModal("El email ya existe en un invitado");
                    break;
                default:
                    setTextModal("Los parámetros son incorrectos, vuelve a intentarlo");
                    break;
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
                

                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Nuevo Invitado
                </Text>
                <Text color={Colors.green} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Nombre completo
                </Text>
                <Input mb={5} value={nameGuest} onChangeText={(v)=>{setNameGuest(v); setEditedName(true);}}>
                </Input>
                <Text color={Colors.green} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Correo electrónico
                </Text>
                <Input mb={5} value={emailGuest} onChangeText={(v)=>{setEmailGuest(v); setEditedEmail(true);}}>
                </Input>
                <Button mb={5} opacity={(!nameGuest || !emailGuest) ? 0.5 : 1} disabled={!nameGuest || !emailGuest} 
                    onPress={() => {if(route.params.data) {
                                        updateGuest()} 
                                    else {
                                        addGuest()
                                    }}}>
                        {route.params.data ? 'Editar' : 'Agregar'}
                </Button>
                <Button onPress={() => {cleanData(); navigation.goBack();}}>Regresar</Button>
            </View>
            
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={textModal} action={returnNavigation}>

            </ModalInfo>
        </LayoutV3>
    )
}


export default AddUpdateGuest;