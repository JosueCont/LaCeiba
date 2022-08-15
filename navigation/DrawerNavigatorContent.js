import React, {useEffect, useState} from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {Text, View} from "native-base";
import {Colors} from "../Colors";

const CustomDrawerContent = ({authDuck, navigation, navigationDuck, accountDuck, ...props}) => {

    const [groups, setGroups] = useState([]);
    const [groupsRequests, setGroupsRequests] = useState([])

    useEffect(() => {
        getGroupsRequests();
        getGroups();
    }, [])

    const redirectValidation = async () => {
        try {
            if (groups.length === 0 && groupsRequests.length === 0) {
                navigation.navigate('GroupsStartScreen')
            } else {
                navigation.navigate('GroupsScreen')
            }
        } catch (e) {
            console.log('DrawerConfig redirectValidation error => ', e.toString())
        }

    }

    const getGroupsRequests = async () => {
        try {
            const response = await ApiApp.getGroupsRequests(authDuck.user.id)
            setGroupsRequests(response.data.data)
        } catch (e) {
            console.log('DrawerConfig getGroupsRequests error => ', e.toString())
        }
    }

    const getGroups = async () => {
        try {
            const response = await ApiApp.getMyGroups(authDuck.user.id)
            setGroups(response.data.data)
        } catch (e) {
            console.log('DrawerConfig getGroups error =>', e.toString())
        }

    }


    return (
        <DrawerContentScrollView
            bounces={false}
            {...props}
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1, backgroundColor: Colors.greenV4}}>
            <View height={200}>

            </View>
            <View flex={1}>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Home</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Mi perfil</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Miembros adicionales</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Mis reservaciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Invitados</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Partidos</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Transacciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Estadísticas</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Facturación</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Notificaciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Ayuda</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View style={{width: 50}}>
                    </View>
                    <View flex={1}>
                        <Text fontSize={'md'}>Cerrar sesión</Text>
                    </View>
                </View>
            </View>

        </DrawerContentScrollView>
    );
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}

export default connect(mapState)(CustomDrawerContent);
