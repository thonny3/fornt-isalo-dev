import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useConge } from "../../context/CongeContext";
import { useAdmin } from "../../context/AdminContext";

const TableConge = () => {
  const { setOpenPosteDelete, setId } = useAdmin();
  const { listeConge, ShowEdit, setEdit, setOpen } = useConge();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 5;
  const pagesPerGroup = 3;

  // Total de pages
  const totalPages = Math.ceil(listeConge.length / itemsPerPage);

  // Filtrer les données en fonction du terme de recherche et des dates
  const filteredData = listeConge.filter((row) => {
    const matchNameOrDate =
      row.user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date_debut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date_fin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDateRange =
      (startDate === "" || new Date(row.date_debut) >= new Date(startDate)) &&
      (endDate === "" || new Date(row.date_fin) <= new Date(endDate));

    return matchNameOrDate && matchDateRange;
  });

  // Données à afficher pour la page actuelle
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Naviguer vers une page spécifique
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  // Changer de groupe de pages
  const changePageGroup = (direction) => setPageGroup(pageGroup + direction);

  // Réinitialiser la recherche
  const resetSearch = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto mt-5">
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom, date..."
          className="px-4 py-2 border rounded-l-md"
        />
        
   
      </div>

      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Nom de l'employé</th>
            <th className="px-4 py-2">Date début</th>
            <th className="px-4 py-2">Date Fin</th>
            <th className="px-4 py-2">Nombre de Jours</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length ? (
            currentData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 flex items-center">
                  <span className="ml-2">{row.user.nom}</span>
                </td>
                <td className="px-4 py-2">{row.date_debut}</td>
                <td className="px-4 py-2">{row.date_fin}</td>
                <td className="px-4 py-2">{row.nombre_jours}</td>
                <td className="px-4 py-2">{row.motif}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="text-gray-600 hover:text-blue-700"
                    onClick={() => {
                      setOpen(true);
                      setEdit(row.id);
                      ShowEdit(row);
                      console.log(row);
                    }}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-700"
                    onClick={() => {
                      setOpenPosteDelete(true);
                      setId(row.id);
                      ShowEdit(row);
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-4 py-2 text-gray-500">
                Aucun congé trouvé
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
    </div>
  );
};

export default TableConge;
