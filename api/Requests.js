import {request} from "./Methods";
import {URLTypes} from "./URLTypes";

export const signIn = async (params) => await request(URLTypes.SIGN_IN, params, 'post');

export const registerPartner = async (params) => await request(URLTypes.REGISTER_PARTNER, params, 'post');

export const registerConfirmPhone = async (params) => await request(URLTypes.REGISTER_CONFIRM_PHONE, params, 'post');

export const registerPartnerLogin = async (params) => await request(URLTypes.REGISTER_PARTNER_LOGIN, params, 'post');