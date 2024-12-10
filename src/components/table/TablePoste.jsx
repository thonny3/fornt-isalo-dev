import React, { useState } from "react";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useAdmin } from "../../context/AdminContext";
import { usePoste } from "../../context/PosteContext";

function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function TablePoste() {
  const { setOpenPosteDelete, poste, setId, setInfo, setOpenPoste, loading } = useAdmin();
  const { setEdit, setOpen, ShowEdit } = usePoste();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  const normalizedSearch = removeAccents(search.toLowerCase());

  const filteredData = poste.filter((row) =>
    removeAccents(row.nom.toLowerCase()).includes(normalizedSearch) ||
    (row.description && removeAccents(row.description.toLowerCase()).includes(normalizedSearch))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Barre de recherche */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full sm:w-64">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="ml-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des résultats */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Aucun résultat trouvé.
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{row.nom}</td>
                  <td className="px-4 py-2">
                    {row.description ? row.description : "Non spécifié"}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-2">
                    <button
                      className="text-gray-600 hover:text-blue-700"
                      onClick={() => {
                        setOpen(true);
                        setEdit(row.id);
                        ShowEdit(row);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-700"
                      onClick={() => {
                        setOpenPosteDelete(true);
                        setId(row);
                      }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded-lg ${
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
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-primary text-white"
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
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
