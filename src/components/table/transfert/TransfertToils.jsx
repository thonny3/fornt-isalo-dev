import React, { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAdmin } from "../../../context/AdminContext";
import { useFournisseur } from "../../../context/FournisseurContext";
import { useProduit } from "../../../context/ProduitContext";


export default function TransfertToils() {
    const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { listFournisseurs, setOpenPosteDelete, setId } = useAdmin();
  const { setEdit, setOpen, ShowEdit } = useFournisseur();
  const {historyTranfertToils,transfertToils} =  useProduit()

  

 // Mapping pour les noms des en-têtes personnalisés
 const headerMapping = {
    Produit: "Produit",
    Source: "Source",
    Destination: "Destination",
    Quantite: "Quantité",
    Date:"Date"
  };

  // Extraire les données sous forme de tableau plat
  const rows = (transfertToils?.historique || []).flatMap((hist) =>
  hist.details.map((detail) => ({
    Produit: detail?.produit?.nom || 'Nom non disponible',
    Source: hist.source,
    Destination: hist.destination,
    Quantite: detail.quantite,
    Date: new Date(hist.created_at).toLocaleDateString() || "Non spécifiée",
  }))
);

  // Obtenir les clés des en-têtes et leur correspondance
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];


  // Calculer le nombre total de pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Aller à la page sélectionnée
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Passer au groupe de pages suivant
  const goToNextGroup = () => {
    if (pageGroup < Math.ceil(totalPages / pagesPerGroup)) {
      setPageGroup(pageGroup + 1);
    }
  };

  // Passer au groupe de pages précédent
  const goToPreviousGroup = () => {
    if (pageGroup > 1) {
      setPageGroup(pageGroup - 1);
    }
  };

  // Fonction pour rendre les numéros de page avec ellipses
  const renderPageNumbers = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pages = [];

    if (pageGroup > 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-4 py-2 text-sm ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (pageGroup < Math.ceil(totalPages / pagesPerGroup)) {
      pages.push(
        <span key="end-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    return pages;
  };

  useEffect(()=>{
    historyTranfertToils()
  },[])

  return (
    <div className="mt-8">
    <div className="relative overflow-x-auto sm:rounded-lg">
    <table className="min-w-full text-md text-left text-gray-500 bg-white">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2">
              {headerMapping[header] || header} {/* Titre personnalisé */}
            </th>
          ))}
          
        </tr>
      </thead>
      <tbody>
        {currentData.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            {headers.map((header, hIndex) => (
              <td key={hIndex} className="px-4 py-2 font-medium text-gray-900">
                {row[header]}
              </td>
            ))}
           
          </tr>
        ))}
      </tbody>
    </table>
 </div>
 
 
         {/* Pagination */}
         <div className="flex justify-end items-center mt-4">
         <button
           onClick={() => goToPage(currentPage - 1)}
           disabled={currentPage === 1}
           className={`px-4 py-2 mx-2 ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
         >
           Previous
         </button>
         <div className="flex space-x-2">
           {Array.from({ length: totalPages }, (_, index) => (
             <button
               key={index}
               onClick={() => goToPage(index + 1)}
               className={`px-4 py-2 ${currentPage === index + 1 ? "bg-primary mx-2 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
             >
               {index + 1}
             </button>
           ))}
         </div>
         <button
           onClick={() => goToPage(currentPage + 1)}
           disabled={currentPage === totalPages}
           className={`px-4 py-2  mx-2 ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
         >
           Next
         </button>
       </div>
     </div>
  )
}
