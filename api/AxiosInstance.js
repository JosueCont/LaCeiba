import axios from "axios";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import generateStore from "../redux/store";
import { loggedAction, loggedOutAction, onSetModalExpired } from "../redux/ducks/appDuck";

const store = generateStore();

const axiosInstance = axios.create({
    baseURL: Constants.expoConfig.extra.production ? Constants.expoConfig.extra.URL : Constants.expoConfig.extra.URL_DEV,
    headers: {
        Accept: "application/json",
        Platform: 'app-partner'
    }
});

axiosInstance.interceptors.request.use(
    async (request) => {
        const token = JSON.parse(await AsyncStorage.getItem('@user'));
        // console.log("TOKEN REQUEST", token)
        if (token) request.headers.Authorization = `Bearer ${token.access_token}`;
        return request;
    },
    async (error) => {
        console.log("Reject", error)
        return Promise.reject(error.response)
    }
)

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;

    },
    async (error) => {
        const { dispatch } = store;

        const originalRequest = error.config;
        if (error.response && error?.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true
            const token = JSON.parse(await AsyncStorage.getItem('@user'));
            console.log("REFRESH TOken", token.refresh_token)
            try {
                let baseURL = Constants.expoConfig.extra.production ? Constants.expoConfig.extra.URL : Constants.expoConfig.extra.URL_DEV;
                const response = await axios.post(`${baseURL}/v1/auth/refresh`, {
                    refresh_token: token.refresh_token
                })
                console.log('RESPONSE:', response);
                if (response.status === 201) {
                    await AsyncStorage.setItem('@user', JSON.stringify(response.data))
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                    dispatch(loggedAction(response.data))
                    await AsyncStorage.setItem("access_token", JSON.stringify(response.data.access_token));
                    return axiosInstance(originalRequest)
                }
                else {
                    if (Constants.expoConfig.slug === 'laceiba') {
                        dispatch(onSetModalExpired(true))
                    }
                }
            } catch (e) {
                console.log("FAILED ", JSON.stringify(e.response))
                dispatch(onSetModalExpired(true))
                dispatch(loggedOutAction())
            }

        }
        return Promise.reject(error.response)
    })

export default axiosInstance;

