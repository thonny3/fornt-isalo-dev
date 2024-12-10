import React from "react";
import { useReservation } from "../../../context/ReservationContext";
import Modal from "../Modal";
import { CheckCircle, TrashIcon } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { Reservation } from "../../../service/Reservation";


export default function PaiedModal() {
  const {info,toast} =  useAdmin()
  const { openP ,setOpenP,getReservation} = useReservation();

    const PaieReservation= ()=>{

      if (!info || !info.id) {
        toast.error("Aucun ID valide n'est sélectionné. Veuillez réessayer.");
        return;
      }
  
      Reservation.PaieReservation(info.id).then((res)=>{
        getReservation()
        setOpenP(false)
        toast.success("La réservation de la chambre a été payé avec succès.")
      }).catch(error=>console.log(error))
      
    }

  return (
    <Modal open={openP} onClose={()=>setOpenP(false)}>
        <div className="flex justify-center items-center h-full">
          <div className="contenu text-center w-80">
            <CheckCircle className="text-blue-500 w-16 h-16 mx-auto mb-4" />
            <span className="font-bold text-2xl text-gray-700 ">
            Cette réservation a déjà été payée. Voulez-vous confirmer à nouveau ?
            </span>
          </div>
        </div>
        <div className="float-end mt-2">
            <button className="btn hover:bg-red-500 hover:text-white" onClick={()=>setOpenP(false)} >Annuler</button>
            <button className="btn bg-blue-500 text-white ml-5" onClick={PaieReservation}>Payer</button>
        </div>
      </Modal>
  )
}
