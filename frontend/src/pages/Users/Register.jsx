import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { toast } from "react-toastify";
import AxiosService from "../../services/ApiService";
import Spinner from "../../components/loader/Spinner";
import { createUser } from "../../services/UserService";

function Register() {
  let logout = useLogout();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    status: "Active",
    mobile: "",
    password: "",
    address: "",
    desc: "",
    role: "user",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setInputValues((preval) => ({
      ...preval,
      [name]: name === "status" ? e.target.value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createUser(inputValues);
      if (res?.status === 201) {
        toast.success(res.data.message);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2">
      <form className="bg-light p-4 rounded">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inputValues.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inputValues.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="status" className="form-label">
              Select Your Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={inputValues.status}
              onChange={setdata}
            >
              <option value="Active">Active</option>
              <option value="InActive">Inactive</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inputValues.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="mobile"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={inputValues.password}
              onChange={setdata}
              name="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              type="text"
              value={inputValues.role}
              onChange={setdata}
              name="role"
              className="form-select"
              id="role"
              required
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="add" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inputValues.address}
              onChange={setdata}
              name="address"
              className="form-control"
              id="add"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inputValues.desc}
              onChange={setdata}
              className="form-control"
              id="desc"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="col-12">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <Spinner autoHeight /> : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
