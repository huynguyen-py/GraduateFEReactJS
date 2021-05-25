// api/axiosClient.js 
import axios from 'axios';
import queryString from 'query-string';
// import LocalStorageService from './LocalStorageService'
// Set up default config for http requests here 
// Please have a look at here `https://github.com/axios/axios#request config` for the full list of configs 


// const localStorageService = LocalStorageService.getService();

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

// axiosClient.interceptors.request.use(async (config) => {

//     config => {
//         const token = localStorageService.getAccessToken();
//         if (token) {
//             config.headers['Authorization'] = 'Bearer ' + token;
//         }
//         // config.headers['Content-Type'] = 'application/json';
//         return config;
//     },
//         error => {
//             Promise.reject(error)
//         }
// });


// axios.interceptors.response.use((response) => {
//     if (response && response.data) {
//         return response.data;
//     }
//     return response;
// }, function (error) {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:8000/api/users') {
//         // router.push('/login');
//         // return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {

//         originalRequest._retry = true;
//         const refreshToken = localStorageService.getRefreshToken();
//         return axios.post('/auth/token',
//             {
//                 "refresh_token": refreshToken
//             })
//             .then(res => {
//                 if (res.status === 201) {
//                     localStorageService.setToken(res.data);
//                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//                     return axios(originalRequest);
//                 }
//             })

//     }
//     return Promise.reject(error);
// }, (error) => {
//     // Handle errors 
//     throw error;
// });

export default axiosClient;
