import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useProduit } from "../../context/ProduitContext";
import { EyeIcon } from "lucide-react";

export default function TableVenteRami() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { venteRami } = useProduit();

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(venteRami.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = venteRami.slice(
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
    <div className="">
      {venteRami.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          Aucune donnée disponible.
        </p>
      ) : (
        <>
          <table className="text-left w-full ">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
                <th className="px-4 py-2">Produits</th>
                <th className="px-4 py-2">Stockage</th>
                <th className="px-4 py-2">Montant</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((row) => (
                <tr key={row.id} className="text-gray-600 mt-2 border-b">
                  <td className="px-4 py-2 flex flex-col">
                    {/* Liste des deux premiers produits */}
                    <div className="flex flex-wrap">
                      {row.details.slice(0, 2).map((product) => (
                        <span key={product.id} className="ml-2">
                          <span className="text-gray-800">
                            {product.produit.nom}
                          </span>{" "}
                          [ {product.quantite} ]
                        </span>
                      ))}
                    </div>

                    {/* Vérifiez s'il y a plus de 2 produits */}
                    {row.details.length > 2 && (
                      <div className="text-gray-500 mt-2">
                        ...+ {row.details.length - 2} autres produits
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.stock_id == 1
                      ? "Vitrine"
                      : row.stock_id == 2
                      ? "Magasin"
                      : row.stock_id == 3
                      ? "Tiko"
                      : "Inconnu"}
                  </td>

                  <td className="px-4 py-2 ">{row.montant_total}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className=" hover:text-blue-700 text-sm p-1">
                      <EyeIcon className="w-5 h-5" />
                    </button>
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
        </>
      )}
    </div>
  );
}
