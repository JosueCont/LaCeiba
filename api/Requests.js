import {request} from "./Methods";
import {URLTypes} from "./URLTypes";

export const signIn = async (params) => await request(URLTypes.SIGN_IN, params, 'post');