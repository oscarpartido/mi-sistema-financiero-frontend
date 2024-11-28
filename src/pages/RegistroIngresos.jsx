import React from "react";
import CashCalculatorForm from "../components/CashCalculatorForm";
import api from "../services/api";
import { toast } from "react-toastify";

const RegistroIngresos = ({ onIncomeAdded }) => {
  const handleCashCalculated = async (totalCash, totalCard) => {
    try {
      // Array para manejar múltiples promesas
      const promises = [];

      // Registrar ingreso en efectivo
      if (totalCash > 0) {
        console.log("Enviando efectivo al backend:", totalCash);
        promises.push(
          api.post("/incomes", {
            amount: totalCash,
            description: "Ingreso en efectivo",
            date: new Date().toISOString().split("T")[0],
          })
        );
      }

      // Registrar ingreso en tarjeta
      if (totalCard > 0) {
        console.log("Enviando tarjeta al backend:", totalCard);
        promises.push(
          api.post("/incomes", {
            amount: totalCard,
            description: "Ingreso en tarjeta",
            date: new Date().toISOString().split("T")[0],
          })
        );
      }

      // Ejecutar todas las promesas
      await Promise.all(promises);

      // Notificación de éxito
      toast.success(
        `Ingresos registrados correctamente:\nEfectivo: $${totalCash}\nTarjeta: $${totalCard}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );

      // Notificar al Dashboard y al Historial para actualizar
      if (onIncomeAdded) {
        console.log("Llamando a onIncomeAdded");
        onIncomeAdded();
      }
    } catch (error) {
      console.error("Error al registrar los ingresos:", error);

      // Notificación de error
      toast.error("Error al registrar los ingresos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registro de Ingresos</h1>
      <CashCalculatorForm onTotalCalculated={handleCashCalculated} />
    </div>
  );
};

export default RegistroIngresos;