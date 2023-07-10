import React, { useEffect, useRef, useState } from "react";
import { Button, Image, ScrollView, Skeleton, Text, useToast, View } from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import { Colors } from "../Colors";
import ModalInfo from "./Modals/ModalInfo";
import imgLogo from '../assets/imgLogo.png'
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from "@react-navigation/native";

const QRScreenInvitation = ({ navigation, route }) => {
    const [imageQRCode, setImageQRCode] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const isFocused = useIsFocused();
    const toast = useToast();
    const imgRef = useRef();

    useEffect(() => {
        if (isFocused) {
          //  validatePermission()
        }
    }, [isFocused])

    const validatePermission = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status == 'denied' || status == 'undetermined') {
            navigation.navigate('AskForMediaLibraryScreen', { screenOk: 'QRScreenInvitation', screenReject: 'BookingsDetailScreen', invitation: route.params.invitation })
        }
    }

    const captureScreenFunction = () => {
        captureRef(imgRef, {
            format: "png",
            quality: 1,
        }).then(
            async (uri) => {
                await MediaLibrary.saveToLibraryAsync(uri)
                toast.show({
                    description: "Imagen guardada en tu galería."
                })
            }
            ,
            (error) => {
                toast.show({
                    description: "Ocurrió un error, no se pudo descargar la imagen."
                });
                console.error("Oops, snapshot failed", error)
            }
        );
    }

    useEffect(() => {
        setImageQrFunction()
    }, [])

    const setImageQrFunction = () => {
        setImageQRCode(route?.params?.invitation?.qr?.url)
    }

    return (
        <LayoutV3>
            <ScrollView>
                <View mx={6} mt={10}>
                    <ViewShot ref={imgRef}>

                        <View height={450} borderColor={Colors.green} borderWidth={0.5} borderRadius={20} overflow={'hidden'} mb={6}>
                            <View flex={0.4} bgColor={Colors.green}>
                                <View mt={4} flex={1} justifyContent={'center'} alignItems={'center'} mb={2}>
                                    <Image source={imgLogo} width={100} height={100}></Image>
                                </View>
                            </View>

                            <View flex={1} bgColor={Colors.green} borderBottomRadius={20}>
                                <View flex={1} alignItems={'center'} justifyContent={'center'} mb={4}>
                                    <TouchableOpacity onPress={()=>{ setModalQrPreview(true) }}>
                                            <Image source={{ uri: imageQRCode }} width={250} height={250} mb={4} />
                                     </TouchableOpacity>
                                    <Text color={'white'} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'}>
                                        Código: {route?.params?.invitation?.qr?.accesCode}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ViewShot>


                    <View>
                        <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={4}>
                        Escanea este QR antes de iniciar el juego, es importante esta confirmación de todos los participantes de tu grupo.
                        </Text>

                        <Button onPress={async () => {
                            const { status } = await MediaLibrary.getPermissionsAsync();
                            status == 'granted' ? captureScreenFunction() : validatePermission()
                        }}>Descargar</Button>

                        <Button mt={2} mb={4} onPress={() => navigation.goBack()}>Regresar</Button>
                    </View>

                </View>
                <ModalInfo text={modalText} visible={modalVisible} setVisible={setModalVisible} textButton={'Entendido'} iconType={'exclamation'} close={true} />
            </ScrollView>
        </LayoutV3>
    )
}

export default QRScreenInvitation;