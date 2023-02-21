import React, { useState } from "react";
import {Icon, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import {MaterialIcons} from "@expo/vector-icons";

import iconPerson from "../assets/iconPerson.png";
import iconTrash from '../assets/iconTrash.png'
import iconEdit from '../assets/iconEdit.png'
import { TouchableOpacity } from "react-native";

const HolesItemSelected = ({navigation, mb = 2, getHole}) => {

    const emitHoles = (holes) => {
        getHole(holes)

    }
    const [holes, setHoles] = useState(null)

    return (
        <View>
            <View flexDirection={'row'} justifyContent={'center'}>
            <TouchableOpacity onPress={() =>{
                let holes = 9
                 setHoles(holes),
                 emitHoles(holes)
                 }}>
                <View borderRadius={'full'} justifyContent={'center'} alignItems={'center'} mr={1} style={ holes=== 9 ?{backgroundColor:Colors.green} : {backgroundColor:'#f5f5f5'}} height={'50px'} background={'red'} width={'140px'}>
                <Text background={'red'} justifyContent={'center'} style={ holes=== 9 ?{color: 'white'} : {color:Colors.green}} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>9</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
                  let holes = 18
                  setHoles(holes),
                  emitHoles(holes)
            }}>
            <View borderRadius={'full'} justifyContent={'center'} alignItems={'center'}  style={ holes=== 18 ?{backgroundColor: Colors.green} : {backgroundColor:'#f5f5f5'}} height={'50px'} background={'red'} width={'140px'}>
                <Text justifyContent={'center'} style={ holes=== 18 ?{color: 'white'} : {color:Colors.green}}  fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>18</Text>
                </View>
            </TouchableOpacity>
            </View>

        </View>
    )
}


export default HolesItemSelected; 