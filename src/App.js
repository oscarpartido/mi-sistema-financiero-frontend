import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import RegistroIngresos from "./pages/RegistroIngresos";
import RegistroGastos from "./pages/RegistroGastos";
import Historial from "./pages/Historial";
import GastosRecurrentes from "./pages/GastosRecurrentes"; // Importa el componente de gastos recurrentes
import CalculoNomina from "./pages/CalculoNomina"; // Importa el componente de cálculo de nómina
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [refreshSummary, setRefreshSummary] = useState(false);

  // Trigger para actualizar el resumen
  const triggerSummaryRefresh = () => {
    setRefreshSummary((prev) => !prev);
  };

  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          {/* Dashboard con gráfico y resumen */}
          <Route
            path="/"
            element={<Dashboard refreshSummary={refreshSummary} />}
          />
          {/* Registro de ingresos */}
          <Route
            path="/registro-ingresos"
            element={<RegistroIngresos onIncomeAdded={triggerSummaryRefresh} />}
          />
          {/* Registro de gastos */}
          <Route
            path="/registro-gastos"
            element={<RegistroGastos onExpenseAdded={triggerSummaryRefresh} />}
          />
          {/* Gastos recurrentes */}
          <Route
            path="/gastos-recurrentes"
            element={<GastosRecurrentes />}
          />
          {/* Historial */}
          <Route path="/historial" element={<Historial />} />
          {/* Cálculo de nómina */}
          <Route path="/calculo-nomina" element={<CalculoNomina />} />
        </Routes>
        {/* Notificaciones */}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;