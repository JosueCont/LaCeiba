import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const PersonItem = ({item,index}) => {
    return(
        <View style={[styles.itemOverlap,{position:'absolute', left: index === 0 ? 0 : index*22}]}>
            <Image source={item?.image} style={styles.img}/>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: 32,
        height:32,
        borderRadius: 16,
        borderWidth: 1,
        resizeMode:'contain',
        borderColor: ColorsCeiba.white
    },
})

export default PersonItem;