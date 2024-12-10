import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { useFournisseur } from "../../../context/FournisseurContext";
import AjoutApprovisionnement from "../../../components/modal/fournisseur/AjoutApprovisionnement";
import TableVenteToiles from "../../../components/table/TableVenteToiles";

export default function VenteIsalo() {
    const {setLieu,setOpen} = useFournisseur()
  return (
    <>
  <div className="bg-white shadow-lg p-8">
  <div className="vente flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-secondary text-gray-700 text-2xl">
            Liste des ventes
          </span>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
            
            </span>
          </div>
        </div>
        <div className="add_employe">
          <button className="flex items-center btn-primary" onClick={()=>{setOpen(true);setLieu("venteIsalo")}}>
            <PlusCircleIcon className="w-5 h-5 text-white" />
            <span className="pl-1">Ventes</span>
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="search flex items-center">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-secondary placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableVenteToiles/>
      </div>
  </div>
      <AjoutApprovisionnement/>
    </>
  );
}
