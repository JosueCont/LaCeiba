import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomButtomTabBar from "../../components/laceiba/CustomBottomTabBar";
import HomeScreen from "../../screens/laceiba/logged/HomeScreen";
import BookingScreen from "../../screens/laceiba/logged/BookingScreen";
import MapScreen from "../../screens/laceiba/logged/MapScreen";
import ProfileScreen from "../../screens/laceiba/logged/ProfileScreen";

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