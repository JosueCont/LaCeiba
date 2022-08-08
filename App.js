import React from 'react';
import {LogBox, StyleSheet, Text as TextRN, TextInput} from 'react-native';
import {NativeBaseProvider, Spinner, Text, View} from 'native-base';
import {theme} from "./theme";
import {Provider} from "react-redux";
import generateStore from "./redux/store";
import {useFonts} from "expo-font";
import {Colors} from "./Colors";
import NavigationContainerMain from "./navigation/NavigationContainerMain";


const store = generateStore();


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
                    <NavigationContainerMain/>
                </NativeBaseProvider>
            </Provider>
        );
    }
    return (
        <NativeBaseProvider theme={theme}>
            <View flex={1} backgroundColor={Colors.green} alignItems={'center'} justifyContent={'center'}>
                <Spinner size={'sm'} color={'white'}></Spinner>
            </View>
        </NativeBaseProvider>

    );

}


const styles = StyleSheet.create({
    container: {}
});
