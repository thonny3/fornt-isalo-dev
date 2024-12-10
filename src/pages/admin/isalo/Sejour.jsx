import React from 'react'

export default function Sejour() {
  return (
    <>
    <h1 className="text-2xl text-gray-700">
        Séjour
    </h1>
    <div className="recherche-2date mt-5 ">
     <h1>Recherche entre deux (02) dates </h1>
        <div className="mt-5 flex space-x-8 " >
        <div className="form-group">
            <label htmlFor="" className='text-gray-700'>Date de début <span style={{color:'red'}}>*</span> </label>
            <input type="date"   className='form-control'/>
        </div>

        <div className="form-group">
            <label htmlFor="" className='text-gray-700'>Date de fin  <span style={{color:'red'}}>*</span> </label>
            <input type="date"   className='form-control'/>
        </div>
        <button className='btn-primary'>Recherche</button>
        </div>
    </div>
    <div className="mt-8">
          <table className="text-left w-full">
    <thead>
      <tr className="bg-gray-100 text-gray-700">
        <th className="px-4 py-2">Nom client</th>
        <th className="px-4 py-2">Numéro chambre</th>
        <th className="px-4 py-2">Date de début</th>
        <th className="px-4 py-2">Date de fin</th>
        <th className="px-4 py-2">Statut</th>
        <th className="px-4 py-2">Montant</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
 
  </table>
    </div>
    </>
  )
}
