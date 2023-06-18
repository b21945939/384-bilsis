import _axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axios = _axios.create({
    baseURL: HOST_API,
    withCredentials: true
    //   withCredentials: true,
});

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axios;
