import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./TaskDashboard.module.css";
import { useSpring, animated } from "react-spring";
import { ProgressBar } from "react-bootstrap";

export default function TasksDashboard({ dashboardData, circlDash }) {
  const completionRate =
    (dashboardData.submittedTasks / dashboardData.totalTasks) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.chart}>
        <Bar
          className={styles.barChart}
          data={{
            labels: ["Tasks"],
            datasets: [
              {
                label: "Total tasks",
                data: [dashboardData.totalTasks],
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderWidth: 2,
                borderColor: ["rgba(54, 162, 235, 1)"],
              },
              {
                label: "Pending tasks",
                data: [dashboardData.pendingTasks],
                backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                borderWidth: 2,
                borderColor: ["rgba(255, 159, 64, 1)"],
              },
              {
                label: "Submitted tasks",
                data: [dashboardData.submittedTasks],
                backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                borderWidth: 2,
                borderColor: ["rgba(153, 102, 255, 1)"],
              },
            ],
          }}
          options={{
            // indexAxis: "y",
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
      </div>

      <div className={styles.chart}>
        <h3>Average Completion Rate:</h3>
        {/* <animated.h2>
          {animatedCompletionRate.value.to((n) => n.toFixed(2) + "%")}
        </animated.h2> */}
        <ProgressBar
          now={isNaN(completionRate) ? 0 : completionRate}
          label={`${isNaN(completionRate) ? 0 : completionRate.toFixed(2)}%`}
          style={{ fontSize: 20, height: 30 }}
          variant="success"
        />
        {circlDash}
      </div>
    </div>
  );
}
