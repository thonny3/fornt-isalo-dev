import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useAdmin } from "../../../context/AdminContext";
import { Conge } from "../../../service/Conge";
import { useConge } from "../../../context/CongeContext";
import Select from "react-select"; // Importation de react-select

export default function AjoutConge() {
  const {
    openPoste,
    closeModal,
    listEmploye,
    typeConge,
    getTypeConges,
    getAllEmploye,
  } = useAdmin();
  const {
    open,
    onclose,
    getUser,
    getMotif,
    getDateDeb,
    getDateFin,
    data,
    handleSubmit,
    errors,
    edit,
    getTypeConge,
    isLoading,
  } = useConge();

  useEffect(() => {
    getTypeConges();
    getAllEmploye();
  }, []);

  // Conversion des options en format compatible avec react-select
  const employeOptions = listEmploye.map((emp) => ({
    value: emp.id,
    label: emp.nom,
  }));

  const typeCongeOptions = typeConge.map((type) => ({
    value: type.id,
    label: type.nom,
  }));

  return (
    <Modal open={open} onClose={onclose}>
      <h1 className="text-lg font-semibold mt-5">
        {edit ? "Modifier le congé" : "Créer un congé"}
      </h1>
      <form action="" method="post" className="px-5">
        <div className="form grid grid-cols-2 gap-5">
          <div className="form1">
            <div className="form-group mt-5">
              <label htmlFor="employe">
                Employé <span className="text-red-500 font-semibold">*</span>
              </label>
              <Select
                id="employe"
                options={employeOptions}
                value={employeOptions.find(
                  (option) => option.value === data.user_id
                )}
                onChange={(selectedOption) => getUser(selectedOption)}
                className="h-10 w-full"
              />
              {errors.user_id && (
                <p className="text-red-600 mt-1 text-sm">{errors.user_id}</p>
              )}
            </div>
            <div className="form-group mt-5">
              <label htmlFor="type">Type</label>
              <Select
                id="type"
                options={typeCongeOptions}
                value={typeCongeOptions.find(
                  (option) => option.value === data.type_conge_id
                )}
                onChange={(selectedOption) =>
                  getTypeConge(selectedOption)
                }
                className="h-10 w-full focus:ring-red-500"
              />
              {errors.type_conger_id && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.type_conger_id}
                </p>
              )}
            </div>
          </div>
          <div className="form2">
            <div className="form-group mt-5">
              <label htmlFor="dateDebut">
                Date Début <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                type="date"
                id="dateDebut"
                className="form-control h-10 w-full"
                value={data.date_debut}
                min={new Date().toISOString().split("T")[0]}
                onChange={getDateDeb}
              />
              {errors.date_debut && (
                <p className="text-red-600 mt-1 text-sm">{errors.date_debut}</p>
              )}
            </div>
            <div className="form-group mt-5">
              <label htmlFor="dateFin">
                Date Fin <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                type="date"
                id="dateFin"
                className="form-control h-10 w-full"
                value={data.date_fin}
                min={data.date_debut}
                onChange={getDateFin}
              />
              {errors.date_fin && (
                <p className="text-red-600 mt-1 text-sm">{errors.date_fin}</p>
              )}
            </div>
          </div>
        </div>
        <div className="form-group mt-5">
          <label htmlFor="motif">Motif</label>
          <textarea
            id="motif"
            cols="60"
            rows="20"
            className="form-control w-full h-28"
            value={data.motif}
            onChange={getMotif}
          ></textarea>
        </div>
        <div className="boutton mt-5 text-right">
          <button type="button" className="btn" onClick={() => onclose()}>
            Annuler
          </button>
          <button
            type="button"
            className={`text-white bg-[#9A4C1E] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-[#9A4C1E] dark:hover:bg-[#9A4C1E] dark:focus:ring-[9A4C1E#] ml-2 inline-flex items-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Chargement...
              </>
            ) : (
              <> {edit ? "Modifier" : "Ajouter"}</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
