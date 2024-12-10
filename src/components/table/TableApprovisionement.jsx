import React, { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAdmin } from "../../context/AdminContext";
import { useFournisseur } from "../../context/FournisseurContext";
import Modal from "../modal/Modal";


export default function TableApprovisionement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const [list, setList] = useState({});
  const { listFournisseurs, setOpenPosteDelete, setId } = useAdmin();
  const {
    setEdit,
    setOpen,
    ShowEdit,
    listAppro,
    open,
    openAppro,
    setOpenAppro,
  } = useFournisseur();

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(listAppro.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = listAppro.slice(
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
        <table className="text-left w-full">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
              <th className="px-4 py-2">Produit</th>
              <th className="px-4 py-2">Nom du Fournisseur</th>
              <th className="px-4 py-2">Date d'approvisionnement</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.approvisionnement.id} className="text-gray-600 mt-2">
                <td className="px-4 py-2 flex items-center">
                  {row.produits.map((product) => (
                    <span key={product.id} className="ml-2 ">
                      {product.produit.nom}[{product.quantite}],{" "}
                      {/* Affichage du nom, quantité et prix */}
                    </span>
                  ))}
                </td>

                <td className="px-4 py-2 ">
                  {row.approvisionnement.fournisseur.nom}
                </td>
                <td className="px-4 py-2">
                  {row.approvisionnement.date_approvisionnement}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className=" text-sm text-yellow-500 p-1"
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
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={goToPreviousGroup}
            disabled={pageGroup === 1}
            className={`px-4 py-2 ${
              pageGroup === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <div className="flex space-x-2">{renderPageNumbers()}</div>
          <button
            onClick={goToNextGroup}
            disabled={pageGroup >= Math.ceil(totalPages / pagesPerGroup)}
            className={`px-4 py-2 ${
              pageGroup >= Math.ceil(totalPages / pagesPerGroup)
                ? "bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>

        {/* Modal view product */}
        <Modal
          open={openAppro}
          onClose={() => {
            setOpenAppro(false);
          }}
          width={"750px"}
        >
          <h1 className="mt-8 text-gray-800 text-2xl">
            Liste du produit approvisionné
          </h1>
          <div className="contenu mt-5 text-sm">
            <p>
              <span className="font-semibold">Nom du Fournisseur : </span>
              <span>
                {list.approvisionnement?.fournisseur?.nom || "Non spécifié"}
              </span>
            </p>
            <p>
              <span className="font-semibold mt-2">Date : </span>
              <span>
                {list.approvisionnement?.date_approvisionnement ||
                  "Non spécifié"}
              </span>
            </p>
            <p>
              <span className="font-semibold mt-2">Contact : </span>
              <span>
                {list.approvisionnement?.fournisseur?.contact || "Non spécifié"}
              </span>
            </p>
            <p>
              <span className="font-semibold mt-2">Adresse : </span>
              <span>
                {list.approvisionnement?.fournisseur?.adresse || "Non spécifié"}
              </span>
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
                    <tr
                      key={index}
                      className="border-b border-gray-200 text-sm"
                    >
                      <td className="p-3">{item.produit.nom}</td>
                      <td className="p-3 text-center">{item.quantite}</td>
                      <td className="p-3 text-right">
                        {new Intl.NumberFormat("fr-MG").format(
                          item.produit.prix
                        )}{" "}
                        Ar
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
            <div className="footer mt-3 text-right">
              <span className="font-semibold">Total : </span>
              <span>
                {new Intl.NumberFormat("fr-MG").format(
                  list.approvisionnement?.montant_approvisionnement || 0
                )}{" "}
                Ar
              </span>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
