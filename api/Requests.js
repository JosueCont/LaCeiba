import {request} from "./Methods";
import {URLTypes} from "./URLTypes";

export const signIn = async (params) => await request(URLTypes.SIGN_IN, params, 'post');
export const findPartner = async (params) => await request(URLTypes.FIND_PARTNER, params, 'get');
export const findPartnerQuery = async (params) => await request(URLTypes.GET_ALL_PARTNERS, params, 'get');
export const tryFindPartner = async (params) => await request(URLTypes.TRY_FIND_PARTNER, params, 'get');
export const registerConfirmPhone = async (params) => await request(URLTypes.REGISTER_CONFIRM_PHONE, params, 'post');
export const registerSendConfirmPhone = async (params) => await request(URLTypes.REGISTER_SEND_CONFIRM_PHONE, params, 'post');
export const registerPartner = async (params, config) => await request(URLTypes.REGISTER_PARTNER, params, 'post', config);
export const forgotPassword = async (params) => await request(URLTypes.FORGOT_PASSWORD, params, 'post');
export const validatePartner = async (params) => await request(URLTypes.VALIDATE_PARTNER, params, 'get');
export const getGuests = async (params) => await request(URLTypes.GET_GUESTS, params, 'get');
export const generateGuestsQR = async (params, queryStringParams = []) => await request(URLTypes.GENERATE_GUEST_QR, params, 'post', null, queryStringParams);
export const getCategories = async (params) => await request(URLTypes.GET_CATEGORIES, params, 'get');
export const getCategoriesDetail = async (params) => await request(URLTypes.GET_CATEGORIES_DETAIL, params, 'get');
export const getCategoryDetail = async (params) => await request(URLTypes.GET_CATEGORY_DETAIL, params, 'get');
export const getAllServices = async (params) => await request(URLTypes.GET_ALL_SERVICES, params, 'get');
export const getIntervalsTime = async (params, queryStringParams = []) => await request(URLTypes.GET_INTERVALS, params, 'get', null, queryStringParams);
export const getAllIntervalsTime = async(params, queryStringParams = []) => await request(URLTypes.GET_ALL_INTERVALS_TIME, params, 'get', null, queryStringParams)
export const cacheBookHour = async (params, queryStringParams = []) => await request(URLTypes.CACHE_BOOKING, params, 'post', null, queryStringParams);
export const bookService = async (params, queryStringParams = []) => await request(URLTypes.BOOK_SERVICE, params, 'post', null, queryStringParams);
export const getAllBookings = async (params) => await request(URLTypes.GET_ALL_BOOKINGS, params, 'get');
export const getAllInvitations = async (params) => await request(URLTypes.GET_ALL_INVITATIONS, params, 'get');
export const getOneInvitation = async (params, queryStringParams) => await request(URLTypes.GET_ONE_INVITATION, params, 'get', null, queryStringParams);
export const deletePartnersBooking = async(params, queryStringParams = []) => await request(URLTypes.DELETE_PARTNERS_BOOKING, params, 'post', null, queryStringParams);
export const addPartnersBooking = async(params, queryStringParams = []) => await request(URLTypes.ADD_PARTNERS_BOOKING, params, 'post', null, queryStringParams);
export const deleteGuestsBooking = async(params, queryStringParams = []) => await request(URLTypes.DELETE_GUESTS_BOOKING, params, 'post', null, queryStringParams);
export const addGuestsBooking = async(params, queryStringParams = []) => await request(URLTypes.ADD_GUESTS_BOOKING, params, 'post', null, queryStringParams);
export const getProfile = async (params, queryStringParams = []) => await request(URLTypes.GET_PROFILE, params, 'get', null, queryStringParams);
export const getUser = async (params, queryStringParams = []) => await request(URLTypes.GET_USER, params, 'get', null, queryStringParams);
export const getAdditionalMembers = async (params) => await request(URLTypes.GET_ADDITIONAL_MEMBERS, params, 'get');
export const getPoints = async (params, queryStringParams = []) => await request(URLTypes.GET_POINTS, params, 'get', null, queryStringParams);
export const setReservationStatus = async (params, queryStringParams = []) => await request(URLTypes.SET_RESERVATION_STATUS, params, 'put', null, queryStringParams);
export const getAdditionals = async (params, queryStringParams = []) => await request(URLTypes.GET_ADDITIONALS, params, 'get', null, queryStringParams);
export const unBlockHour = async (params, queryStringParams = []) => await request(URLTypes.CACHE_BOOKING, params, 'delete', null, queryStringParams);
export const cancelBooking = async (params, queryStringParams = []) => await request(URLTypes.CANCEL_BOOKING, params, 'delete', null, queryStringParams);
export const transferPoints = async (params) => await request(URLTypes.TRASNFER_POINTS, params, 'post');
export const transferPointsMembers = async (params) => await request(URLTypes.TRASNFER_POINTS_MEMBERS, params, 'post');
export const editUser = async (params, queryStringParams = []) => await request(URLTypes.EDIT_USER, params, 'put', null, queryStringParams);
export const getBalanceInfo = async(params) => await request(URLTypes.GET_BALANCE_INFO, params, 'post');
export const getTotalBalance = async(params) => await request(URLTypes.GET_TOTAL_BALANCE, params, 'post');

export const registerSendConfirmEmail = async (params) => await request(URLTypes.REGISTER_SEND_CONFIRM_EMAIL, params, 'post');
export const registerConfirmEmail = async (params) => await request(URLTypes.REGISTER_CONFIRM_EMAIL, params, 'post');
export const registerConfirmUser = async () => await request(URLTypes.REGISTER_CONFIRM_USER, '', 'post');
export const getAllGuests = async (params) => await request(URLTypes.GET_ALL_GUESTS, params, 'get');
export const createGuest = async (params, queryStringParams = []) => await request(URLTypes.CREATE_GUEST, params, 'post', null, queryStringParams);
export const editGuest = async (params, queryStringParams = []) => await request(URLTypes.EDIT_GUEST, params, 'put', null, queryStringParams);
export const deleteGuest = async (params, queryStringParams = []) => await request(URLTypes.DELETE_GUEST, params, 'delete', null, queryStringParams);
export const getFreeServices = async (params) => await request(URLTypes.GET_FREE_SERVICES, params, 'get');
export const generatePass = async (params, queryStringParams = []) => await request(URLTypes.GENERATE_PASS, params, 'post', null, queryStringParams);

export const getOneGF = async (params, queryStringParams = []) => await request(URLTypes.GET_ONE_GF, params, 'get', null, queryStringParams);
export const getGFLeader = async (params, queryStringParams = []) => await request(URLTypes.GET_GF_LEADER, params, 'get', null, queryStringParams);
export const getAllGF = async (params) => await request(URLTypes.GET_ALL_GF, params, 'get');
export const getGFNextBooking = async (params, queryStringParams = []) => await request(URLTypes.GET_GF_NEXTBOOKING, params, 'get', null, queryStringParams);
export const createBookingGF = async (params, queryStringParams = []) => await request(URLTypes.CREATE_GF_BOOKING, params, 'post', null, queryStringParams);
export const logOut = async (params, queryStringParams = []) => await request(URLTypes.LOG_OUT, params, 'delete', null, queryStringParams);

export const getAllNotifications = async (params) => await request(URLTypes.GET_ALL_NOTIFICATIONS, params, 'get');
export const getOneNotification = async (params, queryStringParams = []) => await request(URLTypes.GET_ONE_NOTIFICATION, params, 'get', null, queryStringParams);
export const setNotificationRead = async (params, queryStringParams = []) => await request(URLTypes.SET_NOTIFICATION_READ, params, 'put', null, queryStringParams);
export const deletetNotification = async (params, queryStringParams = []) => await request(URLTypes.DELETE_NOTIFICATION, params, 'delete', null, queryStringParams);
export const getTokenGoogleWallet = async (params, queryStringParams = []) => await request(URLTypes.GET_GOOGLE_WALLET_TOKEN, params, 'get', null, queryStringParams);
export const getAllPartnersScoreCards = async (params, queryStringParams = []) => await request(URLTypes.GET_ALL_PARTNERS_SCORE_CARDS, params, 'get', null, queryStringParams);
export const getOnePartnersScoreCards = async (params, queryStringParams = []) => await request(URLTypes.GET_ONE_PARTNERS_SOCRE_CARD, params, 'get', null, queryStringParams);
export const editPartnersScoreCard = async (params, queryStringParams = []) => await request(URLTypes.EDIT_HOLE, params, 'put', null, queryStringParams);
export const editColorScoreCard = async (params, queryStringParams = []) => await request(URLTypes.EDIT_COLOR_SCORE_CARD, params, 'put', null, queryStringParams);

export const getRegistryTable = async (params, queryStringParams = []) => await request(URLTypes.GET_REGISTRY_TABLE, '', 'get', null, queryStringParams)
export const registryTableAddRecord = async (data, queryStringParams = []) => await request(URLTypes.REGISTRY_TABLE_ADD_RECORD, data, 'post', null, queryStringParams)
export const registryTableUpdateRecord = async (data, queryStringParams = []) => await request(URLTypes.REGISTRY_TABLE_UPDATE_RECORD, data, 'put', null, queryStringParams)
export const registryTableDeleteRecord = async (params, queryStringParams = []) => await request(URLTypes.REGISTRY_TABLE_DELETE_RECORD, '', 'delete', null, queryStringParams)
export const getAllProductsCategories = async (params, queryStringParams = []) => await request(URLTypes.GET_ALL_PRODUCTS_CATEGORY, '', 'get', null, queryStringParams)
export const getAllProducts = async (params, queryStringParams = []) => await request(URLTypes.GET_ALL_PRODUCTS, '', 'get', null, queryStringParams)

export const getUserDataDeletionRequest =  async (data, queryStringParams = []) => await request(URLTypes.GET_USER_DATA_DELETION_REQUEST, '', 'get', null, queryStringParams)
export const createUserDataDeletionRequest =  async (data, queryStringParams = []) => await request(URLTypes.CREATE_USER_DATA_DELETION_REQUEST, '', 'post', null, queryStringParams)
export const updateUserPassword =  async (data, queryStringParams = []) => {
    console.log('ThequeryStringParams', queryStringParams)
    return await request(URLTypes.UPDATE_USER_PASSWORD, data, 'post', null, queryStringParams)
}

export const sendPushToken = async (params, queryStringParams = []) => await request(URLTypes.UPDATE_DEVICE, params, 'post', null, queryStringParams);

export const addPartnerSap = async(params) => await request(URLTypes.ADD_PARTNER_SAP, params, 'post', null);
export const getConfig = async () => await request(URLTypes.GET_CONFIG, '', 'get')
export const getListGuessing = async(params) => await request(URLTypes.GET_NORMAL_GUESSING, params, 'get')
export const postJoinBookingRequest = async(data) => await request(URLTypes.POST_JOIN_BOOKING_REQUEST, data,'post')
export const getListRequestGuests = async(params, queryStringParams = []) => await request(URLTypes.POST_JOIN_BOOKING_REQUEST, params,'get', null, queryStringParams)
export const putAcceptRequestGuest = async(data, queryStringParams =[]) => await request(URLTypes.BOOKING_REQUEST_GUESTS, data, 'put', null, queryStringParams)
export const deleteRequestGuest = async(data, queryStringParams=[]) => await request(URLTypes.BOOKING_REQUEST_GUESTS, data, 'delete', null, queryStringParams)
export const getReservationInfoId = async(queryStringParams=[]) => await request(URLTypes.GET_RESERVATION_ID, '', 'get', null, queryStringParams)
export const getReservationPerUserDay = async(params, queryStringParams=[]) => await request(URLTypes.GET_MY_RESERVATIONS_PER_DAY,params,'get', null, queryStringParams)
export const getPartnersFamily = async(params, queryStringParams=[]) => await request(URLTypes.GET_FAMILY_PARTNERS, params,'get', null, queryStringParams)
export const getStatementAccountfile = async(params, queryStringParams=[]) => await request(URLTypes.GET_FILE_STATEMENT,params,'get')
export const getUserDebt = async(params, queryStringParams=[]) => await request(URLTypes.GET_DEBT_USER, params, 'get', null, queryStringParams)
export const postAddInvited = async(params, queryStringParams=[]) => await request(URLTypes.POST_ADD_INVITED, params, 'post', null, queryStringParams)
export const getInfoInvited = async(params, queryStringParams=[]) => await request(URLTypes.GET_INFO_INVITED, params, 'get', null, queryStringParams)
export const putInfoInvited = async(params, queryStringParams=[]) => await request(URLTypes.GET_INFO_INVITED, params, 'put', null, queryStringParams)
export const getTotalReservationsPerMonth = async(params, queryStringParams=[]) => await request(URLTypes.BOOK_SERVICE, params, 'get', null, queryStringParams)
