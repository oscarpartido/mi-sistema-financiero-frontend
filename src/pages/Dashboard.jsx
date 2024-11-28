import React, { useEffect, useState } from "react";
import api from "../services/api";
import PieChart from "../components/PieChart";
import { toast } from "react-toastify";

const Dashboard = ({ refreshSummary }) => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const alertId = "low-balance-alert"; // ID único para la alerta de saldo bajo

  const fetchSummary = async () => {
    try {
      const response = await api.get("/summary");
      console.log("Resumen financiero actualizado en el Dashboard:", response.data);
      setSummary(response.data);
    } catch (error) {
      console.error("Error al obtener el resumen financiero:", error);
    }
  };

  useEffect(() => {
    fetchSummary();

    // Configurar un intervalo para actualizar automáticamente
    const interval = setInterval(() => {
      fetchSummary();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshSummary]);

  useEffect(() => {
    if (summary.balance < 1000) {
      // Mostrar alerta solo si no está activa
      if (!toast.isActive(alertId)) {
        toast.warning("Tu saldo disponible está por debajo de $1000", {
          toastId: alertId, // Asegúrate de usar un ID único
        });
      }
    } else {
      // Descartar la alerta si el saldo mejora
      toast.dismiss(alertId);
    }
  }, [summary.balance]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resumen Financiero</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-semibold">Ingresos Totales</h2>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalIncome.toLocaleString("en-US")}
          </p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="text-lg font-semibold">Gastos Totales</h2>
          <p className="text-2xl font-bold text-red-600">
            ${summary.totalExpense.toLocaleString("en-US")}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-semibold">Saldo Disponible</h2>
          <p className="text-2xl font-bold text-blue-600">
            ${summary.balance.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6">Distribución Financiera</h2>
      <PieChart
        data={[
          { name: "Ingresos", value: summary.totalIncome },
          { name: "Gastos", value: summary.totalExpense },
        ]}
      />
    </div>
  );
};

export default Dashboard;