import React from "react";
import { useBanque } from "../../context/BanqueContext";
import Modal from "../modal/Modal";

export default function AjoutTransaction() {
  const {
    openTrans,
    onclose,
    handleSubmitTrans,
    getType,
    getDate,
    getMontant,
    getDescription,
    errorsTrans,
    dataTrans,
    edit
  } = useBanque();
  return (
    <Modal open={openTrans} onClose={onclose} width={"500px"}>
      <h1 className="text-lg font-semibold  border-b-2 border-gray-200 w-fit mt-5">
        {edit ? "Modifier" : "Ajout"} Transaction Banque{" "}
      </h1>
      <form action="" method="post px-5" onSubmit={handleSubmitTrans}>
     <div className="grid grid-cols-2 gap-5">
     <div className="form-group mt-2">
          <label htmlFor="">
            Type <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            name=""
            id=""
            className="form-control w-full "
            onChange={getType}
            value={dataTrans.type}
          >
            <option value={null}>Selectionnez </option>
            <option value={0}>Débit</option>
            <option value={1}>Crédit </option>
          </select>

          {/* Message d'erreur pour le nom */}
          {errorsTrans.type && (
            <p className="text-red-600 mt-1 text-sm">{errorsTrans.type}</p>
          )}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="">
            Date de transaction{" "}
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <input
            type="date"
            value={dataTrans.date}
            className={`form-control w-full ${
            errorsTrans.date && "border-red-600"
            }`}
            placeholder="Entrer le numéro"
            onChange={getDate}
          />
          {/* Message d'erreur pour le nom */}
          {errorsTrans.date && (
            <p className="text-red-600 mt-1 text-sm">{errorsTrans.date}</p>
          )}
        </div>
     </div>

        <div className="form-group mt-2">
          <label htmlFor="">
            Montant <span className="text-red-500 font-semibold">*</span>
          </label>
          <input
            type="number"
            value={dataTrans.montant}
            className={`form-control w-full ${
                errorsTrans.montant && "border-red-600"
            }`}
            placeholder="Entrer le banque"
            onChange={getMontant}
          />
          {/* Message d'erreur pour le nom */}
          {errorsTrans.montant && (
            <p className="text-red-600 mt-1 text-sm">{errorsTrans.montant}</p>
          )}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="">Déscription </label>
          <textarea
            name=""
            id=""
            cols="50"
            rows="10"
            className="form-control w-full h-32"
            onChange={getDescription}
            value={dataTrans.description}
          ></textarea>
        </div>

        <div className="boutton mt-5 text-right">
          <button className="btn" type="button" onClick={() => onclose()}>
            Annuler
          </button>
          <button className="btn-primary ml-3 px-5" type="submit">
            {edit ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
