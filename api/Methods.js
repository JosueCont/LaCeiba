import AxiosInstance from "./AxiosInstance";

export const request = async (uri, params, method) => {
    if (method === 'post') {
        return await requestPost(uri, params)
    } else if (method === 'get') {
        return await requestGET(uri, params)
    }
}

const requestPost = async (uri, params) => {
    return await AxiosInstance.post(uri, params)
}

const requestGET = async (uri, params = '') => {
    return await AxiosInstance.get(uri + `${params}`)
}