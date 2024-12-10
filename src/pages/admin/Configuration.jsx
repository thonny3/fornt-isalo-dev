import React from "react";
import App from "./App";
import { useAdmin } from "../../context/AdminContext";
import ConfigurationSalaires from "./ConfigurationSalaires ";
import Parametre from "./Parametre";

export default function Configuration() {
  const { activeButton, setActiveButton } = useAdmin();
  return (
    <div>
      <h1 className="text-4xl  mb-5">Configurations</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveButton("utilisateur")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeButton === "utilisateur"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Utilisateur
        </button>
        <button
          onClick={() => setActiveButton("salaire")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeButton === "salaire"
              ? "bg-orange-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Salaire
        </button>
        <button
          onClick={() => setActiveButton("parametre")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeButton === "parametre"
              ? "bg-orange-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Paramètre
        </button>
      </div>

      {activeButton == "utilisateur" && <App />}

      {activeButton == "salaire" && <ConfigurationSalaires />}

      {activeButton == "parametre" && <Parametre />}
    </div>
  );
}
