import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PlusCircle } from "lucide-react";
import AjoutProduit from "../../components/modal/produit/AjoutProduit";
import { useProduit } from "../../context/ProduitContext";
import TableProduit from "../../components/table/TableProduit";
import LoadingPage from "../../components/LoadingPage";
import DeleteProduct from "../../components/produit/DeleteProduct";
import TableCategorie from "../../components/table/TableCategorie";
import AjoutCategorie from "../../components/modal/produit/AjoutCategorie";
import DeleteCategory from "../../components/produit/DeleteCategory";

export default function Produit() {
  const { setOpen, resertForm, listProduit, setEdit } = useProduit();
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement
  const [activeSection, setActiveSection] = useState("produit");
  // Gestion du spinner (2 secondes)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // Nettoyer le timeout
  }, []);

  const openModal = () => {
    resertForm();
    setOpen(true);
    setEdit(null);
  };

  return (
    <>
      <div className="">
        <div className="poste flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-secondary text-gray-700 text-4xl">
              Gestion des produits{" "}
            </span>
            <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
              <span className="text-xs text-primary font-semibold">
                {listProduit?.length || 0}
              </span>
            </div>
          </div>
          <div className="add_employe">
            <button
              className="flex items-center btn-primary"
              onClick={openModal}
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span className="pl-1">
                {" "}
                Ajouter un{" "}
                {activeSection == "produit" ? "produit" : "Catégorie"}{" "}
              </span>
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          {/* Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveSection("produit")}
              className={`px-4 py-2 rounded ${
                activeSection === "produit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => setActiveSection("categorie")}
              className={`px-4 py-2 rounded ${
                activeSection === "categorie"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Catégories
            </button>
          </div>
        </div>
        {activeSection == "produit" && (
          <div className="table-produit mt-2">
            {isLoading ? (
              <LoadingPage />
            ) : listProduit?.length > 0 ? (
              <TableProduit />
            ) : (
              <div className="text-center text-gray-500">
                Aucun produit disponible.
              </div>
            )}
          </div>
        )}
        {activeSection == "categorie" && (
          <div className="table-categorie mt-2">
            <TableCategorie />
          </div>
        )}

        {activeSection == "produit" ? <AjoutProduit /> : <AjoutCategorie />}
        {activeSection == "produit" ? <DeleteProduct /> : <DeleteCategory />}

    
      </div>
    </>
  );
}
