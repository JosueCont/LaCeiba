import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";

const ModalConfirmBooking = ({visible, setVisible, text = 'Texto informativo', textButton = 'Reenviar SMS', textButtonCancel = 'Cancelar'}) => {
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
                        colors={[Colors.lightPrimary, Colors.darkPrimary]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: heightGradient,
                            borderRadius: 20
                        }}
                    />
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.darkPrimary, borderRadius: 60}}
                                      onPress={() => setVisible(false)}>
                        <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                    </TouchableOpacity>
                    <View mb={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AntDesign} name={'questioncircleo'} color={Colors.secondary} size={'2xl'}/>
                    </View>
                    <View>
                        <Text style={styles.modalText} mb={6} fontSize={'lg'} fontFamily={'titleConfortaaRegular'}>{text}</Text>
                        <Text style={styles.modalText} mb={6} fontSize={'2xl'} fontFamily={'titleConfortaaBold'}>¿Estás de acuerdo?</Text>

                        <View flexDirection={'row'}>
                            <View flex={1} p={2}>
                                <Button colorScheme={'green'} onPress={() => setVisible(false)}>No</Button>

                            </View>
                            <View flex={1} p={2}>
                                <Button colorScheme={'green'} onPress={() => setVisible(false)} mb={2}>Sī</Button>

                            </View>
                        </View>

                        <Text style={styles.modalText} mb={6} fontSize={'lg'} fontFamily={'titleConfortaaRegular'}>Generar factura</Text>

                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalConfirmBooking;