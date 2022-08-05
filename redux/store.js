import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import appDuck from "./ducks/appDuck";

const rootReducer = combineReducers({
    appDuck: appDuck,
    productsDuck: productsDuck,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    //savedSession()(store.dispatch)
    return store
}