import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useReservation } from "../../context/ReservationContext";
import Select from "react-select";
import ConfirmModal from "../modal/reservation/ConfirmModal";
import PaiedModal from "../modal/reservation/PaiedModal";

export default function TableReservation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;

  const { setOpenModalDelete, setInfo, info, listEmploye } = useAdmin();
  const { listRes, rooms, setOpenD, setOpenP, setOpen } = useReservation();

  // Filtrage des réservations par chambre
  const [filteredReservations, setFilteredReservations] = useState(listRes);

  // Recherche par numéro de chambre
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Met à jour la liste filtrée lors d'un changement dans `listRes`
    setFilteredReservations(listRes);
  }, [listRes]);

  const handleFilterChange = (selectedOption) => {
    if (!selectedOption) {
      setFilteredReservations(listRes); // Si aucun filtre, afficher toutes les réservations
    } else {
      setFilteredReservations(
        listRes.filter((res) => res.Chambre_id === parseInt(selectedOption.value))
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const searchResults = listRes.filter((res) =>
      res.chambre.numero_chambre.toString().includes(e.target.value)
    );
    setFilteredReservations(searchResults);
  };

  // Options pour react-select
  const roomOptions = rooms.map((room) => ({
    value: room.id,
    label: `Chambre ${room.numero_chambre}`,
  }));

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = filteredReservations.slice(
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

  const openModalConfirm = (row) => {
    setInfo(row);
    setOpenD(true);
  };

  const openModalConfirmPaie = (row) => {
    setInfo(row);
    setOpenP(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
      

        {/* Recherche par numéro de chambre */}
        <div className="search">
          <label htmlFor="searchTerm" className="block font-medium">
            Rechercher une chambre
          </label>
          <input
            id="searchTerm"
            type="text"
            placeholder="Rechercher une chambre..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded mt-2 w-72"
          />
        </div>

        <button className="btn-primary" onClick={() => setOpen(true)}>
          Chambres disponibles
        </button>
      </div>

      <div className="mt-5">
        <table className="text-left w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border">Nom client</th>
              <th className="px-4 py-2 border">Numéro chambre</th>
              <th className="px-4 py-2 border">Date de début</th>
              <th className="px-4 py-2 border">Date de fin</th>
              <th className="px-4 py-2 border">Statut</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index} className="text-gray-700 py-3 hover:bg-gray-200">
                  <td className="px-4 py-2 flex items-center">
                    <span className="ml-2 font-semibold">{row.client.nom}</span>
                  </td>
                  <td className="px-4 py-2">{row.chambre.numero_chambre}</td>
                  <td className="px-4 py-2 text-gray-700">{row.date_arrive}</td>
                  <td className="px-4 py-2 text-gray-700">{row.date_depart}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {row.is_avance_paid === 0 ? (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                        En attente
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                        Confirmé
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {row.is_avance_paid === 0 ? (
                      <button
                        onClick={() => openModalConfirm(row)}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-800"
                      >
                        Confirmer
                      </button>
                    ) : (
                      <button
                        onClick={() => openModalConfirmPaie(row)}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-800"
                      >
                        Payé
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Aucune réservation trouvée.
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
            Précédent
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 mx-2 text-white"
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
      </div>

      <ConfirmModal />
      <PaiedModal />
    </>
  );
}
