import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";

const ModalBookingConfirmation = ({visible, setVisible, date, hour, people, onConfirm}) => {
    const [heightGradient, setHeightGradient] = useState(null);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView} onLayout={(event) => {
                    const {x, y, height, width} = event.nativeEvent.layout;
                    setHeightGradient(height)
                }}>
                    <LinearGradient
                        colors={[Colors.greenV5, Colors.greenV2]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: heightGradient,
                            borderRadius: 20
                        }}
                    />
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.greenV4, borderRadius: 60}}
                                      onPress={() => setVisible(false)}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                    <View mb={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AntDesign} name={'questioncircleo'} color={Colors.yellow} size={'2xl'}/>
                    </View>
                    <View>
                        <Text style={styles.modalText} mb={6} fontSize={'lg'} fontFamily={'titleConfortaaRegular'}>Confirmación de reservación</Text>
                        <Text style={styles.modalText} mb={6} fontSize={'2xl'} fontFamily={'titleConfortaaBold'}>Fecha y hora</Text>
                        <Text style={styles.modalText} mb={6} fontSize={'2xl'} fontFamily={'titleConfortaaBold'}>{date} </Text>
                        <Text style={styles.modalText} mb={6} fontSize={'2xl'} fontFamily={'titleConfortaaBold'}>{hour} </Text>

                        <Text style={styles.modalText} mb={6} fontSize={'lg'} fontFamily={'titleConfortaaRegular'}>Número de personas</Text>
                        <Text style={styles.modalText} mb={6} fontSize={'2xl'} fontFamily={'titleConfortaaBold'}>{people.length + 1} personas </Text>

                        <View flexDirection={'row'}>
                            <View flex={6} p={2}>
                                <Button mb={6} colorScheme={'green'} onPress={() => {onConfirm();}}>Confirmar</Button>
                                <Button mb={2} colorScheme={'green'} onPress={() => setVisible(false)}>Regresar</Button>    
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalBookingConfirmation;