import {request} from "./Methods";
import {URLTypes} from "./URLTypes";

export const signIn = async (params) => await request(URLTypes.SIGN_IN, params, 'post');
export const findPartner = async (params) => await request(URLTypes.FIND_PARTNER, params, 'get');
export const tryFindPartner = async (params) => await request(URLTypes.TRY_FIND_PARTNER, params, 'get');
export const registerConfirmPhone = async (params) => await request(URLTypes.REGISTER_CONFIRM_PHONE, params, 'post');
export const registerSendConfirmPhone = async (params) => await request(URLTypes.REGISTER_SEND_CONFIRM_PHONE, params, 'post');
export const registerPartner = async (params, config) => await request(URLTypes.REGISTER_PARTNER, params, 'post', config);
export const forgotPassword = async (params) => await request(URLTypes.FORGOT_PASSWORD, params, 'post');
export const validatePartner = async (params) => await request(URLTypes.VALIDATE_PARTNER, params, 'get');
export const getGuests = async (params) => await request(URLTypes.GET_GUESTS, params, 'get');
export const generateGuestsQR = async (params) => await request(URLTypes.GENERATE_GUEST_QR, params, 'post');