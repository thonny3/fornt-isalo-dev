import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAdmin } from "../../context/AdminContext";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Employe } from "../../service/Employe";

export default function TableFiche() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const itemsPerPage = 5;
  const { getAllEmploye, setInfo, listEmploye } = useAdmin();
  const [donne,setDonne] = useState([])

  const totalPages = Math.ceil(listEmploye.length / itemsPerPage);
  const pagesPerGroup = 3;

  // Filtrer les employés en fonction de la recherche
  const filteredList = listEmploye.filter((row) => {
    return (
      row.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.postes?.nom || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentData = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };

  const goToPreviousGroup = () => {
    setPageGroup(pageGroup - 1);
  };

  const renderPageNumbers = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pages = [];

    if (pageGroup > 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (pageGroup < Math.ceil(totalPages / pagesPerGroup)) {
      pages.push(
        <span key="end-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    return pages;
  };

     // Récupérer la date actuelle
  const today = new Date();

  // Obtenir uniquement le jour sans le zéro de début
  const day = today.getDate();


    

  const handleGeneratePdf = (id) => {
    Employe.fichePaie(id).then((res)=>{
   
      const users =  res.data.user
      const salaireNet =  res.data.salaireNet;
      const  configuration  =  res.data.configurations
      const doc = new jsPDF();
     ;
    // Ajouter la police Times New Roman (utilisation de 'times' si elle est intégrée)
    doc.setFont("times", "normal");

    // Ajouter les en-têtes
    doc.setFontSize(16);
    doc.text("Bulletin de Salaire", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Mois de: SEPTEMBRE 2024", 105, 28, { align: "center" });

    // Ajouter les informations de l'employé
    doc.setFontSize(12);
    doc.text(`Matricule : ${users.matricule}`, 10, 50);
    doc.text(`Nom et Prénom: ${users.nom} ${users.prenom}`, 10, 56);
    doc.text("Fonction: Service RH", 10, 62);
    doc.text("Numéro Cnaps: 2010701736527", 10, 68);

    // Tableau des revenus avec bordures de chaque colonne et ligne
    doc.autoTable({
      startY: 75,
      head: [["Libellé", "Taux", "Montants Ar"]],
      body: [
        ["Salaire mensuel", "", "1 150 000 Ar"],
        ["Heures sup", "", ""],
        ["Allocation Cafés", "", "8 000 Ar"],
        ["Allocations repas", "", "20 000 Ar"],
        ["IRSA", "1%", "12 750 Ar"],
        ["CNAPS", "1%", "11 500 Ar"],
        ["OMSI", "4.5%", "51 750 Ar"],
        ["NET A PAYER", "", "1 117 000 Ar"],
      ],
      styles: {
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Couleur des lignes
        lineWidth: 0.1, // Épaisseur des lignes
      },
      tableLineColor: [0, 0, 0], // Couleur des bordures
      tableLineWidth: 0.5, // Épaisseur des bordures
      theme: "grid", // Applique une grille à chaque cellule
      headStyles: {
        fillColor: [200, 200, 200], // Couleur de fond de l'en-tête (gris clair)
        textColor: [0, 0, 0], // Couleur du texte de l'en-tête (noir)
        fontStyle: "bold", // Style de la police (gras)
        halign: "center", // Alignement horizontal du texte
      },
    });

    // Tableau des charges patronales avec bordures de chaque colonne et ligne
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Charges Patronales", "Description", "Taux", "Montants Ar"]],
      body: [
        ["OSTIE", "12%", "", "145 000 Ar"],
        ["CNAPS", "", "", "140 000 Ar"],
        ["FMFP (État)", "", "", "14 500 Ar"],
        ["TOTAL CHARGES PATRONALES", "", "", "295 500 Ar"],
      ],
      styles: {
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Couleur des lignes
        lineWidth: 0.1, // Épaisseur des lignes
      },
      tableLineColor: [0, 0, 0], // Couleur des bordures
      tableLineWidth: 0.5, // Épaisseur des bordures
      theme: "grid", // Applique une grille à chaque cellule
      headStyles: {
        fillColor: [180, 180, 180], // Couleur de fond de l'en-tête (gris clair)
        textColor: [0, 0, 0], // Couleur du texte de l'en-tête (noir)
        fontStyle: "bold", // Style de la police (gras)
        halign: "center", // Alignement horizontal du texte
      },
    });

    // Résumé
    doc.text(
      `TOTAL GENERAL (parts employé/employeur): 1 412 500 Ar`,
      10,
      doc.lastAutoTable.finalY + 10
    );

    // Signatures
    doc.text("Enregistrement de l'Employeur", 10, 260);
    doc.text("Enregistrement de Salarié", 150, 260);

    // Télécharger le PDF
    doc.save("bulletin_de_salaire.pdf");
    }).catch(error=>{console.log(error);})
  };

  useEffect(() => {
    getAllEmploye();
  }, []);
  return (
    <div className="overflow-x-auto">
      
      {/* Champ de recherche */}
      <div className="flex items-center mb-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Rechercher par nom, email ou poste..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Message si aucun employé trouvé */}
      {filteredList.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          Aucun employé trouvé
        </div>
      ) : (
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Poste</th>
              <th className="px-4 py-2">Salaire</th>
             {
            day==9 ? <th className="px-4 py-2">Action</th> :null
             }
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <span className="ml-2 text-sm font-semibold">
                    {row.nom || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {row.email || "Non spécifié"}
                </td>
                <td className="px-4 py-2 text-sm">
                  {row.contact || "Non spécifié"}
                </td>
                <td className="px-4 py-2 text-sm">
                  {row.postes?.nom || "Aucun poste attribué"}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span className="bg-gray-100 px-4 py-1 rounded-full text-[#027A48] font-semibold">
                    {row.salaires_brut
                      ? `${row.salaires_brut.toLocaleString("fr-FR")} Ar`
                      : "Non défini"}
                  </span>
                </td>
                {
                  day==9 ? <td className="px-4 py-2 text-sm text-center flex items-center justify-center" onClick={()=>handleGeneratePdf(row.id)}>
                  <PrinterIcon className="w-5 text-blue-600" />
                </td> : null
                }
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-primary mx-2 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
