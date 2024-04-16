import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import appDuck, {loggedAction} from "./ducks/appDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationDuck from "./ducks/navigationDuck";
import bookingDuck from "./ducks/bookingDuck";

const rootReducer = combineReducers({
    appDuck: appDuck,
    navigationDuck: navigationDuck,
    bookingDuck: bookingDuck
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    (async () => {
        try {

            const user = await AsyncStorage.getItem('@user')
            const userJSON = JSON.parse(user);
            if (userJSON) {
                loggedAction(userJSON)(store.dispatch)
            }


        } catch (e) {
            console.log('store error => ', e.toString())
        }
    })()
    return store
}

