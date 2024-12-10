import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { EyeIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function TableEmploye({
  ShowEdit,
  showModalDelete,
  setEdit,
  setOpen,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const itemsPerPage = 5;
  const { setOpenModalDelete, setInfo, listEmploye } = useAdmin();

  const totalPages = Math.ceil(listEmploye.length / itemsPerPage);
  const pagesPerGroup = 3;

  // Filtrer les employés en fonction de la recherche
  const filteredList = listEmploye.filter((row) => {
    return (
      row.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.postes?.nom || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentData = filteredList.slice(
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
          className={`px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white"
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
    <div className="overflow-x-auto">
    {/* Champ de recherche */}
    <div className="flex items-center mb-4">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Rechercher par nom, email ou poste..."
        className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Message si aucun employé trouvé */}
    {filteredList.length === 0 ? (
      <div className="mt-4 text-center text-gray-500">Aucun employé trouvé</div>
    ) : (
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Poste</th>
            <th className="px-4 py-2">Salaire</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                  <span>{row.nom?.split(" ")[0]?.charAt(0) || "?"}</span>
                </div>
                <span className="ml-2 text-sm font-semibold">{row.nom || "N/A"}</span>
              </td>
              <td className="px-4 py-2 text-sm">{row.email || "Non spécifié"}</td>
              <td className="px-4 py-2 text-sm">{row.contact || "Non spécifié"}</td>
              <td className="px-4 py-2 text-sm">{row.postes?.nom || "Aucun poste attribué"}</td>
              <td className="px-4 py-2 text-sm">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-[#027A48] font-semibold">
                  {row.salaires_brut
                    ? `${row.salaires_brut.toLocaleString("fr-FR")} Ar`
                    : "Non défini"}
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="text-gray-600 hover:text-primary text-sm"
                  onClick={() => {
                    setOpenModalDelete(true);
                    setInfo(row);
                  }}
                  aria-label="Voir les détails"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-600 hover:text-blue-700 text-sm"
                  onClick={() => {
                    ShowEdit(row);
                    setEdit(row.id);
                    setOpen(true);
                  }}
                  aria-label="Modifier"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-600 hover:text-red-700 text-sm"
                  onClick={() => {
                    showModalDelete(true);
                    setInfo(row);
                  }}
                  aria-label="Supprimer"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

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
        className={`px-4 py-2 mx-2 ${
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
