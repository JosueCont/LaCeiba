import axios from "axios";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";


const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.production ? Constants.manifest.extra.URL : Constants.manifest.extra.URL_DEV,
    headers: {
        Accept: "application/json",
    }
});

axiosInstance.interceptors.request.use(async (request) => {


    try {
        const token = JSON.parse(await AsyncStorage.getItem('@user'));
        if (token) request.headers.Authorization = `Bearer ${token.access}`;
    } catch (e) {
        console.log('APIKit.interceptors.request error =>', e.toString())
    }
    return request;
}, (error) => {
    console.log(error.response, 'interceptors.request.error')
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error.response, 'interceptors.response.error')
})

export default axiosInstance;