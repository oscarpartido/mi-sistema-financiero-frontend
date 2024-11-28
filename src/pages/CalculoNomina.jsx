import React, { useState, useEffect } from "react";
import ActionModal from "../components/ActionModal";
import api from "../services/api";

const CalculoNomina = () => {
  const [month, setMonth] = useState("2024-11");
  const [daysInMonth, setDaysInMonth] = useState(30);
  const [salaryBase, setSalaryBase] = useState(6100);
  const [dailyRate, setDailyRate] = useState(6100 / 30);
  const [salaryFinal, setSalaryFinal] = useState(6100);
  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentActionType, setCurrentActionType] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("Ivan");
  const [workers] = useState(["Ivan", "Delia", "Yayzbereni", "Valeria", "Mafer"]);

  // Calcula los días en el mes seleccionado
  const calculateDaysInMonth = (month) => {
    const [year, monthIndex] = month.split("-");
    const date = new Date(year, monthIndex, 0);
    return date.getDate();
  };

  // Maneja el cambio de mes
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    const days = calculateDaysInMonth(selectedMonth);
    setMonth(selectedMonth);
    setDaysInMonth(days);
    setDailyRate(salaryBase / days);
    resetCalculations();
  };

  // Resetea el cálculo del salario para el trabajador
  const resetCalculations = () => {
    setSalaryFinal(salaryBase);
    setDetails([]);
  };

  // Maneja el cambio de trabajador seleccionado
  const handleWorkerChange = (e) => {
    setSelectedWorker(e.target.value);
    resetCalculations();
  };

  // Abre el modal para agregar acciones
  const handleOpenModal = (actionType) => {
    setCurrentActionType(actionType);
    setShowModal(true);
  };

  // Guarda una acción temporalmente
  const handleSaveAction = ({ date, actionType, comments }) => {
    const actionAmount =
      actionType === "Doble turno"
        ? dailyRate // Un doble turno suma el equivalente a un día
        : actionType === "Ausencia"
        ? -dailyRate // Una ausencia resta un día
        : 100; // Meta cumplida suma un bono fijo

    const newDetail = {
      workerName: selectedWorker,
      date,
      actionType,
      amount: parseFloat(actionAmount.toFixed(2)), // Aseguramos el formato correcto
      comments,
    };

    setDetails((prev) => [...prev, newDetail]);
    setSalaryFinal((prev) => prev + actionAmount);
    setShowModal(false);
  };

  // Envía el registro al historial y reinicia el cálculo
  const handleSavePayroll = async () => {
    if (details.length === 0) {
      alert("No hay acciones registradas para guardar.");
      return;
    }

    const payload = {
      workerName: selectedWorker,
      month,
      details,
      salaryFinal: parseFloat(salaryFinal.toFixed(2)), // Aseguramos el formato correcto
    };

    console.log("Payload enviado al backend:", payload); // DEBUG

    try {
      // Guardar en el backend
      await api.post("/payroll-history", payload);

      // Mostrar alerta de éxito
      alert("Nómina registrada exitosamente.");

      // Reiniciar los cálculos
      resetCalculations();
    } catch (error) {
      console.error("Error al guardar la nómina:", error.response?.data || error.message); // DEBUG
      alert("Hubo un error al guardar la nómina.");
    }
  };

  useEffect(() => {
    const days = calculateDaysInMonth(month);
    setDaysInMonth(days);
    setDailyRate(salaryBase / days);
  }, [month]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cálculo de Nómina</h1>

      {/* Selección del mes */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Selecciona el mes:</label>
        <input
          type="month"
          value={month}
          onChange={handleMonthChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <p className="text-gray-600 mt-2">Este mes tiene {daysInMonth} días.</p>
      </div>

      {/* Selección del trabajador */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Selecciona al trabajador:</label>
        <select
          value={selectedWorker}
          onChange={handleWorkerChange}
          className="border border-gray-300 p-2 rounded w-full"
        >
          {workers.map((worker, index) => (
            <option key={index} value={worker}>
              {worker}
            </option>
          ))}
        </select>
      </div>

      {/* Resultados */}
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Resultado del Cálculo</h2>
        <p>Sueldo Base: ${salaryBase.toFixed(2)}</p>
        <p>Sueldo por día: ${dailyRate.toFixed(2)}</p>
        <p className="font-bold">Salario final: ${salaryFinal.toFixed(2)}</p>
      </div>

      {/* Botones de acciones */}
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleOpenModal("Doble turno")}
        >
          Agregar Doble Turno
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleOpenModal("Ausencia")}
        >
          Agregar Ausencia
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => handleOpenModal("Meta cumplida")}
        >
          Agregar Meta Cumplida
        </button>
      </div>

      {/* Detalle de acciones */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Detalle de Acciones</h2>
        <ul>
          {details.map((detail, index) => (
            <li key={index} className="mb-2">
              {detail.actionType} - Fecha: {detail.date} - Monto: ${detail.amount.toFixed(2)} -{" "}
              {detail.comments || "Sin comentarios"}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para guardar la nómina */}
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-4"
        onClick={handleSavePayroll}
      >
        Guardar Nómina
      </button>

      {/* Modal para agregar acción */}
      {showModal && (
        <ActionModal
          actionType={currentActionType}
          onClose={() => setShowModal(false)}
          onSave={handleSaveAction}
        />
      )}
    </div>
  );
};

export default CalculoNomina;