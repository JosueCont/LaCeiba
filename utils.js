import React from "react";
import {Alert, Linking, Platform} from "react-native";
import _ from "lodash";
import moment from "moment/moment";
import { PixelRatio } from "react-native";

export const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    }).catch(e => {
        console.log("wai error => ", e.toString());
    });
}

export const dayWeek = {
    'Monday': {day: 'Lunes', id: 1},
    'Tuesday': {day: 'Martes', id: 2},
    'Wednesday': {day: 'Miércoles', id: 3},
    'Thursday' : {day: 'Jueves', id: 4},
    'Friday': {day: 'Viernes', id: 5},
    'Saturday': {day: 'Sábado', id: 6},
    'Sunday' : {day: 'Domingo', id: 7},
}

export const genders = {
    'H': 'Hombre',
    'M': 'Mujer',
//    'N': 'No binario',
    // 'NE' : 'No especificado',  Anteriormente tenía NE el no especificado.
    'N' : 'No especificado',
}

export const formatHour = (timeString) => {
    //if(!timeString) return;
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + ' ' +(hour < 12 ? "AM" : "PM");
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


// export const disabledDay = (extraOrdinaryDates = []) => {
//     let arrayDays = {};
//     // se agregar el dia actual para poder desabilitarlo
//     //arrayDays[moment().format('YYYY-MM-DD')] = {disabled: true};
//     // se agregan los lunes para desabilitarlos
//     for (let i = 1; i <= 7; i++) {
//         let currentDay = moment().add(i, 'days');
//         //if (currentDay.day() === 1 && !extraOrdinaryDates.find(date => date === currentDay.format("YYYY-MM-DD"))) {
//         if (extraOrdinaryDates.find(date => date === currentDay.format("YYYY-MM-DD"))) {
//             arrayDays[currentDay.format('YYYY-MM-DD')] = {disabled: true};
//         }
//     }
//     console.log(extraOrdinaryDates,arrayDays, 52)
//     return arrayDays;
//
// }

export const disabledDay = (areaDays, bookNextDay) => {
    try {
        let arrayDays = {};
        if (bookNextDay === true) {
            arrayDays[moment().format('YYYY-MM-DD')] = {disabled: true};
        }

        for (let i = 0; i <= 6; i++) {
            let currentDay = moment().add(i, 'days');
            let dayObject = _.find(areaDays, {day: moment(currentDay).locale('en').format('dddd')});
            if (dayObject.isActive === false) {
                arrayDays[currentDay.format('YYYY-MM-DD')] = {disabled: true};
            }
        }
        return arrayDays;
    } catch (e) {

        console.log(e)
    }

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
    console.log({
        status,
        value,
        object,
        data,
        url
    })
    return {
        status,
        value,
        object,
        data,
        url
    }
}

export const aliasGenerate = (email) => {
    return email.split('@')[0] + '+' + getRandomInt(100).toString() + '@' + email.split('@')[1];
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const NOTIFICATION_TYPES = {
    NOTIFY_HOST_BOOKING_READY: 'NOTIFY_HOST_BOOKING_READY',
    NOTIFY_HOST_BOOKING_CANCELED: 'NOTIFY_HOST_BOOKING_CANCELED',
    NOTIFY_HOST_INVITATION_CONFIRMED: 'NOTIFY_HOST_INVITATION_CONFIRMED',
    NOTIFY_HOST_INVITATION_REJECTED: 'NOTIFY_HOST_INVITATION_REJECTED',
    NOTIFY_GUEST_BOOKING_INVITATION:' NOTIFY_GUEST_BOOKING_INVITATION',
    NOTIFY_GUEST_BOOKING_CANCELED: 'NOTIFY_GUEST_BOOKING_CANCELED'
}

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size * fontScale;

export const setFormatNumber = (number) => {
    const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
  }