import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import moment from "moment";

const {height, width} = Dimensions.get('window');

const ReservationItem = ({item, index}) => {
    const colors = {
        'Confirmado': 'green',
        'Pendiente':'yellow',
        'Cancelado':'red'
    }
    return(
        <View style={styles.card}>
            <Image source={item?.image} style={styles.image}/>
            <View>
                <Text style={styles.lblTitle}>{item?.name}</Text>
                <Text style={styles.lbl}>{moment(item?.hour).format('dddd')}, {moment(item?.hour).format('MMMM DD')}</Text>
                <Text style={styles.lbl}>{moment(item?.hour).format('HH:mm A')}</Text>
                <Text style={styles.lbl}>Hole {item?.hole}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:10, height:10, marginRight:5,borderRadius: 5, backgroundColor: colors[item?.status]}}/>
                    <Text style={styles.lbl}>{item?.status}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        height: 100,
        width: width* .6,
        flexDirection:'row',

    },
    image:{
        width:100, 
        height:100,
        borderRadius:3,
        resizeMode:'cover',
        marginRight:10
    },
    lblTitle:{
        color: ColorsCeiba.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'400',
        marginBottom:3
    },
    lbl:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ReservationItem;