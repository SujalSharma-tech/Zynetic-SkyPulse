export const API_CONFIG = {
    BASE_URL : "https://pro.openweathermap.org/data/2.5",
    GEO_URL: "https://pro.openweathermap.org/geo/1.0",
    API_KEY : import.meta.env.VITE_API_KEY,
    DEFAULT_PARAMS : {
        appid : import.meta.env.VITE_API_KEY,
        units : "metric"
    }
}