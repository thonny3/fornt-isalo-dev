import React, { useState } from "react";
import Modal from "../Modal";
import { useReservation } from "../../../context/ReservationContext";
import { Reservation } from "../../../service/Reservation";

export default function ChambreDisponible() {
  const { open, setOpen } = useReservation();
  const [start, setdate_arrive] = useState("");
  const [end, setdate_depart] = useState("");
  const [listDispo,setListDispo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
;

  // Calculate the total number of pages
  const totalPages = Math.ceil(listDispo.length / itemsPerPage);
  const pagesPerGroup = 3; // Number of pages displayed per group

  // Get current data based on the page
  const currentData = listDispo.slice(
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

  // Function to render page numbers with ellipses
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


  const searchRooms = () => {
    console.log("recherche");
    Reservation.diponibleChmabre({ date_arrive: start, date_depart: end })
      .then((res) => {
        setListDispo(res.data)
      })
      .catch((error) => console.log(error));
  };
  const resetModal = ()=>{
    setOpen(false)
    setListDispo([])
    setdate_depart('')
    setdate_arrive('')
  }
  return (
    <>
      <Modal open={open} onClose={resetModal}>
        <h1>Recherche chambre disponible </h1>
        <div className="mt-5 flex space-x-8 ">
          <div className="form-group">
            <label htmlFor="" className="text-gray-700">
              Date de début <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="date"
              value={start}
              className="form-control"
              onChange={(e) => setdate_arrive(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="text-gray-700">
              Date de fin <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="date"
              value={end}
              className="form-control"
              onChange={(e) => setdate_depart(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={searchRooms}>
            Recherche
          </button>
        </div>
        <div className="border rounded-lg my-6">
  {listDispo.length === 0 ? (
    <p className="text-center text-gray-600 py-4">Aucune chambre disponible pour les dates sélectionnées.</p>
  ) : (
    <>
      <table className="text-left w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border">Numéro chambre</th>
            <th className="px-4 py-2 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="text-gray-700 py-3 hover:bg-gray-200">
              <td className="px-4 py-2 flex items-center">
                <span className="ml-2 font-semibold">{row.numero_chambre}</span>
              </td>
              <td className="px-4 py-2">{row.etat_chambre}</td>
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
    </>
  )}
</div>


      </Modal>
    </>
  );
}
