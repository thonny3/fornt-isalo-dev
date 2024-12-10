import React, { createContext, useContext, useEffect, useState } from "react";
import { Conge } from "../service/Conge";
import { Poste } from "../service/Poste";
import { useAdmin } from "./AdminContext";

const PosteContext = createContext();

export const PosteProvider = ({ children }) => {
  const { toast, getPostes } = useAdmin();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State pour le chargement
  const [data, setData] = useState({
    nom: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    description: "",
  });

  const getNom = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const getDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Début du chargement
      if (edit) {
        Poste.updatePoste(edit, {
          nom: data.nom,
          description: data.description,
        })
          .then((res) => {
            onclose();
            toast.success("Le poste a été modifié !");
            getPostes();
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      } else {
        Poste.createPoste({
          nom: data.nom,
          description: data.description,
        })
          .then((res) => {
            onclose();
            toast.success("Le poste a été enregistré !");
            getPostes();
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false); // Fin du chargement
          });
      }
    }
  };

  const validateForm = () => {
    let formErrors = { nom: "" };
    let isValid = true;

    // Vérifier   si  nom  vide
    if (data.nom == "") {
      formErrors.nom = "Le nom est vide .";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const ShowEdit = (data) => {
    setData({ ...data, nom: data.nom });
    setData({ ...data, description: data.description });
  };
  const onclose = () => {
    setOpen(false);
    setEdit(null);
    resetForm();
  };
  const resetForm = () => {
    setData({
      nom: "",
      description: "",
    });
    setErrors({
      nom: "",
      description: "",
    });
  };

  useEffect(() => {
    getPostes();
  }, []);
  return (
    <PosteContext.Provider
      value={{
        getDescription,
        getNom,
        data,
        open,
        setOpen,
        setEdit,
        handleSubmit,
        onclose,
        edit,
        ShowEdit,
        errors,
        isLoading
      }}
    >
      {children}
    </PosteContext.Provider>
  );
};

export const usePoste = () => {
  return useContext(PosteContext);
};
