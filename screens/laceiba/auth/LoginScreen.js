import React,{useEffect,useState} from "react";
import { View, Text, Button } from "native-base";
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors, ColorsCeiba } from "../../../Colors";

const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
    return(
        <ImageBackground 
            source={require('../../../assets/laceibaLogin.png')}
            style={styles.container}>
                <TouchableOpacity style={styles.btn}>
                    <Text >Iniciar sesión</Text>
                </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'flex-end', 
        alignItems:'center', 
        paddingBottom:50
    },
    btn:{
        backgroundColor: ColorsCeiba.blackBtns,
        height:39,
        width: width *.8,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default LoginScreen