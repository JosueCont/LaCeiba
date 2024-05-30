import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import FormNewGuest from "../../../../components/laceiba/Booking/FormNewGuest";
import FormSimpleGuest from "../../../../components/laceiba/Booking/FormSimpleGuest";

const NewGuestScreen = () => {
    const [type, setSelecType] = useState(0)
    const [dataForm, setDataForm] = useState({
        name: "",
        lastName: "",
        birthdate: "",
        email: "",
        identificationNumber: "",
        phone: ""
    })
    const [disableBtn, setDisableBtn] = useState(false)
    const typesGuest = [
        {option:'Verificado'},
        {option:'Sencillo'}
    ]

    useEffect(() => {
        setDataForm({
            name: "",
            lastName: "",
            birthdate: "",
            email: "",
            identificationNumber: "",
            phone: ""
        })
    },[type])

    useEffect(() => {
        if(dataForm?.name !='' && dataForm?.lastName !='') setDisableBtn(false)
            else setDisableBtn(true)
    },[dataForm])
    return(
        <HeaderBooking showFilters={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Nuevo invitado</Text>
                <Text>Tipo invitado</Text>
                <View style={styles.contTypes}>
                    {typesGuest.map((item,index) => (
                        <TouchableOpacity 
                            onPress={() => setSelecType(index)}
                            key={index+1} style={[styles.btnTypes,{backgroundColor: index === type ? ColorsCeiba.aqua : ColorsCeiba.white}]}>
                            <Text>{item?.option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {type != 1 ? (
                    <FormNewGuest data={dataForm} changeValue={(txt, prop) => {
                        setDataForm((prevState) => ({
                            ...prevState,
                            [prop]: txt
                          }));
                    }}/>
                ):(
                    <FormSimpleGuest data={dataForm} changeValue={(txt, prop) => {
                        setDataForm((prevState) => ({
                            ...prevState,
                            [prop]: txt
                          }));
                    }}/>
                )}


                <View style={{marginBottom:12}}>
                    <BtnCustom title="Aceptar" disable={disableBtn} onPress={() => console.log('data a mandar', dataForm)}/>

                </View>
                <BtnCustom 
                    title="Cancelar" 
                    bgColor={ColorsCeiba.white} 
                    color={ColorsCeiba.darkGray}
                />
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'400',
        marginBottom:20
    },
    contTypes:{
        flexDirection:'row', 
        marginVertical:14
    },
    btnTypes:{
        width: 78,
        height:26,
        borderRadius:20,
        borderColor: ColorsCeiba.darkGray,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center', 
        marginRight:8
    }
})

export default NewGuestScreen;