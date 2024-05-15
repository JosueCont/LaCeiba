import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { AntDesign } from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');

const ItemListPeople = ({item, index, selectPerson, peopleSelected, countPlayers}) => {

    const findPerson = () => {
        return peopleSelected.find((person) => item?.id ? person?.user?.id === item?.user?.id : person?.idInvitado === item?.idInvitado) 
    }
    return(
        <TouchableOpacity style={styles.card} key={index+1} onPress={() => selectPerson(item)}>
            <View style={styles.contImage}>
                {item?.profilePictureUrl && item?.profilePictureUrl != null && item?.profilePictureUrl !='' ? (
                    <Image source={{uri: item?.profilePictureUrl}} style={styles.img}/>
                ):(
                    <Image source={require('../../../assets/iconPerson.png')} style={styles.img}/>
                )}
            </View>
            <Text style={styles.lbl}>{item?.nombreSocio || item?.nombre +' '+item?.apellidoPaterno +' '+item?.apellidoMaterno}</Text>
            <View style={[styles.checkBox, {backgroundColor: findPerson() ? ColorsCeiba.aqua : ColorsCeiba.white}]}>
                <AntDesign name="check" size={15} color={ColorsCeiba.white} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: ColorsCeiba.lightBlue,
        width: width*.9,
        height:60,
        marginBottom:14,
        borderRadius:300,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contImage:{
        width:60,
        height:60,
        borderRadius:300,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor: ColorsCeiba.white
    },
    img:{
        width: 56, 
        height: 56,
        borderRadius:300, 
        resizeMode:'cover'
    },
    lbl:{
        color: ColorsCeiba.darkGray, 
        fontSize: getFontSize(12), 
        fontWeight:'400',
        textTransform:'capitalize',
        width: width*.5, 
    },
    checkBox:{
        width:20,
        height:20,
        borderWidth:1,
        marginRight:15,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ItemListPeople