import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
// import { FaTicketAlt, FaTasks, FaUser, FaCog } from "react-icons/fa";

import { TbLogout2 } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const MainLayout = () => {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [role, setRole] = useState("");
  let logout = useLogout();

  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div
            className="container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <FaUserCircle style={{ height: "50px", width: "40px" }} />
              {` ${userData?.name}  `}
            </a>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {role === "manager" ? <ManagerNavLinks /> : <UserNavLinks />}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            <TbLogout2 /> Logout
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

function UserNavLinks() {
  // let navigate = useNavigate()
  let logout = useLogout();
  return (
    <>
      <NavLink
        exact="true"
        to="/user-dash"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/user-task"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="table">Tasks</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/submited-by-user"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="list-check">
          Submited Tasks
        </CDBSidebarMenuItem>
      </NavLink>
    </>
  );
}

function ManagerNavLinks() {
  // let navigate = useNavigate()
  let logout = useLogout();
  return (
    <>
      <NavLink
        exact="true"
        to="/dashboard"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/register"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="user">Create User</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/users"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="table">Users</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/tasks"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="file">Tasks</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact="true"
        to="/submitted-task"
        className={({ isActive }) => (isActive ? "activeClicked" : "")}
      >
        <CDBSidebarMenuItem icon="list-check">
          Submitted tasks
        </CDBSidebarMenuItem>
      </NavLink>
    </>
  );
}
export default MainLayout;
