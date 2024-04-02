import React from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import PersonItem from "./PersonItem";

const {height, width} = Dimensions.get('window');

const Registered = ({people}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Registrados</Text>
                <View style={styles.contRegister}>
                    <View style={styles.contImgLbl}>
                        <View style={styles.contListImg}>
                            {people.map((item,index) => (
                                <PersonItem item={item} index={index}/>
                            )).slice(0,5)}
                        </View>
                        {people.length > 0 && people.length > 5 && <Text>+{people.length - 5}</Text>}

                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.lbl}>Ver todos</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:25
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'400'
    },
    contRegister:{
        flexDirection:'row',
        marginTop:20, 
        marginBottom:30,
        alignItems:'center', 
        justifyContent:'space-between'
    },
    contImgLbl:{
        flexDirection:'row', 
        alignItems:'center',
    },
    contListImg:{
        flexDirection:'row', 
        width: 130, 
        height:35
    },
    btn:{
        backgroundColor: ColorsCeiba.aqua, 
        width:100, 
        height:40, 
        borderRadius: 20, 
        justifyContent:'center', 
        alignItems:'center',
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    lbl:{
        color: ColorsCeiba.white, 
        fontSize: getFontSize(12), 
        fontWeight:'400'
    }
})

export default Registered