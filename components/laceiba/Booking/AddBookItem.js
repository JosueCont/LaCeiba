import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";

const AddBookItem = ({question='', showSubtitle=true, type=1, counter=0, optionSelect=0, setOption, onMinus, onPlus}) => {
    const options = type === 1 ? [
        {option:'No'},{option:'Si'}
    ] : [
        {option:'9'},{option:'18'}
    ]
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.lbl}>{question}</Text>
                <View style={styles.contCounter}>
                    <TouchableOpacity 
                        style={styles.itemCounter} 
                        //disabled={(type ===  1 && counter === 0 && optionSelect === 0)}
                        disabled={counter<2}
                        onPress={onMinus}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={{flex:1,  textAlign:'center'}}>{counter.toString()}</Text>
                    <TouchableOpacity 
                        style={styles.itemCounter} 
                        disabled={(type === 1 && optionSelect === 0)}
                        onPress={onPlus}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{}}>
                {showSubtitle ? <Text style={{textAlign:'center', marginBottom:5}}>Hoyos</Text> : <Text></Text>}
               
                <View style={{flexDirection:'row', }}>
                    {options?.map((item,index) => (
                        <TouchableOpacity style={[styles.item,{backgroundColor: index === optionSelect ? ColorsCeiba.aqua : ColorsCeiba.white}]} onPress={() => setOption(index)}>
                            <Text>{item.option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', marginBottom:40,
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    lbl:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
    item:{
        width:60,
        height:27,
        borderRadius:20,
        borderWidth:1,
        borderColor: ColorsCeiba.darkGray,
        justifyContent:'center',
        alignItems:'center',
        marginRight:8
    },
    contCounter:{
        flexDirection:'row',
        width: 100,
        height:25,
        borderWidth:1,
        borderColor: ColorsCeiba.darkGray,
        borderRadius:20,
        marginTop:13,
        justifyContent:'center',
        alignItems:'center'
    },
    itemCounter:{
        flex:1, 
        alignItems:'center'
    }
})

export default AddBookItem;