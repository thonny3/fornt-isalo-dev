import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Cog, LogOut, User } from "lucide-react";
import Female from "../../assets/Female.png";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { app } = useAdmin();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isToilesChecked, setIsToilesChecked] = useState(false);

  // Fonction pour gérer le clic à l'extérieur du menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="header flex justify-between shadow-sm items-center px-8 py-4 bg-white">
       <div className="flex items-center justify-center">
    {/***  <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isToilesChecked}
          onChange={() => setIsToilesChecked(!isToilesChecked)}
        />
        <div className="relative w-20 h-10 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600">
          <div
            className={`absolute inset-y-0 left-0 w-10 h-10 bg-white rounded-full transition-transform ${
              isToilesChecked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {isToilesChecked ? 'Toiles d\'Isalo' : 'Ramirandava'}
        </span>
      </label> */}
    </div>
      <div className="flex items-center space-x-4 mr-5">
        <div className="photo flex items-center relative" ref={dropdownRef}>
          <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-100 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <ChevronDown
            className="mt-5 cursor-pointer"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 py-2 z-10">
              <button className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100">
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>

              <button className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100">
                <Cog className="w-5 h-5" />
                <span>Paramètres</span>
              </button>

              <button
                className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
