// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { Reservation } from "../service/Reservation";
import { Chambre } from "../service/Chambre";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [listRes, setListRes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [data,setData] =  useState(null)
  const [info,setInfo] =  useState([])

  const getReservation = () => {
    Reservation.getAllReservation()
      .then((res) => {
        setListRes(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllChambres = () => {
    Chambre.getAllChambre()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReservation();
    getAllChambres();
  }, []);

  return (
    <ReservationContext.Provider
      value={{ listRes, rooms,open , setOpen, getReservation, getAllChambres,setData,data,setOpenD,setOpenP,openP,openD ,setInfo,info }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  return useContext(ReservationContext);
};
