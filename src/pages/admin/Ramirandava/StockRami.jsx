import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import TvaleMagasin from "../../../components/table/TvaleMagasin";
import TableVitrine from "../../../components/table/TableVitrine";
import TableTiko from "../../../components/table/TableTiko";
import { useStock } from "../../../context/StockContext";
import TableGlobalStock from "../../../components/table/TableGlobalStock";

export default function StockRami() {
  const {
    setStockage,
    stockage,
    getStockTiko,
    getStockVitrine,
    getStockMagasin,
    getGlobalStock
  } = useStock();

  // Fonction pour vérifier si le bouton est actif
  const isActive = (type) => stockage === type;
  const buttons = [
    { label: " Tous", value: "tous", action: getGlobalStock },
    { label: " Magasin", value: "magasin", action: getStockMagasin },
    { label: " Vitrine", value: "vitrine", action: getStockVitrine },
    { label: " TIKO", value: "tiko", action: getStockTiko },
  ]  
  useEffect(() => {
    getStockMagasin();
    getGlobalStock()
  }, []);

  return (
    <div className="">
      <h1 className="text-gray-700 text-4xl mb-5">Historique des stocks</h1>
      {/* Boutons */}
      <div className="flex items-center space-x-4 mb-6">
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`px-6 py-2 rounded  transition-all duration-300 ease-in-out ${
              isActive(button.value)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } `}
            onClick={() => {
              setStockage(button.value);
              button.action();
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Recherche */}
      <div className="flex justify-between items-center mb-6">
        <div className="search flex items-center  p-2 rounded w-full max-w-md">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-gray-500 placeholder:text-sm"
          />
        </div>
      </div>

      {/* Contenu */}
      <div className="mt-5">
        {stockage === "tous" && <TableGlobalStock />}
        {stockage === "magasin" && <TvaleMagasin />}
        {stockage === "vitrine" && <TableVitrine />}
        {stockage === "tiko" && <TableTiko />}
      </div>
    </div>
  );
}
