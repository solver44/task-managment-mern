import React, { useState, useEffect } from "react";
import Spinner from "../../loader/Spinner";
import styles from "../AdminDashboard/Dasboard.module.css";
import { getTasksByUser } from "../../../services/TaskService";
import TasksDashboard from "../../dashboard/TasksDashboard";
const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    submittedTasks: 0,
  });

  const fetchData = async () => {
    try {
      const taskData = await getTasksByUser();
      // Calculate total, pending, and submitted tasks based on the fetched data
      const totalTasks = taskData.length;
      const pendingTasks = taskData.filter(
        (task) => task.status === "Pending"
      ).length;
      const submittedTasks = taskData.filter(
        (task) => task.status === "Submitted"
      ).length;

      setDashboardData({
        totalTasks,
        pendingTasks,
        submittedTasks,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh )" }}
    >
      <div
        className={`card mb-4 bg-transparent text-white ${styles.chartCard}`}
      >
        <div className="card-header">
          <i className="fas fa-chart-area me-1"></i>
          Task Progress Bar
        </div>
        <div className="card-body ">
          <TasksDashboard dashboardData={dashboardData} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
