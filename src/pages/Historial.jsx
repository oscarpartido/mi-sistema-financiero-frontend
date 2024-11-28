import React, { useEffect, useState } from "react";
import api from "../services/api";
import { CSVLink } from "react-csv";

const HistorialMovimientos = () => {
  const [movements, setMovements] = useState([]);
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchSummary(); // Cargar resumen al inicio
    fetchMovements(); // Cargar movimientos al inicio
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/summary");
      setTotals(response.data);
    } catch (error) {
      console.error("Error al obtener el resumen financiero:", error);
    }
  };

  const fetchMovements = async () => {
    try {
      const response = await api.get("/movements");
      console.log("Movimientos recibidos:", response.data); // Log para depuración
      setMovements(response.data); // Actualiza el estado
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Ingresos</h2>
          <p className="text-2xl font-bold text-green-600">
            ${totals.totalIncome.toLocaleString("en-US")}
          </p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Gastos</h2>
          <p className="text-2xl font-bold text-red-600">
            ${totals.totalExpense.toLocaleString("en-US")}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-semibold">Balance General</h2>
          <p className="text-2xl font-bold text-blue-600">
            ${totals.balance.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      {/* Botón de exportación CSV */}
      <div className="mb-4 flex justify-end">
        <CSVLink
          data={movements}
          headers={[
            { label: "Tipo", key: "type" },
            { label: "Monto", key: "amount" },
            { label: "Descripción", key: "description" },
            { label: "Método de Pago", key: "paymentMethod" },
            { label: "Fecha y Hora", key: "createdAt" },
          ]}
          filename="movimientos.csv"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Exportar a CSV
        </CSVLink>
      </div>

      {/* Tabla de movimientos */}
      <h1 className="text-2xl font-bold mb-6">Historial de Movimientos</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tipo</th>
            <th className="border border-gray-300 p-2">Monto</th>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">Método de Pago</th>
            <th className="border border-gray-300 p-2">Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement, index) => (
            <tr
              key={index}
              className={movement.type === "Ingreso" ? "bg-green-100" : "bg-red-100"}
            >
              <td className="border border-gray-300 p-2">{movement.type}</td>
              <td className="border border-gray-300 p-2">${movement.amount}</td>
              <td className="border border-gray-300 p-2">{movement.description}</td>
              <td className="border border-gray-300 p-2">{movement.paymentMethod}</td>
              <td className="border border-gray-300 p-2">
                {new Date(movement.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialMovimientos;