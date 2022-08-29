import AxiosInstance from "./AxiosInstance";

export const request = async (uri, params, method, config = null) => {
    if (method === 'post') {
        return await requestPost(uri, params, config)
    } else if (method === 'get') {
        return await requestGET(uri, params)
    }
}

const requestPost = async (uri, params, config = null) => {
    return await AxiosInstance.post(uri, params, config)
}

const requestGET = async (uri, params = '') => {
    return await AxiosInstance.get(uri + `${params}`)
}