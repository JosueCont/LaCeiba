import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";

const RequesJoinSendScreen = () => {
    return(
        <HeaderBooking>
            <View style={styles.container}>
                <Text style={[styles.lbl,{fontSize: getFontSize(20),}]}>Petición enviada</Text>
                <Text style={[styles.lbl,styles.lblSubtitle]}>Te avisaremos cuando sea aceptada por los socios</Text>
                <Text style={[styles.lbl,{fontSize: getFontSize(16),}]}>18 de marzo 11:00</Text>
                <Text style={[styles.lbl,{fontSize: getFontSize(16),}]}>Tee 1</Text>
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