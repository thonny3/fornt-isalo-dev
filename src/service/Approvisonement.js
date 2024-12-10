import Axios from "./CallerAxios";


// approvisionement toils d'isalo 
let getAllApprovisionement = () => {
    return Axios.get('stockstoiles')
}

let createApprovisionement = (data) => {
    return Axios.post('stockstoiles', data)
}

let createVenteToiles = (data) => {
    return Axios.post('sortie/stocktoiles', data)
}

let getVentesToiles = () => {
    return Axios.get('sortie/stocktoiles')
}

let getOneApprovisionement = (id)=>{
    return Axios.post('stockstoiles'+id)
}



// approvisionement Ramirandava
let createApprovisionementRami = (data) => {
    return Axios.post('stockramiss', data)
}

let getAllApprovisionementRami = () => {
    return Axios.get('stockramiss')
}

let createVentesRami = (data) => {
    return Axios.post('sortie/stockrami', data)
}

let getVentesRami = () => {
    return Axios.get('sortie/stockrami')
}

let tranfertStock = (data) => {
    return Axios.post('transfert',data)
}




export const Approvisionement = {getOneApprovisionement,tranfertStock,getVentesToiles,getVentesRami, createApprovisionement, getAllApprovisionement, createApprovisionementRami, getAllApprovisionementRami, createVenteToiles, createVentesRami }