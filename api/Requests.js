import {request} from "./Methods";
import {URLTypes} from "./URLTypes";

export const signIn = async (params) => await request(URLTypes.SIGN_IN, params, 'post');

export const registerPartner = async (params) => await request(URLTypes.REGISTER_PARTNER, params, 'post');

export const registerConfirmPhone = async (params) => await request(URLTypes.REGISTER_CONFIRM_PHONE, params, 'post');

export const registerPartnerLogin = async (params) => await request(URLTypes.REGISTER_PARTNER_LOGIN, params, 'post');

export const registerSendConfirmPhone = async (params) => await request(URLTypes.REGISTER_SEND_CONFIRM_PHONE, params, 'post');

export const forgotPassword = async (params) => await request(URLTypes.FORGOT_PASSWORD, params, 'post');

export const generateQRCode = async (params) => await request(URLTypes.QR_CODE, params, 'get');
