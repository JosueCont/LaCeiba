import React, {useEffect, useRef, useState} from "react";
import {Button, Icon, Image, ScrollView, Skeleton, Text, useToast, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {request} from "../api/Methods";
import {connect} from "react-redux";
import {ImageBackground, Linking, Platform, RefreshControl, Modal} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import imgLogo from '../assets/imgLogo.png'
import ViewShot, {captureRef} from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {useIsFocused} from "@react-navigation/native";
import googleWallet from '../assets/googleWallet.png';
import addToAppleWalletBtn from '../assets/esmx_addtoapplewallet.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { getTokenGoogleWallet, logOut } from "../api/Requests";
import axios from "axios";
import Constants from "expo-constants";
import bgButton from "../assets/bgButton.png";
import iconAccess from "../assets/iconAccess.png";
import Animated from "react-native-reanimated";
import {AntDesign} from "@expo/vector-icons";
import { loggedOutAction } from "../redux/ducks/appDuck";

const QRScreen = ({navigation, loggedOutAction, appDuck, route}) => {
    const [refreshing, setRefreshing] = useState(null);
    const [imageQRCode, setImageQRCode] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalQRPreview, setModalQrPreview] = useState(null);
    const [modalText, setModalText] = useState(null);
    const isFocused = useIsFocused();
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const toast = useToast();

    const imgRef = useRef();

    useEffect(() => {
        if (isFocused) {
          //  validatePermission()
        }
        console.log(route.params)
    }, [isFocused])

    const validatePermission = async () => {
        const {status} = await MediaLibrary.getPermissionsAsync();
        if (status == 'denied' || status  == 'undetermined') {
            let params = {}
            if(route.params.card){
                params = {...params, card: route.params.card}
            }
            if(route.params.invitation) {
                params = {...params, invitation:route.params.invitation}
            }
            console.log(Object.keys(route.params))
            navigation.navigate('AskForMediaLibraryScreen', {screenOk: 'QRScreen', screenReject: 'QRScreen', ...params})
        }
    }

    useEffect(() => {
        generateQRCodeFunction()
    }, [])

    const generateQRCodeFunction = async () => {
        try {
            setRefreshing(true)
            const response = await request(`/v1/users/${appDuck.user.id}/qr-code`, '', 'get')
            setImageQRCode(response.data.qrCode)
        } catch (e) {
            setModalText(e.data.message);
            setModalVisible(true);
            console.log(e)
            if(error?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
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
    const addToAppleWallet = async () => {
        try {
            let baseURL = Constants.expoConfig.extra.production ? Constants.expoConfig.extra.URL : Constants.expoConfig.extra.URL_DEV;
            const url = `${baseURL}/v1/wallets/users/${appDuck.user.id}/apple`
            const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
            if (supported) {
                await Linking.openURL(url);
            } else {
                setModalText('No fue posible agregar la wallet');
                setModalVisible(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    //TODO: Uncomment when service is ready
    const saveToGoogleWallet = async () => {
        try {
            console.log('try to open wallet');
            const response = await getTokenGoogleWallet('', [appDuck.user.id]);
            const fullUrl = response?.data?.data?.url + response?.data?.data?.token;
            console.log(fullUrl);
            if(await Linking.canOpenURL(fullUrl)){
                await Linking.openURL(fullUrl);
            }else{
                setModalText('No fue posible agregar la wallet');
                setModalVisible(true);
            }
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
                                <View height={450} borderColor={Colors.green} borderWidth={0.5} borderRadius={20} overflow={'hidden'}>
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
                                                    <TouchableOpacity onPress={()=>{ setModalQrPreview(true) }}>
                                                        <Image source={{uri: imageQRCode}} width={180} height={180}/>
                                                    </TouchableOpacity>
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
                                <View height={400} borderColor={Colors.green} borderRadius={20} overflow={'hidden'}>
                                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                        {
                                            refreshing === true ?
                                                <Skeleton width={150} height={150}/>
                                                :
                                                <TouchableOpacity onPress={()=>{ setModalQrPreview(true) }}>
                                                     <Image source={{uri: imageQRCode}} width={250} height={250}/>
                                                 </TouchableOpacity>
                                        }
                                    </View>
                                </View>

                        }

                    </ViewShot>


                    <View mt={10}>
                        {
                            route.params?.card === true ?
                                <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                                    Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                                </Text> :
                                <Text color={Colors.green} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                                    Muestra este código en {'\n'}la entrada del área que reservó
                                </Text>
                        }

                        {
                            route.params?.card === true &&
                            <Button  mt={2} onPress={async() => {
                                const {status} = await MediaLibrary.getPermissionsAsync();
                                status == 'granted' ?  captureScreenFunction() : validatePermission()}}>Descargar</Button>
                        }

                        <Button mt={2} mb={4} onPress={() => navigation.navigate('HomeScreen')}>Terminar</Button>

                        { Platform.OS == 'android' && Constants.expoConfig.extra.googleWallet &&
                            <View flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={2}>
                            <TouchableOpacity onPress={()=>{saveToGoogleWallet();}}>
                                <Image source={googleWallet}></Image>
                            </TouchableOpacity>
                        </View>
                        }
                        { Platform.OS == 'ios' && Constants.expoConfig.extra.appleWallet &&
                            <View flex={1} mt={2}>
                                <TouchableOpacity onPress={() => addToAppleWallet()}>
                                    <Image source={addToAppleWalletBtn} style={{width: '100%', resizeMode: 'contain', height:64}}/>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                </View>
            </ScrollView>
            <ModalInfo text={modalText} visible={modalVisible} setVisible={setModalVisible} textButton={'Entendido'} iconType={'exclamation'} close={true}/>
            <Modal 
                visible={modalQRPreview} 
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                    setModalQrPreview(!modalQRPreview)
                }}
                >
                    <View flex={1}
                        style={{
                            backgroundColor: Colors.greenLight
                        }}
                    >
                    <View flex={.95} alignItems={'center'} justifyContent={'center'}>
                        {
                            refreshing === true ?
                                <Skeleton width={150} height={150}/>
                                :
                                <Image source={{uri: imageQRCode}} width={280} height={280}/>
                        }
                    </View>
                    <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                        <Button
                            style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: Colors.greenV4, borderRadius: 60}} 
                            onPress={() =>{ setModalQrPreview(!modalQRPreview)  }}
                        >
                            <Icon as={AntDesign} name={'close'} color={'white'} size={'lg'}></Icon>
                        </Button>
                    </View></View>
            </Modal>
        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState, {loggedOutAction})(QRScreen);