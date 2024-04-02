import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import moment from "moment";

const {height, width} = Dimensions.get('window');

const ReservationItem = ({item, index}) => {
    return(
        <View style={styles.card}>
            <Image source={item?.image} style={styles.image}/>
            <View>
                <Text style={styles.lblTitle}>{item?.name}</Text>
                <Text style={styles.lbl}>{moment(item?.hour).format('dddd')}, {moment(item?.hour).format('MMMM DD')}</Text>
                <Text style={styles.lbl}>{moment(item?.hour).format('HH:mm A')}</Text>
                <Text style={styles.lbl}>Hole {item?.hole}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        height: 86,
        width: width* .6,
        flexDirection:'row',

    },
    image:{
        width:86, 
        height:86,
        borderRadius:3,
        resizeMode:'cover',
        marginRight:10
    },
    lblTitle:{
        color: ColorsCeiba.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'400',
        marginBottom:7
    },
    lbl:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ReservationItem;