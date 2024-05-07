import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../components/dashboard/AdminDashboard/Dasboard.module.css";
import AxiosService from "../../services/ApiService";
import Spinner from "../../components/loader/Spinner";
import EditTaskForm from "./EditTaskForm";
import CreateTask from "./CreateTask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FaSort } from "react-icons/fa6";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import {
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/TaskService";
import { getUser } from "../../services/UserService";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" or "desc"
  const tasksPerPage = 9;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      setTasks(response.data.tasks);

      // Fetch user details for each task
      const userIds = response.data.tasks.map((task) => task.assignedTo);
      const usersDetails = await Promise.all(
        userIds.map(async (userId) => {
          const data = await getUser(userId);
          if (data) return data;
          else {
            return { _id: userId, email: "N/A" }; // Return a placeholder if user details are not available
          }
        })
      );

      const usersMap = {};
      usersDetails.forEach((user) => {
        usersMap[user._id] = user;
      });

      setUserDetails(usersMap);

      // Recalculate total page count based on the updated tasks
      const updatedTotalPageCount = Math.ceil(
        response.data.tasks.length / tasksPerPage
      );

      if (currentPage > updatedTotalPageCount) {
        setCurrentPage(updatedTotalPageCount);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskFunc = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task Deleted Successfully");
      // Update the state by filtering out the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleShowEditModal = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  // const handleShowCreateTaskModal = () => {
  //   setSelectedTask(null);
  //   setShowEditModal(true);
  // };

  const handleUpdateTask = async (updatedData) => {
    try {
      await updateTask(selectedTask._id, updatedData);
      toast.success("Task Updated Successfully");

      // Update the state with the modified task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? { ...task, ...updatedData } : task
        )
      );

      setShowEditModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error.message);

      if (
        error?.response?.data?.message
      ) {
        toast.error(`Error updating task: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred while updating the task.");
      }
    }
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userDetails[task.assignedTo]?.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const refreshTasks = () => {
    fetchTasks();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const reversedTasks = Array.isArray(filteredTasks)
    ? filteredTasks.slice().reverse()
    : [];
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className={`card mb-2 ${styles.userTable}`}>
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Tasks Data
        </div>
        <div className=" mt-4 mb-1 d-flex justify-content-around col-sm-12">
          <div className="mb-3  col-sm-auto">
            <CreateTask refreshTasks={refreshTasks} />
          </div>
          <div className="mb-3  col-sm-auto">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
              <span className="input-group-text">
                <SearchIcon />
              </span>
            </div>
          </div>
          <div className="mb-3  col-sm-auto">
            <FaSort
              onClick={handleSort}
              className={`ms-2 ${styles.sortIcon}`}
            />
          </div>
        </div>
        <div className="card-body">
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table
              id="datatablesSimple"
              className={`table ${styles.userTable}`}
            >
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Assigned To</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{userDetails[task.assignedTo]?.email || "N/A"}</td>
                    <td>{moment(task.createdAt).format("DD.MM.yyyy H:mm")}</td>
                    <td>{task.status}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTaskFunc(task._id)}
                      >
                        <DeleteOutlineIcon />
                      </Button>{" "}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleShowEditModal(task)}
                      >
                        <CreateIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {tasks.length <= 0 && <p className="text-center">No tasks found</p>}
          </div>

          <div className="d-flex justify-content-center">
            <Pagination>
              {[
                ...Array(Math.ceil(reversedTasks.length / tasksPerPage)).keys(),
              ].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>

      {selectedTask && (
        <Modal show={showEditModal} onHide={handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditTaskForm task={selectedTask} onUpdate={handleUpdateTask} />
          </Modal.Body>
        </Modal>
      )}

      {!selectedTask && (
        <Modal show={showEditModal} onHide={handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateTask refreshTasks={refreshTasks} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default List;
