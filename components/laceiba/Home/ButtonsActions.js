import React from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";
const {height, width} = Dimensions.get('window');

const ButtonsActions = () => {
    const navigation = useNavigation();
    return(
        <View style={{alignItems:'center', marginBottom:25}}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('CreateBooking')}
                style={[styles.btn,{width: width*.8, backgroundColor: ColorsCeiba.blackBtns,}]}>
                <Text style={[styles.lbl,{color: ColorsCeiba.white}]}>Hacer una reserva</Text>
            </TouchableOpacity>
            <View style={styles.contBtns}>
                <TouchableOpacity style={[styles.btn, styles.btnSub]}>
                    <Text>Pagar con la App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnSub]}>
                    <Text>Invitados</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{ 
        height: 40, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:20
    },
    btnSub:{
        width: width*.38, 
        borderWidth:1
    },
    contBtns:{
        flexDirection:'row', 
        marginTop:13, 
        width: width*.8, 
        justifyContent:'space-between'
    },
    lbl:{
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ButtonsActions; 