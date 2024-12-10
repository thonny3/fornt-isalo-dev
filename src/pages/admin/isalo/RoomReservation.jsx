import React, { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../../../components/modal/Modal";
import { useAdmin } from "../../../context/AdminContext";

import { Reservation } from "../../../service/Reservation";
import TableReservation from "../../../components/table/TableReservation";
import { useReservation } from "../../../context/ReservationContext";
import { toast } from "react-toastify";
import ChambreDisponible from "../../../components/modal/chambre/ChambreDisponible";

const RoomReservation = () => {
  const { listCient ,getAllClient,toast} = useAdmin();
  const {getReservation,rooms,getAllChambres} =  useReservation()
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    isPaid: 0,
  });
 

  // Ajouter une réservation
  const handleAddReservation = () => {
    Reservation.createReservation({
      Chambre_id: formData.roomNumber,
      Client_id: formData.clientName,
      date_arrive: formData.startDate,
      date_depart: formData.endDate,
      is_avance_paid : formData.isPaid
    })
      .then((res)=>{
        toast.success('Reservation  a été erengistré')
        getReservation()
        setModalOpen(false); // Fermer le modal après l'ajout
        setFormData({
          clientName: "",
          roomNumber: "",
          startDate: "",
          endDate: "",
          isPaid: null,
        });
      })
      .catch((error) =>{if (error.status==409) {
        toast.error(error.data)
      }});

 
  };

  

  useEffect(() => {
    getAllChambres();
    getReservation();
    getAllClient()
  }, []);
  return (
    <>
      <div className="reservation-container">
        <header className="header flex justify-between items-center">
          <h1>Réservations de Chambres</h1>
          <button
            className="add-reservation-button bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Ajouter une réservation
          </button>
        </header>

        <div className="reservation-list">
          <h3>Liste des Réservations</h3>
          
         
        </div>

        <TableReservation/>
        <ChambreDisponible/>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h1 className="text-2xl text-gray-700">Ajouter une Réservation</h1>
        <form className="mt-5">
          <div className="grid grid-cols-2 space-x-8">
            <div>
              <div className="form-group mt-2">
                <label htmlFor="clientName">Nom du Client</label>
                <select
                  id="roomNumber"
                  className="form-control w-full"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientName: e.target.value,
                    })
                  }
                >
                  <option value="">Choisir un client</option>
                  {listCient.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="roomNumber">Numéro de Chambre</label>
                <select
                  id="roomNumber"
                  className="form-control w-full"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roomNumber: e.target.value,
                    })
                  }
                >
                  <option value="">Choisir une chambre</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.numero_chambre}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div>
              <div className="form-group mt-2">
                <label htmlFor="startDate">Date de Début</label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control w-full"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="endDate">Date de Fin</label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control w-full"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              type="button"
              className="bg-primary text-white px-6 py-2 rounded-md"
              onClick={handleAddReservation}
            >
              Ajouter la Réservation
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RoomReservation;
