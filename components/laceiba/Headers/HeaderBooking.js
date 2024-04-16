import React,{ Children, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { Ionicons } from '@expo/vector-icons';
import Options from "../Options";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../../redux/ducks/bookingDuck";

const {height, width} = Dimensions.get('window');

const HeaderBooking = ({children, showFilters=true}) => {
    const dispatch = useDispatch();
    const option = useSelector(state => state.bookingDuck.option)

    const options = [
        {name:'Tee time', },
        {name:'Tennis'},
        {name:'Gym'},
        {name:'Restaurant'}
    ]
    return(
        <View style={styles.container}>
            <View style={{width: width, marginBottom:24}}>
                <Options isFlowBooking={true}/>
            </View>
            {showFilters && <View style={{flexDirection:'row', marginHorizontal:20, justifyContent:'space-between'}}>
                {options.map((item, index) => (
                    <TouchableOpacity 
                        onPress={() => dispatch(setOption(index))}
                        style={{borderBottomWidth: option === index ? 2 : 0, borderBottomColor: ColorsCeiba.blackBtns, paddingBottom:5}}>
                        <Text>{item?.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>}
            <ScrollView
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                nestedScrollEnabled={true}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1, paddingBottom:20}}
            >
                <View style={{flex:1, borderTopEndRadius:8, borderTopLeftRadius:8,}}>
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: ColorsCeiba.white
    }
})

export default HeaderBooking