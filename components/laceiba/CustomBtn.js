import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Spinner } from "native-base";
import { getFontSize } from "../../utils";
import { ColorsCeiba } from "../../Colors";

const {height, width} = Dimensions.get('window');

const BtnCustom = ({title='', onPress, bgColor=ColorsCeiba.darkGray, color=ColorsCeiba.white, disable=false, loading=false, spinnerColor=ColorsCeiba.white,  ...props}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.btn, {backgroundColor: disable ? ColorsCeiba.gray : bgColor}]} disabled={disable}>
            {loading ? <Spinner color={color} size={'sm'}/> : <Text style={[styles.lbl,{color: color}]}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width: width * .85,
        height:40,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderColor: ColorsCeiba.darkGray, 
        borderWidth: 1,
    },
    lbl:{
        color: ColorsCeiba.white,
        fontSize: getFontSize(12),
        fontWeight:'400'
    }
})

export default BtnCustom;