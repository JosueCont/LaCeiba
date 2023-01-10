import React from "react";
import {Select, Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV4 from "./Layouts/LayoutV4";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { getAllNotifications } from "../api/Requests";
import { useState } from "react";

const NotificationsScreen = ({navigation, appDuck}) => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsFiltered, setNotificationsFiltered] = useState([]);
    const [typesNotifications, setTypesNotifications] = useState([{label: 'Todos', value: 'ALL'}, {label: 'Promoción', value: 'PROMOTION'}, {label: 'Aviso', value: 'ANNOUNCEMENT'}, {label: 'Advertencia', value: 'ADVISEMENT'}]);
    const [typeSelected, setTypeSelected] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            setNotifications([]);
            setTypeSelected('ALL');
            getNotifications();
        }, [])
    );

    const getNotifications = async () => {
        try {
            const queryString = `?userId=${appDuck.user.id}`;
            const response = await getAllNotifications(queryString);
            console.log(response?.data);    
            setNotifications(response?.data?.items);
            setNotificationsFiltered(response?.data?.items);
            //console.log(appDuck?.user?.id);
        } catch (error) {
            console.log(error?.data);
        }
    }

    const filterType = (typeSelected) => {
        if(typeSelected == "ALL"){
            setNotificationsFiltered(notifications);
            return;
        }   
        setNotificationsFiltered(notifications.filter(item => item?.template?.category == typeSelected));
    }

    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Mis notificaciones</Text>

                <View mb={10}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
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
                                    <Select.Item label={item.label} value={item.value}/>
                                )
                            })
                        }
                    </Select>
                </View>
                
                {
                    notificationsFiltered.length > 0 ?
                    notificationsFiltered.map((item, index)=>{
                        return(
                            <NotificationItem navigation={navigation} mb={4} notification={item} />
                        )
                    })
                    :
                    <View mt={10} flexDirection={'row'} alignContent={'center'} justifyContent={'center'} >
                        <Text color={Colors.green}> No se encontraron notificaciones </Text>
                    </View>
                }

                {/* <NotificationItem navigation={navigation} mb={4}/>

                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/>
                <Text textAlign={'center'} mb={4} color={Colors.green} fontSize={'sm'}>Ayer</Text>

                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/>
                <NotificationItem navigation={navigation} mb={4}/> */}
            </View>

        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect (mapState)(NotificationsScreen);