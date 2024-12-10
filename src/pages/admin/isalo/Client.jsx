import { PlusCircle, Search } from "lucide-react";
import React from "react";
import TableClient from "../../../components/table/TableClient";
import { useClient } from "../../../context/ClientContext";
import AjoutCLient from "../../../components/clients/AjoutCLient";
import DeleteClient from "../../../components/clients/DeleteClient";

export default function Client() {
  const {setOpen} =  useClient()
  return (
    <>
      <div className="">
        
        <div className="poste flex items-center justify-between">
          <div className="flex items-center ">
          
            <span className="text-secondary text-gray-700 text-4xl ">
              Gestion des clients
            </span>
            <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
              <span className="text-xs text-primary font-semibold">{5}</span>
            </div>
          </div>
          <div className="add_employe">
            <button
              className="flex items-center btn-primary"
              onClick={() => {
                setOpen(true);
                resertForm();
              }}
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span className=" pl-1">Ajouter client</span>
            </button>
          </div>
        </div>

     
        <div className="mt-3">
          <TableClient />
        </div>
        {/******Modal  for create and update Banque  */}
        <AjoutCLient/>
        <DeleteClient/>
      </div>
    </>
  );
}
