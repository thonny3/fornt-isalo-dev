import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useFournisseur } from "../../context/FournisseurContext";
import AjoutApprovisionnement from "../../components/modal/fournisseur/AjoutApprovisionnement";
import { useAdmin } from "../../context/AdminContext";
import TransfertToils from "../../components/table/transfert/TransfertToils";
import MagasinTable from "../../components/table/transfert/MagasinTable";
import VitrineTable from "../../components/table/transfert/VitrineTable";
import TikoTable from "../../components/table/transfert/TikoTable";

export default function TranferStock() {
  const { app, setApp } = useAdmin();
  const { setOpen, setLieu } = useFournisseur();


  // Fonction pour définir le lieu et ouvrir le modal
  const handleTransferClick = (lieu) => {
    setOpen(true);
    setLieu(lieu);
  };


  return (
    <>
      <div className="poste flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-secondary text-gray-700 text-4xl">
            Historique des transferts de stock
          </span>
          <div className="nombre ml-2 w-8 h-5 bg-gray-200 rounded-full flex justify-center items-center">
            <span className="text-xs text-primary font-semibold">8</span>
          </div>
        </div>
        <div className="add_employe">
          <button
            className="flex items-center btn-primary"
            onClick={() =>
              handleTransferClick(
                app === "toils" ? "tranfertToiles" : "tranfertRami"
              )
            }
          >
            <PlusCircleIcon className="w-5 h-5 text-white" />
            <span className="text-md pl-1">Transfert de stocks</span>
          </button>
        </div>
      </div>

      <TransfertToils />
          <AjoutApprovisionnement />
    </>
  );
}
