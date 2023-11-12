export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    EDIT_PROFILE: `/user/profile`,

    APARTMENT: `/apartment`,
};

export const QUERY_KEYS = {
    USER: 'user',
    APARTMENT: 'apartment',
};
