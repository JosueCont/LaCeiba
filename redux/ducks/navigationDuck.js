const initialData = {}

const START = 'START';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';

const navigationDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case SUCCESS:
            return {...state, ...action.payload}
        case ERROR:
            return {...state, error: action.payload}
        case ERROR_SERVER:
            return {...state, error: action.payload}
        default:
            return state
    }
}


export let setAttribute = (key, value) => {
    return async (dispatch, getState) => {
        dispatch({type: SUCCESS, payload: {[key]: value}})
    };
}


export default navigationDuck;