import React from "react";
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import LayoutV3 from "../Layouts/LayoutV3";
import {Colors} from "../../Colors";
import * as MediaLibrary from "expo-media-library";

const AskForMediaLibraryScreen = ({navigation, route}) => {

    const askPermission = async () => {
        const {status} = await MediaLibrary.requestPermissionsAsync();

        if (status === 'granted') {
            navigation.navigate(route.params.screenOk)
        } else if (status === 'denied') {
            alert('El permiso fue denegado anteriormente. ');
        } else {
            alert('Failed');
        }
    }

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
                <Button onPress={() => navigation.navigate(route.params.screenReject)}>Regresar</Button>
            </View>

        </LayoutV3>
    )
}


export default AskForMediaLibraryScreen;