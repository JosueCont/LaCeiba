import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";


const ModalAsk = ({
                      visible,
                      setVisible,
                      title = '',
                      text = 'Texto informativo',
                      textButton = 'Entendido',
                      colorSchemeButtonOk='green',
                      close = true,
                      iconType = 'check',
                      textNoButton = 'No',
                      action
                  }) => {

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
                        // Background Linear Gradient
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

                    {
                        close === true &&
                        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.darkPrimary, borderRadius: 60}}
                                          onPress={() => setVisible(false)}>
                            <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                        </TouchableOpacity>
                    }

                    <View mb={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        {
                            iconType === 'exclamation' ?
                                <Icon as={AntDesign} name={'exclamationcircleo'} color={Colors.secondary} size={'2xl'}/> :
                                iconType === 'check' &&
                                <Icon as={AntDesign} name={'checkcircleo'} color={Colors.secondary} size={'2xl'}/>
                        }


                    </View>
                    <View>
                        {
                            title !== '' ?
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6}>{title}</Text>
                                    <Text style={styles.modalText} fontSize={'xs'} mb={6} textAlign={'justify'}>{text}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6} textAlign={'justify'}>{text}</Text>
                                </View>
                        }


                    </View>
                    <View flexDirection={'row'}>
                        <View flex={1} p={2}>
                            <Button colorScheme={'green'} onPress={() => setVisible(false)}>{textNoButton}</Button>
                        </View>
                        <View flex={1} p={2}>
                            <Button colorScheme={colorSchemeButtonOk} onPress={() => action()}>{textButton}</Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalAsk;