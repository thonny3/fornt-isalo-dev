import React from "react";
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import TableTransaction from "../../components/table/TableTransaction";
import { useAdmin } from "../../context/AdminContext";
import AjoutTransaction from "../../components/modal/transaction/AjoutTransaction";
import { useTransaction } from "../../context/TransactionContext";
export default function Transaction() {
  const { setOpen, listTrans } = useTransaction();
  return (
    <>
      <div className="">
        <div className="poste flex items-center">
          <span className="text-secondary text-gray-700 text-4xl">
            Historique des Transactions
          </span>
          <div className="nombre ml-2 w-8 h-5 bg-gray-200 rounded-full flex justify-center items-center">
            <span className="text-xs text-gray-800 font-semibold">
              {listTrans.length}
            </span>
          </div>
        </div>
        <div className="mt-10  flex justify-between items-center">
          <div className="search flex items-center">
            <span className="text-md text-gray-500">
              Consultez et gérez les transactions financières des employés.
            </span>
          </div>
          <div className="add_employe">
            <button
              className="flex items-center btn-primary"
              onClick={() => setOpen(true)}
            >
              <PlusCircleIcon className="w-5 h-5 text-white" />
              <span className="text-md pl-1">Ajouter une transaction</span>

            </button>
          </div>
        </div>
        <div className="liste-transaction mt-5">
          <TableTransaction />
        </div>
      </div>
      <AjoutTransaction />
    </>
  );
}
