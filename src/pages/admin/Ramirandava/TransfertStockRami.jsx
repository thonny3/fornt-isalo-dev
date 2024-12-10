import React from "react";
import { useAdmin } from "../../../context/AdminContext";
import { useFournisseur } from "../../../context/FournisseurContext";
import MagasinTable from "../../../components/table/transfert/MagasinTable";
import VitrineTable from "../../../components/table/transfert/VitrineTable";
import TikoTable from "../../../components/table/transfert/TikoTable";
import AjoutApprovisionnement from "../../../components/modal/fournisseur/AjoutApprovisionnement";
import { PlusCircle } from "lucide-react";

const sections = [
  { key: "banque", label: "Tous" },
  { key: "magasin", label: "Magasin", component: MagasinTable },
  { key: "vitrine", label: "Vitrine", component: VitrineTable },
  { key: "tiko", label: "Tiko", component: TikoTable },
];

export default function TransfertStockRami() {
  const { app } = useAdmin();
  const { setOpen, setLieu, activeSection, setActiveSection } = useFournisseur();

  const handleTransferClick = (lieu) => {
    setOpen(true);
    setLieu(lieu);
  };

  const getButtonClass = (sectionKey) =>
    `px-4 py-2 rounded  transition-all duration-300 ease-in-out ${
      activeSection === sectionKey
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-black hover:bg-gray-300"
    }`;

  return (
    <>
     <div className="flex items-center justify-between">
          <span className="text-secondary text-gray-700 text-4xl">
            Historiques des Transferts du stock  {" "}
          </span>
          <div className="nomb">
           {/* Bouton principal pour transfert de stocks */}
      <button
        className="flex items-center btn-primary"
        onClick={() =>
          handleTransferClick(
            app === "toils" ? "tranfertToiles" : "tranfertRami"
          )
        }
      >
        <PlusCircle className="w-5 h-5 text-white" />
        <span className="text-md pl-1">Transfert de stocks</span>
      </button>
          </div>
        </div>
        
      

      {/* Navigation */}
      <div className="flex space-x-4 mb-6 mt-8">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={getButtonClass(section.key)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Rendu conditionnel des sections */}
      {sections.map(
        (section) =>
          activeSection === section.key && (
            <div key={section.key}>
              {section.component && <section.component />}
              <AjoutApprovisionnement />
            </div>
          )
      )}
    </>
  );
}
