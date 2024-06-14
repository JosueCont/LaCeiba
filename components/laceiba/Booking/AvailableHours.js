import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import AvailableHoursItem from "./AvailableHoursItem";
import { MaterialIcons } from '@expo/vector-icons';


const AvailableHours = ({hours, selectedHour, disabledHours=false, exactDate = null}) => {
    return(
        <View style={styles.container}>
            {hours.length > 0 ? hours.map((item,index) => (
                <AvailableHoursItem index={index} item={item} selectHour={selectedHour} disabledHours={disabledHours} exactDate={exactDate}/>
            )):(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="error-outline" size={60} marginTop={50} marginBottom={20} color={ColorsCeiba.aqua} />
                    <Text style={{fontSize: getFontSize(20), fontWeight:'400', color: ColorsCeiba.darkGray, textAlign: 'center'}}>No se encontraron horarios disponibles para la fecha seleccionada.</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        //height:370, 
        marginRight:10, 
        marginTop:24, 
        zIndex:2, 
        flexDirection:'row',
        flexWrap:'wrap',
    }
})

export default AvailableHours;