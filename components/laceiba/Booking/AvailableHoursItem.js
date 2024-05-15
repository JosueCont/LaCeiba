import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useSelector } from "react-redux";

const AvailableHoursItem = ({item, index, selectHour, disabledHours}) => {
    const appDuck = useSelector(state => state.appDuck)

    const types = {
        1: ColorsCeiba.aqua,
        2: ColorsCeiba.lightYellow,
        3: ColorsCeiba.lightgray
    }

    const getColor = (status) => {
        if(status.booking?.invitations.find((reservation) => reservation?.user?.id === appDuck.user.id)){
            return ColorsCeiba.aqua
        }else if(status?.fullBooking){
            return ColorsCeiba.lightgray
        }else if(status.booking !== null){
            return ColorsCeiba.lightYellow
        }else{
            return ColorsCeiba.white
        }
    } 
    return(
        <TouchableOpacity 
            disabled={item?.booking?.invitations.find((reservation) => reservation?.user?.id === appDuck.user.id) ? false : disabledHours}
            onPress={() => selectHour(item)}
            style={[styles.btn, {backgroundColor: getColor(item), borderColor: disabledHours ? ColorsCeiba.lightgray : ColorsCeiba.darkGray}]}>
            <Text style={{fontSize: getFontSize(11), fontWeight:'400',}}>{item?.time}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width: 66,
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