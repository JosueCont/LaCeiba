import React from "react";
import {Select, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV5 from "./Layouts/LayoutV5";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { deletetNotification, getAllNotifications, logOut } from "../api/Requests";
import { useState } from "react";
import { FlatList } from "react-native";
import { useEffect } from "react";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import { loggedOutAction } from "../redux/ducks/appDuck";
import { setAttribute } from "../redux/ducks/navigationDuck";

const NotificationsScreen = ({navigation, loggedOutAction, appDuck, setAttribute}) => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsFiltered, setNotificationsFiltered] = useState([]);
    const [typesNotifications, setTypesNotifications] = useState([{label: 'Todas las notificaciones', value: 'ALL'}, {label: 'Promoción', value: 'PROMOTION'}, {label: 'Recordatorio', value: 'REMINDER'},{label: 'Aviso', value: 'NOTICE'}]);
    const [typeSelected, setTypeSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(null)
    const [modalAskVisible, setModalAskVisible] = useState(false)
    const [modalInfoVisible, setModalInfoVisible] = useState(false)
    const [textModal, setTextModal] = useState('')
    const toast = useToast();

    useFocusEffect(
        React.useCallback(() => {
            setNotifications([]);
            setTypeSelected('ALL');
            getNotifications();
        }, [])
    );

    useEffect(()=>{
        setNotificationsFiltered(notificationsFiltered.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
    }, [notificationsFiltered])

    const getNotifications = async () => {
        setLoading(true)
        try {
            const queryString = `&userId=${appDuck.user.id}`;
            const response = await getAllNotifications(queryString);
            console.log('nofigcaciones noleidas notification',response?.data?.items?.filter(item => !item?.isRead).length )
            if(response?.data?.items?.filter(item => !item?.isRead).length > 0){
                setAttribute('notificationExist', true)
            }else{
                setAttribute('notificationExist', false)
            }   
            setNotifications(response?.data?.items);
            setNotificationsFiltered(response?.data?.items);
        } catch (error) {
            if(error?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction();
            }
        }finally{ 
         setLoading(false)
        }
    
    }

    const filterType = (typeSelected) => {
        if(typeSelected == "ALL"){
            setNotificationsFiltered(notifications);
            return;
        }   
        setNotificationsFiltered(notifications.filter(item => item?.template?.category == typeSelected));
    }
    
    const renderItem = (item, index) => {
        return  (<NotificationItem navigation={navigation} mb={4} notification={item.item} onDelete={onDelete} />)
    }
    const onDelete = (user) => {
        console.log(user);
        setCurrentNotification(user);
        setModalAskVisible(true);
    }
    
    const deleteNotificationAction = async () => {
        try {
            const response = await deletetNotification('', [currentNotification?.id]);
            // setTextModal('Se eliminó la notificación correctamente');
            // setModalInfoVisible(true);
            getNotifications()
        } catch (error) {
            console.log(error);
            setTextModal('No se pudo la notificación. Intenta más tarde.');
            setModalInfoVisible(true);
        }
    }

    const deletedSuccessfully = () => {
        getNotifications()
    }     

    return (
        <LayoutV5>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>NOTIFICACIONES</Text>

                <View mb={10}>
                    <Text textAlign={'center'} mb={2} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                        Filtro
                    </Text>
                    <Select
                        onOpen={() => {

                        }}
                        selectedValue={typeSelected}
                        onValueChange={(v) => {
                            setTypeSelected(v);
                            filterType(v);
                        }}
                        placeholder="Seleccionar">
                        {
                            typesNotifications.map((item) => {
                                return (
                                    <Select.Item key={item.value} label={item.label} value={item.value}/>
                                )
                            })
                        }
                    </Select>
                    
                </View>
                
                {
                    notificationsFiltered.length > 0 ?
                            
                             <FlatList
                                data={notificationsFiltered}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                onRefresh={() => getNotifications()}
                                refreshing={loading}
                                extraData={true}
                            />
                        
                    
                    :
                    <View mt={10} flexDirection={'row'} alignContent={'center'} justifyContent={'center'} >
                        <Text color={Colors.primary}> No se encontraron notificaciones </Text>
                    </View>
                }

                {/* <NotificationItem navigation={navigation} mb={4}/>

                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/>
                <Text textAlign={'center'} mb={4} color={Colors.primary} fontSize={'sm'}>Ayer</Text>

                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/> */}
            </View>
            <ModalAsk
                setVisible={setModalAskVisible}
                visible={modalAskVisible}
                text={`¿Estás seguro que deseas eliminar esta notificación?`}
                title={'Eliminar notificación'}
                textButton={'Sī'}
                textNoButton={'No'}
                iconType={'exclamation'}
                close={true}
                action={() => {
                    deleteNotificationAction();
                    setModalAskVisible(false);
                }}/>
            
            <ModalInfo 
                setVisible={setModalInfoVisible} 
                visible={modalInfoVisible} 
                close={true} 
                iconType={'exclamation'} 
                textButton={'Aceptar'} 
                text={textModal} 
                action={deletedSuccessfully}
            />
        </LayoutV5>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect (mapState, {loggedOutAction, setAttribute})(NotificationsScreen);