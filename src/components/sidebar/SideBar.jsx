import React, { useState } from "react";
import {
  Home,
  Users,
  Bed,
  Truck,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronDownIcon,
  ChevronUpIcon,
  Box,
  Briefcase,
  List,
  Calendar,
  BedSingle,
  CalendarCheck,
  PackageCheck,
  User2Icon,
  ArrowLeftRight,
  DollarSign,
  Building,
  FileText 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import Ramirandava from "../../assets/Ramirandava.png";
import Toiles from "../../assets/Toiles.png";
const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  hasChildren,
  isOpen,
  onClick,
  indent = false,
  to,
}) => (
  <Link to={to}>
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-2 rounded-lg ${
        isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
      } ${indent ? "pl-8 text-sm" : "text-base"}`}
    >
      {Icon ? (
        <Icon size={20} className="mr-2" />
      ) : (
        <div
          className={`w-2 h-2 mr-2 rounded-full ${
            isActive ? "bg-white" : "bg-gray-500"
          }`}
        ></div>
      )}
      <span>{label}</span>
      {hasChildren && (
        <span className="ml-auto">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </button>
  </Link>
);

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    employes: false,
    toils: false,
    ramirandava: false,
  });
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = useState(true);
  const { app, setApp } = useAdmin();
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleItemClick = (item, menu = null) => {
    setActiveItem(item);
    if (menu) toggleMenu(menu);
  };

  const changeApp = (data) => {
    if (data === "toils") {
      setApp("toils");
      setOpen(true);
    } else if (data === "ramirandava") {
      setApp("ramirandava");
      setOpen(true);
    }
  };

  const changeToApp = (nomHotel) => {
    changeApp(nomHotel);
    setActiveItem("");
    navigate("/admin");
    setOpenMenus({
      employes: false,
      toils: false,
      ramirandava: false,
    });
  };
  return (
    <div className="flex flex-col h-full bg-white shadow-lg relative max-h-screen sidebar ">
      {/* Profile Section */}
      <div className="p-4 flex items-center space-x-3 border-b shadow-sm relative">
        <div className="w-32 ml-8 rounded-md overflow-hidden h-20">
          {app == "toils" ? (
            <img src={Toiles} alt="Profile" className="h-full w-full" />
          ) : (
            <img src={Ramirandava} alt="Profile" className="h-full w-full" />
          )}
        </div>
        <div>
          <span onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronDownIcon className="absolute right-1 text-gray-700" />
            ) : (
              <ChevronUpIcon className="absolute right-1 text-gray-700" />
            )}
          </span>
        </div>
      </div>

      {/* Popup */}
      <div
        className={`w-full rounded-md shadow-lg absolute h-28 bg-gray-100 px-2 py-2 top-20 duration-200 ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {app === "toils" ? (
          <button
            className="mt-5 w-full flex items-center px-2 py-2 rounded-md hover:bg-primary hover:text-white"
            onClick={() => changeToApp("ramirandava")}
          >
            <Building2 size={20} className="mr-2" />
            <span> Ramirandava</span>
          </button>
        ) : (
          <button
            className="mt-5 w-full flex items-center px-2 py-2 rounded-md hover:bg-primary hover:text-white"
            onClick={() => changeToApp("toils")}
          >
            <Building2 size={20} className="mr-2" />
            <span> Toils d'Isalo</span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3 pb-5 overflow-y-auto h-auto ">
        <SidebarItem
          icon={Home}
          label="Dashboard"
          to="home"
          isActive={activeItem === "dashboard"}
          onClick={() => handleItemClick("dashboard")}
        />
        {/* Emplois Section */}
        <SidebarItem
          icon={Users}
          label="Employees"
          hasChildren={true}
          isOpen={openMenus.employes}
          onClick={() => toggleMenu("employes")}
        />

        {openMenus.employes && (
          <div className="pl-6">
            <SidebarItem
              icon={Briefcase}
              to="poste"
              label="Postes"
              indent={true}
              isActive={activeItem === "postes"}
              onClick={() => handleItemClick("postes")}
            />
            <SidebarItem
              icon={List}
              to="list"
              label="Listes"
              indent={true}
              isActive={activeItem === "listes"}
              onClick={() => handleItemClick("listes")}
            />
            <SidebarItem
              icon={Calendar}
              to="conge"
              label="Congé"
              indent={true}
              isActive={activeItem === "conge"}
              onClick={() => handleItemClick("conge")}
            />
            <SidebarItem
              icon={DollarSign}
              to="transaction"
              label="Transactions"
              indent={true}
              isActive={activeItem === "transactions"}
              onClick={() => handleItemClick("transactions")}
            />
             <SidebarItem
              icon={FileText }
              to="fiche"
              label="Fiche de Paie"
              indent={true}
              isActive={activeItem === "fiche"}
              onClick={() => handleItemClick("fiche")}
            />
            
          </div>
        )}

        <SidebarItem
          icon={Building}
          label="Banque"
          to="banque"
          isActive={activeItem === "banque"}
          onClick={() => handleItemClick("banque")}
        />

        <SidebarItem
          icon={Box}
          to="produit"
          label="Produits"
          isActive={activeItem === "produits"}
          onClick={() => handleItemClick("produits")}
        />

        <SidebarItem
          icon={Truck}
          to="fournisseur"
          label="Fournisseurs"
          isActive={activeItem === "fournisseurs"}
          onClick={() => handleItemClick("fournisseurs")}
        />
        {app === "toils" ? (
          <>
            <SidebarItem
              icon={PackageCheck}
              to="stock-toil"
              label="Stocks"
              isActive={activeItem === "stock-toil"}
              onClick={() => handleItemClick("stock-toil")}
            />
            <SidebarItem
              icon={PackageCheck}
              to="approvisement-isalo"
              label="Approvisionnement"
              isActive={activeItem === "Approvisionnement-isalo"}
              onClick={() => handleItemClick("Approvisionnement-isalo")}
            />
            <SidebarItem
              icon={ArrowLeftRight}
              to="trafert-stocks"
              label="Tranfert stocks"
              isActive={activeItem === "tranfert"}
              onClick={() => handleItemClick("tranfert")}
              className="mt-auto"
            />

            <SidebarItem
              icon={PackageCheck}
              to="vente-toiles"
              label="Ventes"
              isActive={activeItem === "vente-toiles"}
              onClick={() => handleItemClick("vente-toiles")}
            />

            <SidebarItem
              icon={User2Icon}
              to="clients"
              label="Clients"
              isActive={activeItem === "clients"}
              onClick={() => handleItemClick("clients")}
            />

            <SidebarItem
              icon={BedSingle}
              to="chambres"
              label="Chambres"
              isActive={activeItem === "chambres"}
              onClick={() => handleItemClick("chambres")}
            />
            <SidebarItem
              icon={CalendarCheck}
              to="reservation"
              label="Réservations"
              isActive={activeItem === "reservations"}
              onClick={() => handleItemClick("reservations")}
            />
            <SidebarItem
              icon={Bed}
              to="sejour"
              label="Séjour"
              isActive={activeItem === "sejour"}
              onClick={() => handleItemClick("sejour")}
            />
          </>
        ) : (
          <>
            <SidebarItem
              icon={PackageCheck}
              to="stock-rami"
              label="Stocks"
              isActive={activeItem === "stock-rami"}
              onClick={() => handleItemClick("stock-rami")}
            />

            <SidebarItem
              icon={PackageCheck}
              to="approvisement"
              label="Approvisionnement"
              isActive={activeItem === "approvisionnement"}
              onClick={() => handleItemClick("approvisionnement")}
            />
            <SidebarItem
              icon={ArrowLeftRight}
              to="trafert-stocks-Rami"
              label="Tranfert stocks"
              isActive={activeItem === "tranfert"}
              onClick={() => handleItemClick("tranfert")}
              className="mt-auto"
            />
            <SidebarItem
              icon={PackageCheck}
              to="vente-rami"
              label="Ventes"
              isActive={activeItem === "vente-rami"}
              onClick={() => handleItemClick("vente-rami")}
            />
          </>
        )}

        {/* Settings */}
        <SidebarItem
          icon={Settings}
          to={"configuration"}
          label="Configurations"
          isActive={activeItem === "configurations"}
          onClick={() => handleItemClick("configurations")}
          className="mt-auto"
        />
      </nav>
    </div>
  );
};

export default Sidebar;
