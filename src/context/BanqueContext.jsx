import React, { createContext, useContext, useEffect, useState } from "react";
import { Conge } from "../service/Conge";
import { Poste } from "../service/Poste";
import { useAdmin } from "./AdminContext";
import { Transaction } from "../service/Transaction";

const BanqueContext = createContext();

export const BanqueProvider = ({ children }) => {
  const { toast, getPostes } = useAdmin();
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openDT, setOpenDT] = useState(false);
  const [edit, setEdit] = useState(null);
  const [listBanque, setListBanque] = useState([]);
  const [trans, setTrans] = useState([]);
  const [data, setData] = useState({
    nom: "",
    numero: "",
    banque: "",
  });

  const [dataTrans, setDataTrans] = useState({
    type: null,
    montant: null,
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    numero: "",
    banque: "",
  });

  const getNom = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const getNumero = (e) => {
    setData({ ...data, numero: e.target.value });
  };
  const getBanque = (e) => {
    setData({ ...data, banque: e.target.value });
  };

  /***********************************************Transaction Banque  */
  const [openTrans, setOpenTransh] = useState(false);
  const [errorsTrans, setErrorsTrans] = useState({
    type: null,
    montant: null,
    date: "",
  });

  const getType = (e) => {
    setDataTrans({ ...dataTrans, type: e.target.value });
  };

  const getMontant = (e) => {
    setDataTrans({ ...dataTrans, montant: e.target.value });
  };
  const getDate = (e) => {
    setDataTrans({ ...dataTrans, date: e.target.value });
  };
  const getDescription = (e) => {
    setDataTrans({ ...dataTrans, description: e.target.value });
  };

  const validateFormTrans = () => {
    let formErrors = { type: null, montant: null, date: "" };
    let isValid = true;

    // Vérifier   si  type  vide
    if (dataTrans.type == null) {
      formErrors.type = "Veuillez selectionner .";
      isValid = false;
    }

    // Vérifier   si  numéro   vide
    if (dataTrans.montant == null) {
      formErrors.montant = "Le Montant   est vide .";
      isValid = false;
    }

    // Vérifier   si  banque   vide
    if (dataTrans.date == "") {
      formErrors.date = "Selectionnez le date  .";
      isValid = false;
    }

    setErrorsTrans(formErrors);
    return isValid;
  };

  const handleSubmitTrans = (e) => {
    e.preventDefault();
    if (validateFormTrans()) {
      if (edit) {
        Transaction.updateTransactionBanque(edit, dataTrans)
          .then((res) => {
            onclose();
            toast.success("Le transaction  a été modifié !");
            getAllBanqueTransaction();
          })
          .catch((error) => console.log(error));
      } else {
        Transaction.createTransactionBanque(dataTrans)
          .then((res) => {
            onclose();
            toast.success("Le transaction  a été enregistré !");
            getAllBanqueTransaction();
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const ShowEditTrans = (data) => {
    console.log("Données reçues pour modification :", data);
    setDataTrans({
      ...dataTrans,
      type: data.type,
      montant: data.montant,
      date: data.date,
      description: data.description,
    });
  };

  /*************************FIN */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (edit) {
        Transaction.updateBanque(edit, data)
          .then((res) => {
            onclose();
            toast.success("Le Banque  a été modifié !");
            getAllBanque();
          })
          .catch((error) => console.log(error));
      } else {
        Transaction.createBanque(data)
          .then((res) => {
            onclose();
            toast.success("Le banque a été enregistré !");
            getAllBanque();
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const validateForm = () => {
    let formErrors = { nom: "", numero: "", banque: "" };
    let isValid = true;

    // Vérifier   si  nom  vide
    if (data.nom == "") {
      formErrors.nom = "Le nom est vide .";
      isValid = false;
    }

    // Vérifier   si  numéro   vide
    if (data.numero == "") {
      formErrors.numero = "Le numéro  du banque  est vide .";
      isValid = false;
    }

    // Vérifier   si  banque   vide
    if (data.banque == "") {
      formErrors.banque = "Le banque  est vide .";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const ShowEdit = (data) => {
    setData({ ...data, nom: data.nom });
    setData({ ...data, numero: data.numero });
    setData({ ...data, banque: data.banque });
  };
  const onclose = () => {
    setOpen(false);
    setOpenD(false);
    setOpenDT(false);
    setEdit(null);
    setOpenTransh(false);
    resetForm();
  };
  const resetForm = () => {
    setData({
      nom: "",
      numero: "",
      banque: "",
    });
    setErrors({
      nom: "",
      numero: "",
      banque: "",
    });
    setErrorsTrans({
      type: null,
      montant: null,
      date: "",
    });
    setDataTrans({
      type: "",
      montant: "",
      date: "",
      description: "",
    });
  };

  // liste banque
  const getAllBanque = () => {
    Transaction.getAllBanque()
      .then((res) => {
        setListBanque(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllBanqueTransaction = () => {
    Transaction.getAllTransactionBanque()
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setTrans(res.data.data);
          console.log(res.data.data);
        } else {
          // Gérer le cas où la réponse est vide ou mal formatée
          console.log('Aucune transaction trouvée');
          setTrans([]); // Assurez-vous que l'état est mis à jour avec un tableau vide
        }
      })
      .catch((error) => {
        console.log(error);
        setTrans([]); // Réinitialiser l'état en cas d'erreur
      });
  };
  
  useEffect(() => {
    getAllBanque();
    getAllBanqueTransaction();
  }, []);

  return (
    <BanqueContext.Provider
      value={{
        getNom,
        getBanque,
        getNumero,
        ShowEdit,
        open,
        setOpen,
        openD,
        setOpenD,
        edit,
        handleSubmit,
        errors,
        onclose,
        data,
        setEdit,
        listBanque,
        setListBanque,
        getAllBanque,
        openTrans,
        setOpenTransh,
        getType,
        getDate,
        getMontant,
        getDescription,
        handleSubmitTrans,
        dataTrans,
        errorsTrans,
        trans,
        ShowEditTrans,
        openDT,
        setOpenDT,
        setTrans,
        getAllBanqueTransaction,
      }}
    >
      {children}
    </BanqueContext.Provider>
  );
};

export const useBanque = () => {
  return useContext(BanqueContext);
};
