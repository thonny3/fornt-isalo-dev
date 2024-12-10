import React, { createContext, useContext, useEffect, useState } from "react";

import { useAdmin } from "./AdminContext";
import { Client } from "../service/Client";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const { toast, getAllClient } = useAdmin();
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState({
    nom: "",
    address: "",
    preferences: "",
    cin: null,
  });

  const [errors, setErrors] = useState({
    nom: "",
    address: "",
    preferences: "",
    cin: null,
  });

  const getNom = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const getAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const getPreference = (e) => {
    setData({ ...data, preferences: e.target.value });
  };

  const getCin = (e) => {
    setData({ ...data, cin: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (edit) {
        Client.updateClient(edit, data)
          .then((res) => {
            onclose();
            toast.success("Client  a été modifié !");
            getAllClient();
          })
          .catch((error) => console.log(error));
      } else {
        Client.createClient(data)
          .then((res) => {
            onclose();
            toast.success("Client a été enregistré !");
            getAllClient();
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const validateForm = () => {
    let formErrors = { nom: "", address: "", preferences: "", cin: null };
    let isValid = true;

    // Vérifier   si  nom  vide
    if (data.nom == "") {
      formErrors.nom = "Le nom est vide .";
      isValid = false;
    }
    // Vérifier   si  adreese   vide
    if (data.address == "") {
      formErrors.address = "L'adresse  est vide .";
      isValid = false;
    }
    // Vérifier   si  preference    vide
    if (data.preferences == "") {
      formErrors.preferences = "Le preference   est vide .";
      isValid = false;
    }
    // Vérifier   si  CIN    vide
    if (data.cin == null) {
      formErrors.cin = "CIN    est vide .";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const ShowEdit = (data) => {
    setData({ ...data, nom: data.nom });
    setData({ ...data, address: data.address });
    setData({ ...data, preferences: data.preferences });
    setData({ ...data, cin: data.cin });
  };
  const onclose = () => {
    setOpen(false);
    setEdit(null);
    resetForm();
    setOpenD(false)
  };
  const resetForm = () => {
    setData({
      nom: "",
      address: "",
      preferences: "",
      cin: null,
    });
    setErrors({
      nom: "",
      address: "",
      preferences: "",
      cin: null,
    });
  };

  useEffect(() => {
    getAllClient();
  }, []);
  return (
    <ClientContext.Provider
      value={{
        open,
        setOpen,
        data,
        errors,
        getAddress,
        getCin,
        getNom,
        getPreference,
        edit,
        setEdit,
        ShowEdit,
        handleSubmit,
        onclose,
        openD, setOpenD
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  return useContext(ClientContext);
};
