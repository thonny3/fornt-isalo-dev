import React from "react";
import Modal from "../modal/Modal";
import { useBanque } from "../../context/BanqueContext";

export default function AjoutBanque() {
  const {
    data,
    onclose,
    open,
    handleSubmit,
    errors,
    getNom,
    getBanque,
    getNumero,
    edit,
  } = useBanque();
  return (
    <Modal open={open} onClose={onclose} width={"450px"}>
      <h1 className="text-lg font-semibold  border-b-2 border-gray-200 w-fit mt-5">
        {edit ? "Modifier" : "Ajout"} Banque{" "}
      </h1>
      <form action="" method="post px-5" onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="">
            Nom <span className="text-red-500 font-semibold">*</span>
          </label>
          <input
            type="text"
            value={data.nom}
            className={`form-control w-full ${errors.nom && "border-red-600"}`}
            placeholder="Entrer le nom"
            onChange={getNom}
          />
          {/* Message d'erreur pour le nom */}
          {errors.nom && (
            <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>
          )}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="">
            Numéro <span className="text-red-500 font-semibold">*</span>
          </label>
          <input
            type="text"
            value={data.numero}
            className={`form-control w-full ${
              errors.numero && "border-red-600"
            }`}
            placeholder="Entrer le numéro"
            onChange={getNumero}
          />
          {/* Message d'erreur pour le nom */}
          {errors.numero && (
            <p className="text-red-600 mt-1 text-sm">{errors.numero}</p>
          )}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="">
            Banque <span className="text-red-500 font-semibold">*</span>
          </label>
          <input
            type="text"
            value={data.banque}
            className={`form-control w-full ${
              errors.banque && "border-red-600"
            }`}
            placeholder="Entrer le banque"
            onChange={getBanque}
          />
          {/* Message d'erreur pour le nom */}
          {errors.banque && (
            <p className="text-red-600 mt-1 text-sm">{errors.banque}</p>
          )}
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
