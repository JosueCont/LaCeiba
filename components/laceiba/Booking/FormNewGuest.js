import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import CustomInput from "../CustomInput";

const FormNewGuest = () => {
    return(
        <View style={{marginBottom:30}}>
            <CustomInput title="Nombre"/>
            <CustomInput title="Apellidos" />
            <CustomInput title="Número de INE"/>
            <CustomInput title="Fecha de nacimiento"/>
            <CustomInput title="Correo electrónico"/>
            <CustomInput title="Teléfono"/>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default FormNewGuest;