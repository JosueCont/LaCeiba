import axios from "axios";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";


const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.production ? Constants.manifest.extra.URL : Constants.manifest.extra.URL_DEV,
    headers: {
        Accept: "application/json",
        Platform: 'app-partner'
    }
});
axiosInstance.interceptors.request.use(async (request) => {
    try {
        const token = JSON.parse(await AsyncStorage.getItem('@user'));

        console.log(token, 18)
        if (token) {
            let isExpired = false;
            let decodedToken = jwtDecode(token.access_token);
            console.log(decodedToken)
            // let dateNow = new Date();
            // if (decodedToken.exp < dateNow.getTime()) {
            //     console.log('expired:', true)
            //     isExpired = true
            //     try {
            //         let baseURL = Constants.manifest.extra.production ? Constants.manifest.extra.URL : Constants.manifest.extra.URL_DEV;
            //         const response = await axios.post(`${baseURL}/v1/auth/refresh`, {
            //             refresh_token: token.refresh_token
            //         })
            //
            //
            //         request.headers.Authorization = `Bearer ${response.data.access_token}`;
            //
            //
            //     } catch (e) {
            //         console.log(e.response.data, 43)
            //     }
            //
            // } else {
            //     console.log('expired:', false)
            request.headers.Authorization = `Bearer ${token.access_token}`;

            //}
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