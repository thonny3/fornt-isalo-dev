import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useStock } from "../../context/StockContext";

export default function TableVitrine() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { vitrine } = useStock();

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(vitrine.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = vitrine.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };

  const goToPreviousGroup = () => {
    setPageGroup(pageGroup - 1);
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
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
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

  return (
    <>
      <div className="">
      <table className="text-left w-full border border-gray-300 border-collapse">
  <thead>
    <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
      <th className="px-4 py-2 border border-gray-300">Nom</th>
      <th className="px-4 py-2 border border-gray-300">Catégorie</th>
      <th className="px-4 py-2 border border-gray-300">Quantite</th>
      <th className="px-4 py-2 border border-gray-300">Prix vitrine</th>
      <th className="px-4 py-2 border border-gray-300">Prix de vente</th>
    </tr>
  </thead>
  <tbody>
    {currentData.map((row) => (
     <tr key={row.produit?.id || `key-${Math.random()}`} className="text-gray-600">
     {/* Nom du produit */}
     <td className="px-4 py-2 border border-gray-300">
       {row.produit?.nom || "Aucun produit"}
     </td>
   
     {/* Catégorie */}
     <td className="px-4 py-2 border border-gray-300">
       {row.produit?.categorie_id ? (
         row.produit.categorie_id
       ) : (
         <span className="text-red-500">Catégorie manquante</span>
       )}
     </td>
   
     {/* Quantité */}
     <td className="px-4 py-2 border border-gray-300">
       <span
         className={`inline-block w-8 h-8 rounded-full text-center leading-8 ${
           row.quantite && row.quantite <= 5
             ? "bg-red-500 text-white"
             : "bg-gray-200 text-black"
         }`}
       >
         {row.quantite ?? "N/A"}
       </span>
     </td>
   
     {/* Prix */}
     <td className="px-4 py-2 border border-gray-300 text-green-700">
       {row.produit?.prix !== undefined && row.produit?.prix !== null
         ? `${row.produit.prix} $`
         : "Prix indisponible"}
     </td>
   
     {/* Prix de vente */}
     <td className="px-4 py-2 border border-gray-300">
       {row.produit?.prix_vente !== undefined && row.produit?.prix_vente !== null
         ? `${row.produit.prix_vente} $`
         : "Prix de vente indisponible"}
     </td>
   </tr>
   
    ))}
  </tbody>
</table>


        {/* Pagination */}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-primary mx-2 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2  mx-2 ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
