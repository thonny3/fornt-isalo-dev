import axios from "axios";


const Axios = axios.create({
   baseURL: 'https://isalo.shop/api'
});

Axios.interceptors.request.use((request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  });

export default Axios;
