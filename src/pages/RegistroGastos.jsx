import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const RegistroGastos = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    paymentMethod: "efectivo", // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.date || !formData.description) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await api.post("/expenses", {
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
      });

      toast.success("Gasto registrado correctamente", {
        position: "top-right",
        autoClose: 3000,
      });

      // Limpia el formulario
      setFormData({
        amount: "",
        description: "",
        date: "",
        paymentMethod: "efectivo",
      });
    } catch (error) {
      console.error("Error al registrar el gasto:", error);
      toast.error("Hubo un error al registrar el gasto", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-4">Registrar Gasto</h2>

      <div className="mb-2">
        <label className="block font-medium">Monto:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
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

      <div className="mb-4">
        <label className="block font-medium">Método de Pago:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Registrar Gasto
      </button>
    </form>
  );
};

export default RegistroGastos;