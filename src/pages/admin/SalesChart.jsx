import React from "react";
import ReactECharts from "echarts-for-react";

export default function SalesChart() {
  const option = {
    title: {
      text: "Ventes par Produit",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow", // Facilite la lecture des données
      },
    },
    xAxis: {
      type: "category",
      data: ["Produit A", "Produit B", "Produit C"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} unités", // Ajout d'un label sur l'axe
      },
    },
    series: [
      {
        name: "Ventes",
        data: [500, 400, 350],
        type: "bar",
        itemStyle: {
          color: "#5470C6", // Couleur des barres
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}", // Affiche les valeurs au-dessus des barres
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "300px" }} />;
}
