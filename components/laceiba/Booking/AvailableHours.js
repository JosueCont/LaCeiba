import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import AvailableHoursItem from "./AvailableHoursItem";

const AvailableHours = ({hours, selectedHour}) => {
    return(
        <View style={styles.container}>
            {hours.map((item,index) => (
                <AvailableHoursItem index={index} item={item} selectHour={selectedHour}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        height:370, 
        marginRight:10, 
        marginTop:24, 
        zIndex:2, 
        flexWrap:'wrap',
    }
})

export default AvailableHours;