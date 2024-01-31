import {Button, Icon, Text, View} from "native-base";
import { Colors } from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import { styles } from "./ModalInfoStyleSheet";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {AntDesign} from "@expo/vector-icons";
import { Alert, Modal, TouchableOpacity } from "react-native";

const ModalTransferPoint = ({visible, setVisible, actionNormalTransfer, actionMembersTransfer, partner, appDuck}) => {

    const [heightGradient, setHeightGradient] = useState(null);

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView} onLayout={(event) => {
                    const {x, y, height, width} = event.nativeEvent.layout;
                    setHeightGradient(height)
                }}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={[Colors.modal.bgColor1, Colors.modal.bgColor2]}
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
                                      onPress={() =>{ 
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>
                        <Text style={styles.modalText} mb={8} fontSize={'sm'}>¿A quién le transfieres los puntos?</Text>
                        <Button colorScheme={'green'} onPress={() => actionNormalTransfer()} mb={4}>{"Socio externo para reservaciones"}</Button>
                        <Button colorScheme={'green'} onPress={() => actionMembersTransfer()} mb={4}>{"Miembros de mi acción"}</Button>
                    </View>
                </View>
            </View>

        </Modal>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ModalTransferPoint);