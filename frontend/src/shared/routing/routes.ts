export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number) => `/profile/${id}`,
    APARTMENT: (id: number) => `/apartment/${id}`,
    REGISTRATION: `/registration`,
    LOGIN: '/login',
    CREATE_APARTMENT: '/create-apartment',
};
