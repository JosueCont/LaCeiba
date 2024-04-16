import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { AntDesign } from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');

const ItemListPeople = ({item, index}) => {
    return(
        <TouchableOpacity style={styles.card} key={index+1}>
            <View style={styles.contImage}>
                <Image source={item?.image} style={styles.img}/>
            </View>
            <Text style={styles.lbl}>{item?.name}</Text>
            <View style={styles.checkBox}>
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
        resizeMode:'cover'
    },
    lbl:{
        color: ColorsCeiba.darkGray, 
        fontSize: getFontSize(12), 
        fontWeight:'400'
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