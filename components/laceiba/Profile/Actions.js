import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { AntDesign, Ionicons } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

const Actions = (onPresed) => {
    const options = [
        {
            section:'Cuenta', 
            options:[
                {name:'Datos de mi perfil', key:'ProfileData', icon:'person-outline'},
                {name:'Seguridad', key:'Segurity', icon:'shield-checkmark-outline'},
                {name:'Notificaciones', key:'Notification', icon:'notifications-outline'},
                {name:'Privacidad', key:'Privacy', icon:'lock-closed-outline'},
            ]
        },{
            section:'Membresía',
            options:[
                {name:'Mi suscripción', key:'MySuscription', icon:'card-outline'},
                {name:'Ayuda y soporte', key:'Support', icon:'help-circle-outline'},
                {name:'Términos y politicas', key:'TermsConditions', icon:'alert-circle-outline'},
                {name:'Familiares', key:'MyFamily', icon:'person-outline'},
                {name:'Estado de cuenta', key:'MyFamily', icon:'person-outline'}

            ]
        },{
            section:'Acciones',
            options:[
                {name:'Reportar un problema', key:'Problems', icon:'flag-outline'},
                {name:'Cerrar sesión', key:'close', icon:'log-out-outline'}
            ]
        }
    ]
    return(
        <View style={styles.container}>
            {options.map((item, index) => (
                <View>
                    <Text style={styles.title}>{item?.section}</Text>
                    <View style={styles.contActions}>
                        {item?.options.map((item, index) => (
                            <TouchableOpacity style={styles.row}>
                                <Ionicons name={item.icon} size={20} color="black" />
                                <Text style={styles.lbl}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        marginHorizontal:20, 
        marginTop:20
    },
    contActions:{
        backgroundColor: ColorsCeiba.grayText,
        borderRadius:8,
        width: width*.9,
        marginTop:10,
        paddingTop:15,
        paddingLeft:15
    },
    row:{
        flexDirection:'row',
        marginBottom:15,
    },
    lbl:{
        fontSize: getFontSize(14),
        color: ColorsCeiba.darkGray,
        fontWeight:'500',
        marginLeft:15
    },
    title:{
        fontSize: getFontSize(16),
        color: ColorsCeiba.darkGray,
        fontWeight:'700',
        marginTop:15
    }

})

export default Actions