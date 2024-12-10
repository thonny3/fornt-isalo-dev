import Axios from "./CallerAxios";

let getEtatStockEtoil = () => {
    return Axios.get('etat/stockstoiles')
}

let getStockMagasin = () => {
    return Axios.get('etat/stocksmagasin')
}
let getStockVitrine = () => {
    return Axios.get('etat/stocksvitrine')
}

let getStockTiko = () => {
    return Axios.get('etat/stockstiko')
}


let globalStok = () => {
    return Axios.get('etat-global-stock-additionne')
}



/************************************TRANSFERT STOCK ******************************************************** */

let historiqueTransfertToils = () => {
    return Axios.get('transfertshistoriqueParStock/4')
}

let historiqueTransfertVitrine = () => {
    return Axios.get('transfertshistoriqueParStock/1')
}

let historiqueTransfertMagasin = () => {
    return Axios.get('transfertshistoriqueParStock/2')
}

let historiqueTransfertTiko = () => {
    return Axios.get('transfertshistoriqueParStock/3')
}

let globalTransfertStock = () => {
    return Axios.get('etat-global-stock-additionne')
}
export const Stock = { getEtatStockEtoil, getStockMagasin, getStockVitrine, getStockTiko, historiqueTransfertToils, historiqueTransfertVitrine, historiqueTransfertMagasin, historiqueTransfertTiko, globalTransfertStock ,globalStok}