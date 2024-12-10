import Axios from "./CallerAxios";

let getAllClient = () => {
    return Axios.get('clienttoiles')
}

let  createClient =  (data)=>{
    return Axios.post('clienttoiles',data)
}

let  updateClient =  (id,data)=>{
    return Axios.put('clienttoiles/'+id,data)
}

let  deleteClient =  (id)=>{
    return Axios.delete('clienttoiles/'+id)
}




export const Client = {getAllClient,createClient,updateClient,deleteClient}