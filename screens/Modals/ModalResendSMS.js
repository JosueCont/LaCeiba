import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";

const ModalResendSMS = ({visible, setVisible, text = 'Texto informativo', textButton = 'Reenviar SMS', textButtonCancel = 'Cancelar'}) => {
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
                <View style={styles.modalView}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.greenV4, borderRadius: 60}}
                                      onPress={() => setVisible(false)}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                    <View mb={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AntDesign} name={'exclamationcircleo'} color={Colors.yellow} size={'2xl'}/>
                    </View>
                    <View>
                        <Text style={styles.modalText} mb={6} fontSize={'lg'}>{text}</Text>
                        <Button colorScheme={'greenV2'} onPress={() => setVisible(false)} mb={2}>{textButton}</Button>
                        <Button colorScheme={'greenV2'} onPress={() => setVisible(false)}>{textButtonCancel}</Button>

                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalResendSMS;