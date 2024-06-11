import React, {useEffect, useRef, useState, useCallback} from "react";
import {useFocusEffect, useNavigation, CommonActions, useRoute, } from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import {Icon, View,Text, Image} from "native-base";
import iconNewNotification from '../assets/iconNewNotification.png';
import iconNotifications from '../assets/iconNotifications.png';
import iconCart from '../assets/iconCart.png';
import IconCartWithItems from '../assets/IconCartWithItems.png';
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../Colors";
import QRInstructionsScreen from "../screens/QRInstructionsScreen";
import QRScreen from "../screens/QRScreen";
import QRSentScreen from "../screens/QRSentScreen";
import QRNonPaymentScreen from "../screens/QRNonPaymentScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import InstallationsScreen from "../screens/InstallationsScreen";
import ServicesScreen from "../screens/ServicesScreen";
import InstallationsDetailScreen from "../screens/InstallationsDetailScreen";
import ServicesDetailScreen from "../screens/ServicesDetailScreen";
import MembersScreen from "../screens/MembersScreen";
import BookingsScreen from "../screens/BookingsScreen";
import GroupEditScreen from "../screens/GroupEditScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import InvoicingScreen from "../screens/InvoicingScreen";
import MatchesScreen from "../screens/MatchesScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import HelpScreen from "../screens/HelpScreen";
import GroupsScreen from "../screens/GroupsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingCollectDataScreen from "../screens/BookingCollectDataScreen";
import BookingServicesScreen from "../screens/BookingServicesScreen";
import BookingConfirmScreen from "../screens/BookingConfirmScreen";
import GuestsScreen from "../screens/GuestsScreen";
import MembershipsScreen from "../screens/MembershipsScreen";
import GuestGeneratePassScreen from "../screens/GuestGeneratePassScreen";
import GuestGeneratePassSuccessScreen from "../screens/GuestGeneratePassSuccessScreen";
import MemberEditScreen from "../screens/MemberEditScreen";
import BookingsDetailScreen from "../screens/BookingsDetailScreen";
import ManualsScreen from "../screens/Trash/ManualsScreen";
import RegulationsScreen from "../screens/RegulationsScreen";
import DirectoryScreen from "../screens/Trash/DirectoryScreen";
import TutorialsScreen from "../screens/TutorialsScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import ContactScreen from "../screens/ContactScreen";
import HelpContentScreen from "../screens/HelpContentScreen";
import VideoPlayer from "../screens/VideoPlayer";
import PDFAndImageViewer from "../screens/PDFAndImageViewer";
import HTMLViewer from "../screens/HTMLViewer";
import BookingCollectDataSearchScreen from "../screens/BookingCollectDataSearchScreen";
import BookingConfirmScreenSuccess from "../screens/BookingConfirmScreenSuccess";
import AskForMediaLibraryScreen from "../screens/Permissions/AskForMediaLibraryScreen";
import AddUpdateGuest from "../screens/AddUpdateGuest";
import GuestGeneratePass from "../screens/GuestGeneratePass";
import FixedGroups from "../screens/FixedGroups";
import FixedGroupDetail from "../screens/FixedGroupDetail";
import FixedGroupList from "../screens/FixedGroupList";
import NotificationDetail from "../screens/NotificationDetail";
import AddPointsPartnesScreen from "../screens/AddPointsPartnesScreen"
import CardPointScreen from "../screens/CardPointScreen"
import ScoreCardRegistryTableScreen from "../screens/ScoreCardRegistryTableScreen"
import QRScreenInvitation from "../screens/QRScreenInvitation"
import StoreScreen from "../screens/StoreScreen"
import StoreItem from "../screens/StoreItem"
import StoreItemDetail from "../screens/StoreItemDetail"
import ProductsCartScreen from "../screens/ProductsCartScreen"
import PaymentConfirmationScreen from "../screens/PaymentConfirmationScreen"
import BuysScreen from "../screens/BuysScreen"
import BuysItemDetailScreen from "../screens/BuysItemDetailScreen"
import { connect } from "react-redux";
import {useSelector} from "react-redux";
import * as Notifications from "expo-notifications";
import {NOTIFICATION_TYPES} from "../utils";
import appDuck from "../redux/ducks/appDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import BalanceScreen from "../screens/BalanceScreen";
import GuestGeneratePassQRScreen from "../screens/GuestGeneratePassQRScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenCeiba from "../screens/laceiba/logged/HomeScreen";
import CreateBookingScreen from "../screens/laceiba/logged/Booking/CreateBookingScreen";
import CreatePetitionScreen from "../screens/laceiba/logged/Booking/CreatePetitionScreen";
import JoinPetitionScreen from "../screens/laceiba/logged/Booking/JoinPetitionScreen";
import RequesJoinSendScreen from "../screens/laceiba/logged/Booking/RequesJoinSendScreen";
import AddPlayersScreen from "../screens/laceiba/logged/Booking/AddPlayersScreen";
import NewGuestScreen from "../screens/laceiba/logged/Booking/NewGuestScreen";
import DetailBokingScreen from "../screens/laceiba/logged/Booking/DetailBookingScreen";
import BookingDoneScreen from "../screens/laceiba/logged/Booking/BookingDoneScreen";
import ReservationsListScreen from "../screens/laceiba/logged/Booking/ReservationsListScreen";
import { BackHandler } from "react-native";
import MyReservationScreen from "../screens/laceiba/logged/Booking/MyReservationScreen";
import DetailReservationScreen from "../screens/laceiba/logged/Booking/DetailReservationScreen";
import MyFamilyScreen from "../screens/laceiba/logged/Profile/MyFamilyScreen";
import ProfileScreenCeiba from '../screens/laceiba/logged/ProfileScreen'
import PaymentView from "../screens/PaymentView";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerConfig = () => {
    const notificationExist = useSelector(state => state.navigationDuck.notificationExist );
    const products = useSelector(state => {
        return state.navigationDuck.products;
    });
    const [currentNotificationExist, setCurrentNotificationExist] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    useEffect(() => {
        if(notificationExist != undefined){
            setShouldUpdate(prev => !prev);

        }
        console.log('cambio notificaciones', notificationExist)
      }, [notificationExist]);

    

    const navigation = useNavigation();
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect( () => {
        // Register for push notification

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            notificationCommonHandler(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification
        // (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            notificationCommonHandler(response.notification);
            notificationNavigationHandler(response.notification.request.content);

        });

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        // The listeners must be clear on app unmount
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const notificationCommonHandler = (notification) => {
        // save the notification to reac-redux store
        console.log('A notification has been received', notification)
    }


    const notificationNavigationHandler = ({ data }) => {
        // navigate to app screen
        console.log('A notification has been touched', data.notification_type)
        if(data.notification_type){
            let bookingNotifications = [
                NOTIFICATION_TYPES.NOTIFY_HOST_BOOKING_READY,
                NOTIFICATION_TYPES.NOTIFY_GUEST_BOOKING_INVITATION,
                NOTIFICATION_TYPES.NOTIFY_HOST_INVITATION_CONFIRMED,
                NOTIFICATION_TYPES.NOTIFY_HOST_INVITATION_REJECTED
            ]

            if(Object.values(NOTIFICATION_TYPES).includes(data.notification_type)){
                console.log('=========DATA==========',data.invitation_id)

                navigation.navigate('BookingsDetailScreen', {invitation_id:data.invitation_id})
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            const handleBackButton = () => {
                //console.log('bloquadeo', navigation.getCurrentRoute())
                let route = navigation.getCurrentRoute().name
                if(route === 'JoinSend' || route === 'BookingSuccess'){
                    navigation.dispatch(CommonActions.reset({
                        index:0,
                        routes:[{name:'HomeScreen', params: {screen: 'HomeScreen'}}]
                    }))
                    return true
                }else if(route === 'DetailReservation'){
                    console.log('detail back',navigation.getRootState().routes.find(item => item.name === 'BookingServicesScreen').params?.params?.route)
                    if(navigation.getRootState().routes.find(item => item.name === 'BookingServicesScreen').params?.params?.route){
                        console.log('retornar a reservaciones', navigation)
                        navigation.reset({
                            index:0,
                            routes:[{name:'ReservationsScreen', params:{ screen: 'ReservationsScreen'}}]
                        })
                    }else navigation.goBack()
                    return true
                }else if(route === 'ReservationsScreen'){
                    navigation.navigate('HomeScreen')
                     return true
                }else if(route === 'HomeScreen') return true
                return false
                console.log('route',route)
            }

            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
            return () => {
              BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            };
        },[navigation])
    )

    const BookingServicesNavigator = () => {
        return(
            <Stack.Navigator
                mode={'card'}
                backBehavior={'history'}
                initialRouteName="House"
                screenOptions={({navigation, route}) =>({
                    headerShown: false,
                   
                })}
            >
                <Stack.Screen name="House" component={BookingServicesScreen} />
                <Stack.Screen name="CreateBooking" component={CreateBookingScreen} />
                <Stack.Screen name="CreatePetition" component={CreatePetitionScreen} />
                <Stack.Screen name="JoinPetition" component={JoinPetitionScreen}/>
                <Stack.Screen name="MyReservation" component={MyReservationScreen}/>
                <Stack.Screen name="JoinSend" component={RequesJoinSendScreen} options={{gestureEnabled:false }}/>
                <Stack.Screen name="AddPlayers" component={AddPlayersScreen}/>
                <Stack.Screen name="AddGuest" component={NewGuestScreen}/>
                <Stack.Screen name="DetailBooking" component={DetailBokingScreen}/>
                <Stack.Screen name="BookingSuccess" component={BookingDoneScreen} options={{gestureEnabled:false }}/>
                <Stack.Screen name="Reservations" component={ReservationsListScreen} />
                <Stack.Screen name="DetailReservation" component={DetailReservationScreen}/>

            </Stack.Navigator>
        )
    }

    const ProfileNavigator = () => {
        return(
            <Stack.Navigator
                mode={'card'}
                backBehavior={'history'}
                initialRouteName="Profile"
                screenOptions={({navigation, route}) =>({
                    headerShown: false,
                
                })}
            >
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="MyFamily" component={MyFamilyScreen}/>
            </Stack.Navigator>
        )
    }


    return (
        <Drawer.Navigator
        key={shouldUpdate}
            // useLegacyImplementation={true}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
          /*       drawerStyle: {
                    width: '95%',
                    right: 0
                  }, */
                headerLeft: () => {
                    if (route.name.includes('HomeScreen')) {
                        <View/>
                    }/*else if(route.name.includes('QRInstructionsScreen')){
                        return (
                            <TouchableOpacity onPress={async () => {

                                navigation.navigate('HomeScreen')


                            }} style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}>
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>

                            </TouchableOpacity>
                        )
                    }*/else if (route.name.includes('QRScreen') || route.name.includes('ReservationsScreen')){
                        return (
                            <TouchableOpacity onPress={async () => {

                                navigation.navigate('HomeScreen')


                            }} style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}>
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>

                            </TouchableOpacity>
                        )
                    } else if (route.name.includes('BookingsDetailScreen')){
                        return (
                            <TouchableOpacity onPress={async () => {

                                navigation.navigate('ReservationsScreen')


                            }} style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}>
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>

                            </TouchableOpacity>
                        )
                    } else if(route?.name.includes('BookingServicesScreen') || route?.name.includes('ProfileScreen') && Constants.expoConfig.slug === 'laceiba'){
                        console.log('route',route, navigation)
                    }else {
                        return (
                            <TouchableOpacity onPress={async () => {
                                navigation.goBack(0)


                            }} style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}>
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>

                            </TouchableOpacity>
                        )

                    }

                },
                headerStyle: {backgroundColor: Colors.primary},
                headerTitleAlign: 'center',
                headerTitleStyle: {color: 'black'},
                headerTitle: () => {
                    return (
                        <View flex={1}>
                            {/*<Image tintColor={'gray'} style={{marginTop:10,height:30, width:30}} size={'xs'} source={imageLogo} />*/}
                        </View>
                    )

                },
                headerRight: () => (
                <View flexDirection={'row'}>
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}
                    style={{
                        width: 40,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> 
                      
                       { notificationExist != undefined && notificationExist  ?
                        <Image source={iconNewNotification} style={{width: 20, height: 20}}/>
                        : <Image source={iconNotifications} style={{width: 20, height: 20}}/>
                       }
                       

                    </TouchableOpacity>
                    { Constants.expoConfig.extra.eCommerce &&
                        <TouchableOpacity onPress={() => navigation.navigate('ProductsCartScreen')}
                        style={{
                            width: 40,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {
                            products?.length > 0 &&
                            <View position={'relative'}>
                            <Text position={'absolute'} bottom={'12px'} ml={2} color={Colors.secondary} fontSize={'10px'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>{products.length}</Text>
                            <Image source={IconCartWithItems} style={{width: 20, height: 20}}></Image>
                            </View>

                            }
                            {products?.length === 0 &&
                            <Image source={iconCart} style={{width: 20, height: 20}}></Image>
                            }

                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <Icon as={MaterialIcons} color={Colors.bgPrimaryText} name={'menu'} size={'md'}></Icon>
                    </TouchableOpacity>
                </View>
                
                   
                ),
                swipeEnabled: false,
                headerShadowVisible: false
            })}
            drawerContent={(props) => <CustomDrawerContent  {...props} />}>
            <Drawer.Screen name={'HomeScreen'} component={HomeScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRInstructionsScreen'} component={QRInstructionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRScreen'} component={QRScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRSentScreen'} component={QRSentScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRNonPaymentScreen'} component={QRNonPaymentScreen} options={{title: ''}}/>
            <Drawer.Screen name={'PaymentScreen'} component={PaymentView} options={{title: ''}}/>
            <Drawer.Screen name={'NotificationsScreen'} component={NotificationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'NotificationDetail'} component={NotificationDetail} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsScreen'} component={InstallationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesScreen'} component={ServicesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsDetailScreen'} component={InstallationsDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesDetailScreen'} component={ServicesDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MembersScreen'} component={MembersScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ReservationsScreen'} component={Constants.expoConfig.slug === 'laceiba'? ReservationsListScreen : BookingsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GroupEditScreen'} component={GroupEditScreen} options={{title: ''}}/>
            <Drawer.Screen name={'TransactionsScreen'} component={TransactionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InvoicingScreen'} component={InvoicingScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MatchesScreen'} component={MatchesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'StatisticsScreen'} component={StatisticsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'HelpScreen'} component={HelpScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GroupsScreen'} component={GroupsScreen} options={{title: ''}}/>
            {Constants.expoConfig.slug === 'laceiba' ? (
                <Drawer.Screen name={'ProfileScreen'} component={ ProfileNavigator} options={{title: '', headerLeft: () => {
                    return(
                        <TouchableOpacity 
                            style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}
                            onPress={() => {
                                if(navigation?.getCurrentRoute().name === 'MyFamily') navigation.goBack()
                                    else navigation.goBack(0)
                            }}

                        >
                            <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>
                        </TouchableOpacity>
                    )
                }}}/>

            ):(
                <Drawer.Screen name={'ProfileScreen'} component={ProfileScreen} options={{title: '', }}/>

            )}
            <Drawer.Screen name={'BookingCollectDataScreen'} component={BookingCollectDataScreen} options={{title: ''}}/>
            {Constants.expoConfig.slug === 'laceiba' ? (
            <Drawer.Screen name={'BookingServicesScreen'} component={BookingServicesNavigator} options={{title: '', headerLeft: () => {
                if(!(navigation?.getCurrentRoute().name === 'BookingSuccess' ||  navigation?.getCurrentRoute().name ==='JoinSend')){
                    return(
                        <TouchableOpacity onPress={ () => {
                            if(navigation?.getCurrentRoute().name === 'BookingSuccess' ||  navigation?.getCurrentRoute().name ==='JoinSend'){
                                navigation.dispatch(CommonActions.reset({
                                    index:0,
                                    routes:[{name:'HomeScreen', params: {screen: 'HomeScreen'}}]
                                }))
    
                            }else if(navigation?.getCurrentRoute().name === 'DetailReservation'){
                                if(navigation.getRootState().routes.find(item => item.name === 'BookingServicesScreen').params?.params?.route){
                                    //console.log('regresando a',navigation.getRootState().routes.find(item => item.name === 'BookingServicesScreen').params?.params?.route )
                                    navigation.reset({
                                        index:0,
                                        routes:[{name:'ReservationsScreen', params:{ screen: 'ReservationsScreen'}}]
                                    })
                                }else navigation.goBack(0)

                                //console.log('navigation', navigation.getRootState().routes.find(item => item.name === 'BookingServicesScreen').params?.params?.route)
                            }else if(navigation?.getCurrentRoute().name === 'CreateBooking'){
                                if(navigation?.getCurrentRoute()?.params?.route){
                                    navigation.dispatch(CommonActions.reset({
                                        index:0,
                                        routes:[{name:'ReservationsScreen'}]
                                    }))
                                }else navigation.goBack()
                            }else navigation.goBack()
                            //console.log('navegar a ',navigation?.getCurrentRoute())
    
                        }} style={{
                            width: 50,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginLeft: 10
                        }}>
                            <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.bgPrimaryText} size={'md'}/>
    
                        </TouchableOpacity>
                    )

                }
            }}}/>
            ):(
                <Drawer.Screen name={'BookingServicesScreen'} component={BookingServicesScreen} options={{title: ''}} />
            )}
            <Drawer.Screen name={'BookingConfirmScreen'} component={BookingConfirmScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingConfirmScreenSuccess'} component={BookingConfirmScreenSuccess} options={{title: ''}}/>
            <Drawer.Screen name={'GuestsScreen'} component={GuestsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MembershipsScreen'} component={MembershipsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePass'} component={GuestGeneratePass} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePassScreen'} component={GuestGeneratePassScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePassQRScreen'} component={GuestGeneratePassQRScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePassSuccessScreen'} component={GuestGeneratePassSuccessScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MemberEditScreen'} component={MemberEditScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingsDetailScreen'} component={BookingsDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ManualsScreen'} component={ManualsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'RegulationsScreen'} component={RegulationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'DirectoryScreen'} component={DirectoryScreen} options={{title: ''}}/>
            <Drawer.Screen name={'TutorialsScreen'} component={TutorialsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'TermsAndConditionsScreen'} component={TermsAndConditionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ContactScreen'} component={ContactScreen} options={{title: ''}}/>
            <Drawer.Screen name={'HelpContentScreen'} component={HelpContentScreen} options={{title: ''}}/>
            <Drawer.Screen name={'VideoPlayer'} component={VideoPlayer} options={{title: ''}}/>
            <Drawer.Screen name={'PDFAndImageViewer'} component={PDFAndImageViewer} options={{title: ''}}/>
            <Drawer.Screen name={'HTMLViewer'} component={HTMLViewer} options={{title: ''}}/>
            <Drawer.Screen name={'BookingCollectDataSearchScreen'} component={BookingCollectDataSearchScreen} options={{title: ''}}/>
            <Drawer.Screen name={'AskForMediaLibraryScreen'} component={AskForMediaLibraryScreen} options={{headerShown: false}}/>
            <Drawer.Screen name={'AddUpdateGuest'} component={AddUpdateGuest} options={{title: ''}}/>
            <Drawer.Screen name={'FixedGroups'} component={FixedGroups} options={{title: ''}}/>
            <Drawer.Screen name={'FixedGroupList'} component={FixedGroupList} options={{title: ''}}/>
            <Drawer.Screen name={'FixedGroupDetail'} component={FixedGroupDetail} options={{title: ''}}/>
            <Drawer.Screen name={'AddPointsPartnesScreen'} component={AddPointsPartnesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'CardPointScreen'} component={CardPointScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ScoreCardRegistryTableScreen'} component={ScoreCardRegistryTableScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRScreenInvitation'} component={QRScreenInvitation} options={{title: ''}}/>
            <Drawer.Screen name={'StoreScreen'} component={StoreScreen} options={{title: ''}}/>
            <Drawer.Screen name={'StoreItem'} component={StoreItem} options={{title: ''}}/>
            <Drawer.Screen name={'StoreItemDetail'} component={StoreItemDetail} options={{title: ''}}/>
            <Drawer.Screen name={'PaymentConfirmationScreen'} component={PaymentConfirmationScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ProductsCartScreen'} component={ProductsCartScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BuysScreen'} component={BuysScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BuysItemDetailScreen'} component={BuysItemDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BalanceScreen'} component={BalanceScreen} options={{title: ''}}/>
        </Drawer.Navigator>
    );
}


export default DrawerConfig;