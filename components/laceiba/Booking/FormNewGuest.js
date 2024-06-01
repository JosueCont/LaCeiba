import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import CustomInput from "../CustomInput";

const FormNewGuest = ({data, changeValue,isValidMail}) => {

    const formatText = (val, prop) => {
        let cleaned = ('' + val).replace(/\D/g, '');

        // Aplicar el formato dd/mm/yyyy
        let formatted = cleaned;

        if (cleaned.length <= 2) {
          // Formatear para el día (dd)
          formatted = cleaned;
        } else if (cleaned.length <= 4) {
          // Formatear para el mes (dd/mm)
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        } else {
          // Formatear para el año (dd/mm/yyyy)
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        }
        formatted = formatted.slice(0, 10);

        changeValue(formatted, prop)
    }
    return(
        <View style={{marginBottom:30}}>
            <CustomInput 
                title="Nombre" 
                value={data?.name} 
                maxLength={80}
                setValue={(txt) =>{
                    if (txt === "" || /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(txt)) {
                        changeValue(txt,'name')
                    }
                }} 
            />
            <CustomInput 
                title="Apellido paterno" 
                value={data?.fatherLastName} 
                maxLength={80}
                setValue={(txt) => { 
                    if (txt === "" || /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(txt)) {
                        changeValue(txt,'fatherLastName')
                    }
                }}
            />
            <CustomInput 
                title="Apellido materno" 
                value={data?.motherLastName} 
                maxLength={80}
                setValue={(txt) => { 
                    if (txt === "" || /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(txt)) {
                        changeValue(txt,'motherLastName')
                    }
                }}
            />
            {/*<CustomInput 
                title="Número de INE" 
                keyboardType='numeric'
                maxLength={12} 
                value={data?.identificationNumber} 
                setValue={(txt) => changeValue(txt,'identificationNumber')}
            />
            <CustomInput 
                title="Fecha de nacimiento" 
                value={data?.birthdate} 
                setValue={(txt) => formatText(txt, 'birthdate')}
                keyboardType="numeric"
                placeholder="dd/mm/yyyy"
                maxLength={10}
            />*/}
            <CustomInput 
                title="Correo electrónico" 
                value={data?.email} 
                setValue={(txt) => changeValue(txt, 'email')}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
            />
            {data?.email != '' && !isValidMail && <Text style={{color: ColorsCeiba.red, marginTop:10, fontSize: getFontSize(16), alignSelf:'center' }}>El email es invalido</Text>}

           {/* <CustomInput 
                title="Teléfono" 
                value={data?.phone} 
                setValue={(txt) => changeValue(txt, 'phone')}
                keyboardType='numeric'
                maxLength={10}
        />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default FormNewGuest;