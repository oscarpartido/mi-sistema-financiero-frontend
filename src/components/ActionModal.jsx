import React, { useState } from "react";

const ActionModal = ({ actionType, onClose, onSave }) => {
  const [workerName, setWorkerName] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");

  const handleSave = () => {
    onSave({ workerName, date, actionType, comments });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Registrar {actionType}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del trabajador</label>
          <input
            type="text"
            placeholder="Nombre"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comentarios</label>
          <textarea
            placeholder="Comentarios (opcional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;