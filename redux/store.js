import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import appDuck, {loggedAction} from "./ducks/appDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
    appDuck: appDuck,
    productsDuck: productsDuck,
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

