export const URLTypes = {
    SIGN_IN: '/v1/auth/login',
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
    BOOK_SERVICE: '/v1/bookings/users/{{param}}'
};
