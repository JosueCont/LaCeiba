import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, TouchableOpacity } from "react-native";
import { styles } from './ModalInfoStyleSheet';
import { Button, Icon, Text, View } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates"

const ModalVersion = ({
    visible,
    setVisible,
    title = '',
    textButton = 'Entendido',
    close = true,
    textDescription = '',
    iconType = 'check',
    action = null,
}) => {
    const {
        currentlyRunning,
        isUpdateAvailable,
        isUpdatePending
    } = Updates.useUpdates();

    const [loading, setLoading] = useState(false)
    const [heightGradient, setHeightGradient] = useState(null);
    const [message, setMessage] = useState("")


    useEffect(() => {
        onFetchUpdateAsync()
    }, []);

    const onFetchUpdateAsync = async () => {
        try {
            setLoading(true)
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                setMessage("Actualización descargada.")
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }else{
                setMessage("No se encontraron actualizaciones.")
            }
x        } catch (error) {
            // You can also add an alert() to see the error message in case of an error when fetching updates.
            console.log(`Error fetching latest Expo update: ${error}`);
            setMessage("No se encontraron actualizaciones.")
        }
        setLoading(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRquestClose={() => {
                setVisible(!visible)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView} onLayout={(event) => {
                    const { x, y, height, width } = event.nativeEvent.layout;
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

                    {
                        close === true &&
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.darkPrimary, borderRadius: 60 }}
                            onPress={() => setVisible(false)}>
                            <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                        </TouchableOpacity>
                    }


                    <View>
                        {
                            title !== '' ?
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6}>{title}</Text>
                                    <Text style={styles.modalText} fontSize={'xs'} mb={6} textAlign={'justify'}>{message}</Text>

                                    {textDescription !== '' &&
                                        <Text style={styles.modalText} fontSize={'xs'} mb={6} textAlign={'justify'}>{textDescription}</Text>
                                    }
                                </View>
                                :
                                <View>
                                    <Text style={styles.modalText} fontSize={'lg'} mb={6} textAlign={'justify'}>{message}</Text>
                                </View>
                        }
                        {loading && <ActivityIndicator animating={loading} size="large" />}
                        <Button onPress={() => { if (action) { action(); } setVisible(false) }}>{textButton}</Button>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default ModalVersion;