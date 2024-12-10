// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { Produit } from "../service/Produit";
import { useAdmin } from "./AdminContext";
import { Approvisionement } from "../service/Approvisonement";
import { Stock } from "../service/Stock";

const ProduitContext = createContext();
export const ProduitProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [venteRami, setVenteRami] = useState([]);
  const [venteToiles, setVenteToiles] = useState([]);
  const [data, setData] = useState({
    nom: "",
    categorie_id: "",
    prix: null,
    prix_vente: null,
  });
  const [errors, setErrors] = useState({
    nom: "",
    categorie_id: null,
    prix: null,
    prix_vente: null,
  });
  const [errorsCat, setErrorsCat] = useState({
    cat: "",
  });
  const [stock, setStock] = useState("vendu"); // État pour le lieu sélectionné
  const [etatSTockToil, setetatSTockToil] = useState([]);
  const { toast } = useAdmin();
  const [listCategorie, setListCategorie] = useState([]);
  const [transfertToils, setToils] = useState([]);
  const [listProduit, setListProduit] = useState(null);
  const [cat,setCat] =  useState("")
  const [edit, setEdit] = useState(null);
  const [magasin, setMagasin] = useState([]);
  const [vitrine, setVitrine] = useState([]);
  const [tiko, setTiko] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State pour le chargement
  const getNom = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const getCategory = (e) => {
    setData({ ...data, categorie_id: e.target.value });
  };

  const getPrivVente = (e) => {
    setData({ ...data, prix_vente: e.target.value });
  };

  const getPrix = (e) => {
    setData({ ...data, prix: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Début du chargement
      if (edit) {
        Produit.updateProduct(edit, {
          nom: data.nom,
          categorie_id: data.categorie_id,
          prix: data.prix,
          prix_vente: data.prix_vente,
          quantite: 5,
        })
          .then((res) => {
            onclose();
            getAllProduct();
            toast.success("Le produit a été ajouté avec succès !");
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      } else {
        Produit.createProduct({
          nom: data.nom,
          categorie_id: data.categorie_id,
          prix: data.prix,
          prix_vente: data.prix_vente,
          quantite: 5,
        })
          .then((res) => {
            onclose();
            getAllProduct();
            toast.success("Le produit a été ajouté avec succès !");
            console.log("zaza");
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      }
    }
  };

  const handleSubmitCat = () => {


    if (validateFormCat()) {
      setIsLoading(true); // Début du chargement
      if (edit) {
      
        Produit.updateCategory(edit, {
          nom: cat
        })
          .then((res) => {
            onclose();
            getAllCategorie();
            toast.success("Le catégorie a été ajouté avec succès !");
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      } else {
        Produit.createCategory({
          nom: cat
        })
          .then((res) => {
            onclose();
            getAllCategorie();
            toast.success("Le produit a été ajouté avec succès !");
            console.log("zaza");
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      }
    }
  };

  const validateForm = () => {
    let formErrors = {
      nom: "",
      categorie_id: "",
      prix_vente: null,
      prix: null,
    };
    let isValid = true;

    // Vérifier   si  nom  vide
    if (data.nom == "") {
      formErrors.nom = "Le nom est vide .";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (data.categorie_id == "") {
      formErrors.categorie_id = "Selectionnez le catégorie";
      isValid = false;
    }
    // Vérifier   si  date de transaction  vide
    if (data.prix_vente == null) {
      formErrors.prix_vente = "Veuillez saisir le prix de vente    .";
      isValid = false;
    }
    // Vérifier   si  nom  vide
    if (data.prix == null) {
      formErrors.prix = "Veuillez saisir le prix  .";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const validateFormCat = () => {
    let formErrors = {
      cat: ""
    };
    let isValid = true;

    // Vérifier   si  nom  vide
    if (cat == "") {
      formErrors.cat = "Le nom  du  catégorie est vide .";
      isValid = false;
    }

 

    setErrorsCat(formErrors);
    return isValid;
  };

  const onclose = () => {
    setOpen(false);
    resertForm();
    setOpenDelete(false);
    setCat("")
    setErrors({
      nom: "",
      categorie_id: "",
      prix_vente: null,
      prix: null,
    });
    setErrorsCat({
      cat:""
    })
  };
  

  const resertForm = () => {
    setData({
      nom: "",
      categorie_id: "",
      prix: "",
      prix_vente: "",
    });
  };

  const getAllProduct = () => {
    Produit.getAllProduct()
      .then((res) => {
        setListProduit(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getVenteRami = () => {
    Approvisionement.getVentesRami()
      .then((res) => {
        setVenteRami(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getVenteToiles = () => {
    Approvisionement.getVentesToiles()
      .then((res) => {
        setVenteToiles(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  // liste categorie
  const getAllCategorie = () => {
    Produit.getAllCategory()
      .then((res) => {
        setListCategorie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // tranfert  hstorique
  const historyTranfertToils = () => {
    Stock.historiqueTransfertToils()
      .then((res) => {
        setToils(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMagasinTranfert = () => {
    Stock.historiqueTransfertMagasin()
      .then((res) => {
        setMagasin(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getVitrineTranfert = () => {
    Stock.historiqueTransfertVitrine()
      .then((res) => {
        setVitrine(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getTikoTranfert = () => {
    Stock.historiqueTransfertTiko()
      .then((res) => {
        setTiko(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const ShowEdit = (data) => {
    setData({ ...data, nom: data.nom });
    setData({ ...data, categorie_id: data.categorie_id });
    setData({ ...data, prix: data.prix });
    setData({ ...data, prix_vente: data.prix_vente });
  };

  useEffect(() => {
    getAllProduct();
    getAllCategorie();
    getVenteRami();
    historyTranfertToils();
    getMagasinTranfert();
  }, []);

  return (
    <ProduitContext.Provider
      value={{
        open,
        setOpen,
        getNom,
        getCategory,
        getPrix,
        getPrivVente,
        handleSubmit,
        onclose,
        errors,
        resertForm,
        data,
        getAllProduct,
        listProduit,
        stock,
        setStock,
        listCategorie,
        getAllCategorie,
        setEdit,
        edit,
        ShowEdit,
        setListProduit,
        openDelete,
        setOpenDelete,
        venteRami,
        getVenteRami,
        venteToiles,
        getVenteToiles,
        historyTranfertToils,
        transfertToils,
        magasin,
        getMagasinTranfert,
        tiko,
        getTikoTranfert,
        vitrine,
        getVitrineTranfert,
        isLoading,
        cat,
        setCat,
        errorsCat,
        handleSubmitCat,
        setListCategorie
      }}
    >
      {children}
    </ProduitContext.Provider>
  );
};

export const useProduit = () => {
  return useContext(ProduitContext);
};
