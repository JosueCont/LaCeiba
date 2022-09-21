import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";

import iconPerson from "../assets/iconPerson.png";

const GuestItem = ({navigation, mb = 2, item}) => {

    // "apellidoMaterno": "HERCE",
    //     "apellidoPaterno": "ERNESTO",
    //     "fechaNacimiento": "1963-05-02",
    //     "idInvitado": "5",
    //     "identificacion": "INE",
    //     "mail": "luis@herce.com",
    //     "nombre": "LUIS",
    //     "numIdentificacion": "741852",
    //     "telefono": "5541526363",

    return (
        <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                <Image source={iconPerson} style={{width: 55, height: 55}} borderRadius={60}/>
            </View>

            <View flex={1} flexDirection={'row'}>
                <View justifyContent={'center'} mr={2}>
                    <Text color={Colors.green} fontSize={'xs'} justifyItems={'center'}>{item.nombre} {item.apellidoPaterno}</Text>
                </View>
                <View justifyContent={'center'}>
                    {/*<Icon as={MaterialIcons} name={'circle'} color={Colors.yellow}/>*/}
                </View>
            </View>
        </View>
    )
}


export default GuestItem;