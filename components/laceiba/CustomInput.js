import React from "react";
import { TextInput, View, Text, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils";
import { ColorsCeiba } from "../../Colors";

const {height, width} = Dimensions.get('window');

const CustomInput = ({title='',value, setValue,...props}) => {
    return(
        <View style={{marginHorizontal:10, marginBottom:10}}>
            <Text style={styles.lbl}>{title}</Text>
            <TextInput 
                onChangeText={setValue} 
                value={value} 
                style={[styles.input]} 
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400',
        marginBottom:5
    },
    input:{
        height:20,
        flex:1,
        borderBottomColor: ColorsCeiba.darkGray,
        borderBottomWidth:1, 
        paddingBottom:5,
        fontSize: getFontSize(12)
    }
})

export default CustomInput;