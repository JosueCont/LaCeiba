import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ComponentsScreen from "../screens/ComponentsScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import LoginNonPaymentScreen from "../screens/LoginNonPaymentScreen";
import AskForPushNotificationsScreen from "../screens/Permissions/AskForPushNotificationsScreen";
import RegisterStep2Screen from "../screens/RegisterStep2Screen";
import RegisterStep3Screen from "../screens/RegisterStep3Screen";
import RegisterStep4Screen from "../screens/RegisterStep4Screen";

const Stack = createStackNavigator();

const StackNavigatorSecurity = () => {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: true}}>
            <Stack.Screen name="HomeScreen" component={StartScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterStep2Screen" component={RegisterStep2Screen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterStep3Screen" component={RegisterStep3Screen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterStep4Screen" component={RegisterStep4Screen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginNonPaymentScreen" component={LoginNonPaymentScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AskForPushNotificationsScreen" component={AskForPushNotificationsScreen} options={{headerShown: false}}/>

        </Stack.Navigator>
    );
}

export default StackNavigatorSecurity;