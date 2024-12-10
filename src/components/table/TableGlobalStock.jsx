import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useStock } from "../../context/StockContext";

export default function TableGlobalStock() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const itemsPerPage = 5;
    const { global } = useStock();
  
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(global.length / itemsPerPage);
    const pagesPerGroup = 3; // Nombre de pages affichées par groupe
  
    // Obtenir les données actuelles en fonction de la page
    const currentData = global.slice(
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
    <div>
    <table className="text-left w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
          <th className="px-4 py-2 border border-gray-300">Nom Produit</th>
          <th className="px-4 py-2 border border-gray-300">Stock Vitrine</th>
          <th className="px-4 py-2 border border-gray-300">Stock Magasin</th>
          <th className="px-4 py-2 border border-gray-300">Stock Tiko</th>
          <th className="px-4 py-2 border border-gray-300">Stock Total</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => {
          const { vitrine, magasin, tiko } = item.quantites;
          const stockTotal = vitrine + magasin + tiko;

          return (
            <tr key={item.produit_id} className="text-gray-600">
              <td className="px-4 py-2 border border-gray-300">
                {item.nom_produit}
              </td>
              <td className="px-4 py-2 border border-gray-300">{vitrine}</td>
              <td className="px-4 py-2 border border-gray-300">{magasin}</td>
              <td className="px-4 py-2 border border-gray-300">{tiko}</td>
              <td className="px-4 py-2 border border-gray-300">{stockTotal}</td>
            </tr>
          );
        })}
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
  )
}
