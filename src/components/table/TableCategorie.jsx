import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useAdmin } from "../../context/AdminContext";
import { useProduit } from "../../context/ProduitContext";


export default function TableCategorie() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 5;
    const { setOpenModalDelete, setInfo, listEmploye, setId } = useAdmin();
    const { listCategorie, setEdit, setOpen, setCat, setOpenDelete } = useProduit();
  
    // Filter the list of products based on the search term
    const filteredList = listCategorie.filter((row) =>
      row.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Calculate the total number of pages based on the filtered list
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    const pagesPerGroup = 3; // Number of pages displayed per group
  
    // Get current data based on the page
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
  
  return (
    <div className="">
      <h1 className="text-2xl mb-4 ">Liste des Catégories</h1>
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded "
        />
      </div>
      <table className="text-left w-full">
  <thead>
    <tr className="bg-gray-100 text-gray-700">
      <th className="px-4 py-2">Catégorie</th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentData.map((row) => (
      <tr key={row.id} className="text-gray-700 py-3 hover:bg-gray-200">
        {/* Colonne Nom */}
        <td className="px-4 py-2">
          <span className="font-semibold">{row.nom}</span>
        </td>
      
        {/* Colonne Action */}
        <td className="px-4 py-2 flex justify-start items-center space-x-2">
          <button
            className="text-gray-600 hover:text-blue-700 text-sm"
            aria-label={`Modifier ${row.nom}`}
            onClick={() => {
              setOpen(true);
              setEdit(row.id);
              setCat(row.nom);
            }}
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 hover:text-red-700"
            aria-label={`Supprimer ${row.nom}`}
            onClick={() => {
              setOpenDelete(true);
              setId(row);
            }}
          >
            <TrashIcon className="w-5 h-5" />
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
                currentPage === index + 1 ? "bg-primary mx-2 text-white" : "bg-gray-200 hover:bg-gray-300"
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
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
