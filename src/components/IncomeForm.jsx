import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const IncomeForm = ({ onIncomeAdded }) => {
  const [formData, setFormData] = useState({
    cashAmount: "", // Monto en efectivo
    cardAmount: "", // Monto en tarjeta
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Registrar ingreso en efectivo
      if (formData.cashAmount > 0) {
        console.log("Registrando ingreso en efectivo:", {
          amount: formData.cashAmount,
          description: `${formData.description} (Efectivo)`,
          date: formData.date,
          paymentMethod: "efectivo",
        });

        await api.post("/incomes", {
          amount: formData.cashAmount,
          description: `${formData.description} (Efectivo)`,
          date: formData.date,
          paymentMethod: "efectivo",
        });
      }

      // Registrar ingreso en tarjeta
      if (formData.cardAmount > 0) {
        console.log("Registrando ingreso en tarjeta:", {
          amount: formData.cardAmount,
          description: `${formData.description} (Tarjeta)`,
          date: formData.date,
          paymentMethod: "tarjeta",
        });

        await api.post("/incomes", {
          amount: formData.cardAmount,
          description: `${formData.description} (Tarjeta)`,
          date: formData.date,
          paymentMethod: "tarjeta",
        });
      }

      // Llamar a onIncomeAdded una sola vez
      if (onIncomeAdded) {
        onIncomeAdded();
      }

      // Resetear el formulario
      setFormData({
        cashAmount: "",
        cardAmount: "",
        description: "",
        date: "",
      });

      // Notificación de éxito
      toast.success(
        `Ingresos registrados exitosamente:\nEfectivo: $${formData.cashAmount}\nTarjeta: $${formData.cardAmount}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      // Notificación de error
      toast.error("Error al registrar los ingresos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-4">Registrar Ingreso</h2>
      <div className="mb-2">
        <label className="block font-medium">Monto en Efectivo:</label>
        <input
          type="number"
          name="cashAmount"
          value={formData.cashAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Monto en Tarjeta:</label>
        <input
          type="number"
          name="cardAmount"
          value={formData.cardAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Descripción:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Fecha:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default IncomeForm;