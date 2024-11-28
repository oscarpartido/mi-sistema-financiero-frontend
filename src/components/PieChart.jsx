import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#4caf50", "#f44336"]; // Colores para ingresos y gastos

const PieChart = ({ data }) => {
  return (
    <div className="flex justify-center">
      <RechartsPieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </div>
  );
};

export default PieChart;