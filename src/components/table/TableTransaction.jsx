import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useTransaction } from "../../context/TransactionContext";

export default function TableTransaction() {
  const { getTransactions, listTrans } = useTransaction();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const itemsPerPage = 5;

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(
    listTrans.filter((row) => {
      const nameMatch = row.user.nom.toLowerCase().includes(searchName.toLowerCase());
      const date = new Date(row.updated_at);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      // Vérifier si le mois et l'année correspondent à la saisie
      return nameMatch && (searchMonth ? formattedDate === searchMonth : true);
    }).length / itemsPerPage
  );

  // Filtrer les données en fonction des critères
  const currentData = listTrans
    .filter((row) => {
      const nameMatch = row.user.nom.toLowerCase().includes(searchName.toLowerCase());
      const date = new Date(row.updated_at);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const dateMatch = searchMonth ? formattedDate === searchMonth : true;
      return nameMatch && dateMatch;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchName("");
    setSearchMonth("");
    setCurrentPage(1);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="month"
            value={searchMonth}
            onChange={(e) => setSearchMonth(e.target.value)}
            className="ml-2 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Rechercher
          </button>
          <button
            onClick={resetSearch}
            className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {currentData.length === 0 ? (
        <p className="text-center text-red-500">Aucune transaction trouvée.</p>
      ) : (
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="px-4 py-2">Nom de l'employé</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Montant avance</th>
              <th className="px-4 py-2">Montant Mensuel</th>
              <th className="px-4 py-2">Remboursement Reste</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 flex items-center">{row.user.nom}</td>
                <td className="px-4 py-2 text-sm">{row.type}</td>
                <td className="px-4 py-2 text-gray-700">
                  <span
                    className={`w-full text-sm font-medium px-4 py-0.5 rounded-full ${
                      row.status === "payé"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(row.updated_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-2 text-sm">
                  {row.amount
                    ? `${row.amount.toLocaleString("fr-FR")} Ar`
                    : "Non défini"}
                </td>
                <td className="px-4 py-2 text-sm">{row.user.salaires_brut}</td>
                <td className="px-4 py-2 my-3 text-sm w-fit">
                  {row.user.salaires_brut - row.amount}
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
          className={`px-4 py-2 ${
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
              className={`px-4 py-2 text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
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
          className={`px-4 py-2 text-sm ${
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
