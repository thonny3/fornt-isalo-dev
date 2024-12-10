import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useProduit } from "../../context/ProduitContext";
import { EyeIcon } from "lucide-react";
import Modal from "../modal/Modal";
import { useFournisseur } from "../../context/FournisseurContext";

export default function TableVenteToiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { venteToiles } = useProduit();
  const [list, setList] = useState({});

  const { openAppro, setOpenAppro } = useFournisseur();
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(venteToiles.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = venteToiles.slice(
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

  const formatCustomDate = (isoDate) => {
    if (!isoDate) return "Non spécifié";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Jour avec 2 chiffres
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois avec 2 chiffres (getMonth commence à 0)
    const year = date.getFullYear(); // Année
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="">
      <table className="text-left w-full">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
            <th className="px-4 py-2">Employée</th>
            <th className="px-4 py-2">Produits</th>
            <th className="px-4 py-2">Montant (Ar )</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {currentData.length > 0 ? (
            currentData.map((row) => (
              <tr key={row.id} className="text-gray-600 mt-2 border-b">
                <td className="px-4 py-2 ">{row.employe.nom}</td>
                <td className="px-4 py-2 flex flex-col">
                  {/* Liste des deux premiers produits */}
                  <div className="flex flex-wrap">
                    {row.produits.slice(0, 2).map((product) => (
                      <span key={product.id} className="ml-2">
                        <span className="text-gray-800">
                          {product.produit.nom}
                        </span>{" "}
                        [ {product.quantite} ]
                      </span>
                    ))}
                  </div>

                  {/* Vérifiez s'il y a plus de 2 produits */}
                  {row.produits.length > 2 && (
                    <div className="text-gray-500 mt-2">
                      ...+ {row.produits.length - 2} autres produits
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 ">{row.valeur_sortie}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className=" hover:text-yellow-700 text-sm p-1"
                    onClick={() => {
                      setOpenAppro(true);
                      setList(row);
                      console.log(list);
                    }}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3 text-gray-500">
                Aucun enregistrement trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
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
        open={openAppro}
        onClose={() => {
          setOpenAppro(false);
        }}
        width={"750px"}
      >
        <h1 className="mt-8 text-gray-800 text-2xl">Liste du vente</h1>
        <div className="contenu mt-5 text-sm">
          <p>
            <span className="font-semibold">Nom d'Employé : </span>
            <span>{list.employe?.nom || "Non spécifié"}</span>
          </p>
          <p className="mt-5">
            <span className="font-semibold">Date : </span>
            <span>{formatCustomDate(list.created_at)}</span>
          </p>
        </div>
        <div className="contenu-table mt-5">
          <table className="w-full">
            <thead className="bg-gray-100 text-sm">
              <tr className="text-left">
                <th className="p-3 border border-gray-300">Produit</th>
                <th className="p-3 border border-gray-300 text-center">
                  Quantité
                </th>
                <th className="p-3 border border-gray-300 text-right">
                  Prix (Ar)
                </th>
              </tr>
            </thead>
            <tbody>
              {list.produits && list.produits.length > 0 ? (
                list.produits.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 text-sm">
                    <td className="p-3">{item.produit.nom}</td>
                    <td className="p-3 text-center">{item.quantite}</td>
                    <td className="p-3 text-right">
                      {new Intl.NumberFormat("fr-MG").format(
                        item.produit.prix * item.quantite
                      )}{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3">
                    Aucun produit dans le panier
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="footer mt-3 flex justify-between">
            <p>
              <span className="font-semibold">Montant Total :</span>
              {new Intl.NumberFormat("fr-MG").format(list.valeur_sortie)}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
