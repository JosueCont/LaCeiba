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
import * as Sharing from "expo-sharing"
import moment from "moment";
import { imageImport } from "../organizations/assets/ImageImporter";
import Constants from "expo-constants";

const GuestGeneratePassQRScreen = ({ navigation, route }) => {
    const [refreshingLogo, setRefreshingLogo] = useState(null);
    const [imageLogo, setImageLogo] = useState(null);
    const [imageQRCode, setImageQRCode] = useState(null);
    const [qrPass, setQrPass] = useState(null);
    const isFocused = useIsFocused();
    const toast = useToast();
    const imgRef = useRef();

    useEffect(() => {
        if (isFocused) {
            setImageQrFunction()
            getConfiguration()
        }
    }, [isFocused])

    const shareImage = async () =>{
        try{
            const uri = await captureRef(imgRef,{
                format:'png',
                quality: 0.9
            })
            console.log('uri', uri)
            
            Sharing.shareAsync("file://" +uri)
        }catch(e){

        }
    }

    const setImageQrFunction = () => {
        setQrPass(route?.params?.qrPass)
        setImageQRCode(route?.params?.qrPass?.qrGenerated)
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

    return (
        <LayoutV3 backgroundColor={'#fff'}>
            <ScrollView>
                <View alignItems={'center'} mt={10}>

                    <ViewShot ref={imgRef}>

                        <View height={500} width={310} bgColor={Colors.partnerCard.bg} borderRadius={20} overflow={'hidden'}>
                        
                            <View flex={0.65} bgColor={Colors.partnerCard.photoBg}>
                                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                    {/* <Image source={imgLogo} width={100} height={100}></Image> */}
                                    {
                                        refreshingLogo === true ?
                                            <Skeleton width={100} height={100}/>
                                            :
                                            <Image source={imageImport(Constants.expoConfig.slug).logo} width={100} height={100}/>
                                    }
                                </View>
                                <View bgColor={Colors.partnerCard.nameBg} height={65} justifyContent={'center'} p={1}>
                                    <Text color={Colors.partnerCard.nameTextColor} textAlign={'center'} fontSize="xl" fontFamily={'titleComfortaaBold'}>PASE DE INVITADO</Text>
                                    <Text color={Colors.partnerCard.nameTextColor} textAlign={'center'} fontSize="xs">
                                        Válido únicamente el {qrPass ? moment(qrPass?.expirationDate).format('LL') : ''}
                                    </Text>
                                </View>
                            </View>

                            <View flex={1} borderBottomRadius={20}>
                                <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                    <Image source={{uri: imageQRCode}} width={180} height={180}/>
                                </View>
                                <View flexDir={'row'} p={3}>
                                    <View flex={1}>
                                        <Text color={Colors.partnerCard.nameTextColor} textAlign={'center'} fontSize="xl" fontFamily={'titleComfortaaBold'}>{qrPass?.guestName}</Text>
                                        <Text color={Colors.red} textAlign={'center'} fontSize={'xs'}>
                                            <Text fontFamily={'titleComfortaaBold'}>Acceso exclusivo a:</Text> {qrPass && qrPass?.metadata?.freeServices && qrPass?.metadata?.freeServices.map(({ name }) => name).join(', ')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ViewShot>


                    <View width={300}>
                        <Button mt={6} mb={4} onPress={shareImage}>Compartir</Button>
                        <Button mb={4} onPress={() => navigation.goBack()}>Regresar</Button>
                    </View>

                </View>
            </ScrollView>
        </LayoutV3>
    )
}

export default GuestGeneratePassQRScreen;