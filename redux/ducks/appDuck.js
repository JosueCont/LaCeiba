import AsyncStorage from "@react-native-async-storage/async-storage";


const initialData = {
    logged: null,
    user: null
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const appDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, logged: true, ...action.payload}
        case LOGOUT:
            return {...state, logged: false}
        default:
            return state
    }
}

export let loggedAction = (data) => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('logged', JSON.stringify(true));
        dispatch({type: LOGIN, payload: data});
    };
}

export let loggedOutAction = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('@user', '');
        await AsyncStorage.setItem('ghin','')
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


export default appDuck;