import React from "react";
import {Alert, Linking, Platform} from "react-native";
import moment from "moment/moment";
import _ from "lodash";


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


export const disabledDay = (extraOrdinaryDates = []) => {
    let arrayDays = {};
    // se agregar el dia actual para poder desabilitarlo
    arrayDays[moment().format('YYYY-MM-DD')] = {disabled: true};
    // se agregan los lunes para desabilitarlos
    for (let i = 1; i <= 7; i++) {
        let currentDay = moment().add(i, 'days');
        if (currentDay.day() === 1 && !extraOrdinaryDates.find(date => date === currentDay.format("YYYY-MM-DD"))) {
            let date = {};
            arrayDays[currentDay.format('YYYY-MM-DD')] = {disabled: true};

        }
    }
    return arrayDays;

}


export const errorCapture = async (e) => {
    let status = 0;
    let value = '';
    let object = {};
    let data = {};
    let url = ''
    if (_.has(e, 'data')) {
        status = e?.status;
        value = e?.data.message;
        object = e?.data;
        data = e?.config.data;
        url = e?.request._url;
    } else {
        status = 0;
        value = e;
        object = e;
    }
    return {
        status,
        value,
        object,
        data,
        url
    }
}