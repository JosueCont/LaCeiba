import React,{ useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useNavigation } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import RequestJoinItem from "../../../../components/laceiba/Booking/RequestJoinItem";
import BtnCustom from "../../../../components/laceiba/CustomBtn";

const JoinPetitionScreen = () => {
    const navigation = useNavigation();
    const requested = {
        schedule: '8:00 am',
        people:[
            {name:'Josué Contreras',},
            {name:'Alvaro Uribe'},
            {name:'Alberto Noah'},
            {name:'Alex Dzul'}
        ]
    }
    return(
        <HeaderBooking>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>Lunes marzo 18 - Tee 1</Text>
                    <TouchableOpacity style={styles.btnHoles}>
                        <Text>18 Hoyos</Text>
                    </TouchableOpacity>
                </View>
                <RequestJoinItem requested={requested} />
                <BtnCustom 
                    title="Petición para unirse a grupo"
                    onPress={() => navigation.navigate('JoinSend')}/>
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20, 
        marginTop: 25
    },
    lblTitle:{
        color: ColorsCeiba.blackBtns, 
        fontSize: getFontSize(20), 
        fontWeight:'400',
        textTransform:'capitalize',
        marginBottom:10
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:8
    },
    btnHoles:{
        width: 95,
        height:29,
        borderRadius:20,
        borderWidth: 1,
        borderColor: ColorsCeiba.darkGray,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default JoinPetitionScreen;