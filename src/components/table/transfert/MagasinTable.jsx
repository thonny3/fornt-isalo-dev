import React, { useEffect, useState } from "react";

import { useProduit } from "../../../context/ProduitContext";

export default function MagasinTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const { getMagasinTranfert, magasin } = useProduit();

  // Mapping pour les noms des en-têtes personnalisés
  const headerMapping = {
    Produit: "Produit",
    Source: "Source",
    Destination: "Destination",
    Quantite: "Quantité",
    Date: "Date",
  };

  // Extraire les données sous forme de tableau plat
  const rows = (magasin?.historique || []).flatMap((hist) =>
    hist.details.map((detail) => ({
      Produit: detail?.produit?.nom || 'Nom non disponible',
      Source: hist.source,
      Destination: hist.destination,
      Quantite: detail.quantite,
      Date: new Date(hist.created_at).toLocaleDateString() || "Non spécifiée",
    }))
  );

  // Obtenir les clés des en-têtes et leur correspondance
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Aller à la page sélectionnée
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getMagasinTranfert();
  }, []);

  return (
    <div className="mt-8">
      <div className="relative overflow-x-auto sm:rounded-lg">
        {/* Afficher un message si la table est vide */}
        {rows.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            Aucun transfert disponible.
          </div>
        ) : (
          <table className="min-w-full text-md text-left text-gray-500 bg-white border border-gray-300">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-300">
    <tr >
      {headers.map((header, index) => (
        <th key={index} className="px-4 py-2 border border-gray-300 text-sm text-gray-500 font-normal" >
          {headerMapping[header] || header}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {currentData.map((row, index) => (
      <tr key={index} className="hover:bg-gray-100 border-b border-gray-300 text-gray-600 mt-2">
        {headers.map((header, hIndex) => (
          <td
            key={hIndex}
            className="px-4 py-2 font-medium text-gray-900 border border-gray-300"
          >
            {row[header]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>

      {/* Pagination */}
      {rows.length > 0 && (
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
            Précédent
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 ${
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
            className={`px-4 py-2 mx-2 ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
