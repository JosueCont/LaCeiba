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
import { getInfoInvited, postAddInvited, putInfoInvited } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";
import moment from "moment";

const NewGuestScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [type, setSelecType] = useState(0)
    const [dataForm, setDataForm] = useState({
        name: "",
        fatherLastName: "",
        motherLastName:"",
        birthdate: "",
        email: "",
        identificationNumber: "",
        phone: ""
    })
    const [disableBtn, setDisableBtn] = useState(false)
    const [validMail, setValidMail] = useState(false)
    const [openModal, setmodal] = useState(false)
    const [isUserCreated, setCreated] = useState(false)
    const [txtModal, setTxtModal] = useState('')
    const [loading, setLoading] = useState(false)

    //const {invited} = route?.params;
    const typesGuest = [
        {option:'Verificado'},
        //{option:'Sencillo'}
    ]

    useEffect(() => {
        if(route?.params?.invited) getData()
    },[])

    useEffect(() => {
        setDataForm({
            name: "",
            fatherLastName: "",
            motherLastName:"",
            birthdate: "",
            email: "",
            identificationNumber: "",
            phone: ""
        })
        setValidMail(false)
    },[type])

    useEffect(() => {
        if(dataForm?.name !='' && dataForm?.lastName !='') setDisableBtn(false)
            else setDisableBtn(true)
        
    },[dataForm])

    const getData = async() => {
        try {
            setLoading(true)
            const response = await getInfoInvited('',[route?.params?.invited?.idInvitado])
            console.log('data invitado', response?.data)
            setDataForm({
                name: response?.data?.nombre,
                fatherLastName: response?.data?.apellidoPaterno,
                motherLastName: response?.data?.apellidoMaterno,
                identificationNumber: response?.data?.numIdentificacion,
                birthdate: moment(response?.data?.fechaNacimiento,'YYYY-MM-DD').format('DD/MM/YYYY'),
                email: response?.data?.mail,
                phone: response?.data?.telefono
            })
            if(response?.data?.mail !='') setValidMail(true)
        } catch (e) {
            console.log('error invitado', e)
        } finally {
            setLoading(false)
        }
    }


    const onCreateInvited = async() => {
        try {
            setLoading(true)
            let dataSend = {
                "name": dataForm?.name,
                "birthdate": dataForm?.birthdate,
                "email": dataForm?.email,
                "identificationNumber":dataForm?.identificationNumber,
                "phone": dataForm?.phone,
                fatherLastName:  dataForm?.fatherLastName,
                motherLastName: dataForm?.motherLastName,
            }
            if(dataForm?.birthdate !='') dataSend.birthdate = moment(dataForm?.birthdate,'DD/MM/YYYY').format('YYYY-MM-DD')
            

            for(let key in dataSend){
                if(dataSend[key] ===''){
                    delete dataSend[key]
                }
            }

            const response = route?.params?.isEdit ? await putInfoInvited(dataSend,[route?.params?.invited?.idInvitado]): await postAddInvited(dataSend,)
            setmodal(true)
            setTxtModal(route?.params?.isEdit ? `El invitado ${dataForm?.name} ha sido actualizado con exito` :`El invitado ${dataForm?.name} ha sido agregado con exito` )
            setCreated(true)

            console.log('dataSed',dataSend)
        } catch (e) {
            console.log('error',e)
            setmodal(true)
            setTxtModal(`No se ha podido agregar al invitado `)
            setCreated(false)
        }finally {
            setLoading(false)
        }
    }

    return(
        <HeaderBooking showFilters={false}>
            <View style={styles.container}>
                {route?.params?.isEdit ? <Text style={styles.lblTitle}>Actualizar invitado</Text> : <Text style={styles.lblTitle}>Nuevo invitado</Text>}
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
                    <FormNewGuest data={dataForm} isValidMail={validMail} changeValue={(txt, prop) => {
                        setDataForm((prevState) => ({
                            ...prevState,
                            [prop]: txt
                          }));
                          if(prop === 'email'){
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const isValid = emailRegex.test(txt);
                            setValidMail(isValid)
                        }
                    }}/>
                ):(
                    <FormSimpleGuest data={dataForm} isValidMail={validMail} changeValue={(txt, prop) => {
                        setDataForm((prevState) => ({
                            ...prevState,
                            [prop]: txt
                          }));
                        if(prop === 'email'){
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const isValid = emailRegex.test(txt);
                            setValidMail(isValid)
                        }
                    }}/>
                )}


                <View style={{marginBottom:12}}>
                    <BtnCustom 
                        title={route?.params?.isEdit ? 'Actualizar' : "Aceptar"} 
                        disable={disableBtn} 
                        loading={loading}
                        onPress={() => onCreateInvited()}
                    />

                </View>
                <BtnCustom 
                    title="Cancelar" 
                    bgColor={ColorsCeiba.white} 
                    color={ColorsCeiba.darkGray}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ModalInfo 
                visible={openModal}
                title={isUserCreated ? 'Exito!' : 'Error!'}
                text={txtModal}
                setVisible={() => setmodal(false)}
                iconType={isUserCreated ? 'check' : 'exclamation'}
                close={isUserCreated ? false : true}
                action={() => isUserCreated ? navigation.goBack() : setmodal(false)}

            />
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