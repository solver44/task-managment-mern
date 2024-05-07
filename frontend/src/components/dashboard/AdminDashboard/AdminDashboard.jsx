import UserDataChart from "./UserDataChart";
import React, { useContext, useEffect, useState } from "react";
import { GlobalData } from "../../context/ContextProvider";
import styles from "./Dasboard.module.css";
import { getAllUsers } from "../../../services/UserService";
import { getTasksDashboard } from "../../../services/TaskService";
import TasksDashboard from "../../dashboard/TasksDashboard";

function AdminDashboard() {
  const [userData, setUserData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const context = useContext(GlobalData);

  const fetchData = async () => {
    try {
      const data = context.data;
      if (data?.dashboardData && data?.userData) {
        setUserData(data.userData);
        setDashboardData(data.dashboardData);
        return;
      }

      const res1 = await getAllUsers();
      const res2 = await getTasksDashboard();
      setUserData(res1.data);
      setDashboardData(res2);
      context.setData({
        userData: res1.data,
        dashboardData: res2,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh)" }}
    >
      {/* Charts */}
      <div className="row">
        <div className="col-xl-12">
          <div className={`card mb-4 `}>
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Task progress bar
            </div>
            <div className="card-body d-flex flex-column gap-5">
              <TasksDashboard
                dashboardData={dashboardData}
                circlDash={<UserDataChart dashboardData={userData} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
