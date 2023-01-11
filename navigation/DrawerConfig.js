import React,  { useEffect, useState }  from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import { getAllNotifications } from "../api/Requests";
import { connect } from "react-redux";


const Drawer = createDrawerNavigator();

const DrawerConfig = ({idUser, navigation}) => {

    const [notifications, setNotifications] = useState([]);
    const [readAllNotifications, setReadAllNotifications] = useState(false)


    useFocusEffect(
        React.useCallback(() => {
            getNotifications()
        }, [])
    );



    const getNotifications = async () => {
        try {
            const queryString = `?userId=${idUser}&isRead=false`;
            const response = await getAllNotifications(queryString);
            setNotifications(response?.data?.items);
            if(response.data.items.length > 0){
                setReadAllNotifications(true)
            }else{
                setReadAllNotifications(false)
            }
            
        } catch (error) {
            console.log(error?.data);
        }
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
                       { readAllNotifications ?
                        <Image source={iconNewNotification} style={{width: 20, height: 20}}></Image>
                        : 
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
        </Drawer.Navigator>
    );
}

const mapState = (state) => {
    return {
        idUser: state.appDuck.user.id
    }
}

export default connect (mapState)(DrawerConfig);