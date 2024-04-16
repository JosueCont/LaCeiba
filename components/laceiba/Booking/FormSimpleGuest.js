import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import CustomInput from "../CustomInput";

const FormSimpleGuest = () => {
    return(
        <View style={{marginBottom:30}}>
            <CustomInput title="Nombre"/>
            <CustomInput title="Apellidos" />
            <CustomInput title="Correo electrónico"/>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default FormSimpleGuest;