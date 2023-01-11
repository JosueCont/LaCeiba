import React from "react";
import {Select, Text, View} from "native-base";
import {Colors} from "../Colors";
import NotificationItem from "./NotificationItem";
import LayoutV5 from "./Layouts/LayoutV5";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { getAllNotifications } from "../api/Requests";
import { useState } from "react";
import { FlatList } from "react-native";

const NotificationsScreen = ({navigation, appDuck}) => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsFiltered, setNotificationsFiltered] = useState([]);
    const [typesNotifications, setTypesNotifications] = useState([{label: 'Todas las notificaciones', value: 'ALL'}, {label: 'Promoción', value: 'PROMOTION'}, {label: 'Recordatorio', value: 'REMINDER'},{label: 'Aviso', value: 'NOTICE'}]);
    const [typeSelected, setTypeSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setNotifications([]);
            setTypeSelected('ALL');
            getNotifications();
        }, [])
    );

    const getNotifications = async () => {
        setLoading(true)
        try {
            const queryString = `?userId=${appDuck.user.id}`;
            const response = await getAllNotifications(queryString);
            setNotifications(response?.data?.items);
            setNotificationsFiltered(response?.data?.items);
            //console.log(appDuck?.user?.id);
        } catch (error) {
            console.log(error?.data);
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
        
        return  <NotificationItem navigation={navigation} mb={4} notification={item.item} />
    }

    return (
        <LayoutV5>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Notificaciones</Text>

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
                            
                             <FlatList
                                data={notificationsFiltered}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                onRefresh={() => filterType(typeSelected)}
                                refreshing={loading}
                            />
                        
                    
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

        </LayoutV5>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect (mapState)(NotificationsScreen);