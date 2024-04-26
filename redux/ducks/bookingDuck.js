
const SET_OPTION = 'set_option'
const SET_DATA_BOOKKING = 'set_data_booking'
const SET_BOOKING_INFO = 'set_booking_info'

const initialState = {
    option:0,
    dataBooking: [],
    createBooking:{}
}

const bookingDuck = (state = initialState, action) => {
    switch(action.type){
        case SET_OPTION:
            return{ ...state, option: action.payload}
        case SET_DATA_BOOKKING:
            return{ ...state, dataBooking: action.payload}
        case SET_BOOKING_INFO:
            return{ ...state, createBooking:{ ...state.createBooking, ...action.payload}}
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

export const setInfoBooking = (data) => {
    return{
        type: SET_DATA_BOOKKING,
        payload: data?.items
    }
}

export const setDataBooking = (data) => {
    return{
        type: SET_BOOKING_INFO,
        payload: data
    }
}

export default bookingDuck;