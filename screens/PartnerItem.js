import React from "react";
import {Icon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import {MaterialIcons} from "@expo/vector-icons";

import iconPerson from "../assets/iconPerson.png";
import iconTrash from '../assets/iconTrash.png'
import iconEdit from '../assets/iconEdit.png'
import { TouchableOpacity } from "react-native";

const PartnerItem = ({navigation, mb = 2, item, onEdit, onDelete}) => {

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
        <View flexDirection={'row'} height={79} justifyContent={'center'} alignItems={'center'} bgColor={'#fff'} borderRadius={50} paddingX={6} mb={mb}
              style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation:3
        }}>
            <View flex={1} flexDirection={'column'} pr={1}>
                <Text numberOfLines={1} color={Colors.primary} textTransform={'capitalize'} fontSize={'14'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>{item?.nombreSocio}</Text>
                <Text numberOfLines={1} color={Colors.primary} fontSize={'12'} justifyItems={'center'}>{item.email}</Text>
            </View>
            {/* <View flex={.5} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} height={'60%'} alignSelf={'center'} borderLeftWidth={2} borderColor={Colors.secondary}>
                    <View flex={0.3} justifyContent={'center'} alignItems={'center'}>
                            <Text fontWeight={'bold'} color={Colors.primary} >{item?.user.pointsReceivedCount}</Text>
                            <Text textAlign={'center'} color={Colors.primary} >pts</Text>
                    </View>
            </View> */}
        </View>
    )
}


export default PartnerItem; 