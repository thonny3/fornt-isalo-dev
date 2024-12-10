import React, { createContext, useContext, useEffect, useState } from "react";
import { Stock } from "../service/Stock";
import { useAdmin } from "./AdminContext";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  //stock  toils d'isalo
  const {
    etatStock,
    setEtatStock,
    magasin,
    setMagsin,
    vitrine,
    setVitrine,
    tiko,
    setTiko,
    global,
    setGlobal,
  } = useAdmin();

  const [stockage, setStockage] = useState("tous");

  const getEtatStock = () => {
    Stock.getEtatStockEtoil()
      .then((res) => {
        setEtatStock(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockMagasin = () => {
    Stock.getStockMagasin()
      .then((res) => {
        setMagsin(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockVitrine = () => {
    Stock.getStockVitrine()
      .then((res) => {
        setVitrine(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockTiko = () => {
    Stock.getStockTiko()
      .then((res) => {
        setTiko(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getGlobalStock = () => {
    Stock.globalStok()
      .then((res) => {
        setGlobal(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };



  useEffect(() => {
    getEtatStock();
  }, []);

  return (
    <StockContext.Provider
      value={{
        etatStock,
        stockage,
        setStockage,
        magasin,
        vitrine,
        tiko,
        getStockMagasin,
        getStockVitrine,
        getStockTiko,
        getGlobalStock,
        global
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  return useContext(StockContext);
};
