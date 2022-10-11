import React from "react";
import {Alert, Linking, Platform} from "react-native";


export const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    }).catch(e => {
        console.log("wai error => ", e.toString());
    });
}


export const dialCall = async (number) => {
    let phoneNumber = '';
    if (!number) {
        Alert.alert('No se tiene registrado un número')
        return;
    }
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number.replace(/\s/g, '')}`;
    } else {
        phoneNumber = `telprompt:${number.replace(/\s/g, '')}`;
    }

    Linking.canOpenURL(phoneNumber).then(supported => {
        if (!supported) {
            Alert.alert('Llame al siguiente número: ' + phoneNumber);
        } else {
            return Linking.openURL(phoneNumber);
        }
    }).catch(e => {
        console.log("dialCall canOpenURL error => ", e.toString());
    });
};

