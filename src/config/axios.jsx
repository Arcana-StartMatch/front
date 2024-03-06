import axios from "axios";

const axiosInstance = axios.create({
    "baseURL": "https://api.themoviedb.org/3/"
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['api_key'] = "1649235f4abb4cc17b61060b47e59b52";
        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjQ5MjM1ZjRhYmI0Y2MxN2I2MTA2MGI0N2U1OWI1MiIsInN1YiI6IjYwNThiOTQzYWYyZGE4MDA1NWE0M2NiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rgVMvq3see09Ylgsuw9h3gx1SGooaGDj4gtkDw6iQKs";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;