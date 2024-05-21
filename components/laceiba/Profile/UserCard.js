import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-native-qrcode-svg";


const {height, width} = Dimensions.get('window');

const UserCard = ({logo, user, imgUser}) => {

    return(
        <View style={styles.card}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{width:10, height:10, borderRadius:5, backgroundColor: ColorsCeiba.white, position:'absolute', top:100, right:-4}}/>
                <View style={{width:10, height:10, borderRadius:5, backgroundColor: ColorsCeiba.white, position:'absolute', top:100, left:-4}}/>
                <Image source={{uri:logo}}  style={{width:100, height:100, resizeMode:'contain', marginTop:10}}/>

            </View>
            <View style={{flex:3}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:12, alignItems:'center', marginBottom:10}}>
                    <View>
                        <Text style={styles.lblSub}>Socio</Text>
                        <Text style={[styles.lbl,{textTransform:'capitalize'}]}>{user?.user?.fullName}</Text>
                    </View>
                    <View style={styles.contImage}>
                        <Image source={{uri: imgUser}} style={styles.img}/>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:12, alignItems:'center', marginBottom:10}}>
                    <View>
                        <Text style={styles.lblSub}>No. de Acción</Text>
                        <Text style={[styles.lbl,{textTransform:'capitalize'}]}>{user?.user?.ghin}</Text>
                    </View>
                    <View>
                        <Text style={styles.lblSub}>Socio</Text>
                        <Text style={[styles.lbl,{textTransform:'capitalize'}]}>{user?.parentesco}</Text>
                    </View>
                </View>
                <View style={{width:150, height:150, backgroundColor:ColorsCeiba.white, alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
                    <QRCode
                        style={styles.qrCode}
                        value={user?.user?.qrCode}
                        //color={Colors.blueText}
                        logoBackgroundColor="transparent"
                        size={120}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:width*.9,
        paddingVertical:15,
        //flex:1,
        //height: height*.5,
        backgroundColor: ColorsCeiba.darkGray, 
        marginTop:10,
        borderRadius:10
    },
    lbl:{
        color: ColorsCeiba.white,
        fontSize: getFontSize(14)
    },
    lblSub:{
        color: ColorsCeiba.yellow,
        fontSize: getFontSize(12)
    },
    contImage:{
        width:60,
        height:60,
        borderRadius:300,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor: ColorsCeiba.white,
        marginRight:10,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    img:{
        width: 56, 
        height: 56,
        borderRadius:300, 
        resizeMode:'cover'
    },
})

export default UserCard;