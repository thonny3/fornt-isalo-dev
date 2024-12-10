import {
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import TableEmploye from "../../components/table/TableEmploye";
import Modal from "../../components/modal/Modal";
import test from "../../assets/test.jpg";
import Male from "../../assets/Male.png";
import Female from "../../assets/Female.png";
import DetailsEmploye from "../../components/modal/employe/DetailsEmploye";
import { useAdmin } from "../../context/AdminContext";
import { Employe } from "../../service/Employe";

export default function List() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [matricule, setmatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date_naiss, setDate_naiss] = useState("");
  const [num_cin, setNum_cin] = useState("");
  const [poste_id, setPoste_id] = useState(null);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [situation_mat, setSituation_mat] = useState("celibataire");
  const [nombre_enf, setNombre_enf] = useState(0);
  const [date_embauche, setDate_embauche] = useState("");
  const [numero_cnaps, setNumero_cnaps] = useState("");
  const [numero_omsi, setNumero_omsi] = useState("");
  const [banque, setBanque] = useState("");
  const [sexe, setSexe] = useState("");
  const [num_compte_bancaire, setNum_compte_bancaire] = useState("");
  const [salaires_brut, setSalaires_brut] = useState(null);
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState(null);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(null);

  const {
    poste,
    searchQuery,
    setSearchQuery,
    getAllEmploye,
    listEmploye,
    info,
    toast,
    getPostes,
  } = useAdmin();

  const onClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setEdit(null);
    resetForm();
  };

  const showModalDelete = (data) => {
    setOpenDelete(data);
  };

  const validateForm = () => {
    let formErrors = {
      matricule: "",
      email: "",
      nom: "",
      prenom: "",
      date_naiss: "",
      num_cin: "",
      poste_id: "",
      contact: "",
      situation_mat: "",
      date_embauche: "",
      files: "",
      numero_cnaps: "",
      numero_omsi: "",
      banque: "",
      num_compte_bancaire: "",
      salaires_brut: null,
      sexe: "",
    };
    let isValid = true;

    // Vérifier   si  maricule  vide
    if (matricule == "") {
      formErrors.matricule = "Veuillez remplir le champ  ";
      isValid = false;
    }
    // Vérifier   si  nom  vide
    if (nom == "") {
      formErrors.nom = "Veuillez remplir le champ  ";
      isValid = false;
    }
    // Vérifier   si  nom  vide
    if (prenom == "") {
      formErrors.prenom = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (date_naiss == "") {
      formErrors.date_naiss = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (num_cin == "") {
      formErrors.num_cin = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (poste_id == "") {
      formErrors.poste_id = "Veuillez remplir le champ  ";
      isValid = false;
    }
    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formErrors.email = "Veuillez entrer une adresse email valide.";
      isValid = false;
    }
    // Vérifier   si  nom  vide
    if (contact == "") {
      formErrors.contact = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (situation_mat == "") {
      formErrors.situation_mat = "Veuillez remplir le champ  ";
      isValid = false;
    }
    // Vérifier   si  nom  vide
    if (date_embauche == "") {
      formErrors.date_embauche = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (files == "") {
      formErrors.files = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier si numero_cnaps est vide ou contient des caractères non numériques
    if (numero_cnaps === "") {
      formErrors.numero_cnaps = "Veuillez remplir le champ.";
      isValid = false;
    } else if (!/^\d+$/.test(numero_cnaps)) {
      formErrors.numero_cnaps =
        "Le champ doit contenir uniquement des chiffres.";
      isValid = false;
    }

    // Vérifier si numero_omsi est vide ou contient des caractères non numériques
    if (numero_omsi === "") {
      formErrors.numero_omsi = "Veuillez remplir le champ.";
      isValid = false;
    } else if (!/^\d+$/.test(numero_omsi)) {
      formErrors.numero_omsi =
        "Le champ doit contenir uniquement des chiffres.";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (banque == "") {
      formErrors.banque = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (num_compte_bancaire == "") {
      formErrors.num_compte_bancaire = "Veuillez remplir le champ  ";
      isValid = false;
    }

    // Vérifier   si  nom  vide
    if (salaires_brut == null) {
      formErrors.salaires_brut = "Veuillez remplir le champ  ";
      isValid = false;
    }
    // Vérifier   si  sexe  vide
    if (sexe == "") {
      formErrors.sexe = "Veuillez remplir le champ  ";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      // Création des données communes sous forme d'objet
      const data = {
        matricule,
        nom,
        prenom,
        date_naiss,
        num_cin,
        email,
        contact,
        situation_mat,
        nombre_enf,
        date_embauche,
        numero_cnaps,
        numero_omsi,
        banque,
        num_compte_bancaire,
        salaires_brut,
        sexe,
        poste_id,
      };

      if (!edit) {
        // Ajout de fichiers uniquement pour un nouvel employé
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        formData.append("files", files);

        Employe.createEmploye(formData)
          .then((res) => {
            toast.success("L'employée a été ajouté avec succès !");
            getAllEmploye();
            onClose();
            console.log("xdsxqSX");
          })
          .catch((error) => console.log(error));
      } else {
        // Édition d'un employé sans fichier
        Employe.updateEmploye(edit, data)
          .then((res) => {
            toast.success("L'employée a été modifié avec succès !");
            getAllEmploye();
            onClose();
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  const deleteUser = (id) => {
    setIsLoading(true);
    Employe.deleteEmploye(id)
      .then((res) => {
        onClose();
        toast.success("Le poste a été supprimé !");
        getAllEmploye();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ShowEdit = (data) => {
    setmatricule(data.matricule || "");
    setNom(data.nom || "");
    setPrenom(data.prenom || "");
    setDate_naiss(data.date_naiss || "");
    setNum_cin(data.num_cin || "");
    setPoste_id(data.poste_id || null);
    setEmail(data.email || "");
    setContact(data.contact || "");
    setSituation_mat(data.situation_mat || "celibataire");
    setNombre_enf(data.nombre_enf || 0);
    setDate_embauche(data.date_embauche || "");
    setNumero_cnaps(data.numero_cnaps || "");
    setNumero_omsi(data.numero_omsi || "");
    setBanque(data.banque || "");
    setNum_compte_bancaire(data.num_compte_bancaire || "");
    setSalaires_brut(data.salaires_brut || null);
    setSexe(data.sexe || "");
    setFiles(data.files || null);
  };

  const resetForm = () => {
    setmatricule("");
    setNom("");
    setPrenom("");
    setDate_naiss("");
    setNum_cin("");
    setPoste_id(null);
    setEmail("");
    setContact("");
    setSituation_mat("");
    setNombre_enf(0);
    setDate_embauche("");
    setNumero_cnaps("");
    setNumero_omsi("");
    setBanque("");
    setNum_compte_bancaire("");
    setSalaires_brut(null);
    setSexe("");
    setFiles(null);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllEmploye();
    getPostes();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="flex items-center  ">
          <span className="text-secondary text-gray-700 text-4xl font-bold">
            Liste des Employés
          </span>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
              {listEmploye.length || 0}
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div className="">
            {" "}
            <span className="text-md text-gray-500  ">
              Consultez et gérez les informations des employés.
            </span>
          </div>
          <div className="add_employe">
            <button
              className="flex items-center btn-primary"
              onClick={() => setOpen(true)}
            >
              <PlusCircleIcon className="w-5 h-5 text-white" />
              <span className="text-md pl-1">Ajouter un employé</span>
            </button>
          </div>
        </div>
        <div className=" mt-5">
          <TableEmploye
            showModalDelete={showModalDelete}
            ShowEdit={ShowEdit}
            setEdit={setEdit}
            setOpen={setOpen}
          />
        </div>
        <Modal open={open} onClose={onClose}>
          <div className="titre mt-8 text-secondary font-semibold text-2xl text-center">
            {edit ? "Modifier" : "  Création "} employé
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="card-form mt-5  ">
              <div className="form flex ">
                <div className="formulaire flex ml-10">
                  <div className="form1">
                    <div className="form-group">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Matricule{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.matricule && "border-red-600"
                        }`}
                        placeholder="Entrez le Matricule "
                        value={matricule}
                        onChange={(e) => setmatricule(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2 ">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Nom{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.nom && "border-red-600"
                        }`}
                        placeholder="Entrez le Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Prénom{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.prenom && "border-red-600"
                        }`}
                        placeholder="Entrez le Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Date de Naissance{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control w-full h-10 ${
                          errors.date_naiss && "border-red-600"
                        }`}
                        value={date_naiss}
                        onChange={(e) => setDate_naiss(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        N° de CIN{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.num_cin && "border-red-600"
                        }`}
                        placeholder="Entrez le CIN"
                        value={num_cin}
                        onChange={(e) => setNum_cin(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Poste{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <select
                        name=""
                        id=""
                        className={`form-control w-full h-10 ${
                          errors.poste_id && "border-red-600"
                        }`}
                        value={poste_id}
                        onChange={(e) => setPoste_id(e.target.value)}
                      >
                        <option value="">Selectionnez le poste</option>
                        {poste.map((row, index) => (
                          <option key={index} value={row.id}>
                            {row.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form2 ml-8">
                    <div className="form-group">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Email{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.email && "border-red-600"
                        }`}
                        value={email}
                        placeholder="Entrez Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Contact{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-full h-10 ${
                          errors.contact && "border-red-600"
                        }`}
                        value={contact}
                        placeholder="Entrez le Contact"
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Situation Matrimoniale{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <select
                        name=""
                        id=""
                        className={`form-control w-full h-10 ${
                          errors.situation_mat && "border-red-600"
                        }`}
                        value={situation_mat}
                        onChange={(e) => setSituation_mat(e.target.value)}
                      >
                        <option value="">Selectionnez</option>
                        <option value="Celibataire">Célibataire</option>
                        <option value="Marie">Marié</option>
                      </select>
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Nombre d'enfant
                      </label>
                      <input
                        type="number"
                        className="form-control w-full h-10"
                        placeholder="Entrez le nombre d'enfant"
                        value={nombre_enf}
                        onChange={(e) => setNombre_enf(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Date d'embauche{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control w-full h-10 ${
                          errors.date_embauche && "border-red-600"
                        }`}
                        value={date_embauche}
                        placeholder="Entrez le Nom"
                        onChange={(e) => setDate_embauche(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Document{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control w-full h-10 ${
                          errors.files && "border-red-600"
                        }`}
                        placeholder="Entrez le Nom"
                        onChange={(e) => {
                          setFiles(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form3 ml-8">
                    <div className="form-group">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Numéro CNAPS{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-[80%] h-10 ${
                          errors.numero_cnaps && "border-red-600"
                        }`}
                        placeholder="Entrez le Numéro  CNAPS"
                        value={numero_cnaps}
                        onChange={(e) => setNumero_cnaps(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Numéro Omsi{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-[80%] h-10 ${
                          errors.numero_omsi && "border-red-600"
                        }`}
                        placeholder="Entrez le Numéro Omsi"
                        value={numero_omsi}
                        onChange={(e) => setNumero_omsi(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2 ">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Banque{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className={`form-control w-[80%] h-10 ${
                            errors.banque && "border-red-600"
                          }`}
                          placeholder="Entrez le Banque"
                          value={banque}
                          onChange={(e) => setBanque(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Numéro du compte{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control w-[80%] h-10 ${
                          errors.num_compte_bancaire && "border-red-600"
                        }`}
                        placeholder="Entrez le numéro du compte"
                        value={num_compte_bancaire}
                        onChange={(e) => setNum_compte_bancaire(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="" className="text-sm text-gray-700">
                        Salaire Brute{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control w-[80%] h-10 ${
                          errors.salaires_brut && "border-red-600"
                        }`}
                        placeholder="Entrez le salaire"
                        value={salaires_brut}
                        onChange={(e) => setSalaires_brut(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="">
                        Sexe <span className="text-red-500">*</span>
                      </label>
                      <br />
                      <select
                        name=""
                        id=""
                        className="w-[80%] h-10 form-control"
                        value={sexe}
                        onChange={(e) => setSexe(e.target.value)}
                      >
                        <option value="">Selectionner le sexe</option>
                        <option value="F">Femme</option>
                        <option value="M">Homme</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boutton flex justify-end mt-5">
                <button className="btn" type="button" onClick={onClose}>
                  Annuler
                </button>
                <button className="btn-primary px-5 ml-5" type="submit">
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
                  ) : edit ? (
                    "Modifier"
                  ) : (
                    "Ajouter"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Modal>
        {/****************************Modal  for  delete employe ********************************** */}
        <Modal open={openDelete} onClose={onClose}>
          <div className="modal-content mt-5 ">
            <div className="image flex justify-center">
              {info.sexe == "F" ? (
                <img src={Female} alt="" className="w-28 h-28" />
              ) : (
                <img src={Male} alt="" className="w-28 h-28" />
              )}
            </div>
            <div className="w-96">
              <p className="text-center font-semibold text-lg ">
                Êtes-vous sûr de vouloir supprimer <br /> [{info.nom}]
              </p>
            </div>
            <div className="boutton text-center mt-3">
              <button className="btn" onClick={onClose}>
                Annuler
              </button>
              <button
                className="btn-danger ml-3"
                onClick={() => deleteUser(info.id)}
                disabled={isLoading}
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
        {/****************************Modal  for  view employe ********************************** */}
        <DetailsEmploye />
      </div>
    </>
  );
}
