import React,{ Children, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, ScrollView } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { Ionicons } from '@expo/vector-icons';
import Options from "../Options";

const {height, width} = Dimensions.get('window');

const HeaderHome = ({children}) => {
    return(
        <View style={styles.container}>
            <ScrollView
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1, paddingBottom:20}}
            >
            <ImageBackground 
                resizeMode='stretch'
                style={{width: width, height: 300,}}
                source={require('../../../assets/golfField.png')}>
                    {/*<Options />*/}
            </ImageBackground>
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

export default HeaderHome