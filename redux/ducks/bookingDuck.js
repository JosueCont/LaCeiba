const SET_OPTION = 'set_option'

const initialState = {
    option:0
}

const bookingDuck = (state = initialState, action) => {
    switch(action.type){
        case SET_OPTION:
            return{ ...state, option: action.payload}
        default:
            return state;
    }
}

export const setOption = (option) => {
    return{
        type: SET_OPTION,
        payload: option
    }
}

export default bookingDuck;