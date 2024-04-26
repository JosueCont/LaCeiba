import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/laceiba/auth/LoginScreen";
import AskForPushNotificationsScreen from "../../screens/Permissions/AskForPushNotificationsScreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Login"
            screenOptions={({navigation, route}) =>({
                headerShown:false
            })}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="PermissionsNotifications" component={AskForPushNotificationsScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack;