import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
function UserDataChart({ dashboardData }) {
  return (
    <div
      style={{
        width: "auto",
        height: "370px",
        marginTop: 30,
        textAlign: "center",
      }}
    >
      {dashboardData && (
        <Pie
          data={{
            labels: ["Total Users", "Active Users", "Inactive Users"],
            datasets: [
              {
                data: [
                  dashboardData.totalUsers || 0,
                  dashboardData.activeUsers || 0,
                  dashboardData.inactiveUsers || 0,
                ],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                formatter: function (value) {
                  return value ? value : "";
                },
                font: {
                  size: "24px",
                  weight: "bold",
                },
                textStrokeColor: "white",
                textStrokeWidth: 4,
                color: "black",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default UserDataChart;
