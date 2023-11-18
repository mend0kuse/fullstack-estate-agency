export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    EDIT_PROFILE: `/user/profile`,

    APARTMENT: `/apartment`,
    APARTMENT_BY_ID: (id: number) => `/apartment/${id}`,

    ORDER_BY_APARTMENT_ID: (id: number) => `/order/${id}`,
    ORDER_BY_ID: (id: number) => `/order/${id}`,
    ORDER: `/order`,
};

export const QUERY_KEYS = {
    USER: 'user',
    APARTMENT: 'apartment',
    ORDER: 'order',
};
