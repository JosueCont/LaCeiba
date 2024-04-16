import React,{ useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddBookItem from "../../../../components/laceiba/Booking/AddBookItem";


const CreatePetitionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {item} = route?.params;

    const types = {
        1: ColorsCeiba.aqua,
        2: ColorsCeiba.lightYellow,
        3: ColorsCeiba.lightgray
    }
    return(
        <HeaderBooking>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <Text style={styles.lblTitle}>Lunes marzo 18 - Tee 1</Text>
                    <View style={[styles.contSchedule,{backgroundColor: types[item?.status]}]}>
                        <Text>{item?.date}</Text>
                    </View>
                </View>
                <AddBookItem 
                    question="¿Quieres rentar carrito?"
                    showSubtitle={false}
                    type={1}
                />
                <AddBookItem 
                    question="¿Cuántos jugadores?"
                    type={2}
                />
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddPlayers')}
                    style={styles.btn}>
                    <Text style={styles.lbl}>+ Añadir jugadores</Text>
                </TouchableOpacity>
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
        marginBottom:29
    },
    contSchedule:{
        width: 74,
        height: 26,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15,
        
    },
    btn:{
        width: 176,
        height:30,
        borderRadius:20,
        borderColor: ColorsCeiba.darkGray,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    }
})

export default CreatePetitionScreen;