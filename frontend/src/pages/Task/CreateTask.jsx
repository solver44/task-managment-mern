import { useEffect, useState } from "react";
import AxiosService from "../../services/ApiService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Spinner from "../../components/loader/Spinner";
import { getAllUsers } from "../../services/UserService";
import { createTask } from "../../services/TaskService";

const CreateTask = ({ refreshTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setError(""); // Clear error when closing the modal
  };

  useEffect(() => {
    if (!showModal) return;
    getdata();
  }, [showModal]);
  const getdata = async () => {
    let res = await getAllUsers();
    if (res?.status === 200) {
      const data = res.data;
      const users = data.userData
        .filter((u) => u.email !== "admin")
        .map((u) => ({ email: u.email, name: u.name }));
      setUsers(users);
      if (users.length) setAssignedTo(users[0].email);
    } else {
      console.error(res);
      toast.error(res.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description || !assignedTo) {
        setError("All fields are required");
        return;
      }
      setLoading(true);
      const response = await createTask(title, description, assignedTo);
      toast.success(response.data.message);
      refreshTasks();
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setError("");

      handleClose();
    } catch (error) {
      console.error("Error creating task:", error.message);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error creating task: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred while creating the task.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} disabled={loading}>
        {loading ? <Spinner autoHeight /> : "Create Task"}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="assignedTo" className="form-label">
                Assigned To Employee Email
              </label>
              <select
                type="text"
                className="form-control"
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {users.map((u, i) => (
                  <option key={i} value={u.email}>
                    {u.email} ({u.name})
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

CreateTask.propTypes = {
  refreshTasks: PropTypes.func,
};

export default CreateTask;
