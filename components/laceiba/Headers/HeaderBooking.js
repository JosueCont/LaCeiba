import React,{ Children, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Platform, FlatList } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { Ionicons } from '@expo/vector-icons';
import Options from "../Options";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../../redux/ducks/bookingDuck";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const HeaderBooking = ({children, showFilters=true, disabledOptions=false, isScrolling=true, goHome=false}) => {
    const dispatch = useDispatch();
    const focus = useIsFocused();
    const navigation = useNavigation()
    const option = useSelector(state => state.bookingDuck.option)
    const booking = useSelector(state => state.bookingDuck.dataBooking)
    const flatListRef = useRef();


    useEffect(() => {
        if(option != 0){
            if (flatListRef.current) {
                setTimeout(() => {
                    flatListRef?.current?.scrollToOffset({ offset: (100*option), animated: true });

                },500)
            }
        }
    },[focus])
    const options = [
        {name:'Tee time', },
        {name:'Tennis'},
        {name:'Gym'},
        {name:'Restaurant'}
    ]
    return(
        <View style={[styles.container, {paddingTop:15}]}>
            {/*<View style={{width: width, marginBottom:24, marginTop: Platform.OS === 'ios' ? 15 : 0}}>
                <Options isFlowBooking={true}/>
    </View>*/}
            {showFilters && <View style={{flexDirection:'row', marginHorizontal:20, justifyContent:'space-between', flexWrap:'wrap', width: width*.9,paddingRight:20,}}>
                <FlatList 
                    ref={flatListRef}
                    data={booking}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => (index+1).toString()}
                    renderItem={({item,index}) => item?.isActive && (
                        <TouchableOpacity 
                            disabled={disabledOptions}
                            key={(index+1).toString()}
                            onPress={() => dispatch(setOption(index))}
                            style={{borderBottomWidth: option === index ? 2 : 0, borderBottomColor: ColorsCeiba.blackBtns, paddingBottom:5, marginBottom:5, marginRight:15}}>
                        <Text>{item?.name}</Text>
                    </TouchableOpacity>
                    )}
                />
                
            </View>}
            {isScrolling ? (
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

            ):(
                <View style={{flex:1, borderTopEndRadius:8, borderTopLeftRadius:8,}}>
                    {children}
                </View>
            )}
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