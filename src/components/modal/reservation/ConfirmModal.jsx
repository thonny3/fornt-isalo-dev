import React from "react";
import { useReservation } from "../../../context/ReservationContext";
import Modal from "../Modal";
import { CheckCircle, TrashIcon } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { Reservation } from "../../../service/Reservation";

export default function ConfirmModal() {
  const {info,toast} =  useAdmin()
  const { openD ,setOpenD,getReservation} = useReservation();

  const confirmationReservation= ()=>{

    if (!info || !info.id) {
      toast.error("Aucun ID valide n'est sélectionné. Veuillez réessayer.");
      return;
    }

    Reservation.confirmationReservation(info.id).then((res)=>{
      getReservation()
      setOpenD(false)
      toast.success("La réservation de la chambre a été confirmée avec succès.")
    }).catch(error=>console.log(error))
    
  }

  return (
    <>
      <Modal open={openD} onClose={()=>setOpenD(false)}>
        <div className="flex justify-center items-center h-full">
          <div className="contenu text-center w-80">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <span className="font-bold text-lg text-gray-700 ">
              Êtes-vous sûr de vouloir confirmer cette réservation  ?
            </span>
          </div>
        </div>
        <div className="float-end mt-2">
            <button className="btn hover:bg-red-500 hover:text-white" onClick={()=>setOpenD(false)}>Annuler</button>
            <button className="btn bg-green-500 text-white ml-5" onClick={confirmationReservation}>Confirmer</button>
        </div>
      </Modal>
    </>
  );
}
