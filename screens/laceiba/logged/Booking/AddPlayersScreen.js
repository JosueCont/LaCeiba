import React,{ useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import ListPeople from "../../../../components/laceiba/Booking/ListPeople";
import BtnCustom from "../../../../components/laceiba/CustomBtn";

const {height, width} = Dimensions.get('window');

const AddPlayersScreen = () => {
    const navigation = useNavigation();
    const typesInvite = [
        {option:'Socio'},{option:'Invitado'}
    ]

    const clients = [
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},

    ]
    return(
        <HeaderBooking showFilters={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Seleccionar invitado</Text>
                <Text>Tipo invitado</Text>
                <View style={styles.contFilter}>
                    <View style={{flexDirection:'row'}}>
                        {typesInvite.map((item,index) => (
                            <TouchableOpacity style={[styles.centerBtn,styles.btnType]}>
                                <Text>{item?.option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AddGuest')}
                        style={[styles.centerBtn,styles.btnAdd]}>
                        <Text>+ Nuevo contacto</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginBottom:20}}>
                    <TextInput 
                        style={styles.txtInput}
                        placeholder="Buscar"
                    />
                    <Ionicons name="search-outline" size={24} color={ColorsCeiba.grayV2} style={styles.icon} />

                </View>

                <ListPeople people={clients}/>
                <View style={{marginBottom:12}}>
                    <BtnCustom title="Aceptar"/>

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
    contFilter:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:14,
        marginBottom:37
    },
    btnType:{
        width: 78, 
        height:26, 
        marginRight:8
    },
    btnAdd:{
        width: 140, 
        height:26,
    },
    centerBtn:{
        borderColor: ColorsCeiba.darkGray,
        borderWidth:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    txtInput:{
        width: width*.9,
        height:37,
        backgroundColor: ColorsCeiba.lightgray,
        paddingLeft:30,
        borderRadius:5
    },
    icon:{
        position:'absolute', 
        top:6, 
        left:5
    }
})

export default AddPlayersScreen;