import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import MainLayout from "../components/layout/MainLayout";
import RegisterUser from "../pages/Users/Register";
import UserDashboard from "../components/dashboard/UserDashboard/UserDashboard";
import Register from "../pages/Register/Register";
import UserList from "../pages/Users/List";
import Edit from "../pages/Users/Edit";
import UserTask from "../pages/UserTask/List";
import TaskSubmittingPage from "../pages/UserTask/SubmissionForm";
import SubmittedTaskPage from "../pages/Task/SubmittedTask";
import UserTasklistpage from "../pages/UserTask/SubmittedList";
import React from "react";
import TaskList from "../pages/Task/List";
import PageNotFound from "../pages/PageNotFound";
import AdminDashboard from "../components/dashboard/AdminDashboard/AdminDashboard";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <MainLayout />
      {children}
    </div>
  );
}

function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route
        path="/users"
        element={
          <Layout>
            <UserList />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterUser />
          </Layout>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <Layout>
            <Edit />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <AdminDashboard />
          </Layout>
        }
      />
      <Route
        path="/user-dash"
        element={
          <Layout>
            <UserDashboard />
          </Layout>
        }
      />
      <Route
        path="/tasks"
        element={
          <Layout>
            <TaskList />
          </Layout>
        }
      />
      <Route
        path="/submitted-task"
        element={
          <Layout>
            <SubmittedTaskPage />
          </Layout>
        }
      />
      <Route
        path="/user-task"
        element={
          <Layout>
            <UserTask />
          </Layout>
        }
      />
      <Route
        path="/task/:taskId"
        element={
          <Layout>
            <TaskSubmittingPage />
          </Layout>
        }
      />
      <Route
        path="/submited-by-user"
        element={
          <Layout>
            <UserTasklistpage />
          </Layout>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouters;
