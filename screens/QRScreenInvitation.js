import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, Image, ScrollView, Skeleton, Text, useToast, View } from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import { Colors } from "../Colors";
import ModalInfo from "./Modals/ModalInfo";
import imgLogo from '../assets/imgLogo.png'
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getConfig } from "../api/Requests";

const QRScreenInvitation = ({ navigation, route }) => {
    const [imageQRCode, setImageQRCode] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [refreshingLogo, setRefreshingLogo] = useState(null);
    const [imageLogo, setImageLogo] = useState(null);
    const isFocused = useIsFocused();
    const toast = useToast();
    const imgRef = useRef();

    useEffect(() => {
        if (isFocused) {
          //  validatePermission()
          getConfiguration()
        }
    }, [isFocused])

    const getConfiguration = async()=>{
        try{
            setRefreshingLogo(true)
            const response =  await getConfig()
            setImageLogo(response.data.logoBase64)
        }catch(e){
            console.log(e)
        } finally {
            setRefreshingLogo(false)
        }
    }

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

                        <View height={450} bgColor={Colors.partnerCard.bg} borderRadius={20} overflow={'hidden'} mb={6}>
                            <View flex={0.4} bgColor={Colors.partnerCard.photoBg}>
                                <View mt={4} flex={1} justifyContent={'center'} alignItems={'center'} mb={2}>
                                    {
                                        refreshingLogo === true ?
                                            <Skeleton width={100} height={100}/>
                                            :
                                            <Image source={{uri: imageLogo}} width={100} height={100}/>
                                    }
                                </View>
                            </View>

                            <View flex={1} bgColor={Colors.primary} borderBottomRadius={20}>
                                <View flex={1} alignItems={'center'} justifyContent={'center'} mb={4}>
                                            <Image source={{ uri: imageQRCode }} width={250} height={250} mb={4} />
                                    <Text color={Colors.bgPrimaryText} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'}>
                                        Código: {route?.params?.invitation?.qr?.accesCode}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ViewShot>


                    <View>
                        <Text color={Colors.primary} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={4}>
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