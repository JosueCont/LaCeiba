import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity, StyleSheet, Dimensions, Text} from "react-native";
//import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import { getFontSize } from "../../utils";
import { ColorsCeiba } from "../../Colors";
import BtnCustom from "../../components/laceiba/CustomBtn";
import moment from "moment";
import QRCode from "react-native-qrcode-svg";



const {height, width} = Dimensions.get('window');

const ModalQR = ({visible, setVisible, dataQr, dataReservation}) => {
    console.log(dataQr)
    return(
        <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={setVisible}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View flex={1.5} backgroundColor={ColorsCeiba.darkGray} borderTopRightRadius={10} borderTopLeftRadius={10}>

                    </View>
                    <View flex={1} backgroundColor={ColorsCeiba.aqua} alignItems={'center'} justifyContent={'center'}>
                        <Text style={styles.lbl}>{dataReservation?.area?.name}</Text>
                        <Text style={styles.lbl}>{moment(dataReservation?.dueDate,'YYYY-MM-DD').format('dddd MMMM D')}</Text>
                        <Text style={styles.lbl}>{dataReservation?.dueTime}</Text>
                    </View>
                    <View flex={3} backgroundColor={ColorsCeiba.white} alignItems={'center'} justifyContent={'center'}>
                        <QRCode
                            style={styles.qrCode}
                            value={dataQr?.accesCode}
                            logoSize={10}
                            //color={Colors.blueText}
                            logoBackgroundColor="transparent"
                            size={150}
                        />
                        <View flexDirection={'row'} justifyContent={'space-evenly'} width={'100%'} marginTop={3}> 
                            <View>
                                <Text>Socio</Text>
                                <Text style={{textTransform:'capitalize'}}>{dataQr?.user?.firstName.split(' ')[0]} {dataQr?.user != null ? dataQr?.user?.lastName.split(' ')[0] : dataQr?.guestName}</Text>
                            </View>
                            <View>
                                <Text>Reserva</Text>
                                <Text>{dataReservation?.id.toString()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:20}}>
                    <Text style={{marginVertical:20, width: 150, textAlign:'center', alignSelf:'center'}}>Muestre el codigo en la sala de registro para poder acceder</Text>
                    {/*<BtnCustom title="Compartir" bgColor={ColorsCeiba.darkGray}/>*/}
                </View>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={setVisible}>
                    <AntDesign name="closecircle" size={28} color="black" />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: ColorsCeiba.white,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width *.7,
        height: height *.56, 
        borderRadius:10,
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
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ModalQR