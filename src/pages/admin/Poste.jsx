import React, { useEffect, useState } from "react";
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import TablePoste from "../../components/table/TablePoste";
import AjoutPoste from "../../components/modal/poste/AjoutPoste";
import DeletePoste from "../../components/modal/poste/DeletePoste";
import { usePoste } from "../../context/PosteContext";
import { useAdmin } from "../../context/AdminContext";
import LoadingPage from "../../components/LoadingPage";
export default function Poste() {
  const {poste} = useAdmin()
    const {setOpen} =  usePoste()
  return (
    <>
    <div className="">
    <div className="flex items-center justify-between">
    <div className="flex items-center  ">
    <span className="text-secondary text-gray-700 text-4xl font-bold">
      Gestion des Postes
    </span>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
              {poste.length}
            </span>
          </div>
        </div>
        <div className="mt-10  flex justify-between items-center">
     
     <div className="add_employe">
       <button
         className="flex items-center btn-primary"
         onClick={() => setOpen(true)}
       >
         <PlusCircleIcon className="w-5 h-5 text-white" />
         <span className=" pl-1">Ajouter Poste</span>
       </button>
     </div>
   </div>
    </div>
      <div className="table-poste">
        {
          poste ?  <TablePoste/> : <LoadingPage/>
        }
        <AjoutPoste  />
        <DeletePoste/>
        
      </div>
    </div>
    </>
  );
}
