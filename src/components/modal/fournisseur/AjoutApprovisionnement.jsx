import React, { useState, useCallback, useEffect } from "react";
import Modal from "../Modal";
import { useFournisseur } from "../../../context/FournisseurContext";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useProduit } from "../../../context/ProduitContext";
import { useAdmin } from "../../../context/AdminContext";
import { Approvisionement } from "../../../service/Approvisonement";
import Select from "react-select";
import { useAuth } from "../../../context/AuthContext";

export default function AjoutApprovisionnement() {
  const {
    toast,
    listFournisseurs,
    listEmploye,
    getAllEmploye,
    etatStock,
    magasin,
    vitrine,
    tiko,
  } = useAdmin();

  const { getVenteRami, getVenteToiles, historyTranfertToils,getMagasinTranfert } = useProduit();
  const { user } = useAuth();
  const {
    open,
    onclose,
    setOpen,
    getAllApprovisionement,
    getAllApprovisionementRami,
    lieu,
    setLieu,
    activeSection,
    setActiveSection,
  } = useFournisseur();
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [raison, SetRaison] = useState("");
  const [panier, setPanier] = useState([]);

  const [stockage, setStockage] = useState(null);
  const [idFourn, setIdfourni] = useState(null);
  const { listProduit } = useProduit();
  const [stockDes, setStockDes] = useState(null);
  const [stockSource, setStockSource] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#ccc",
      borderRadius: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4A90E2" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  // Handle product change and set price accordingly
  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setProduitId(selectedProductId);

    const selectedProduct = listProduit.find(
      (prod) => String(prod.id) === String(selectedProductId)
    );

    if (selectedProduct) {
      setPrix(selectedProduct.prix);
    } else {
      setPrix("");
    }
  };

  // Handle adding product to cart
  const handleAddToCart = useCallback(() => {
    if (!produitId || !quantite || !prix) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    const produitDejaDansPanier = panier.some(
      (item) => String(item.produit_id) === String(produitId)
    );

    if (produitDejaDansPanier) {
      toast.error("Le produit est déjà dans le panier !");
    } else {
      if (listProduit != null) {
        const produitInfo = listProduit.find(
          (prod) => String(prod.id) === String(produitId)
        );
        if (produitInfo) {
          setPanier([
            ...panier,
            { produit_id: produitId, nom: produitInfo.nom, quantite, prix },
          ]);
          setProduitId("");
          setQuantite("");
          setPrix("");
        }
      }
    }
  }, [produitId, quantite, prix, panier, listProduit, toast]);

  // Handle removing product from cart
  const handleRemoveFromCart = (index) => {
    setPanier(panier.filter((_, i) => i !== index));
  };

  // Handle validation of the approvisionnement
  const handleValidation = () => {
    // Validation pour les cas autres que "venteRami" et "tranfertToiles", "tranfertRami"
    if (
      lieu !== "venteRami" &&
      lieu !== "tranfertToiles" &&
      lieu !== "tranfertRami" &&
      (!idFourn || panier.length === 0)
    ) {
      toast.error(
        "Veuillez sélectionner un fournisseur et ajouter des produits !"
      );
      return;
    }

    if (lieu === "venteRami" && panier.length === 0) {
      toast.error("Veuillez ajouter des produits !");
      return;
    }

    const totalAmount = panier.reduce(
      (total, item) => total + item.quantite * item.prix,
      0
    );

    if (lieu === "Ramirandava") {
      Approvisionement.createApprovisionementRami({
        fournisseur_id: idFourn,
        montant_approvisionnement: totalAmount,
        stock_id: stockage,
        produits: panier,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setStockage("");
          setPanier([]);
          setOpen(false);
          getAllApprovisionementRami();
        })
        .catch((error) => {
          toast.error("Quantité insuffisante pour le produit.");
        });
    } else if (lieu === "toiles") {
      Approvisionement.createApprovisionement({
        fournisseur_id: idFourn,
        montant_approvisionnement: totalAmount,
        stockage: lieu === "Ramirandava" ? stockage : null,
        produits: panier,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          setOpen(false);
          getAllApprovisionement();
        })
        .catch((error) => {
          toast.error("Quantité insuffisante pour le produit.");
        });
    } else if (lieu === "venteIsalo") {
      Approvisionement.createVenteToiles({
        employe_id: idFourn,
        valeur_sortie: totalAmount,
        produits: panier,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          setOpen(false);
          getVenteToiles();
        })
        .catch((error) => {
          toast.error("Quantité insuffisante pour le produit.");
        });
    } else if (lieu === "venteRami") {
      Approvisionement.createVentesRami({
        employe_id: user.id,
        montant_total: totalAmount,
        produits: panier,
        stock_id: stockage,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          setOpen(false);
          getVenteRami();
        })
        .catch((error) => {
          toast.error("Quantité insuffisante pour le produit.");
        });
    } else if (lieu === "tranfertRami") {
      console.log({
        source_id: stockSource,
        produits: panier,
        destination_id: stockDes,
      });
      Approvisionement.tranfertStock({
        source_id: stockSource,
        produits: panier,
        destination_id: stockDes,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          getMagasinTranfert()
          setActiveSection("magasin");
          setOpen(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        });
    } else if (lieu === "tranfertToiles") {
      Approvisionement.tranfertStock({
        source_id: stockSource,
        produits: panier,
        destination_id: stockDes,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          setOpen(false);
          historyTranfertToils();
          getMagasinTranfert();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        });
    }
  };

  const productOptions = listProduit
    ? listProduit.map((row) => ({
        value: row.id,
        label: row.nom,
      }))
    : [];

    const stocksOptions = listProduit
    ? etatStock
        .filter((row) => row.produit && row.produit.id && row.produit.nom) // Filtrer les éléments valides
        .map((row) => ({
          value: row.produit.id,
          label: row.produit.nom,
        }))
    : [];
    
  const stocksVitrineOptions = listProduit
    ? vitrine.map((row) => ({
        value: row.produit.id,
        label: row.produit.nom,
      }))
    : [];

  const stocksMagasinOptions = listProduit
    ? magasin.map((row) => ({
        value: row.produit.id,
        label: row.produit.nom,
      }))
    : [];

  const stocksTikoOptions = listProduit
    ? tiko.map((row) => ({
        value: row.produit.id,
        label: row.produit.nom,
      }))
    : [];

  const totalAmount = panier.reduce(
    (total, item) => total + item.quantite * item.prix,
    0
  );

  const employeOptions = listEmploye.map((row) => ({
    value: row.id,
    label: row.nom,
  }));
  console.log("Options pour react-select:", employeOptions);

  const liststocks = [
    { id: 1, nom: "Stock Vitrine" },
    { id: 2, nom: "Stock Magasin" },
    { id: 3, nom: "Stock Tiko" },
    { id: 4, nom: "Stock Toiles" },
  ];

  useEffect(() => {
    getAllEmploye();
    getVenteToiles();
  }, []);

  return (
    <Modal open={open} onClose={onclose}>
      <div className="titre">
        {(lieu === "Ramirandava" || lieu === "toiles") && (
          <h1 className="text-2xl font-semibold mt-5 border-b border-gray-200 w-fit">
            Approvisionnement
          </h1>
        )}

        {(lieu === "venteIsalo" || lieu === "venteRami") && (
          <h1 className="text-2xl font-semibold mt-5 border-b border-gray-200 w-fit">
            Ventes
          </h1>
        )}

        {(lieu === "tranfertToiles" || lieu === "tranfertRami") && (
          <h1 className="text-2xl font-semibold mt-5 border-b border-gray-200 w-fit">
            Transfert de stock
          </h1>
        )}
      </div>

      <div className="contenu mt-5">
        <div className="flex items-center space-x-5">
          {lieu == "venteIsalo" && (
            <div className="form-4">
              <label htmlFor="">Nom d'employées</label>
              <br />
              <Select
                className="w-[270px]"
                options={employeOptions}
                onChange={(selectedOption) =>
                  setIdfourni(selectedOption?.value)
                }
                placeholder="Sélectionnez un employé"
              />
            </div>
          )}

          {lieu == "Ramirandava" && (
            <div className="form-4">
              <label htmlFor="">Nom du Fournisseur</label>
              <br />
              <Select
                className="w-[270px]"
                options={listFournisseurs.map((row) => ({
                  value: row.id,
                  label: row.nom,
                }))}
                onChange={(selectedOption) =>
                  setIdfourni(selectedOption?.value)
                }
                placeholder="Sélectionnez un fournisseur"
              />
            </div>
          )}

          {lieu === "tranfertToiles" && (
            <div className="form-4">
              <label htmlFor="">Source</label>
              <br />
              <Select
                className="w-[270px]"
                options={liststocks
                  .filter((row) => row.nom === "Stock Toiles") // Filtrer uniquement "Stock Toiles"
                  .map((row) => ({
                    value: row.id,
                    label: row.nom,
                  }))}
                onChange={(selectedOption) =>
                  setStockSource(selectedOption?.value)
                }
                placeholder="Sélectionnez un stock"
              />
            </div>
          )}

          {lieu === "tranfertToiles" && (
            <div className="form-4">
              <label htmlFor="">Destination</label>
              <br />
              <Select
                className="w-[270px]"
                options={liststocks
                  .filter((row) => row.nom !== "Stock Toiles") // Exclure "Stock Toiles"
                  .map((row) => ({
                    value: row.id,
                    label: row.nom,
                  }))}
                onChange={(selectedOption) =>
                  setStockDes(selectedOption?.value)
                }
                placeholder="Sélectionnez un stock"
              />
            </div>
          )}

          {lieu === "tranfertRami" && (
            <div className="form-4">
              <label htmlFor="">Source</label>
              <br />
              <Select
                className="w-[270px]"
                options={liststocks
                  .filter((row) => row.nom !== "Stock Toiles") // Exclure "Stock Toiles"
                  .map((row) => ({
                    value: row.id,
                    label: row.nom,
                  }))}
                onChange={(selectedOption) =>
                  setStockSource(selectedOption?.value)
                }
                placeholder="Sélectionnez un stock"
              />
            </div>
          )}

          {lieu === "tranfertRami" && (
            <div className="form-4">
              <label htmlFor="">Destination</label>
              <br />
              <Select
                className="w-[270px]"
                options={[
                  ...liststocks
                    .filter(
                      (row) =>
                        row.nom !== "Stock Toiles" && row.id !== stockSource // Exclure le stock sélectionné dans "Source"
                    )
                    .map((row) => ({
                      value: row.id,
                      label: row.nom,
                    })),
                  { value: 4, label: "Stock Toiles" }, // Ajouter "Stock Toiles" comme option fixe
                ]}
                onChange={(selectedOption) =>
                  setStockDes(selectedOption?.value)
                }
                placeholder="Sélectionnez un stock"
              />
            </div>
          )}

          {lieu == "toiles" && (
            <div className="form-4">
              <label htmlFor="">Nom du Fournisseur</label>
              <br />
              <Select
                className="w-[270px]"
                options={listFournisseurs.map((row) => ({
                  value: row.id,
                  label: row.nom,
                }))}
                onChange={(selectedOption) =>
                  setIdfourni(selectedOption?.value)
                }
                placeholder="Sélectionnez un fournisseur"
              />
            </div>
          )}
          {lieu === "Ramirandava" && (
            <div>
              <label htmlFor="stockage">
                Stockage <span className="text-red-500">*</span> <br />
              </label>
              <Select
                className="w-[280px]"
                options={[
                  { value: 1, label: "Stock Vitrine" },
                  { value: 2, label: "Stock Magasin" },
                  { value: 3, label: "Stock TIKO" },
                ]}
                onChange={(selectedOption) =>
                  setStockage(selectedOption?.value)
                }
                placeholder="Sélectionnez lieu du stockage"
              />
            </div>
          )}

          {lieu === "venteRami" && (
            <div>
              <label htmlFor="stockage">
                Stockage <span className="text-red-500">*</span> <br />
              </label>
              <Select
                className="w-[280px]"
                options={[
                  { value: 1, label: "Stock Vitrine" },
                  { value: 2, label: "Stock Magasin" },
                  { value: 3, label: "Stock TIKO" },
                ]}
                onChange={(selectedOption) =>
                  setStockage(selectedOption?.value)
                }
                placeholder="Sélectionnez lieu du stockage"
              />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-between items-center space-x-10"
        >
          <div className="form-group flex items-center space-x-5 mt-5">
            {(lieu == "toiles" || lieu == "Ramirandava") && (
              <div className="form1">
                <label>
                  Nom du Produit <span className="text-red-500">*</span>
                </label>
                <br />
                <Select
                  value={productOptions.find(
                    (option) => option.value === produitId
                  )}
                  onChange={(selectedOption) => {
                    setProduitId(selectedOption?.value || ""); // Met à jour `produitId`
                    handleProductChange({
                      target: { value: selectedOption?.value || "" },
                    }); // Appelle la fonction existante
                  }}
                  options={productOptions}
                  className=" w-[250px]"
                  placeholder="Sélectionnez un produit"
                />
                ;
              </div>
            )}

            {(lieu == "venteIsalo" || lieu == "tranfertToiles") && (
              <div className="form1">
                <label>
                  Nom du stock <span className="text-red-500">*</span>
                </label>
                <br />
                <Select
                  value={stocksOptions.find(
                    (option) => option.value === produitId
                  )}
                  onChange={(selectedOption) => {
                    setProduitId(selectedOption?.value || ""); // Met à jour `produitId`
                    handleProductChange({
                      target: { value: selectedOption?.value || "" },
                    }); // Appelle la fonction existante
                  }}
                  options={stocksOptions}
                  className="w-[250px]"
                  placeholder="Sélectionnez un produit"
                />
              </div>
            )}
            {(lieu === "venteRami" || lieu === "tranfertRami") &&
              (stockage === 1 || stockSource === 1 ? (
                <div className="form1">
                  <label>
                    Nom du stock vitrine <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <Select
                    value={stocksVitrineOptions.find(
                      (option) => option.value === produitId
                    )}
                    onChange={(selectedOption) => {
                      setProduitId(selectedOption?.value || ""); // Met à jour `produitId`
                      handleProductChange({
                        target: { value: selectedOption?.value || "" },
                      }); // Appelle la fonction existante
                    }}
                    options={stocksVitrineOptions}
                    className="w-[250px]"
                    placeholder="Sélectionnez un produit"
                  />
                </div>
              ) : stockage === 2 || stockSource === 2 ? (
                <div className="form1">
                  <label>
                    Nom du stock magasin <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <Select
                    value={stocksMagasinOptions.find(
                      (option) => option.value === produitId
                    )}
                    onChange={(selectedOption) => {
                      setProduitId(selectedOption?.value || ""); // Met à jour `produitId`
                      handleProductChange({
                        target: { value: selectedOption?.value || "" },
                      }); // Appelle la fonction existante
                    }}
                    options={stocksMagasinOptions}
                    className="w-[250px]"
                    placeholder="Sélectionnez un produit"
                  />
                </div>
              ) : stockage === 3 || stockSource === 3 ? (
                <div className="form1">
                  <label>
                    Nom du stock tiko <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <Select
                    value={stocksTikoOptions.find(
                      (option) => option.value === produitId
                    )}
                    onChange={(selectedOption) => {
                      setProduitId(selectedOption?.value || ""); // Met à jour `produitId`
                      handleProductChange({
                        target: { value: selectedOption?.value || "" },
                      }); // Appelle la fonction existante
                    }}
                    options={stocksTikoOptions}
                    className="w-[250px]"
                    placeholder="Sélectionnez un produit"
                  />
                </div>
              ) : null)}

            <div className="form2">
              <label>
                Quantité <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
                className="form-control w-[250px] h-10"
                placeholder="Entrer la quantité"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex btn-primary items-center text-sm"
          >
            <ShoppingCartIcon className="w-5" />
            <span className="ml-2">Ajouter</span>
          </button>
        </form>

        <div className="panier ">
          <h2 className="font-semibold">Panier</h2>
          <div className="mt-5 border border-gray-300 overflow-y-auto max-h-[200px]">
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr className="text-left">
                  <th className="p-3 border border-gray-300">Produit</th>
                  <th className="p-3 border border-gray-300 text-center">
                    Quantité
                  </th>
                  <th className="p-3 border border-gray-300 text-right">
                    Prix (Ar)
                  </th>
                  <th className="p-3 border border-gray-300 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {panier.length > 0 ? (
                  panier.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 text-sm"
                    >
                      <td className="p-3">{item.nom}</td>
                      <td className="p-3 text-center">{item.quantite}</td>
                      <td className="p-3 text-right">{item.prix} Ar</td>
                      <td className="p-3 text-right">
                        <TrashIcon
                          className="w-5 h-5 text-red-500 cursor-pointer inline"
                          onClick={() => handleRemoveFromCart(index)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      Aucun produit dans le panier
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="total-amount mt-2 flex justify-end text-lg font-semibold">
            Total: {totalAmount} Ar
          </div>
        </div>

        <div className="botton flex justify-end mt-2 space-x-20 items-center">
          <div className="mt-2">
            <button className="btn" onClick={onclose}>
              Annuler
            </button>
            <button className="btn-primary ml-5" onClick={handleValidation}>
              Valider
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
