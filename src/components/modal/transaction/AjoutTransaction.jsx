import React from "react";
import Modal from "../Modal";
import { useAdmin } from "../../../context/AdminContext";
import Select from "react-select";
import { useEffect } from "react";
import { useTransaction } from "../../../context/TransactionContext";
export default function AjoutTransaction() {
  const { listEmploye, getAllEmploye } = useAdmin();
  const {
    open,
    onclose,
    errors,
    handleSubmit,
    getUser,
    getAmout,
    getRaison,
    getStatus,
    data
  } = useTransaction();

  const employeOptions = listEmploye.map((row) => ({
    value: row.id,
    label: row.nom,
  }));

  useEffect(() => {
    getAllEmploye();
  }, []);

  return (
    <Modal open={open} onClose={onclose} width={"450px"}>
      <h1 className="text-2xl font-semibold mt-5">Ajouter Transaction</h1>
      <form
        action=""
        method="post"
        className="px-5 mt-5"
        onSubmit={handleSubmit}
      >
        <div className="form-4">
          <label htmlFor="employe">Nom d'employés</label>
          <br />
          <Select
            id="employe"
            className="w-full"
            options={employeOptions}
            onChange={getUser}
            placeholder="Sélectionnez un employé"
          />
          {errors.user_id && (
            <p className="text-red-600 mt-1 text-sm">{errors.user_id}</p>
          )}
        </div>
        <div className=" mt-5">
          <div className="form5">
            <label htmlFor="amount">
              Montant <span className="text-red-500">*</span>
            </label><br />
            <input
              type="number"
              id="amount"
              className="form-control w-full"
              placeholder="Montant avance"
              value={data.amount || ""}
              onChange={getAmout}
            />
            {errors.amount && (
              <p className="text-red-600 mt-1 text-sm">{errors.amount}</p>
            )}
          </div>
         
        </div>
        <div className="mt-5">
          <label htmlFor="reason">Raison</label><br />
          <textarea
            id="reason"
            cols="50"
            rows="10"
            className="form-control w-full mt-1 h-24"
            value={data.reason}
            onChange={getRaison}
          ></textarea>
        </div>
        <div className="boutton mt-5 text-right">
          <button className="btn" type="button" onClick={onclose}>
            Annuler
          </button>
          <button className="btn-primary ml-3 px-5" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </Modal>
  );
}
