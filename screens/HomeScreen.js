import React, {useEffect, useState} from 'react'
import {Image, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import bgButton from "../assets/bgButton.png";
import {Image as ImageRN, ImageBackground, TouchableOpacity} from "react-native";
import imgLogo from '../assets/imgLogo.png';
import iconAccess from '../assets/iconAccess.png';
import iconReserve from '../assets/iconReserve.png'
import iconGuests from '../assets/iconGuests.png'
import iconBooking from '../assets/iconBooking.png';
import iconFixedGroups from '../assets/iconFixedGroups.png';
import iconStore from '../assets/iconStore.png'
import iconMatches from '../assets/iconMatches2.png'
import iconBalance from '../assets/iconBalance2.png'
import SliderCustom from "../components/SliderCustom/SliderCustom";
import LayoutV4 from "./Layouts/LayoutV4";
import {getAllGF, getGFLeader, sendPushToken, validatePartner} from "../api/Requests";
import {connect} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Constants from "expo-constants";
import { loggedOutAction } from '../redux/ducks/appDuck';
import { Platform } from "react-native";

const HomeScreen = ({navigation, loggedOutAction, appDuck, navigationDuck}) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [text, setText] = useState(null);
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const [fixedGroups, setFixedGroups] = useState(0);
    const [allGroups, setAllGroups] = useState([]);
    const [groupsFounded, setGroupsFounded] = useState([]);
    const toast = useToast();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            sendExpoToken();
        }
    }, [isFocused])

    useFocusEffect(
        React.useCallback(() => {
            setAllGroups([]);
            setGroupsFounded([]);
            getAllFixedGroups();
            checkFixedGroups();
            return () => {
                setFixedGroups(0);
              };
        }, [])
    );

    const sendExpoToken = async () => {
        try {
            if(Constants?.manifest?.extra?.sendDeviceToken){
                let data = {
                    os: Platform.OS=== 'ios' ?  'ios' :  'android',
                    token: navigationDuck?.pushToken?.toString(),
                    userId: appDuck?.user?.id?.toString()
                };
                await sendPushToken(data);
            }
        } catch (error) {
            console.log(error);
        }
       
        return;
    }

    const validatePartnerFunction = async (screen) => {
        try {
            // Omitimos la validación para que el usuario pueda ver su Qr de acceso
            if(screen.includes('QRScreen')){
                navigation.navigate(screen, {card: true})
            }else {
                const response = {data: {status: true}};// await validatePartner(`/${appDuck.user.id}/partners/validate`)

                console.log(response.data)
                if (response.data.status === true) {
                    navigation.navigate(screen)
                } else {
                    navigation.navigate('QRNonPaymentScreen', {
                        responseError: response.data,
                        message: screen == 'BookingServicesScreen' ? 'No se puede reservar por el siguiente motivo:' : 'No se puede generar el código Qr por el siguiente motivo:'
                    })
                }
            }

        } catch (ex) {
            console.log(ex)
            if (ex.data.message === 'Partner does not have access') {
                setText('El socio no tiene acceso.')
            } else {
                setText(ex.data.message)
            }
            setModalInfoVisible(true)

        }

    }

    const getAllFixedGroups = async () => {
        try {
            const response = await getAllGF();
            setAllGroups(response?.data);
            for (const groupElement of response?.data) {
                for (const leader of groupElement.leaders) {
                    if(leader?.id == appDuck.user.id){
                        setGroupsFounded(groups => [...groups, groupElement]);
                    }
                }
            }
        } catch (error) {
            if(error?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
            console.log(error?.data);
        }
    }

    const checkFixedGroups = async () => {
        try {
            const response = await getGFLeader('', [appDuck.user.id]);
            console.log(response.data);
            setFixedGroups(response?.data?.count);
        } catch (error) {
            setFixedGroups(0);
        }
    }

    return (
        <LayoutV4 white={true} overlay={true}>
            <View flex={1}>
               {/*  <View bgColor={Colors.green}>
                    <SliderCustom
                        height={250}
                        items={[
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide01.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide02.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide03.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide04.png')).uri},

                        ]}
                        position={sliderPosition}
                        setPosition={setSliderPosition}/>
                </View> */}
                <View bgColor={Colors.green} height={130} justifyContent={'flex-start'} alignItems={'center'}>
                    <Image source={imgLogo} size={130} resizeMode='contain' />
                </View>
                <View flex={1} pt={10}>
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => validatePartnerFunction('QRScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconAccess} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Ingresar al club</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => validatePartnerFunction('BookingServicesScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconReserve} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Reservar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*<View mb={4} flexDirection={'row'}>*/}
                    {/*    <View flex={1}>*/}
                    {/*        <TouchableOpacity onPress={() => navigation.navigate('InstallationsScreen')}>*/}
                    {/*            <View alignItems={'center'} mb={2}>*/}
                    {/*                <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*                    <Image source={iconLocations} style={{width: 45, resizeMode: 'contain'}}/>*/}
                    {/*                </ImageBackground>*/}
                    {/*            </View>*/}
                    {/*            <View>*/}
                    {/*                <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Instalaciones</Text>*/}
                    {/*            </View>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </View>*/}
                    {/*    <View flex={1}>*/}
                    {/*        <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')}>*/}

                    {/*            <View alignItems={'center'} mb={2}>*/}
                    {/*                <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*                    <Image source={iconServices} style={{width: 45, resizeMode: 'contain'}}/>*/}
                    {/*                </ImageBackground>*/}
                    {/*            </View>*/}
                    {/*            <View>*/}
                    {/*                <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Servicios</Text>*/}
                    {/*            </View>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('GuestsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconGuests} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Invitados a Restaurantes</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('ReservationsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconBooking} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Mis reservaciones</Text>
                                </View>
                            </TouchableOpacity>

                            
                        </View>
    
                    </View>
                    
                    
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('MatchesScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconMatches} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Juegos</Text>
                                </View>
                            </TouchableOpacity>                            
                        </View>

                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('BalanceScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconBalance} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Saldos</Text>
                                </View>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                    
                    <View mb={4} flexDirection={'row'}>
                        
                        { (fixedGroups > 0 || groupsFounded.length > 0) &&
                                <View flex={1}>
                                    <TouchableOpacity onPress={() => navigation.navigate('FixedGroupList', {user: appDuck.user.id, groupsFounded: groupsFounded})}>
                                        <View alignItems={'center'} mb={2}>
                                            <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image source={iconFixedGroups} style={{width: 45, resizeMode: 'contain'}}/>
                                            </ImageBackground>
                                        </View>
                                        <View>
                                            <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Grupos fijos</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }

                        { Constants.manifest.extra.eCommerce &&
                            <View flex={1} alignItems={'center'}>
                                <TouchableOpacity onPress={() => navigation.navigate('StoreScreen')}>

                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                            <Image source={iconStore} style={{width: 45, resizeMode: 'contain'}}/>
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Tienda</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                </View>

            </View>
            <ModalInfo visible={modalInfoVisible} setVisible={setModalInfoVisible} iconType={'exclamation'} text={text}></ModalInfo>
        </LayoutV4>

    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck,
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState, {loggedOutAction})(HomeScreen)