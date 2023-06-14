import React, {useEffect} from "react";
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import LayoutV3 from "../Layouts/LayoutV3";
import {Colors} from "../../Colors";
import * as MediaLibrary from "expo-media-library";
import * as Linking from 'expo-linking';
import { Alert} from 'react-native';
import {useIsFocused} from "@react-navigation/native";



const AskForMediaLibraryScreen = ({navigation, route}) => {

    const askPermission = async () => {
        const permission = await MediaLibrary.requestPermissionsAsync();
        console.log(permission)
        if (permission.status === 'granted') {

            let params = {}
            if(route.params.card){
                params = {...params, card: route.params.card}
            }
            if(route.params.invitation) {
                params = {...params, invitation:route.params.invitation}
            }
            console.log(Object.keys(route.params))

            navigation.navigate(route.params.screenOk ,params)
        } else if (permission.status === 'denied' || !permission.canAskAgain) {
        
            Alert.alert(
                'Permiso denegado',
                'El permiso fue denegado anteriormente, tienes que permitir acceder a tus archivos manualmente en tus ajustes de la aplicación',
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

        }
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            console.log(route.params.screenReject)
        }
    }, [isFocused])

    return (
        <LayoutV3>
            <View flex={1} mx={20} justifyContent={'center'}>
                <View mb={10} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={AntDesign} name={'Safety'} color={Colors.yellow} size={'6xl'}/>
                </View>

                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                    Se requieren permisos para poder acceder a tu galería.
                </Text>


                <Button onPress={() => askPermission()} mb={2}>Permitir</Button>
                <Button onPress={() => {
                    let params = {}
                    if(route.params.card){
                        params = {...params, card: route.params.card}
                    }
                    if(route.params.invitation) {
                        params = {...params, invitation:route.params.invitation}
                    }
                    if(route.params.screenReject.includes('BookingsDetailScreen')) {
                        params = {...params, invitation_id:route.params.invitation.id}
                    }
                    navigation.navigate(route.params.screenReject,params)
                }}>Regresar</Button>
            </View>

        </LayoutV3>
    )
}


export default AskForMediaLibraryScreen;