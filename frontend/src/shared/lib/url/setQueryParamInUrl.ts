export const setQueryParamInUrl = (queries: Record<string, string>) => {
    const url = new URLSearchParams(window.location.search);

    for (const key in queries) {
        if (queries[key] !== undefined) {
            url.set(key, queries[key]);
        }
    }

    window.history.pushState(null, '', `?${url.toString()}`);
};
