import React, {useEffect, useState} from 'react'
import {Icon, Image, ScrollView, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN, ImageBackground, TouchableOpacity, RefreshControl} from "react-native";
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
import { getAllGF, getGFLeader, sendPushToken, validatePartner, getAllServices, getAllBookings, getPoints, getUserDebt, getTotalReservationsPerMonth } from "../api/Requests";
import { connect } from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Constants from "expo-constants";
import { loggedOutAction } from '../redux/ducks/appDuck';
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import { setAttribute } from "../redux/ducks/navigationDuck";
import { imageImport } from '../organizations/assets/ImageImporter';
import { setAtributeBooking, setInfoBooking } from '../redux/ducks/bookingDuck';
import moment from 'moment';
import { AntDesign } from "@expo/vector-icons";
import _ from 'lodash';
import { useSelector } from 'react-redux';
import ModalVersion from './Modals/ModalVersion';
import { Icon } from 'native-base';

const HomeScreen = ({ navigation, loggedOutAction, appDuck, navigationDuck, setInfoBooking, setAtributeBooking }) => {
    const user = useSelector(state => state.appDuck.user)
    const [sliderPosition, setSliderPosition] = useState(0);
    const [text, setText] = useState(null);
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const [fixedGroups, setFixedGroups] = useState(0);
    const [allGroups, setAllGroups] = useState([]);
    const [groupsFounded, setGroupsFounded] = useState([]);
    const [reservations, setReservations] = useState([])
    const [hasDebt, setHasDebt] = useState(false)
    const [refreshingPage, setRefresingPage] = useState(false);
    const [isRebaseLimitReservations, setLimitReservation] = useState(false)
    const [modalVersionVisible, setModalVersionVisible] = useState(null);

    const toast = useToast();

    const isFocused = useIsFocused();

    const handleRefresh = () => {
        setRefresingPage(true);
        setRefresingPage(false);
        getData()
        setAllGroups([]);
        setGroupsFounded([]);
        getAllFixedGroups();
        // checkFixedGroups();
    }

    useEffect(() => {
        if (isFocused) {
            sendExpoToken();
            getData()
        }
    }, [isFocused])

    useFocusEffect(
        React.useCallback(() => {
            setAllGroups([]);
            setGroupsFounded([]);
            getAllFixedGroups();
            // checkFixedGroups();
            return () => {
                setFixedGroups(0);
            };
        }, [])
    );

    const getData = async () => {
        try {
            Promise.all([
                getBookingConfig(),
                //getReservations(),
                getTotalPoints(),
                getDataDebt(),
                //getTotalReservations()
            ])
        } catch (e) {
            console.log('error', e)
        }
    }

    const getDataDebt = async () => {
        try {
            const response = await getUserDebt('', [user?.partner?.id])
            if (response?.data > 0) setHasDebt(true) //cambiar a true
            else setHasDebt(false)
        } catch (e) {
            console.log('error', e)
        }
    }

    const getTotalPoints = async () => {
        try {
            const response = await getPoints('', [user?.id])
            //console.log('puntos totales',response?.data?.totalPoints)
            setAtributeBooking({ prop: 'points', value: response?.data?.totalPoints })
        } catch (e) {
            console.log('error', e)
        }
    }

    const getBookingConfig = async () => {
        try {
            const response = await getAllServices();
            console.log('response', response?.data)
            setInfoBooking(response?.data)
        } catch (e) {
            console.log('error', e)

        }
    }

    const sendExpoToken = async () => {
        try {
            if (Constants?.expoConfig?.extra?.sendDeviceToken) {
                let token = navigationDuck?.pushToken;
                if (!token) {
                    token = await Notifications.getExpoPushTokenAsync();
                    setAttribute('pushToken', token.data)
                }
                let data = {
                    os: Platform.OS === 'ios' ? 'ios' : 'android',
                    token: token.data ?? '',
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
            if (screen.includes('QRScreen')) {
                navigation.navigate(screen, { card: true })
            } else {
                const response = { data: { status: true } };// await validatePartner(`/${appDuck.user.id}/partners/validate`)

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
                if (!groupElement?.isActive) {
                    continue;
                }
                for (const leader of groupElement.leaders) {
                    if (leader?.id == appDuck.user.id) {
                        setGroupsFounded(groups => [...groups, groupElement]);
                    }
                }
                if (groupElement.allMembersCanConfirmFixedGroup) {
                    for (const member of groupElement.members) {
                        if (member?.id == appDuck.user.id) {
                            setGroupsFounded(groups => [...groups, groupElement]);
                        }
                    }
                }
            }
        } catch (error) {
            if (error?.data?.message == 'Unauthorized') {
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
        <>
        <LayoutV4 white={true} overlay={true}>
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refreshingPage}
                        progressViewOffset={50}
                        style={{zIndex: 100}}
                    />
                } 
                >
               {/*  <View bgColor={Colors.primary}>
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
                    <View bgColor={Colors.primary} height={130} justifyContent={'flex-start'} alignItems={'center'}>
                        <Image source={imageImport(Constants.expoConfig.slug).logo} size={130} resizeMode='contain' />
                    </View>
                    <View flex={1} pt={10}>
                        <View mb={4} flexDirection={'row'}>
                            <View flex={1}>
                                <TouchableOpacity onPress={() => validatePartnerFunction('QRScreen')}>
                                    <View alignItems={'center'} mb={2}>
                                        {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                        <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={iconAccess} style={{ width: 45, resizeMode: 'contain' }} />
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Ingresar al club</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {Constants.expoConfig.extra.booking && //regresar a cmbio
                                <View flex={1}>
                                    <TouchableOpacity onPress={() => {
                                        if (Constants.expoConfig.slug === 'laceiba') {
                                            if (hasDebt) {
                                                setModalInfoVisible(true)
                                                setText('Lo sentimos usted presenta un adeudo en su estado de cuenta, por favor contacte a administración para más detalle.')
                                            } else validatePartnerFunction('BookingServicesScreen')
                                        } else {

                                            validatePartnerFunction('BookingServicesScreen')
                                        }
                                    }}>
                                        <View alignItems={'center'} mb={2}>
                                            <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={iconReserve} style={{ width: 45, resizeMode: 'contain' }} />
                                            </ImageBackground>
                                        </View>
                                        <View>
                                            <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Reservar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        {/*<View mb={4} flexDirection={'row'}>*/}
                        {/*    <View flex={1}>*/}
                        {/*        <TouchableOpacity onPress={() => navigation.navigate('InstallationsScreen')}>*/}
                        {/*            <View alignItems={'center'} mb={2}>*/}
                        {/*                <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                        {/*                    <Image source={iconLocations} style={{width: 45, resizeMode: 'contain'}}/>*/}
                        {/*                </ImageBackground>*/}
                        {/*            </View>*/}
                        {/*            <View>*/}
                        {/*                <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Instalaciones</Text>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*    <View flex={1}>*/}
                        {/*        <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')}>*/}

                        {/*            <View alignItems={'center'} mb={2}>*/}
                        {/*                <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                        {/*                    <Image source={iconServices} style={{width: 45, resizeMode: 'contain'}}/>*/}
                        {/*                </ImageBackground>*/}
                        {/*            </View>*/}
                        {/*            <View>*/}
                        {/*                <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Servicios</Text>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        <View mb={4} flexDirection={'row'}>
                            {/*Constants.expoConfig.extra.guests && 
                            <View flex={1}>
                                <TouchableOpacity onPress={() => navigation.navigate('GuestsScreen')}>

                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                            <Image source={iconGuests} style={{width: 45, resizeMode: 'contain'}}/>
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>{Constants.expoConfig.extra.freeGuestsName || 'Invitados sin costo'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    */}


                            {Constants.expoConfig.extra.booking && <View flex={1}>
                                <TouchableOpacity onPress={() => navigation.navigate('ReservationsScreen',)}>

                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={iconBooking} style={{ width: 45, resizeMode: 'contain' }} />
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Mis reservaciones</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            }

                        <View flex={1}>
                            <TouchableOpacity onPress={() =>  navigation.navigate('PaymentScreen', {card: true})}>
                                <View alignItems={'center'} mb={2}>
                                    {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                    <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconBalance} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Mis movimientos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
    
                    </View>
                    
                    
                    <View mb={4} flexDirection={'row'}>
                        {Constants.expoConfig.extra.booking && Constants.expoConfig.extra.matches && 
                            <View flex={1}>
                                <TouchableOpacity onPress={() => navigation.navigate('MatchesScreen')}>

                                        <View alignItems={'center'} mb={2}>
                                            <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={iconMatches} style={{ width: 45, resizeMode: 'contain' }} />
                                            </ImageBackground>
                                        </View>
                                        <View>
                                            <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Juegos</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {Constants.expoConfig.extra.balance && <View flex={1}>

                                <TouchableOpacity onPress={() => navigation.navigate('BalanceScreen')}>

                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={iconBalance} style={{ width: 45, resizeMode: 'contain' }} />
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Saldos</Text>
                                    </View>
                                </TouchableOpacity>                            
                            </View>
                        }
                    </View>
                    
                    <View mb={4} flexDirection={'row'}>
                        
                        { (fixedGroups > 0 || groupsFounded.length > 0) &&
                                <View flex={1}>
                                    <TouchableOpacity onPress={() => navigation.navigate('FixedGroupList', {user: appDuck.user.id, groupsFounded: groupsFounded})}>
                                        <View alignItems={'center'} mb={2}>
                                            <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image source={iconFixedGroups} style={{width: 45, resizeMode: 'contain'}}/>
                                            </ImageBackground>
                                        </View>
                                        <View>
                                            <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Grupos fijos</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }


                            { Constants.expoConfig.extra.eCommerce && <View flex={1} alignItems={'center'}>
                                <TouchableOpacity onPress={() => navigation.navigate('StoreScreen')}>

                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={iconStore} style={{ width: 45, resizeMode: 'contain' }} />
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.primary} fontSize={'lg'}>Tienda</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}

                        </View>


                    </View>
                </ScrollView>

                <ModalInfo visible={modalInfoVisible} setVisible={setModalInfoVisible} iconType={'exclamation'} text={text} title='Aviso'></ModalInfo>
                {modalVersionVisible && <ModalVersion visible={modalVersionVisible} setVisible={setModalVersionVisible}></ModalVersion>}
            </LayoutV4 >
            <View style={{ borderRadius: 5, position: "absolute", bottom: 0, right: 10, margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity source={imageImport(Constants.expoConfig.slug).bgButton}
                    onPress={() =>
                        setModalVersionVisible(true)}>
                    <ImageBackground borderRadius={10} source={imageImport(Constants.expoConfig.slug).bgButton} style={{ height: 20, width: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon as={AntDesign} name={'reload1'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={{ color: 'black', marginLeft: 10 }}>V. {Constants.expoConfig.version}</Text>
            </View>
        </>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck,
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState, { loggedOutAction, setInfoBooking, setAtributeBooking })(HomeScreen)