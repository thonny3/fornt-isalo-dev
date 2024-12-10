import Axios from "./CallerAxios";

let  getSalaire =  ()=>{
    return Axios.get('configurations')
}

let  createSalaire =  (data)=>{
    return Axios.post('configurations',data)
}

let  deleteSalaire =  (id)=>{
    return Axios.delete('configurations/'+id)
}



export const Salaire = {getSalaire,createSalaire,deleteSalaire}