import React, {useEffect, useRef, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import {Icon, View,Text, Image} from "native-base";
import iconNewNotification from '../assets/iconNewNotification.png';
import iconNotifications from '../assets/iconNotifications.png';
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
import { connect } from "react-redux";
import {useSelector} from "react-redux";
import * as Notifications from "expo-notifications";
import {NOTIFICATION_TYPES} from "../utils";
import appDuck from "../redux/ducks/appDuck";



const Drawer = createDrawerNavigator();

const DrawerConfig = () => {
    const notificationExist = useSelector(state => {
        return state.navigationDuck.notificationExist;
    });


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
      /*  if(data.notification_type){
            let bookingNotifications = [
              //  NOTIFICATION_TYPES.NOTIFY_HOST_BOOKING_READY,
                NOTIFICATION_TYPES.NOTIFY_GUEST_BOOKING_INVITATION,
                NOTIFICATION_TYPES.NOTIFY_HOST_INVITATION_CONFIRMED,
                NOTIFICATION_TYPES.NOTIFY_HOST_INVITATION_REJECTED
            ]

            if(Object.values(NOTIFICATION_TYPES).includes(data.notification_type)){
                let invitation = data.invitation
                let booking = data.invitation.booking

                console.log('=========DATA==========',invitation, booking)

                navigation.navigate('BookingsDetailScreen', {invitation, booking})
            }
        }*/
    }


    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {
                    if (route.name.includes('HomeScreen')) {
                        <View/>
                    }else if(route.name.includes('QRInstructionsScreen')){
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
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={'white'} size={'md'}/>

                            </TouchableOpacity>
                        )
                    } else {
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
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={'white'} size={'md'}/>

                            </TouchableOpacity>
                        )

                    }

                },
                headerStyle: {backgroundColor: Colors.green},
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
                      
                       { notificationExist  &&
                        <Image source={iconNewNotification} style={{width: 20, height: 20}}></Image>   
                       }
                       {
                        !notificationExist &&
                        <Image source={iconNotifications} style={{width: 20, height: 20}}></Image>
                       } 

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <Icon as={MaterialIcons} color={'white'} name={'menu'} size={'md'}></Icon>
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
            <Drawer.Screen name={'NotificationsScreen'} component={NotificationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'NotificationDetail'} component={NotificationDetail} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsScreen'} component={InstallationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesScreen'} component={ServicesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsDetailScreen'} component={InstallationsDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesDetailScreen'} component={ServicesDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MembersScreen'} component={MembersScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ReservationsScreen'} component={BookingsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GroupEditScreen'} component={GroupEditScreen} options={{title: ''}}/>
            <Drawer.Screen name={'TransactionsScreen'} component={TransactionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InvoicingScreen'} component={InvoicingScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MatchesScreen'} component={MatchesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'StatisticsScreen'} component={StatisticsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'HelpScreen'} component={HelpScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GroupsScreen'} component={GroupsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ProfileScreen'} component={ProfileScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingCollectDataScreen'} component={BookingCollectDataScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingServicesScreen'} component={BookingServicesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingConfirmScreen'} component={BookingConfirmScreen} options={{title: ''}}/>
            <Drawer.Screen name={'BookingConfirmScreenSuccess'} component={BookingConfirmScreenSuccess} options={{title: ''}}/>
            <Drawer.Screen name={'GuestsScreen'} component={GuestsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MembershipsScreen'} component={MembershipsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePass'} component={GuestGeneratePass} options={{title: ''}}/>
            <Drawer.Screen name={'GuestGeneratePassScreen'} component={GuestGeneratePassScreen} options={{title: ''}}/>
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

        </Drawer.Navigator>
    );
}


export default DrawerConfig;