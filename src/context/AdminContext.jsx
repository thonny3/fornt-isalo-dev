// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { Poste } from "../service/Poste";
import { Employe } from "../service/Employe";
import { toast } from "react-toastify";
import { Conge } from "../service/Conge";
import { Fournisseur } from "../service/Fournisseur";

import { Client } from "../service/Client";
const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openPoste, setOpenPoste] = useState(false);
  const [openPosteDelete, setOpenPosteDelete] = useState(false);
  const [poste, setPoste] = useState([]);
  const [id, setId] = useState(null);
  const [info, setInfo] = useState([]);
  const [listEmploye, setListEmploye] = useState([]);
  const [typeConge, setTypeConge] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listFournisseurs, setListFournisseur] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [app, setApp] = useState("ramirandava");
  const [listCient, setClient] = useState([]);
  const [activeButton, setActiveButton] = useState("utilisateur");
  const [etatStock, setEtatStock] = useState([]);
  const [magasin, setMagsin] = useState([]);
  const [vitrine, setVitrine] = useState([]);
  const [tiko, setTiko] = useState([]);
  const [global, setGlobal] = useState([]);

  const closeModal = () => {
    setOpenModalDelete(false);
    setOpenPoste(false);
    setOpenPosteDelete(false);
  };

  const getPostes = () => {
    Poste.getPoste()
      .then((res) => {
        setPoste(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  // liste employe
  const getAllEmploye = () => {
    Employe.getEmploye()
      .then((res) => {
        setListEmploye(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //liste type de conge
  const getTypeConges = () => {
    Conge.getTypeConge()
      .then((res) => {
        setTypeConge(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // liste Fournisseur
  const getAllFournisseur = () => {
    Fournisseur.getAllFournisseur()
      .then((res) => {
        setListFournisseur(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // liste client toils
  const getAllClient = () => {
    Client.getAllClient()
      .then((res) => {
        setClient(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AdminContext.Provider
      value={{
        openModalDelete,
        setOpenModalDelete,
        closeModal,
        openPoste,
        setOpenPoste,
        openPosteDelete,
        setOpenPosteDelete,
        getPostes,
        id,
        setId,
        info,
        setInfo,
        listEmploye,
        getAllEmploye,
        searchQuery,
        setSearchQuery,
        toast,
        typeConge,
        listFournisseurs,
        getAllFournisseur,
        poste,
        isEditing,
        setIsEditing,
        loading,
        app,
        setApp,
        setPoste,
        setListFournisseur,
        listCient,
        getAllClient,
        getTypeConges,
        activeButton,
        setActiveButton,
        etatStock,
        setEtatStock,
        magasin,
        setMagsin,
        vitrine,
        setVitrine,
        tiko,
        setTiko,
        setClient,
        global,
        setGlobal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
