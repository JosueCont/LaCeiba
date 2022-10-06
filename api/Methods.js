import AxiosInstance from "./AxiosInstance";

export const request = async (uri, params = '', method, config = null, queryStringParams = []) => {
    if (method === 'post') {

        let uriResolved = queryStringParams.length > 0 ? paramsResolve(uri, queryStringParams) : uri;
        return await requestPost(uriResolved, params, config)
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


const paramsResolve = (string, array) => {
    return string.replace(/\{\{param\}\}/g, (i => _ => array[i++])(0));
}