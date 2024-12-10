import React, { useEffect } from "react";
import {
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid"
import AjoutApprovisionnement from '../../../components/modal/fournisseur/AjoutApprovisionnement';
import TableApprovisionement from '../../../components/table/TableApprovisionement';
import { useFournisseur } from '../../../context/FournisseurContext';

export default function Approvisionement() {
    const {setOpen,listAppro,setLieu} =  useFournisseur()
  return (
    <>
     <div className="">
     <div className="poste flex items-center justify-between">
        <div className="flex items-center">
        <span className="text-primary text-gray-700 text-4xl font-semibold">
              Gestion des approvisionnements
            </span>
          <div className="nombre ml-2 w-8 h-5 bg-gray-200 rounded-full flex justify-center items-center ">
            <span className="text-xs text-primary font-semibold">{listAppro.length}</span>
          </div>
        </div>
        <div className="add_employe">
          <button className="flex items-center btn-primary" onClick={()=>{setOpen(true);setLieu("toiles")}}>
            <PlusCircleIcon className="w-5 h-5 text-white" />
            <span className="text-xs pl-1">Approvisionner</span>
          </button>
        </div>
      </div>

      <div className="mt-10  flex justify-between items-center">
        <div className="search flex items-center">
        <span className="text-md text-gray-600">
              Consultez et gérez l'approvisionnement des produits et le stock de
              votre hôtel.
            </span>
        </div>
      </div>
      <div className="mt-3">
        <TableApprovisionement/>
      </div>
      <AjoutApprovisionnement/>
     </div>
    </>
  )
}
