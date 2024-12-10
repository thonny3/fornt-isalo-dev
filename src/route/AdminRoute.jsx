import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/layout/AdminLayout";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Role from "../pages/admin/Role";
import List from "../pages/admin/List";
import Poste from "../pages/admin/Poste";
import Transaction from "../pages/admin/Transaction";
import Remboursement from "../pages/admin/Remboursement";
import Conge from "../pages/admin/Conge";
import { CongeProvider } from "../context/CongeContext";
import Fournisseur from "../pages/admin/Fournisseur";
import { FournisseurProvider } from "../context/FournisseurContext";
import TransactionsFourni from "../pages/admin/TransactionsFourni";
import { TransactionProvider } from "../context/TransactionContext";
import Produit from "../pages/admin/Produit";
import { ProduitProvider } from "../context/ProduitContext";
import ProduitVendu from "../pages/admin/ProduitVendu";
import { PosteProvider } from "../context/PosteContext";
import Approvisement from "../pages/admin/Approvisement";
import ProduitConsome from "../pages/admin/Ramirandava/ProduitConsome";
import Approvisionement from "../pages/admin/isalo/Approvisionement";
import Chambre from "../pages/admin/isalo/Chambre";
import { ChambreProvider } from "../context/ChambreContext";
import ProduitToil from "../pages/admin/isalo/ProduitToil";
import Reservation from "../pages/admin/isalo/Reservation";
import { StockProvider } from "../context/StockContext";
import StockRami from "../pages/admin/Ramirandava/StockRami";
import Sejour from "../pages/admin/isalo/Sejour";
import Client from "../pages/admin/isalo/Client";
import { ReservationProvider } from "../context/ReservationContext";
import VenteIsalo from "../pages/admin/isalo/VenteIsalo";
import VenteRami from "../pages/admin/Ramirandava/VenteRami";
import TranferStock from "../pages/admin/TranferStock";
import Configuration from "../pages/admin/Configuration";
import Banque from "../pages/admin/Banque";
import { ClientProvider } from "../context/ClientContext";
import { BanqueProvider } from "../context/BanqueContext";
import TransfertStockRami from "../pages/admin/Ramirandava/TransfertStockRami";
import FichePaie from "../pages/admin/FichePaie";

export default function AdminRoute() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<HomeAdmin />} />
        <Route path="/home" element={<HomeAdmin />} />
        <Route path="/role" element={<Role />} />
        <Route path="/list" element={<List />} />
        <Route path="/sejour" element={<Sejour />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/fiche" element={<FichePaie/>} />
        <Route path="/banque" element={<BanqueProvider><Banque /></BanqueProvider>} />
        <Route path="/clients" element={<ClientProvider><Client /></ClientProvider>} />
        <Route path="/transaction" element={<TransactionProvider><Transaction/></TransactionProvider>} />
        <Route
          path="/trafert-stocks"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <TranferStock />
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
           <Route
          path="/trafert-stocks-Rami"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <TransfertStockRami/>
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
        <Route
          path="/vente-toiles"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <VenteIsalo />
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
        <Route
          path="/vente-rami"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <VenteRami />
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
        <Route
          path="/poste"
          element={
            <PosteProvider>
              <Poste />
            </PosteProvider>
          }
        />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/remboursement" element={<Remboursement />} />
        <Route path="/produit-vendu" element={<ProduitVendu />} />
        <Route
          path="/approvisement"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <Approvisement />
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
        <Route
          path="/approvisement-isalo"
          element={
            <FournisseurProvider>
              <ProduitProvider>
                <Approvisionement />
              </ProduitProvider>
            </FournisseurProvider>
          }
        />
        <Route
          path="/vente-fournisseur"
          element={
            <ProduitProvider>
              <ProduitConsome />
            </ProduitProvider>
          }
        />
        <Route
          path="/chambres"
          element={
            <ChambreProvider>
              <Chambre />
            </ChambreProvider>
          }
        />

        <Route
          path="/fournisseur"
          element={
            <FournisseurProvider>
              <Fournisseur />
            </FournisseurProvider>
          }
        />

        <Route
          path="/conge"
          element={
            <CongeProvider>
              <Conge />
            </CongeProvider>
          }
        />
        <Route
          path="/transaction-fournisseur"
          element={
            <TransactionProvider>
              <TransactionsFourni />
            </TransactionProvider>
          }
        />
        <Route
          path="/produit"
          element={
            <ProduitProvider>
              <Produit />
            </ProduitProvider>
          }
        />
        <Route
          path="/stock-toil"
          element={
            <StockProvider>
              <ProduitToil />
            </StockProvider>
          }
        />
        <Route
          path="/stock-rami"
          element={
            <StockProvider>
              <StockRami />
            </StockProvider>
          }
        />
        <Route
          path="/reservation"
          element={
            <ReservationProvider>
              <Reservation />
            </ReservationProvider>
          }
        />
      </Route>
    </Routes>
  );
}
