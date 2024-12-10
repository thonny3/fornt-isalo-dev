import React, { useState } from "react";
import { Trash2, Eye, EyeOff, Upload } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const App = () => {
  return (
    <div className="p-3 bg-gray-50 ">
     
      <div className="flex space-x-8 mt-2 ">
        {/* Liste des utilisateurs */}
        <div className="w-2/3 bg-white p-6 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Utilisateurs</h2>
            <input
              type="text"
              placeholder="Rechercher"
              className="border border-gray-300 rounded-md px-3 py-2 w-1/3"
            />
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Nom Complet</th>
                <th className="border-b py-2">Email</th>
                <th className="border-b py-2">Rôle</th>
                <th className="border-b py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                    AD
                  </div>
                  <span>Admin</span>
                </td>
                <td className="py-2">admin@gmail.com</td>
                <td className="py-2">Administrateur</td>
                <td className="py-2">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-100">
                <td className="py-2 flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Tenshi Han</span>
                </td>
                <td className="py-2">tenshihan@gmail.com</td>
                <td className="py-2">Utilisateur</td>
                <td className="py-2">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formulaire d'ajout d'utilisateur */}
        <div className="w-1/3 bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Ajouter une nouvelle Utilisateur
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Nom Complet*
              </label>
              <input
                type="text"
                placeholder="Entrer le Nom"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="email"
                placeholder="Entrer l'email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rôle*</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Sélectionner</option>
                <option value="admin">Administrateur</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Mot de Passe*
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Entrer un mot de passe"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 text-white py-2 rounded-md"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
