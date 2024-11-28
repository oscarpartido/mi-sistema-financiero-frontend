import React, { useState, useEffect } from "react";
import api from "../services/api"; // Asegúrate de tener esta configuración de API
import { toast } from "react-toastify";

const GastosRecurrentes = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    frequency: "mensual",
    nextDate: "",
  });

  // Obtener gastos recurrentes
  const fetchRecurringExpenses = async () => {
    try {
      const response = await api.get("/recurring-expenses");
      setRecurringExpenses(response.data);
    } catch (error) {
      console.error("Error al obtener gastos recurrentes:", error);
      toast.error("Error al cargar los gastos recurrentes.");
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Registrar un nuevo gasto recurrente
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recurring-expenses", newExpense);
      toast.success("Gasto recurrente registrado con éxito.");
      setNewExpense({
        description: "",
        amount: "",
        frequency: "mensual",
        nextDate: "",
      });
      fetchRecurringExpenses(); // Actualizar lista
    } catch (error) {
      console.error("Error al registrar gasto recurrente:", error);
      toast.error("Error al registrar el gasto recurrente.");
    }
  };

  // Eliminar un gasto recurrente
  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/recurring-expenses/${id}`);
      toast.success("Gasto recurrente eliminado.");
      fetchRecurringExpenses(); // Actualizar lista
    } catch (error) {
      console.error("Error al eliminar gasto recurrente:", error);
      toast.error("Error al eliminar el gasto recurrente.");
    }
  };

  useEffect(() => {
    fetchRecurringExpenses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gastos Recurrentes</h1>

      {/* Formulario para agregar gasto recurrente */}
      <form onSubmit={handleAddExpense} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            placeholder="Descripción"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Monto"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <select
            name="frequency"
            value={newExpense.frequency}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="mensual">Mensual</option>
            <option value="semanal">Semanal</option>
          </select>
          <input
            type="date"
            name="nextDate"
            value={newExpense.nextDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Agregar Gasto
        </button>
      </form>

      {/* Tabla de gastos recurrentes */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">Monto</th>
            <th className="border border-gray-300 p-2">Frecuencia</th>
            <th className="border border-gray-300 p-2">Próxima Fecha</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recurringExpenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border border-gray-300 p-2">{expense.description}</td>
              <td className="border border-gray-300 p-2">${expense.amount}</td>
              <td className="border border-gray-300 p-2">{expense.frequency}</td>
              <td className="border border-gray-300 p-2">
                {new Date(expense.nextDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GastosRecurrentes;