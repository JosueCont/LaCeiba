import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import ComponentsScreen from "../screens/ComponentsScreen";

const Stack = createStackNavigator();

const StackNavigatorMain = () => {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: true}}>
            <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default StackNavigatorMain;