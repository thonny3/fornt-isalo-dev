import Axios from "./CallerAxios";


let getTransaction = () => {
    return Axios.get('transactions')
}


let createTransaction = (data) => {
    return Axios.post('transactions', data)
}


/*****Banque  */

let getAllBanque = () => {
    return Axios.get('banque')
}

let getOneBanque = (id) => {
    return Axios.get('banque/' + id)
}

let createBanque = (data) => {
    return Axios.post('banque', data)
}

let deleteBanque = (id) => {
    return Axios.delete('banque/' + id)
}

let updateBanque = (id, data) => {
    return Axios.put('banque/' + id, data)
}


/*****Transaction Banque  */

let getAllTransactionBanque = () => {
    return Axios.get('transactionbanque')
}

let getOneTransactionBanque = (id) => {
    return Axios.get('transactionbanque/' + id)
}

let createTransactionBanque = (data) => {
    return Axios.post('transactionbanque', data)
}

let deleteTransactionBanque = (id) => {
    return Axios.delete('transactionbanque/' + id)
}

let updateTransactionBanque = (id, data) => {
    return Axios.put('transactionbanque/' + id, data)
}



export const Transaction = { getTransaction, createTransaction, getAllBanque, getOneBanque, createBanque, deleteBanque, updateBanque, getAllTransactionBanque, getOneTransactionBanque,createTransactionBanque,deleteTransactionBanque,updateTransactionBanque}