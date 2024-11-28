import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título del sistema */}
        <h1 className="text-white text-lg font-bold">Mi Sistema Financiero</h1>

        {/* Menú de navegación */}
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gastos-recurrentes"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Gastos Recurrentes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/registro-ingresos"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Registro de Ingresos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/registro-gastos"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Registro de Gastos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Historial
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calculo-nomina"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Cálculo de Nómina
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;