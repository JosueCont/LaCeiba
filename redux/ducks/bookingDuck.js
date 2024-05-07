
const SET_OPTION = 'set_option'
const SET_DATA_BOOKKING = 'set_data_booking'
const SET_BOOKING_INFO = 'set_booking_info'
const SET_ATTRIBUTE_BOOKING = 'set_attribute_booking'
const DELETE_PLAYER_LIST = 'delete_player_list'
const SET_TIME = 'set_time'
const RESET_TIME ='reset_time_booking'

const initialState = {
    option:0,
    dataBooking: [],
    createBooking:{},
    players:[],
    timeExpired: false,
    minutes:0,
    seconds:0
}

const bookingDuck = (state = initialState, action) => {
    switch(action.type){
        case SET_OPTION:
            return{ ...state, option: action.payload}
        case SET_DATA_BOOKKING:
            return{ ...state, dataBooking: action.payload}
        case SET_BOOKING_INFO:
            return{ ...state, createBooking: action.payload}
        case SET_ATTRIBUTE_BOOKING:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case DELETE_PLAYER_LIST:
            return{ ...state, players: state.players.filter((item) => (item.id || item?.idInvitado) !== action.payload)}
        case SET_TIME:
            return{ ...state, minutes: action.minutes, seconds: action.seconds}
        case RESET_TIME:
            return{ ...state, minutes:0, seconds:0}
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

export const setAtributeBooking = ({prop, value}) => {
    return{
        type: SET_ATTRIBUTE_BOOKING,
        payload: { prop, value }
    }
}

export const onDeletePlayer = (id) => {
    console.log('a elinimar',id)
    return{
        type: DELETE_PLAYER_LIST,
        payload: id
    }
}

export const onResetCounter = () => {
    return{
        type: RESET_TIME
    }
}

export const getCounter = (counter, stopInterval=false) => dispatch => {
    let countdownInterval; // Variable para almacenar la referencia del intervalo
    let stopCounter = false;
    const startCount = () => {
        countdownInterval = setInterval(() => {
            if (counter >= 0 && !stopInterval) {
              const minutes = Math.floor(counter / 60); // Obtener minutos
              const seconds = counter % 60; // Obtener segundos
              dispatch({type: SET_TIME, minutes:  minutes, seconds: seconds})
              //console.log(`${minutes} minutos ${seconds} segundos`); // Mostrar tiempo
            
              counter--; // Decrementar el contador en segundos
              //console.log('corriedno',counter)
            } else {
              clearInterval(countdownInterval); // Detener el contador cuando llegue a cero
              console.log('Tiempo terminado');
              if(!stopInterval) dispatch({type: SET_ATTRIBUTE_BOOKING, payload: {prop: 'timeExpired' , value: true}})
              else {
            console.log('reiniciar valores')
                counter = 0
                dispatch({type: SET_TIME, minutes:  0, seconds: 0})
             }
            }
    
        }, 1000);

    }

    const stopCounterFunction = () => {
        stopCounter = true; // Establecer la bandera para detener el contador
        clearInterval(countdownInterval); // Detener el intervalo utilizando la referencia almacenada
    };

    if(stopInterval) stopCounterFunction()
    else startCount()
    // Devolver tanto el intervalo como la función para detener el contador
    return { countdownInterval, stopCounterFunction };
}

export default bookingDuck;