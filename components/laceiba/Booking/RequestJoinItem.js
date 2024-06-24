import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from 'native-base'
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const {height, width} = Dimensions.get('window');

const RequestJoinItem = ({requested, myReservation=false, hour = null, members = null, title = null}) => {

    return(
        <View style={styles.card}>
            {
                title && 
                <View style={[styles.contSchedule, {width: "auto"}]}>
                    <Text style={{marginHorizontal: 10}} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                </View>
            }
            <View style={[styles.contSchedule, {backgroundColor: myReservation ? ColorsCeiba.aqua : ColorsCeiba.lightYellow}]}>
                <Text style={styles.lbl}>{hour ?? requested?.hour?.time}</Text>
            </View>
            <View style={styles.contPeople}>
                {requested?.hour?.booking?.invitations.filter(item => item?.status !== 'REJECTED').map((item,index) => (
                    <Text key={index+1} style={[styles.lbl,{color: ColorsCeiba.darkGray, width: '50%', marginBottom:4, textTransform:'capitalize'}]}>{item?.user != null ? item?.user?.fullName : item?.guestName}</Text>
                ))}
            </View>
            {
                members &&
                <View style={styles.contPeople}>
                    {members.map((item,index) => (
                        <Text key={index+1} style={[styles.lbl,{color: ColorsCeiba.darkGray, width: '50%', marginBottom:4, textTransform:'capitalize'}]}>{item}</Text>
                    ))}
                </View>
            }
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