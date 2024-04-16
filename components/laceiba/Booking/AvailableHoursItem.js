import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const AvailableHoursItem = ({item, index, selectHour}) => {
    const types = {
        1: ColorsCeiba.aqua,
        2: ColorsCeiba.lightYellow,
        3: ColorsCeiba.lightgray
    }
    return(
        <TouchableOpacity 
            onPress={() => selectHour(item)}
            style={[styles.btn, {backgroundColor: types[item?.status]}]}>
            <Text style={{fontSize: getFontSize(11), fontWeight:'400'}}>{item?.date}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width: 74,
        height: 26,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginRight:15,
        zIndex:1
    }
})

export default AvailableHoursItem;