import React, { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAdmin } from "../../context/AdminContext";
import { useFournisseur } from "../../context/FournisseurContext";

export default function TableFournisseur() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const itemsPerPage = 5;
  const { listFournisseurs, setOpenPosteDelete, setId } = useAdmin();
  const { setEdit, setOpen, ShowEdit } = useFournisseur();

  // Filtrer les fournisseurs selon le terme de recherche
  const filteredData = listFournisseurs.filter((row) =>
    row.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Obtenir les données actuelles en fonction de la page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Aller à la page sélectionnée
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un fournisseur..."
          className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="min-w-full text-md text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 ">
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {row.nom}
                </td>
                <td className="px-4 py-4">{row.contact}</td>
                <td className="px-4 py-2">{row.adresse}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setOpen(true);
                      setEdit(row.id);
                      ShowEdit(row);
                    }}
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setOpenPosteDelete(true);
                      setId(row.id);
                    }}
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
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
    </div>
  );
}
