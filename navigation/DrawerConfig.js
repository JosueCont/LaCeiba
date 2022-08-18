import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import {Icon, View} from "native-base";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../Colors";
import ComponentsScreen from "../screens/ComponentsScreen";
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
import ReservationsScreen from "../screens/ReservationsScreen";
import GroupEditScreen from "../screens/GroupEditScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import InvoicingScreen from "../screens/InvoicingScreen";
import MatchesScreen from "../screens/MatchesScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Drawer = createDrawerNavigator();

const DrawerConfig = () => {

    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {
                    if (route.name.includes('HomeScreenx')) {
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
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.red} size={'xl'}/>

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
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <Icon as={MaterialIcons} color={Colors.red} name={'menu'} size={'xl'}></Icon>
                    </TouchableOpacity>
                ),
                swipeEnabled: false
            })}
            drawerContent={(props) => <CustomDrawerContent  {...props} />}>
            <Drawer.Screen name="ComponentsScreen" component={ComponentsScreen} options={{headerShown: false}}/>

            <Drawer.Screen name={'HomeScreen'} component={HomeScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRInstructionsScreen'} component={QRInstructionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRScreen'} component={QRScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRSentScreen'} component={QRSentScreen} options={{title: ''}}/>
            <Drawer.Screen name={'QRNonPaymentScreen'} component={QRNonPaymentScreen} options={{title: ''}}/>
            <Drawer.Screen name={'NotificationsScreen'} component={NotificationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsScreen'} component={InstallationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesScreen'} component={ServicesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InstallationsDetailScreen'} component={InstallationsDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ServicesDetailScreen'} component={ServicesDetailScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MembersScreen'} component={MembersScreen} options={{title: ''}}/>
            <Drawer.Screen name={'ReservationsScreen'} component={ReservationsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'GroupEditScreen'} component={GroupEditScreen} options={{title: ''}}/>
            <Drawer.Screen name={'TransactionsScreen'} component={TransactionsScreen} options={{title: ''}}/>
            <Drawer.Screen name={'InvoicingScreen'} component={InvoicingScreen} options={{title: ''}}/>
            <Drawer.Screen name={'MatchesScreen'} component={MatchesScreen} options={{title: ''}}/>
            <Drawer.Screen name={'StatisticsScreen'} component={StatisticsScreen} options={{title: ''}}/>

        </Drawer.Navigator>
    );
}

export default DrawerConfig;