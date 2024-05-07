import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import ReservationItem from "./ReservationItem";
import { useNavigation } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const NextReservationList = ({reservations}) => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={{marginBottom:20, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.lblTitle}>Proximas reservaciones</Text>
                <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.navigate('Reservations', { reservations })}>
                    <Text>Ver todos</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={reservations.slice(0,5)}
                keyExtractor={(_, index) => (index+1).toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(reservations.length)].map((x, i) =>  width * i + width*.6)}
                decelerationRate={0}
                snapToAlignment="center"
                renderItem={({item,index}) => (
                    <ReservationItem item={item} index={index}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft:25
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'400'
    },
})

export default NextReservationList;