import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";

const ModalInfo = ({visible, setVisible, title = '', text = 'Texto informativo', textButton = 'Continuar'}) => {
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
                        <Icon as={AntDesign} name={'checkcircleo'} color={Colors.yellow} size={'2xl'}/>
                    </View>
                    <View>
                        {
                            title !== '' ?
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6}>{title}</Text>
                                    <Text style={styles.modalText} fontSize={'xs'} mb={6}>{text}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6}>{text}</Text>
                                </View>
                        }

                        <Button colorScheme={'greenV2'} onPress={() => setVisible(false)}>{textButton}</Button>
                    </View>

                </View>
            </View>
        </Modal>

    );
};


export default ModalInfo;