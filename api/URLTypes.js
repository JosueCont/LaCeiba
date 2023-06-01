export const URLTypes = {
    SIGN_IN: '/v1/auth/login',
    LOG_OUT: '/v1/auth/logout/{{param}}',
    FIND_PARTNER: '/v1/users/app/partners',
    GET_ALL_PARTNERS: '/v1/users/partners',
    REGISTER_SEND_CONFIRM_PHONE: '/v1/auth/partner/send-confirm-phone',
    REGISTER_CONFIRM_PHONE: '/v1/auth/partner/confirm-phone',
    REGISTER_PARTNER: '/v1/users',
    FORGOT_PASSWORD: '/v1/auth/forgot-password',
    QR_CODE: '/v1/users/1/qr-code',
    TRY_FIND_PARTNER: '/v1/users/app/partners',
    VALIDATE_PARTNER: '/v1/users',
    GET_GUESTS: '/v1/access-control/guests',
    GENERATE_GUEST_QR: '/v1/users/{{param}}/guest/qr-code',
    GET_CATEGORIES: '/v1/content-management/categories',
    GET_CATEGORIES_DETAIL: '/v1/content-management/categories',
    GET_CATEGORY_DETAIL: '/v1/content-management',
    GET_ALL_SERVICES: '/v1/bookings/services',//?isGolf=true
    GET_INTERVALS: '/v1/bookings/areas/{{param}}/intervals',
    BOOK_SERVICE: '/v1/bookings/users/{{param}}',
    CACHE_BOOKING: '/v1/bookings/users/{{param}}/areas/{{param}}/reserved',
    GET_ALL_BOOKINGS: '/v1/bookings',//?page=1&limit=10,
    GET_ALL_INVITATIONS: '/v1/bookings/invitations',
    GET_ONE_INVITATION: '/v1/bookings/invitations/{{param}}',
    GET_PROFILE: '/v1/users/{{param}}/partners',
    GET_USER: '/v1/users/{{param}}',
    GET_ADDITIONAL_MEMBERS: '/v1/users/partners/action',
    GET_POINTS: '/v1/users/{{param}}/partners/points',
    SET_RESERVATION_STATUS: '/v1/bookings/invitations/{{param}}',
    GET_ADDITIONALS: '/v1/users/{{param}}/partners/additionals',
    CANCEL_BOOKING: '/v1/bookings/{{param}}/cancel',
    TRASNFER_POINTS: '/v1/transfer-points',
    REGISTER_SEND_CONFIRM_EMAIL: '/v1/auth/partner/send-confirm-email',
    REGISTER_CONFIRM_EMAIL: '/v1/auth/partner/confirm-email',
    GET_ALL_GUESTS: '/v1/free-services/users/guests', //?userId=
    CREATE_GUEST: '/v1/free-services/users/{{param}}/guests',
    EDIT_GUEST: '/v1/free-services/users/{{param}}/guests/{{param}}',
    EDIT_USER: '/v1/users/{{param}}',
    DELETE_GUEST: '/v1/free-services/users/guests/{{param}}',
    GET_FREE_SERVICES: '/v1/free-services',
    GENERATE_PASS : '/v1/free-services/users/{{param}}/guests/{{param}}/qr',
    GET_GF_LEADER : '/v1/fixed-groups/users/{{param}}/leaders',
    GET_ALL_GF: '/v1/fixed-groups',
    GET_ONE_GF: '/v1/fixed-groups/{{param}}',
    GET_GF_NEXTBOOKING : '/v1/fixed-groups/users/{{param}}/next-booking',
    CREATE_GF_BOOKING : '/v1/fixed-groups/{{param}}/users/{{param}}/booking',
    GET_ALL_NOTIFICATIONS: '/v1/notifications',
    GET_ONE_NOTIFICATION: '/v1/notifications/{{param}}',
    SET_NOTIFICATION_READ: '/v1/notifications/{{param}}',
    GET_GOOGLE_WALLET_TOKEN: '/v1/wallets/users/{{param}}/google',
    GET_ALL_PARTNERS_SCORE_CARDS: '/v1/score-card/user/{{param}}',
    GET_ONE_PARTNERS_SOCRE_CARD: '/v1/score-card/{{param}}',
    EDIT_HOLE: '/v1/score-card/{{param}}/hole',
    EDIT_COLOR_SCORE_CARD: '/v1/score-card/{{param}}',
    GET_REGISTRY_TABLE: '/v1/users/{{param}}/registry-table',
    REGISTRY_TABLE_ADD_RECORD: '/v1/users/{{param}}/registry-table/add-record',
    REGISTRY_TABLE_UPDATE_RECORD: '/v1/users/{{param}}/registry-table/{{param}}',
    REGISTRY_TABLE_DELETE_RECORD: '/v1/users/{{param}}/registry-table/{{param}}',
    GET_ALL_PRODUCTS: '/v1/e-commerce/products',
    GET_ALL_PRODUCTS_CATEGORY: '/v1/e-commerce/product-category',
    GET_USER_DATA_DELETION_REQUEST: '/v1/users/{{param}}/data-deletion-request',
    CREATE_USER_DATA_DELETION_REQUEST: '/v1/users/{{param}}/data-deletion-request'
};
