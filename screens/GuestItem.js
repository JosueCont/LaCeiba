import React from "react";
import {Icon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import {MaterialIcons} from "@expo/vector-icons";

import iconPerson from "../assets/iconPerson.png";
import iconTrash from '../assets/iconTrash.png'
import iconEdit from '../assets/iconEdit.png'
import { TouchableOpacity } from "react-native";

const GuestItem = ({navigation, mb = 2, item, onEdit, onDelete}) => {

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
                    <Text color={Colors.green} fontSize={'xs'} justifyItems={'center'}>{item?.name}</Text>
                </View>
                
            </View>
            <TouchableOpacity style={{justifyContent: 'center', width:'15%', height: '100%'}} onPress={()=>onEdit(item)}>
                <View flex={0.2} justifyContent={'center'} alignItems={'flex-end'}>
                        <Image source={iconEdit} style={{width: 25, height: 25}}></Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center', width:'15%', height: '100%'}} onPress={()=>onDelete(item)}>
                <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                        <Image source={iconTrash} style={{width: 25, height: 25}}></Image>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}


export default GuestItem; 