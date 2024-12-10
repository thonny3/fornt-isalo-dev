import React from "react";
import {
  Home,
  Users,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import SalesChart from "./SalesChart";
import EmployeeGenderChart from "./EmployeeGenderChart";

export default function HomeAdmin() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Carte 1 : Solde actuel */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-500" />
              Votre solde actuel
            </h3>
            <span className="text-xs text-gray-500">Compte épargne</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-4 flex items-center gap-2">
            PKR 9,250,000
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </p>
          <span className="text-sm text-gray-600">PKR</span>
        </div>

        {/* Carte 2 : Statut de l'épargne */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-500" />
              Statut de votre épargne
            </h3>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </div>
          <p className="text-2xl font-bold text-red-500 mt-4 flex items-center gap-2">
            4.28%
            <ArrowUpRight className="w-5 h-5 text-red-500" />
          </p>
          <span className="text-sm text-gray-600">
            Vos dépenses ont augmenté
          </span>
        </div>

        {/* Carte 3 : Carte de crédit */}
        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xl font-bold text-gray-800 mt-4">
            3829 4820 4629 5025
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Nom du titulaire</p>
            <p className="text-lg font-semibold flex items-center gap-2">
              Anita Rose
              <Users className="w-5 h-5 text-gray-800" />
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">Valide jusqu'au : 09/17</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
      <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
        <SalesChart />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg  h-fit">
        <EmployeeGenderChart />
      </div>
      </div>
    </>
  );
}
