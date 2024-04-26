import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from 'native-base'
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const {height, width} = Dimensions.get('window');

const RequestJoinItem = ({requested}) => {

    return(
        <View style={styles.card}>
            <View style={styles.contSchedule}>
                <Text style={styles.lbl}>{requested?.hour?.time}</Text>
            </View>
            <View style={styles.contPeople}>
                {requested?.hour?.booking?.invitations.map((item,index) => (
                    <Text key={index+1} style={[styles.lbl,{color: ColorsCeiba.darkGray, width: '50%', marginBottom:4}]}>{item?.user?.fullName}</Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width*.9,
        padding:12,
        backgroundColor: ColorsCeiba.lightBlue,
        borderRadius: 12,
        marginBottom:27,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contSchedule:{
        width: 74,
        height: 26,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15,
        backgroundColor: ColorsCeiba.lightYellow
    },
    lbl:{
        fontSize: getFontSize(12), 
        fontWeight:'400'
    },
    contPeople:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'space-between'
    }
})

export default RequestJoinItem;