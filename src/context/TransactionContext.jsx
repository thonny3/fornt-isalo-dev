// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { Transaction } from "../service/Transaction";
import { useAdmin } from "./AdminContext";
const TransactionContext = createContext();
export const TransactionProvider = ({ children }) => {
  const { toast } = useAdmin();
  const [open, setOpen] = useState(false);
  const [listTrans,setListTrans] =  useState([])
  const [data, setData] = useState({
    user_id: null,
    type: "avance",
    amount: null,
    status: "payé",
    reason: "",
  });
  const [errors, setErrors] = useState({
    user_id: null,
    amount: null,
    status: "",
  });

  const getUser = (e) => {
    setData({ ...data, user_id: e.value });
  };

  const getAmout = (e) => {
    setData({ ...data, amount: e.target.value });
  };

  const getStatus = (e) => {
    setData({ ...data, status: e.target.value });
  };

  const getRaison = (e) => {
    setData({ ...data, reason: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      Transaction.createTransaction({
        user_id: data.user_id,
        type: data.type,
        amount: data.amount,
        status: data.status,
      })
        .then((res) => {
          getTransactions()
          toast.success("Ajout  avec success !");
          onclose();
        })
        .catch((error) => toast.error("L'avance doit être inférieure ou égale au salaire."));
    }
  };

  const resertForm = () => {
    setData({
      user_id: null,
      type: "avance",
      amount: null,
      status: "",
      reason: "",
    });
  };

  const validateForm = () => {
    let formErrors = { user_id: null, amount: null, status: "" };
    let isValid = true;

    // Vérifier si l'utilisateur est vide
    if (data.user_id == null) {
      formErrors.user_id = "L'employé est vide.";
      isValid = false;
    }

    // Vérifier si le montant est vide
    if (data.amount == null) {
      formErrors.amount = "Veuillez remplir le montant.";
      isValid = false;
    }

    // Vérifier si le statut est vide
    if (data.status === "") {
      formErrors.status = "Veuillez sélectionner un statut.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const onclose = () => {
    resertForm();
    setOpen(false);
  };

  const getTransactions = () => {
    Transaction.getTransaction()
      .then((res) => {
        console.log(res.data);
        setListTrans(res.data)
      })
      .catch((error) => console.log(error));
  };
  return (
    <TransactionContext.Provider
      value={{
        open,
        setOpen,
        getUser,
        getAmout,
        getRaison,
        getStatus,
        handleSubmit,
        onclose,
        errors,
        resertForm,
        data,
        getTransactions,
        listTrans
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  return useContext(TransactionContext);
};
