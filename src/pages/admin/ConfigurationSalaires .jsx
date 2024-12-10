import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Select from "react-select";
import { Salaire } from "../../service/Salaire";
import { useAdmin } from "../../context/AdminContext";
import Modal from "../../components/modal/Modal";
import logoDelete from "../../assets/delete.png";
const ConfigurationSalaires = () => {
  const { toast } = useAdmin();
  const [configurations, setConfigurations] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [val, setValue] = useState(null);
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const options = [
    { value: "cnaps", label: "Cnaps" },
    { value: "omsi", label: "Omsi" },
    { value: "transport", label: "Transport" },
    { value: "datePaiement", label: "Date de paiement" },
    { value: "allocationRepas", label: "Allocation repas" },
  ];
  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedOption.value === "datePaiement") {
      // Traitement pour "datePaiement"

      Salaire.createSalaire({
        nom: "Date de paiement",
        valeur: val,
        classification: 2,
        type: 2,
      })
        .then((res) => {
          toast.success("ajout avec success");
          getSalary();
          setSelectedOption("");
          setValue(null);
          console.log(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (
      selectedOption.value === "cnaps" ||
      selectedOption.value === "omsi"
    ) {
      // Traitement pour "cnaps"
      Salaire.createSalaire({
        nom: selectedOption.value == "cnaps" ? "Cnaps" : "Omsi",
        valeur: val,
        classification: 0,
        type: 1,
      })
        .then((res) => {
          toast.success("ajout avec success");
          getSalary();
          setSelectedOption("");
          setValue(null);
          console.log(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (
      selectedOption.value === "transport" ||
      selectedOption.value === "allocationRepas"
    ) {
      // Traitement pour "transport" ou "allocationRepas"
      Salaire.createSalaire({
        nom:
          selectedOption.value == "transport"
            ? "Transport"
            : "Allocation Repas",
        valeur: val,
        classification: 1,
        type: 0,
      })
        .then((res) => {
          toast.success("ajout avec success");
          getSalary();
          setSelectedOption("");
          setValue(null);
          console.log(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getSalary = () => {
    Salaire.getSalaire()
      .then((res) => {
        console.log(res.data);
        setConfigurations(res.data);
      })
      .catch((error) => {
        console.log();
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const pagesPerGroup = 3;

  // Calculate total pages
  const totalPages = Math.ceil(configurations.length / itemsPerPage);

  // Get data for the current page
  const currentData = configurations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change to a specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Next and previous page groups
  const goToNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };

  const goToPreviousGroup = () => {
    setPageGroup(pageGroup - 1);
  };

  // Generate pagination buttons in groups
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
          className={`px-4 py-2 text-sm ${
            currentPage === i
              ? "bg-blue-500 text-white"
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

  const closeModal = () => {
    setOpen(false);
  };

  const deleteSalary = () => {
    setIsLoading(true);
    Salaire.deleteSalaire(info.id)
      .then((res) => {
        toast.success("Salaire a été supprimé ");
        closeModal()
        getSalary();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getSalary();
  }, []);

  return (
    <>
      <div className="flex space-x-8 p-3">
        {/* Tableau des configurations */}
        <div className="w-2/3 bg-white p-3">
          <h2 className="text-xl font-bold mb-4">Salaire</h2>
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Part</th>
                <th className="border border-gray-300 px-4 py-2">
                  Montant (AR)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Pourcentage
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Date de Paiement
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((config, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {config.nom}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {config.type == 0 ? config.valeur : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {config.type == 1 ? config.valeur + " %" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {config.type == 2 ? config.valeur + " chaque mois" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setInfo(config);
                        setOpen(true);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-end items-center mt-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
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
              className={`px-4 py-2  mx-2 ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Formulaire de configuration */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">
            Ajouter une nouvelle Configuration
          </h2>
          <form className="space-y-4 py-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nom*</label>
              <div className="w-full max-w-sm mx-auto">
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={handleChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            {selectedOption.value == "datePaiement" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valeur *
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Entrez 1 à 30 "
                  min={1}
                  max={31}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
            )}

            {(selectedOption.value == "cnaps" ||
              selectedOption.value == "omsi") && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valeur *
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Entrez le valeur"
                  min={1}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
            )}

            {(selectedOption.value == "transport" ||
              selectedOption.value == "allocationRepas") && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Montant *
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Montant"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-orange-600 transition duration-200"
            >
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Chargement...
                </>
              ) : (
                "Enregistrer"
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Modal  delete for salary */}
      <Modal open={open} onClose={closeModal}>
        <div className="modal-content mt-5">
          <div className="image flex justify-center">
            <img src={logoDelete} alt="Delete logo" />
          </div>
          <div className="w-56">
            <p className="text-center font-semibold text-lg text-gray-700">
              {info && info.nom
                ? `Êtes-vous sûr de vouloir supprimer salaire  ${info.nom} ?`
                : "Aucun salaire  sélectionné."}
            </p>
          </div>
          <div className="boutton text-center mt-5">
            <button className="btn" onClick={closeModal} disabled={isLoading}>
              Annuler
            </button>
            <button
              type="button"
              className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2 inline-flex items-center ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              onClick={deleteSalary}
            >
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Chargement...
                </>
              ) : (
                "Supprimer"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfigurationSalaires;
