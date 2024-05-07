import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import moment from "moment";

const RequesJoinSendScreen = () => {
    const route = useRoute();
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const { booking } = route.params
    return(
        <HeaderBooking>
            <View style={styles.container}>
                <Text style={[styles.lbl,{fontSize: getFontSize(20),}]}>Petición enviada</Text>
                <Text style={[styles.lbl,styles.lblSubtitle]}>Te avisaremos cuando sea aceptada por los socios</Text>
                <Text style={[styles.lbl,{fontSize: getFontSize(16),}]}>{moment(infoBooking?.date,'YYYY-MM-DD').format('D MMMM')} {infoBooking?.hour?.time}</Text>
                <Text style={[styles.lbl,{fontSize: getFontSize(16),}]}>{infoBooking?.area?.name}</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text>Cambiar</Text>
                </TouchableOpacity>
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontWeight:'400'
    },
    lblSubtitle:{
        fontSize: getFontSize(14), 
        width: 220,
        textAlign:'center',
        marginVertical:10
    },
    btn:{
        width: 140,
        height:29,
        borderWidth:1,
        borderColor: ColorsCeiba.darkGray,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
    }
})

export default RequesJoinSendScreen;