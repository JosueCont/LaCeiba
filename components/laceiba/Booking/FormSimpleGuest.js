import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import CustomInput from "../CustomInput";

const FormSimpleGuest = ({data, changeValue, isValidMail}) => {
    return(
        <View style={{marginBottom:30}}>
            <CustomInput title="Nombre" value={data?.name} setValue={(txt) => changeValue(txt,'name')}/>
            <CustomInput title="Apellidos" value={data?.lastName} setValue={(txt) => changeValue(txt,'lastName')}/>
            <CustomInput 
                title="Correo electrónico" 
                value={data?.email} 
                setValue={(txt) => changeValue(txt,'email')}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
            />
            {data?.email != '' && !isValidMail && <Text style={{color: ColorsCeiba.red, marginTop:10, fontSize: getFontSize(16), textAlign:'center' }}>El email es invalido</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default FormSimpleGuest;