import React from 'react';
import { OrbitProgress } from 'react-loading-indicators';  // Assurez-vous d'importer correctement le composant

export default function LoadingPage() {
  return (
    <div className="">
      <div className="text-center">
        {/* Remplacement du spinner SVG par OrbitProgress */}
        <OrbitProgress variant="spokes" dense color="#cc8231" size="medium" text="" textColor="" />
      </div>
    </div>
  );
}
