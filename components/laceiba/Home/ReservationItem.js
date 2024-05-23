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
    
    const getStatus = () => {
        let status;
        if(item?.deletedBy != null){
            status = 'Cancelado'
        }else{
            const hasPending = item?.invitations.some(elemento => elemento.status === 'PENDING');
            status = hasPending ? 'Pendiente' : 'Confirmado';

        }
        return (
            <>
                <View style={{width:10, height:10, marginRight:5,borderRadius: 5, backgroundColor: colors[status]}}/>
                <Text style={styles.lbl}>{status}</Text>
            </>
        )


    }
    return(
        <View style={styles.card}>
            <Image source={require('../../../assets/provitionalReservation.png')} style={styles.image}/>
            <View>
                <Text style={styles.lblTitle}>{item?.area?.service?.name}</Text>
                <Text style={styles.lbl}>{moment(item?.dueDate).format('dddd')}, {moment(item?.dueDate).format('MMMM DD')}</Text>
                <Text style={styles.lbl}>{item?.dueTime}</Text>
                {item?.area?.service?.isGolf ? <Text style={styles.lbl}>Hole {item?.numHoles}</Text> : <Text style={styles.lbl}>{item?.area?.name}</Text> }
                <View style={{flexDirection:'row', alignItems:'center'}}>
                {getStatus()}
                   
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