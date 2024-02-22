import React, {useEffect, useState} from "react";
import {Icon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import {MaterialIcons} from "@expo/vector-icons";

import iconPerson from "../assets/iconPerson.png";
import iconTrash from '../assets/iconTrash.png'
import iconEdit from '../assets/iconEdit.png'
import { TouchableOpacity } from "react-native";
import {useIsFocused} from "@react-navigation/native";

const HolesItemSelected = ({navigation, mb = 2, getHole, defaultHole}) => {

    const emitHoles = (holes) => {
        getHole(holes)

    }
    const [holes, setHoles] = useState(null)

    useEffect(()=>{
        console.log(defaultHole)
        setHoles(defaultHole)
    },[defaultHole])

    return (
        <View>
            <View flexDirection={'row'} justifyContent={'center'} >
                <View flex={1} pr={1} >
            <TouchableOpacity onPress={() =>{
                let holes = 9
                 setHoles(holes),
                 emitHoles(holes)
                 }}>
                <View borderRadius={'full'} justifyContent={'center'} alignItems={'center'} style={ holes=== 9 ?{backgroundColor:Colors.primary} : {backgroundColor:'#fff'}} height={'50px'} width={'100%'}>
                <Text justifyContent={'center'} style={ holes=== 9 ?{color: Colors.bgPrimaryText} : {color:Colors.primary}} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>9</Text>
                </View>
            </TouchableOpacity>
                </View>

                <View flex={1} pl={1}>
            <TouchableOpacity  onPress={() => {
                  let holes = 18
                  setHoles(holes),
                  emitHoles(holes)
            }}>
            <View borderRadius={'full'} justifyContent={'center'} alignItems={'center'} style={ holes=== 18 ?{backgroundColor: Colors.primary} : {backgroundColor:'#fff'}} height={'50px'} width={'100%'}>
                <Text justifyContent={'center'} style={ holes=== 18 ?{color: Colors.bgPrimaryText} : {color:Colors.primary}}  fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>18</Text>
                </View>
            </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


export default HolesItemSelected; 