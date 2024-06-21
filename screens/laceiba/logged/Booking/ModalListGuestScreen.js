import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,  } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";

const ModalListGuestScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    return(
        <HeaderBooking showFilters={false}>

        </HeaderBooking>
    )
}

const styles = StyleSheet.create({

})

export default ModalListGuestScreen