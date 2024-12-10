import React, { useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function Parametre() {
  const [active, setActive] = useState("profil");
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-8 flex">
      <div className="contenu-modifier bg-white shadow-lg p-5 w-[650px]">
        <h2 className="text-xl font-bold mb-4 text-secondary">
          Paramètre d'application
        </h2>
        <div className="container">
          <div className="flex justify-between">
            <span className="text-secondary">Profil</span>
            <button
              onClick={() => setActive("profil")}
              className={`px-4 py-2 rounded-md font-medium ${
                active === "profil"
                  ? " text-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Modifier
            </button>
          </div>
          <div className="flex justify-between mt-8">
            <span className="text-secondary">Mot de passe </span>
            <button
              onClick={() => setActive("password")}
              className={`px-4 py-2 rounded-md font-medium ${
                active === "password"
                  ? " text-primary font-bold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Modifier
            </button>
          </div>
          <div className="flex justify-between mt-8">
            <span className="text-secondary">Changer logo</span>
            <button
              onClick={() => setActive("logo")}
              className={`px-4 py-2 rounded-md font-medium ${
                active === "logo"
                  ? " text-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Modifier
            </button>
          </div>
        </div>
      </div>

      {active === "profil" && (
        <div className="contenu-form bg-white shadow-lg p-5 w-[100%] ml-8">
          <h2 className="text-xl font-bold mb-4 text-secondary text-center">
            Changer votre profil
          </h2>
          <form action="" className="px-20">
            <div className="form-group">
              <label htmlFor="">Nom utilisateur : </label> <br />
              <input
                type="text"
                className="form-control mt-2 w-[450px]"
                placeholder="Nom d'utilisateur"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="">Email : </label> <br />
              <input
                type="text"
                className="form-control mt-2 w-[450px]"
                placeholder="exemple@gmail.com"
              />
            </div>
            <div className="button mt-5">
              <button className="btn hover:bg-primary hover:text-white">
                Modifier
              </button>
            </div>
          </form>
        </div>
      )}

      {active === "password" && (
        <div className="contenu-form bg-white shadow-lg p-5 w-[100%] ml-8">
          <h2 className="text-xl font-bold mb-4 text-secondary text-center">
            Changer votre mot de passe
          </h2>
          <form action="" className="px-20">
            <div className="form-group">
              <label htmlFor="">Ancien mot de passe: </label> <br />
              <input
                type="password"
                className="form-control mt-2 w-[450px]"
                placeholder="Ancien mot de passe"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="">Nouveau mot de passe : </label> <br />
              <input
                type="password"
                className="form-control mt-2 w-[450px]"
                placeholder="Nouveau  mot de passe "
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="">Confirmez mot de passe : </label> <br />
              <input
                type="password"
                className="form-control mt-2 w-[450px]"
                placeholder="Confirmez  mot de passe "
              />
            </div>
            <div className="button mt-5">
              <button className="btn hover:bg-primary hover:text-white">
                Modifier
              </button>
            </div>
          </form>
        </div>
      )}

      {active === "logo" && (
        <div className="contenu-form bg-white shadow-lg p-5 w-[100%] ml-8">
          <h2 className="text-xl font-bold mb-4 text-secondary text-center">
            Changer votre logo
          </h2>
          <div className="flex flex-col items-center justify-center mt-5">
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 w-[200px] h-[200px] flex flex-col items-center justify-center"
            >
              {previewImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewImage}
                    alt="Prévisualisation"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <CheckCircle className="text-green-500 w-8 h-8 mt-4" />
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <UploadCloud className="text-gray-500 w-10 h-10" />
                    <span className="text-blue-500 mt-2">Importer une image</span>
                  </label>
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    Supporte PNG, JPEG, JPG, WEBP
                  </p>
                </>
              )}

            </div>
              <button className="btn mt-4 hover:bg-primary hover:text-white">Modifier</button>
          </div>
        </div>
      )}
    </div>
  );
}
