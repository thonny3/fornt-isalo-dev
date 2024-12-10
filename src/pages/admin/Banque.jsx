import React, { useState } from "react";
import AjoutBanque from "../../components/banque/AjoutBanque";
import { useBanque } from "../../context/BanqueContext";
import TableBanque from "../../components/table/TableBanque";
import DeleteBanque from "../../components/banque/DeleteBanque";
import AjoutTransaction from "../../components/banque/AjoutTransaction";
import TableTransactionBanque from "../../components/table/TableTransactionBanque";
import DeleteTransaction from "../../components/banque/DeleteTransaction";

export default function App() {
  const [activeSection, setActiveSection] = useState("banque");
  const { setOpen, setOpenTransh, resetForm } = useBanque();

  return (
    <div className="">
      <span className="text-secondary text-gray-700 text-4xl px-6">
            Gestion des Banques{" "}
          </span>
      <div className="p-6">
        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveSection("banque")}
            className={`px-4 py-2 rounded ${
              activeSection === "banque"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            Banque
          </button>
          <button
            onClick={() => setActiveSection("transaction")}
            className={`px-4 py-2 rounded ${
              activeSection === "transaction"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            Transaction
          </button>
        </div>

        {/* Contenu dynamique */}
        {activeSection === "banque" && (
          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-4">Liste des banques</h1>

              <button
                className=" px-4 py-2 bg-primary text-white rounded hover:bg-red-900"
                onClick={() => setOpen(true)}
              >
                Créer une banque
              </button>
            </div>
            <TableBanque />
          </div>
        )}

        {activeSection === "transaction" && (
          <div>
            <div className="flex justify-between mb-5">
              <h1 className="text-2xl font-bold mb-4">
                Liste des transactions
              </h1>
              <button
                className=" px-4 py-2 bg-primary text-white rounded hover:bg-red-900"
                onClick={() => {
                  setOpenTransh(true);
                  resetForm();
                }}
              >
                Ajouter une transaction
              </button>
            </div>
            <TableTransactionBanque />
          </div>
        )}
      </div>
      {/*******Modal  */}
      <AjoutBanque />
      <DeleteBanque />
      <AjoutTransaction />
      <DeleteTransaction/>
    </div>
  );
}
