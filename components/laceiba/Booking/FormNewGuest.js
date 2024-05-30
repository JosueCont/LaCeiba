import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import CustomInput from "../CustomInput";

const FormNewGuest = ({data, changeValue}) => {
    return(
        <View style={{marginBottom:30}}>
            <CustomInput title="Nombre" value={data?.name} setValue={(txt) => changeValue(txt,'name')} />
            <CustomInput title="Apellidos" value={data?.lastName} setValue={(txt) => changeValue(txt,'lastName')}/>
            <CustomInput title="Número de INE" value={data?.identificationNumber} setValue={(txt) => changeValue(txt,'identificationNumber')}/>
            <CustomInput title="Fecha de nacimiento" value={data?.birthdate} setValue={(txt) => changeValue(txt, 'birthdate')}/>
            <CustomInput title="Correo electrónico" value={data?.email} setValue={(txt) => changeValue(txt, 'email')}/>
            <CustomInput 
                title="Teléfono" 
                value={data?.phone} 
                setValue={(txt) => changeValue(txt, 'phone')}
                keyboardType='numeric'
                maxLength={10}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default FormNewGuest;