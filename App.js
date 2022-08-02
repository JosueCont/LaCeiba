import React from 'react';
import {LogBox, StyleSheet, Text as TextRN, TextInput} from 'react-native';
import {NativeBaseProvider, Text} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const Stack = createStackNavigator();


LogBox.ignoreAllLogs();

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


if (TextRN.defaultProps == null) TextRN.defaultProps = {};
TextRN.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
        </NativeBaseProvider>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {}
});
