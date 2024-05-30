import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import moment from "moment";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const ReservationItem = ({item, index, img}) => {
    const user = useSelector(state => state.appDuck.user)

    const colors = {
        'Confirmado': 'green',
        'Pendiente':'yellow',
        'Cancelado':'red',
        'Rechazado': 'red'
    }
    const getStatus = () => {
        let status;
        if(item?.deletedBy != null){
            status = 'Cancelado'
        }else if(item?.invitations.some(elemento => elemento.status === 'REJECTED' && elemento?.user?.id === user?.id)){
            status = 'Rechazado'
        }else{
            const hasPending = item?.invitations.some(elemento => elemento.status === 'PENDING');
            status = item?.hostedBy?.id === user?.id ? 'Confirmado' : hasPending ? 'Pendiente' : 'Confirmado';

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
            <Image source={{uri: img}} style={styles.image}/>
            <View>
                <Text style={styles.lblTitle}>{item?.area?.service?.name}</Text>
                <Text style={[styles.lbl, {textTransform:'capitalize'}]}>{moment(item?.dueDate).format('dddd')}, {moment(item?.dueDate).format('DD MMMM')} {item?.dueTime}</Text>
                {item?.hostedBy?.id === user?.id ? <Text style={styles.lbl}>Tu eres el host</Text> : <Text  style={styles.lbl}>Invitado por: {item?.hostedBy?.firstName.split(' ')[0]} {item?.hostedBy?.lastName.split(' ')[0]}</Text>}
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