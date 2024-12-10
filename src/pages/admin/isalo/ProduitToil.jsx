import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import { useStock } from '../../../context/StockContext'
import TableStockToils from '../../../components/table/TableStockToils'

export default function ProduitToil() {
  const {etatStock} = useStock()
  return (
    <>
      <div className="">
      <div className="poste flex items-center justify-between">
    <div className="flex items-center ">
       
          <div className="text-secondary text-gray-700 text-4xl">
            <span >Listes des stocks </span>
          </div>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
              {}
            </span>
          </div>
        </div>
       
      </div>
      <div className="mt-6  flex justify-between items-center">
        <div className="search flex items-center">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-secondary placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="mt-5">
      <TableStockToils/>
      </div>
      </div>
    </>
  )
}
