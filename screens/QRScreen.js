import React, {useEffect, useRef, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, useToast, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {request} from "../api/Methods";
import {connect} from "react-redux";
import {RefreshControl} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import imgLogo from '../assets/imgLogo.png'
import ViewShot, {captureRef} from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {useIsFocused} from "@react-navigation/native";

const QRScreen = ({navigation, appDuck}) => {
    const [refreshing, setRefreshing] = useState(null);
    const [imageQRCode, setImageQRCode] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const isFocused = useIsFocused();
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const toast = useToast();

    const imgRef = useRef();

    console.log(appDuck)

    useEffect(() => {
        if (isFocused) {
            validatePermission()
        }
    }, [isFocused])

    const validatePermission = async () => {
        console.log(permissionResponse)
        if (permissionResponse.granted === false) {
            navigation.navigate('AskForMediaLibraryScreen', {screenOk: 'QRScreen', screenReject: 'QRInstructionsScreen'})
        }
    }

    useEffect(() => {
        generateQRCodeFunction()
    }, [])

    const generateQRCodeFunction = async () => {
        try {
            setRefreshing(true)
            const response = await request(`/v1/users/${appDuck.user.id}/qr-code`, '', 'get')
            console.log(response.data)
            console.log(response.data.qrCode);
            setImageQRCode(response.data.qrCode)
        } catch (e) {
            setModalText(e.data.message);
            setModalVisible(true);
            console.log(e)
        } finally {
            setRefreshing(false)
        }

    }

    const captureScreenFunction = () => {
        captureRef(imgRef, {
            format: "jpg",
            quality: 1,
        }).then(
            async (uri) => {
                await MediaLibrary.saveToLibraryAsync(uri)
                toast.show({
                    description: "Imagen guardada en tu galería."
                })
            }
            ,
            (error) => console.error("Oops, snapshot failed", error)
        );
    }

    return (
        <LayoutV3>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        tintColor={Colors.green}
                        refreshing={refreshing}
                        onRefresh={generateQRCodeFunction}
                    />
                }
            >
                <View mx={16} mt={10}>

                    <ViewShot ref={imgRef}>

                        <View height={450} borderColor={Colors.green} borderWidth={0.5} borderRadius={20} overflow={'hidden'} mb={10}>
                            <View flex={0.7} bgColor={Colors.green}>
                                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                    <Image source={imgLogo} width={100} height={100}></Image>
                                </View>
                                <View bgColor={Colors.greenV4} height={50} justifyContent={'center'}>
                                    <Text textAlign={'center'}>{appDuck.user.firstName}{'\n'}{appDuck.user.lastName}</Text>
                                </View>

                            </View>
                            <View flex={1} bgColor={'white'} borderBottomRadius={20}>
                                <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                    {
                                        refreshing === true ?
                                            <Skeleton width={150} height={150}/>
                                            :
                                            <Image source={{uri: imageQRCode}} width={150} height={150}/>
                                    }
                                </View>
                                <View flexDir={'row'} p={3}>
                                    <View flex={1}>
                                        <Text color={Colors.green} textAlign={'center'} fontSize={'xs'}>No. de acción</Text>
                                        <Text color={Colors.green} textAlign={'center'} fontSize={'md'} fontFamily={'titleComfortaaBold'}>{appDuck.user.partner.accion}</Text>
                                    </View>
                                    <View flex={1}>
                                        <Text color={Colors.green} textAlign={'center'} fontSize={'xs'}>Tipo de acción</Text>
                                        <Text color={Colors.green} textAlign={'center'} fontSize={'md'} fontFamily={'titleComfortaaBold'}>{appDuck.user.partner.parentesco}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ViewShot>


                    <View>
                        <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                            Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                        </Text>

                        <Button mb={2} onPress={() => captureScreenFunction()}>Descargar</Button>
                        <Button onPress={() => navigation.goBack()}>Terminar</Button>
                    </View>

                </View>
            </ScrollView>
            <ModalInfo text={modalText} visible={modalVisible} setVisible={setModalVisible} textButton={'Entendido'} iconType={'exclamation'} close={true}/>
        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState)(QRScreen);