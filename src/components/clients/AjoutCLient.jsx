import React from "react";
import Modal from "../modal/Modal";
import { useClient } from "../../context/ClientContext";

export default function AjoutCLient() {
  const {
    open,
    onclose,
    errors,
    handleSubmit,
    getAddress,
    getCin,
    getNom,
    getPreference,
    data,
    edit
  } = useClient();
  return (
    <Modal open={open} onClose={onclose} width={"450px"}>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4 px-5">{ edit? "Modifier" : "Ajout"} client </h1>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="form-group">
            <label htmlFor="">
              {" "}
              Nom <span className="text-red 500">*</span>
            </label>
            <input
              type="text"
              className={`form-control w-full ${
                errors.nom && "border-red-600"
              }`}
              placeholder="Nom  du client"
              onChange={getNom}
              value={data.nom}
            />
            {/* Message d'erreur pour le nom */}
            {errors.nom && (
              <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="">
              {" "}
              CIN <span className="text-red 500">*</span>
            </label>
            <input
              type="number"
              className={`form-control w-full ${
                errors.cin && "border-red-600"
              }`}
              placeholder="N° CIN  du client"
              onChange={getCin}
              value={data.cin}
            />
            {/* Message d'erreur pour le nom */}
            {errors.cin && (
              <p className="text-red-600 mt-1 text-sm">{errors.cin}</p>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="">
              {" "}
              Adresse <span className="text-red 500">*</span>
            </label>
            <input
              type="text"
              className={`form-control w-full ${
                errors.address && "border-red-600"
              }`}
              placeholder="Adresse  du client"
              onChange={getAddress}
              value={data.address}
            />
            {/* Message d'erreur pour l'adresse */}
            {errors.address && (
              <p className="text-red-600 mt-1 text-sm">{errors.address}</p>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="">
              {" "}
              Préference <span className="text-red 500">*</span>
            </label>
            <input
              type="text"
              className={`form-control w-full ${
                errors.preferences && "border-red-600"
              }`}
              placeholder="Préfrence  du client"
              onChange={getPreference}
              value={data.preferences}
            />
            {/* Message d'erreur pour preference */}
            {errors.preferences && (
              <p className="text-red-600 mt-1 text-sm">{errors.preferences}</p>
            )}
          </div>
          <div className="button text-right mt-5">
            <button className="btn" type="button" onClick={onclose}>
              Annuler
            </button>
            <button className="btn-primary ml-5" type="submit">
            { edit? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
