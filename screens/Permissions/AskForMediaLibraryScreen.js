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
                'El permiso fue denegado anteriormente, si desea decargar el Qr de acceso a su galería de imágenes, diríjase a la sección de ajustes de su dispositivo, identifique el nombre de esta aplicación y otorgue los permisos para acceder a su galería. ',
                [
                  {
                    text: 'De acuerdo',
                    style: 'cancel',
                  },
              /*    {
                    text: 'OK', 
                    onPress: () => Linking.openSettings()
                  },*/
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
                    Para poder descargar el Qr, es necesario otorgar los permisos de acceso a su galería de imágnes.
                </Text>


                <Button onPress={() => askPermission()} mb={2}>Continuar</Button>
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