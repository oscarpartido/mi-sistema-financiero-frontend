import React, { useState } from "react";
import { toast } from 'react-toastify';

const CashCalculatorForm = ({ onTotalCalculated }) => {
  // Denominaciones de billetes y monedas
  const denominations = [
    { value: 1000, label: "$1000" },
    { value: 500, label: "$500" },
    { value: 200, label: "$200" },
    { value: 100, label: "$100" },
    { value: 50, label: "$50" },
    { value: 20, label: "$20" },
    { value: 10, label: "$10" },
    { value: 5, label: "$5" },
    { value: 2, label: "$2" },
    { value: 1, label: "$1" },
    { value: 0.5, label: "¢50" },
  ];

  // Estado para la calculadora y el monto en tarjeta
  const [counts, setCounts] = useState(
    denominations.reduce((acc, denomination) => {
      acc[denomination.value] = ""; // Inicializa las cantidades vacías
      return acc;
    }, {})
  );

  const [cardAmount, setCardAmount] = useState(""); // Estado para el monto de tarjeta

  // Manejar cambios en la calculadora
  const handleChange = (e, value) => {
    let count = e.target.value;

    // Elimina el 0 inicial si hay más de un carácter
    if (count.startsWith("0") && count.length > 1) {
      count = count.slice(1);
    }

    setCounts({ ...counts, [value]: parseInt(count) || 0 });
  };

  // Calcular el total en efectivo
  const calculateTotal = () => {
    return denominations.reduce(
      (sum, denomination) => sum + denomination.value * (counts[denomination.value] || 0),
      0
    );
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCash = calculateTotal();
    const totalCard = parseFloat(cardAmount || 0);

    if (totalCash <= 0 && totalCard <= 0) {
      toast.error("Debe registrar al menos un monto en efectivo o tarjeta", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Pasar efectivo y tarjeta al componente padre
    if (onTotalCalculated) {
        console.log("Total calculado:", { totalCash, totalCard }); // Para depurar
        onTotalCalculated(totalCash, totalCard);
      }

    // Limpiar el formulario
    setCardAmount("");
    setCounts(
      denominations.reduce((acc, denomination) => {
        acc[denomination.value] = "";
        return acc;
      }, {})
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-4">Calculadora de Efectivo</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Denominación</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {denominations.map((denomination) => (
            <tr key={denomination.value}>
              <td className="border border-gray-300 p-2 text-center">
                {denomination.label}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min="0"
                  value={counts[denomination.value]}
                  onChange={(e) => handleChange(e, denomination.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                ${(counts[denomination.value] * denomination.value || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border border-gray-300 p-2 font-bold text-right" colSpan="2">
              Total
            </td>
            <td className="border border-gray-300 p-2 font-bold text-center">
              ${calculateTotal().toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Campo para monto en tarjeta */}
      <div className="mb-4">
        <label className="block font-medium">Monto en Tarjeta:</label>
        <input
          type="number"
          min="0"
          value={cardAmount}
          onChange={(e) => setCardAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Registrar Ingresos
      </button>
    </form>
  );
};

export default CashCalculatorForm;