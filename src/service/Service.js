import Axios from "./CallerAxios"

const login = (data) => {
    return Axios.post('login',data)
}


const isLoggin = () => {
    let token = JSON.stringify(sessionStorage.getItem('user'));
    return !!token; // Retourne true si un token existe, sinon false
};

const getToken = () => {
    return JSON.parse(sessionStorage.getItem('user')); // Récupère et parse l'objet user
};

export const serviceCount = {getToken,isLoggin,login}