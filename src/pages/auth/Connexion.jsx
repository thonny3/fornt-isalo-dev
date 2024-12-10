import React, { useState } from "react";
import isaloImage from "../../assets/isalo.png";
import logo from "../../assets/Ramirandava.png";
import ModalForgout from "../../components/modal/ModalForgout";
import PassordForgot from "./PassordForgot";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { serviceCount } from "../../service/Service";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";

export default function Connexion() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour la visibilité du mot de passe
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toast } = useAdmin();

  const validateForm = () => {
    let formErrors = { email: "", password: "" };
    let isValid = true;

    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formErrors.email = "Veuillez entrer une adresse email valide.";
      isValid = false;
    }

    // Vérifier la longueur du mot de passe
    if (password.length < 4) {
      formErrors.password =
        "Le mot de passe doit comporter au moins 4 caractères.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors({ email: "", password: "" });
      setIsLoading(true);
      serviceCount
        .login({ email: email, password: password })
        .then((res) => {
          if (res.status === 200) {
            const user = res.data.user;
            const token = res.data.token;
            // Enregistrer dans sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);
            setUser(user);
            navigate("/admin");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            toast.error("Email ou mot de passe incorrect");
          } else {
            console.log("An unexpected error occurred:", error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div
  className="h-screen relative bg-no-repeat bg-cover bg-center flex justify-center items-center"
  style={{ backgroundImage: `url(${isaloImage})` }}
>
  {/* Overlay sombre */}
  <div className="absolute inset-0 bg-black bg-opacity-15"></div>

  <div className="relative w-full max-w-md px-4 sm:px-6 md:px-8">
    {/* Background gradient with blur added */}
    <div className="card-form shadow-2xl bg-gradient-to-b from-white to-white/35 border border-white/80 rounded-lg px-5 py-6">
      <div className="logo flex justify-center items-center pt-8">
        <img src={logo} alt="logo" className="w-36" />
      </div>
      <div className="form py-2">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-primary">Toiles d'Isalo</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="form-group mt-5">
            <label htmlFor="email" className="text-secondary font-semibold">
              E-mail
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Entrez votre email"
                className={`form-control w-full rounded-md bg-transparent placeholder:text-sm placeholder:text-secondary ${
                  errors.email && "border-red-600"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute inset-y-0 right-3 flex items-center top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                <EnvelopeIcon className="h-5 w-5 text-secondary" />
              </span>
            </div>
            {/* Message d'erreur pour l'email */}
            {errors.email && (
              <p className="text-red-600 mt-2 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="form-group mt-5">
            <label htmlFor="password" className="text-secondary font-semibold">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                className={`form-control w-full rounded-md bg-transparent placeholder:text-sm placeholder:text-secondary ${
                  errors.password && "border-red-600"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeIcon className="h-5 w-5 text-secondary" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-secondary" />
                )}
              </span>
            </div>
            {/* Message d'erreur pour le mot de passe */}
            {errors.password && (
              <p className="text-red-600 mt-2 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mx-10 mt-5">
            <button
              type="submit"
              className={`btn-primary w-full dark:focus:ring-red-800 ml-2 px-4 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
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
                "Connexion"
              )}
            </button>
          </div>
          <p
            className="pt-2 text-center cursor-pointer text-sm text-secondary"
            onClick={() => setOpen(true)}
          >
            Mot de passe oublié ?
          </p>
        </form>
      </div>
    </div>
  </div>
</div>


      <ModalForgout open={open} onClose={() => setOpen(false)}>
        <PassordForgot />
      </ModalForgout>
    </>
  );
}
