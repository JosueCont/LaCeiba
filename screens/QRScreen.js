import React, {useEffect, useRef, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, useToast, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {request} from "../api/Methods";
import {connect} from "react-redux";
import {ImageBackground, Linking, RefreshControl} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import imgLogo from '../assets/imgLogo.png'
import ViewShot, {captureRef} from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {useIsFocused} from "@react-navigation/native";
import googleWallet from '../assets/googleWallet.png';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getTokenGoogleWallet } from "../api/Requests";
import axios from "axios";

const QRScreen = ({navigation, appDuck, route}) => {
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
            (error) => {toast.show({
                description: "Ocurrió un error, no se pudo descargar la imagen."
                });
                console.error("Oops, snapshot failed", error)}
        );
    }
    const openURI = async () => {
        // TODO: cambiar la URL para descargar el pase
       /* const url = 'http://10.124.0.67:3000/download'
        const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
        if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
        } else {
            console.log(`Don't know how to open this URL: ${url}`);
        }*/
    }

    //TODO: Uncomment when service is ready
    const saveToGoogleWallet = async () => {
        try {
            console.log('try to open wallet');
            // const body = {
            //     userId: appDuck.user.id,
            //     username: appDuck.user.firstName + " " + appDuck.user.lastName,
            //     service: appDuck.user.partner.parentesco,
            //     qr: imageQRCode
            // }
            // const response = await  axios.post('http://192.168.1.64:3000/wallet/google/generate-token', body); //getTokenGoogleWallet(body);

            // console.log(response.data);
            // if(response?.data?.token){
            //     Linking.openURL(response?.data?.token);
            // }
        } catch (error) {
            console.log(error);
        }
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

                        {
                            route.params?.card === true ?
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
                                :
                                <View height={400} borderColor={Colors.green} borderRadius={20} overflow={'hidden'} mb={10}>
                                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                        {
                                            refreshing === true ?
                                                <Skeleton width={150} height={150}/>
                                                :
                                                <Image source={{uri: imageQRCode}} width={250} height={250}/>
                                        }
                                    </View>
                                </View>

                        }

                    </ViewShot>


                    <View>
                        {
                            route.params?.card === true ?
                                <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                                    Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                                </Text> :
                                <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                                    Muestra este código en {'\n'}la entrada del área que reservó
                                </Text>
                        }
                        <Button onPress={() => openURI()}>Wallet</Button>

                        {
                            route.params?.card === true &&
                            <Button mb={2} onPress={() => captureScreenFunction()}>Descargar</Button>
                        }
                        <View flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <TouchableOpacity onPress={()=>{saveToGoogleWallet();}}>
                                <Image source={googleWallet}></Image>
                            </TouchableOpacity>
                        </View>
                        <Button mt={5} onPress={() => navigation.goBack()}>Terminar</Button>
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