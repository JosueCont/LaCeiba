import React from 'react';
import {LogBox, StyleSheet, Text as TextRN, TextInput} from 'react-native';
import {NativeBaseProvider, Spinner, Text, View} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {useFonts} from "expo-font";
import {Color} from "./Colors";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ComponentsScreen from "./screens/ComponentsScreen";
import VerifyAccountScreen from "./screens/VerifyAccountScreen";

const Stack = createStackNavigator();


LogBox.ignoreAllLogs();

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


if (TextRN.defaultProps == null) TextRN.defaultProps = {};
TextRN.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {

    let [fontsLoaded] = useFonts({
        'BrandonThin': require('./assets/fonts/BrandonGrotesque/BrandonThin.otf'),
        'BrandonThinIt': require('./assets/fonts/BrandonGrotesque/BrandonThinIt.otf'),
        'BrandonLight': require('./assets/fonts/BrandonGrotesque/BrandonLight.otf'),
        'BrandonReg': require('./assets/fonts/BrandonGrotesque/BrandonReg.otf'),
        'BrandonRegIt': require('./assets/fonts/BrandonGrotesque/BrandonRegIt.otf'),
        'BrandonMed': require('./assets/fonts/BrandonGrotesque/BrandonMed.otf'),
        'BrandonMedIt': require('./assets/fonts/BrandonGrotesque/BrandonMedIt.otf'),
        'BrandonBld': require('./assets/fonts/BrandonGrotesque/BrandonBld.otf'),
        'BrandonBldIt': require('./assets/fonts/BrandonGrotesque/BrandonBldIt.otf'),
        'BrandonBlk': require('./assets/fonts/BrandonGrotesque/BrandonBlk.otf'),
        'BrandonBlkIt': require('./assets/fonts/BrandonGrotesque/BrandonBlkIt.otf'),
        'ComfortaaBold': require('./assets/fonts/Comfortaa/Comfortaa-Bold.ttf'),
        'ComfortaaLight': require('./assets/fonts/Comfortaa/Comfortaa-Light.ttf'),
        'ComfortaaMedium': require('./assets/fonts/Comfortaa/Comfortaa-Medium.ttf'),
        'ComfortaaRegular': require('./assets/fonts/Comfortaa/Comfortaa-Regular.ttf'),
        'ComfortaaSemiBold': require('./assets/fonts/Comfortaa/Comfortaa-SemiBold.ttf'),
        'ComfortaaVariable': require('./assets/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf'),

    });
    if (fontsLoaded) {
        return (
            <Provider store={store}>
                <NativeBaseProvider theme={theme}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{gestureEnabled: true}}>

                            <Stack.Screen name="HomeScreen" component={StartScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="VerifyAccountScreen" component={VerifyAccountScreen} options={{headerShown: false}}/>

                        </Stack.Navigator>
                    </NavigationContainer>
                </NativeBaseProvider>
            </Provider>
        );
    }
    return (
        <NativeBaseProvider theme={theme}>
            <View flex={1} justifyContent={'center'} alignItems={'center'} backgroundColor={Color.green}>
                <Spinner></Spinner>
            </View>
        </NativeBaseProvider>

    );

}


const styles = StyleSheet.create({
    container: {}
});
