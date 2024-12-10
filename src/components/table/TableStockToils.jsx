import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useStock } from "../../context/StockContext";
import Modal from "../modal/Modal";
import logoDelete from '../../assets/delete.png'
export default function TableStockToils() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { etatStock } = useStock();
  const [openModalD, setOpenModalD] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State pour le chargement
  const [id,setId] =  useState(null)

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(etatStock.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = etatStock.slice(
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

  const deleteStock =()=>{
    setIsLoading(true); // Début du chargement
  }
  return (
    <>
      <div className="">
      <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="min-w-full text-md text-left text-gray-500 bg-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Catégorie</th>
            <th className="px-4 py-2">Quantité</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Prix de vente</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {row.produit.nom}
              </td>
              <td className="px-4 py-2">{row.produit.categorie_id}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block w-8 h-8 rounded-full text-center leading-8 ${
                    row.quantite <= 5 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {row.quantite}
                </span>
              </td>
              <td className="px-4 py-2">{row.produit.prix}</td>
              <td className="px-4 py-2">{row.produit.prix_vente}</td>
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
        <Modal
          open={openModalD}
          onClose={() => {
            setOpenModalD(false);
          }}
        >
          <div className="modal-content mt-5">
            <div className="image flex justify-center">
              <img src={logoDelete} alt="Delete logo" />
            </div>
            <div className="w-56">
              <p className="text-center font-semibold text-lg text-gray-700">
                Êtes-vous sûr de vouloir supprimer  produit  ?
              </p>
            </div>
            <div className="boutton text-center mt-5">
              <button className="btn" onClick={()=>setOpenModalD(false)} disabled={isLoading}>
                Annuler
              </button>
              <button
                type="button"
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2 inline-flex items-center ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={deleteStock}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Chargement...
                  </>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
