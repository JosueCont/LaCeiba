import React from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { ColorsCeiba } from "../../Colors";
import { useNavigation } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const Options = ({isFlowBooking=false, goHome}) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            {!isFlowBooking ? (
                <TouchableOpacity
                    style={styles.btn}>
                    <Ionicons name="search" size={20} color="black" />
                </TouchableOpacity>
            ):(
                <TouchableOpacity 
                    onPress={() => goHome ? navigation.navigate('House') : navigation.goBack()}
                    style={styles.btn}>
                    <Ionicons name="chevron-back" size={20} color="black" />
                </TouchableOpacity>
            )}
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.btn,{marginRight:13}]}>
                    <MaterialIcons name="group" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <Fontisto name="bell" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginHorizontal:25
    },
    btn:{
        width: 40, 
        height:40, 
        borderRadius:20, 
        backgroundColor: ColorsCeiba.white, 
        justifyContent:'center', 
        alignItems:'center'
    }
})

export default Options;