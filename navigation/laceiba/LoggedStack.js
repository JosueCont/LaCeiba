import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomButtomTabBar from "../../components/laceiba/CustomBottomTabBar";
import HomeScreen from "../../screens/laceiba/logged/HomeScreen";
import BookingScreen from "../../screens/laceiba/logged/BookingScreen";
import MapScreen from "../../screens/laceiba/logged/MapScreen";
import ProfileScreen from "../../screens/laceiba/logged/ProfileScreen";
import CreateBookingScreen from "../../screens/laceiba/logged/Booking/CreateBookingScreen";
import CreatePetitionScreen from "../../screens/laceiba/logged/Booking/CreatePetitionScreen";
import JoinPetitionScreen from "../../screens/laceiba/logged/Booking/JoinPetitionScreen";
import RequesJoinSendScreen from "../../screens/laceiba/logged/Booking/RequesJoinSendScreen";
import AddPlayersScreen from "../../screens/laceiba/logged/Booking/AddPlayersScreen";
import NewGuestScreen from "../../screens/laceiba/logged/Booking/NewGuestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedStack = () => {

    const HomeNavigator = () => {
        return(
            <Stack.Navigator
                mode={'card'}
                backBehavior={'history'}
                initialRouteName="House"
                screenOptions={({navigation, route}) =>({
                    headerShown: false
                })}>
                    <Stack.Screen name="House" component={HomeScreen}/>
                    <Stack.Screen name="CreateBooking" component={CreateBookingScreen}/>
                    <Stack.Screen name="CreatePetition" component={CreatePetitionScreen}/>
                    <Stack.Screen name="JoinPetition" component={JoinPetitionScreen}/>
                    <Stack.Screen name="JoinSend" component={RequesJoinSendScreen}/>
                    <Stack.Screen name="AddPlayers" component={AddPlayersScreen}/>
                    <Stack.Screen name="AddGuest" component={NewGuestScreen}/>
            </Stack.Navigator>
        )
    }

    return(
        <Tab.Navigator 
            tabBar={(props) => <CustomButtomTabBar {...props}/>} 
            screenOptions={({navigation, route}) =>({
                headerShown:false,
                tabBarHideOnKeyboard: true
            })}>
                <Tab.Screen name="Home" component={HomeNavigator}/>
                <Tab.Screen name="Booking" component={BookingScreen}/>
                <Tab.Screen name="Map" component={MapScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default LoggedStack;