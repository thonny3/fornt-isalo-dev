import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import TableConge from "../../components/table/TableConge";
import { PlusCircle } from "lucide-react";
import AjoutConge from "../../components/modal/conge/AjoutConge";
import DeleteConge from "../../components/modal/conge/DeleteConge";
import LoadingPage from "../../components/LoadingPage";
import { useConge } from "../../context/CongeContext";

export default function Conge() {
  const { listeConge, setOpen } = useConge();
  const [isLoading, setIsLoading] = useState(true);

  // Masquer le spinner après 2 secondes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout); // Nettoyer le timeout
  }, []);

  const handleOpenPoste = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="">
        <div className="flex items-center">
          <span className="text-secondary text-gray-700 text-4xl">
            Gestion des congés{" "}
          </span>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
              {listeConge?.length || 0}
            </span>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
          <div className="search flex items-center">
            <span className="text-md text-gray-500">
              Consultez et gérez les demandes de congé des employés.
            </span>
          </div>
          <div className="add_employe">
            <button
              className="flex items-center btn-primary"
              onClick={handleOpenPoste}
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span className="pl-1">Ajouter un congé</span>
            </button>
          </div>
        </div>

        <div className="table-conge mt-5">
          {isLoading ? (
            <LoadingPage />
          ) : listeConge?.length > 0 ? (
            <TableConge />
          ) : (
            <div className="text-center text-gray-500">
              Aucun congé disponible.
            </div>
          )}
        </div>
      </div>

      <AjoutConge />
      <DeleteConge />
    </>
  );
}
