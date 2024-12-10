import React from 'react'
import TableFiche from '../../components/table/TableFiche'

export default function FichePaie() {
  return (
    <>
      <div className="">
    <div className="flex items-center  ">
    <span className="text-secondary text-gray-700 text-4xl font-bold">
      Fiches de paie 
    </span>
          
        </div>
        <div className=" flex justify-between items-center">
        <span className="text-md text-gray-500 block text-center mt-2">
    Consultez et gérez les transactions financières des employés.
  </span>
   </div>
  <div className="mt-8"> <TableFiche/></div>
    </div>
    </>
  )
}
