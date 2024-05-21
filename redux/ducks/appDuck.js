import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAttribute } from "./navigationDuck";



const initialData = {
    logged: null,
    user: null,
    modalExpired:false
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GO_LOGIN = 'go_login'

const appDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, logged: true, ...action.payload}
        case LOGOUT:
            return {...state, logged: false}
        case GO_LOGIN:
            return{ ...state, modalExpired: action.payload}
        default:
            return state
    }
}

export let loggedAction = (data) => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('logged', JSON.stringify(true));
        dispatch({type: LOGIN, payload: data});
        const products = JSON.parse(await AsyncStorage.getItem('products'));
        if(products){
            dispatch(setAttribute('products', products))
        }else{
            dispatch(setAttribute('products', ''))

        }
    };
}

export let loggedOutAction = () => {
    return async (dispatch, getState) => {
        console.log('a ceerrar')
        await AsyncStorage.setItem('@user', '');
        await AsyncStorage.setItem('ghin','')
        await AsyncStorage.setItem('products','')
        await AsyncStorage.setItem('logged', JSON.stringify(false));

        dispatch({type: LOGOUT});
    };
}

export const bootAction = () => {
    return async (dispatch, getState) => {

        try {
            const user = await AsyncStorage.getItem('@user');
            console.log(JSON.parse(user), 31)
            if (JSON.parse(user)) {
                dispatch({type: LOGIN, payload: JSON.parse(user)});
            }
        } catch (e) {
            console.log(e, 37)
        }

    };
}

export const onSetModalExpired = (val) => {
    return{
        type: GO_LOGIN,
        payload: val
    }
}

export default appDuck;