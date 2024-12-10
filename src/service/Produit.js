import Axios from "./CallerAxios";
/**********************catégory********************************* */
let getAllCategory = () => {
    return Axios.get('categorie')
}

let createCategory =  (data)=>{
    return Axios.post('categorie',data)
}

let deleteCategory  = (id)=>{
    return Axios.delete('categorie/'+id)
}

let updateCategory =  (id,data)=>{
    return Axios.put('categorie/' + id,data)
}

/**********************Product********************************* */
let getAllProduct = () => {
    return Axios.get('produits')
}

let createProduct =  (data)=>{
    return Axios.post('produits',data)
}

let deleteProduct  = (id)=>{
    return Axios.delete('produits/'+id)
}

let updateProduct =  (id,data)=>{
    return Axios.put('produits/' + id,data)
}


export const Produit = {getAllCategory,getAllProduct,createProduct,deleteProduct,updateProduct,createCategory,deleteCategory,updateCategory}