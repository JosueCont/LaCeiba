import axios from "axios";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import generateStore from "../redux/store";
import {loggedAction} from "../redux/ducks/appDuck";

const store = generateStore();

const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.production ? Constants.manifest.extra.URL : Constants.manifest.extra.URL_DEV,
    headers: {
        Accept: "application/json",
        Platform: 'app-partner'
    }
});
axiosInstance.interceptors.request.use(async (request) => {
    try {
        console.log(request.url)
        const token = JSON.parse(await AsyncStorage.getItem('@user'));

        console.log(token, 18)
        if (token) {
            let isExpired = false;
            let decodedToken = jwtDecode(token.access_token);
            console.log(decodedToken)
            let dateNow = new Date();

            if (Date.now() <= decodedToken.exp * 1000) {
                request.headers.Authorization = `Bearer ${token.access_token}`;
                console.log('No ha expirado.')
            } else {

                isExpired = true
                try {
                    let baseURL = Constants.manifest.extra.production ? Constants.manifest.extra.URL : Constants.manifest.extra.URL_DEV;
                    const response = await axios.post(`${baseURL}/v1/auth/refresh`, {
                        refresh_token: token.refresh_token
                    })

                    await AsyncStorage.setItem('@user', JSON.stringify(response.data))
                    const {dispatch} = store; // direct access to redux store.
                    dispatch(loggedAction(response.data))

                    console.log(response, 35)

                    request.headers.Authorization = `Bearer ${response.data.access_token}`;

                    console.log('Expiro pero se actualizo.')

                } catch (e) {
                    console.log(e, 43)
                }
            }
        }

    } catch (e) {
        console.log(e, 51)
    }


    return request;
}, (error) => {
    //console.log(error.response, 'interceptors.request.error')
    return Promise.reject(error.response)
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    //console.log(error.response, 'interceptors.response.error')

    return Promise.reject(error.response)
})

export default axiosInstance;