import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import RequestJoinItem from "../../../../components/laceiba/Booking/RequestJoinItem";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import moment from "moment";
import { postJoinBookingRequest } from "../../../../api/Requests";
import ModalInfo from "../../../Modals/ModalInfo";

const FixedGroupDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const appDuck = useSelector(state => state.appDuck)
    const [allMembers, setAllMembers] = useState(null)
    const {fixedGroup, hour, areaId, date} = route?.params

    useEffect(() => {
        if (!fixedGroup) return;
        

        const members = fixedGroup?.members?.map( m => `${m?.firstName} ${m?.lastName}`)
        const leaders = fixedGroup?.leaders?.map( l => `${l?.firstName} ${l?.lastName}`)

        const allPeople = [...members, ...leaders];
        setAllMembers(allPeople);

    }, [fixedGroup])
    return(
        <HeaderBooking disabledOptions={true}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>{moment(date,'YYYY-MM-DD').format('dddd MMMM D')} - {fixedGroup?.name}</Text>
                    
                    <View style={styles.btnHoles}>
                        <Text>Grupo fijo</Text>
                    </View>
                </View>
                <RequestJoinItem requested={fixedGroup} hour={hour} members={allMembers} />
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

export default FixedGroupDetailScreen;