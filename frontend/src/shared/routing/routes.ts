export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number) => `/profile/${id}`,
    APARTMENT: (id: number) => `/apartment/${id}`,
    CATALOG: `/catalog`,
    REGISTRATION: `/registration`,
    LOGIN: '/login',
    CREATE_APARTMENT: '/create-apartment',
};
