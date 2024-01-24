import React, {useEffect, useRef} from "react";
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import LayoutV3 from "../Layouts/LayoutV3";
import {Colors} from "../../Colors";
import * as Notifications from 'expo-notifications';
import {Alert, AppState} from "react-native";
import * as Linking from "expo-linking";
import {connect} from "react-redux";
import {loggedAction} from "../../redux/ducks/appDuck";
import {setAttribute} from "../../redux/ducks/navigationDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AskForPushNotificationsScreen = ({loggedAction, navigation, route}) => {
    const appState = useRef(AppState.currentState);

    const askPermission = async () => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            if(route.params.loggedData){
                await AsyncStorage.setItem('@user',JSON.stringify(route.params.loggedData))
                await loggedAction(route.params.loggedData)
            }else {
                navigation.navigate(route.params.screenOk)
            }
        } else if (status === 'denied') {
          //  alert('El permiso fue denegado anteriormente, para activar dirigete a Settings/Club La Hacienda/Notifications/Allow Notifications ');
            Alert.alert(
                'Permiso denegado',
                'El permiso fue denegado anteriormente, para activar dirigete a Settings/Club La Hacienda/Notifications/Allow Notifications',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => Linking.openSettings()
                    },
                ],
                {cancelable: false},
            );
        } else {
            alert('Failed to get push token for push notification!');
        }
    }

    const rejectPermission = async () =>{
        if(route.params.loggedData){
            await AsyncStorage.setItem('@user',JSON.stringify(route.params.loggedData))
            await loggedAction(route.params.loggedData)
        }else{
            navigation.navigate(route.params.screenReject)
        }
    }

    const checkPermission = async () =>{
        const {status} = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            if(route.params.loggedData){
                await AsyncStorage.setItem('@user',JSON.stringify(route.params.loggedData))
                await loggedAction(route.params.loggedData)
            }else {
                navigation.navigate(route.params.screenOk)
            }
        }
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                //console.log('App has come to the foreground!');
                checkPermission()
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'Safety'} color={Colors.secondary} size={'6xl'}/>
                </View>

                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    ¿Desea activar las notificaciones? Puede realizar esta acción más tarde desde "Mi perfil".
                </Text>


                <Button onPress={() => askPermission()} mb={2}>Permitir</Button>
                <Button onPress={() => rejectPermission()}>No por ahora</Button>
            </View>

        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}
export default connect(mapState, {loggedAction, setAttribute})(AskForPushNotificationsScreen);

//export default AskForPushNotificationsScreen;