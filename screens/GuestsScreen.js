import React, {useEffect, useState} from "react";
import {Button, Input, ScrollView, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import GuestItem from "./GuestItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {deleteGuest, getAllGuests, getGuests, validatePartner} from "../api/Requests";
import LayoutV5 from "./Layouts/LayoutV5";
import {connect} from "react-redux";
import _ from 'lodash';
import {errorCapture} from "../utils";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from "@react-navigation/native";
import { loggedOutAction } from "../redux/ducks/appDuck";

const GuestsScreen = ({navigation, loggedOutAction, appDuck}) => {

    const [loading, setLoading] = useState(null);
    const [allGuests, setAllGuests] = useState([]);
    const [guestsFiltered, setQuestsFiltered] = useState([]);
    const [modalAskVisible, setModalAskVisible] = useState(false);
    const [currentGuest, setCurrentGuest] = useState(null);

    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('');
    const [valor, setValue] = useState('');
    const [isValidPartnert, setIsValidPartner] = useState(true);
    const [reasonInvalid, setReasonInvalid] = useState(null);
    const toast = useToast();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setQuestsFiltered([])
            setValue('');
            getQuestsFunction()
        });
        return unsubscribe;
     }, [navigation]);

    useEffect(() => {
        getQuestsFunction()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
          const getGuests = async () =>{
            await getQuestsFunction();
          }
          const getValid = async () => {
            await validatePartnerFunction();
          }
          getGuests();
          getValid();
          return () => {
            setAllGuests([]);
            setIsValidPartner(true);
          };
        }, [])
      );

    const getQuestsFunction = async () => {
        try {
            setLoading(true)
            const queryString = `?userId=${appDuck.user.id}`
            const allGuests = await getAllGuests(queryString);
            setAllGuests(allGuests.data);
            setQuestsFiltered(allGuests.data)
            //console.log(response.data)
        } catch (e) {
            console.log(e)
            alert(e.data.message)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
        } finally {
            setLoading(false)
        }
    }

    const verifyStatus = async (item) => {
        try {
            const response = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            if (response.data.status === true) {
                navigation.navigate('GuestGeneratePassScreen', {guest: item})
            } else {
                navigation.navigate('QRNonPaymentScreen')
            }
        } catch (ex) {
            let v = await errorCapture(e);
            alert(v.value)
        }

    }

    const search = async (value) => {
        setValue(value)
        let filtered = _.filter(allGuests, function (item) {
            return item.name.toLowerCase().includes(value.toLowerCase())
        });
        console.log(filtered);
        setQuestsFiltered(filtered)
    }

    const addGuest = () => {
        navigation.navigate('AddUpdateGuest', {userId: appDuck.user.id, action: 'add', data: null, guests: allGuests});
    }

    const editGuest = (user) => {
        navigation.navigate('AddUpdateGuest', {userId: appDuck.user.id, action: 'edit', data: user, guests: allGuests});
    }

    const generatePass = (user) => {
        navigation.navigate('GuestGeneratePass', {userId: appDuck.user.id, data: user});
    }

    const onDeleteGuest = (user) => {
        console.log(user);
        setCurrentGuest(user);
        setModalAskVisible(true);
    }

    const validatePartnerFunction = async (id) => {
        try {
            const response = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            if (response.data.status === true) {
                setIsValidPartner(true);
            } else {
                setIsValidPartner(false);
                setReasonInvalid(response.data);
            }

        } catch (ex) {

            console.log(ex.data);
            setIsValidPartner(false);
            setReasonInvalid(ex?.data);
        }

    }

    const deleteGuestAction = async () => {
        try {
            console.log(currentGuest);
            const response = await deleteGuest('', [currentGuest?.id]);
            console.log(response?.data);
            setTextModal('Se eliminó al usuario correctamente');
            setModalInfoVisible(true);
        } catch (error) {
            console.log(error?.data);
            setTextModal('No se pudo eliminar al usuario. Intenta más tarde.');
            setModalInfoVisible(true);
        }
    }

    const deletedSuccessfully = () => {
        getQuestsFunction();
    }

    const invalidPartnetModal = () => {
        navigation.navigate('QRNonPaymentScreen', {responseError: reasonInvalid, message: 'No se puede generar pase a un invitado por el siguiente motivo:'});
    }


    return (
        <LayoutV5>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'15px'} textTransform={'uppercase'}>Invitados a restaurantes</Text>
                    <View mb={5} flexDirection={'row'} justifyContent={'center'} mx={8}>
                        <Button onPress={()=>{addGuest();}}>+ Agregar invitado</Button>
                    </View>
                    <View mx={10} mb={5}>
                        <Input value={valor} returnKeyType="search" placeholder={'Buscar'} onChangeText={(v) => search(v)}/>
                    </View>

                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{flexGrow: 1}}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getQuestsFunction}
                            />
                        }>

                        <View mx={8}>
                            {
                                guestsFiltered.map((item, idx) => {
                                    return (
                                        <TouchableOpacity key={idx} onPress={() => isValidPartnert ? generatePass(item) : invalidPartnetModal()}>
                                            <GuestItem mb={4} item={item} onEdit={editGuest} onDelete={onDeleteGuest} />
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View>


                    </ScrollView>
                </View>
            </View>
            <ModalAsk
                setVisible={setModalAskVisible}
                visible={modalAskVisible}
                text={`¿Estás seguro que deseas eliminar a ${currentGuest?.name}?`}
                title={'Eliminar invitado'}
                textButton={'Sī'}
                textNoButton={'No'}
                iconType={'exclamation'}
                close={true}
                action={() => {
                    deleteGuestAction();
                    setModalAskVisible(false);
                }}/>
            
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={textModal} action={deletedSuccessfully}>

            </ModalInfo>
        </LayoutV5>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState, {loggedOutAction})(GuestsScreen)