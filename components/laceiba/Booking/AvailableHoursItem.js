import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useSelector } from "react-redux";

const AvailableHoursItem = ({item, index, selectHour, disabledHours=false}) => {
    const appDuck = useSelector(state => state.appDuck)
    
    const types = {
        1: ColorsCeiba.aqua,
        2: ColorsCeiba.lightYellow,
        3: ColorsCeiba.lightgray
    }
    
    
    const getColor = (status) => {
        if(Array.isArray(status?.booking?.invitations) && status.booking?.invitations?.some((reservation) => reservation?.user?.id === appDuck.user.id) === true){
            return ColorsCeiba.aqua
        }else if(status?.fullBooking){
            return ColorsCeiba.lightgray
        }else if(status.booking !== null || status?.fixedGroup !== null){
            return ColorsCeiba.lightYellow
        }else{
            return ColorsCeiba.white
        }
    } 
    
    const isUserInvited = Array.isArray(item?.booking?.invitations) && item?.booking?.invitations?.some(
        (reservation) => reservation?.user?.id === appDuck.user.id
    );
    const disabled = isUserInvited
    ? false
    : item?.isPastDueTime === true
    ? true
    : disabledHours;


    return(
        <TouchableOpacity 
            disabled={disabled }
            //accessibilityState={{ disabled: disabled }}
            onPress={() => !disabled && selectHour(item)}
            style={[styles.btn, {backgroundColor: item?.isPastDueTime ? ColorsCeiba.white : getColor(item), borderColor:  item?.isPastDueTime === true ? ColorsCeiba.lightgray : disabledHours ? ColorsCeiba.lightgray : ColorsCeiba.darkGray}]}>
            <Text style={{fontSize: getFontSize(16), fontWeight:'400', color: isUserInvited === true? ColorsCeiba.darkGray :  item?.isPastDueTime === true ? ColorsCeiba.lightgray : disabledHours ? ColorsCeiba.lightgray : ColorsCeiba.darkGray}}>{item?.time}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width: 75,
        height: 30,
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