import React, {useEffect, useRef, useState} from "react";
import {Button, Icon, Image, ScrollView, Skeleton, Text, useToast, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {request} from "../api/Methods";
import {connect} from "react-redux";
import {ImageBackground, Linking, Platform, RefreshControl, Modal} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import ViewShot, {captureRef} from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {useIsFocused} from "@react-navigation/native";
import googleWallet from '../assets/googleWallet.png';
import addToAppleWalletBtn from '../assets/esmx_addtoapplewallet.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { getConfig, getTokenGoogleWallet, logOut } from "../api/Requests";
import axios from "axios";
import Constants from "expo-constants";
import {AntDesign} from "@expo/vector-icons";
import { loggedOutAction } from "../redux/ducks/appDuck";

const QRScreen = ({navigation, loggedOutAction, appDuck, route}) => {
    const [refreshing, setRefreshing] = useState(null);
    const [imageQRCode, setImageQRCode] = useState(null);
    const [refreshingLogo, setRefreshingLogo] = useState(null);
    const [imageLogo, setImageLogo] = useState(null);
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
        getConfiguration()
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
                        tintColor={Colors.primary}
                        refreshing={refreshing}
                        onRefresh={generateQRCodeFunction}
                    />
                }
            >
                <View mx={16} mt={10}>

                    <ViewShot ref={imgRef}>

                        {
                            route.params?.card === true ?
                                <View height={450} width={290} bgColor={Colors.partnerCard.bg} borderRadius={20} overflow={'hidden'}>
                                    {!appDuck.user.partner.profilrPictureUrl &&
                                    <View flex={0.8} bgColor={Colors.partnerCard.photoBg}>
                                        {refreshingLogo === true ? 
                                            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                                        
                                                <Skeleton width={100} height={100}/>
                                            </View>
                                        :
                                            <View flex={1} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} padding={3} flexDirection={'row'}>
                                                <Image 
                                                    source={{uri: appDuck.user.partner.profilePictureUrl}} 
                                                    width={'38%'} 
                                                    height={'100%'} 
                                                    marginRight={3}
                                                    style={{maxWidth: '38%', maxHeight: '100%', paddingRight: 4, borderRadius:5, borderWidth: 2, borderStyle: 'solid', borderColor: Colors.partnerCard.nameBg}}
                                                />
                                                <Image source={{uri: imageLogo}} width={'58%'} height={'100%'} style={{maxWidth: '60%', maxHeight: '100%'}}/>
                                            </View>
                                        }
                                        <View bgColor={Colors.partnerCard.nameBg} height={50} justifyContent={'center'}>
                                            <Text color={Colors.partnerCard.nameTextColor} textAlign={'center'}>{appDuck.user.firstName}{'\n'}{appDuck.user.lastName}</Text>
                                        </View>
                                    </View>
                                    ||
                                    <View flex={0.7} bgColor={Colors.partnerCard.photoBg}>
                                        <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                            {
                                                refreshingLogo === true ?
                                                    <Skeleton width={100} height={100}/>
                                                    :
                                                    <Image source={{uri: imageLogo}} width={100} height={100}/>
                                            }
                                        </View>
                                        <View bgColor={Colors.partnerCard.nameBg} height={50} justifyContent={'center'}>
                                            <Text color={Colors.partnerCard.nameTextColor} textAlign={'center'}>{appDuck.user.firstName}{'\n'}{appDuck.user.lastName}</Text>
                                        </View>

                                    </View>
                                    }

                                    <View flex={1} borderBottomRadius={20}>
                                        <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                            {
                                                refreshing === true ?
                                                    <Skeleton width={150} height={150}/>
                                                    :
                                                    <TouchableOpacity onPress={()=>{ setModalQrPreview(true) }}>
                                                        <Image source={{uri: imageQRCode}} width={160} height={160}/>
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                        <View flex={0.32} flexDir={'row'}>
                                            {Constants.expoConfig.extra.claveSocioAsId &&
                                                <View flex={1}>
                                                    <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'xs'}>Clave socio</Text>
                                                    <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'sm'} fontFamily={'titleComfortaaBold'}>{appDuck.user.partner.claveSocio}</Text>
                                                </View>
                                            ||
                                            
                                                <View flex={1}>
                                                    <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'xs'}>No. de acción</Text>
                                                    <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'sm'} fontFamily={'titleComfortaaBold'}>{appDuck.user.partner.accion}</Text>
                                                </View>
                                            }
                                            <View flex={1}>
                                                <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'xs'}>Tipo de acción</Text>
                                                <Text color={Colors.partnerCard.textColor} textAlign={'center'} fontSize={'sm'} fontFamily={'titleComfortaaBold'}>{appDuck.user.partner.parentesco}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View height={400} borderColor={Colors.primary} borderRadius={20} overflow={'hidden'}>
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
                                <Text color={Colors.primary} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
                                    Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                                </Text> :
                                <Text color={Colors.primary} fontSize={'md'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={6}>
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
                            backgroundColor: Colors.gray
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
                            style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: Colors.darkPrimary, borderRadius: 60}} 
                            onPress={() =>{ setModalQrPreview(!modalQRPreview)  }}
                        >
                            <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'lg'}></Icon>
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