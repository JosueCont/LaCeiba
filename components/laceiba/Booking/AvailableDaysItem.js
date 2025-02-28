import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const AvailableDaysItem = ({item, index, selectedDay, setSelectedDay, disabled}) => {
    return(
        <TouchableOpacity 
        onPress={() => setSelectedDay(index)}
        disabled={disabled ? index === 0 : false}
        style={[styles.card,{ 
            backgroundColor: selectedDay === index ? ColorsCeiba.aqua : ColorsCeiba.white,
            borderColor: selectedDay === index ? ColorsCeiba.aqua : ColorsCeiba.blackBtns,}]}>
            <Text style={styles.lblDay}>{item?.day}</Text>
            <Text style={styles.lblDate}>{item?.date}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width: 72,
        height:72, 
        borderWidth: 1,
        marginRight: 11,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    lblDay:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(11),
        fontWeight:'400',
        textTransform:'capitalize'
    },
    lblDate:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(18),
        fontWeight:'400'
    }
})

export default AvailableDaysItem;