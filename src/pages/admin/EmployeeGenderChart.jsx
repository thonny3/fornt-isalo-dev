import React from "react";
import ReactECharts from "echarts-for-react";

export default function EmployeeGenderChart() {
  // Données simulées pour le nombre d'employés hommes et femmes
  const data = [
    { value: 120, name: "Hommes" },
    { value: 80, name: "Femmes" },
  ];

  // Options du graphique
  const option = {
    title: {
      text: "Répartition des Employés par Genre",
      subtext: "Nombre d'employés",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal", // Pour une disposition horizontale de la légende
      bottom: 0, // Positionne la légende en bas
      left: "center", // Centre la légende horizontalemen
    },
    series: [
      {
        name: "Genre",
        type: "pie",
        radius: "50%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)",
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ReactECharts option={option} />
    </div>
  );
}
