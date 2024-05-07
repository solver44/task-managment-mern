import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../services/ApiService";
import Spinner from "../../components/loader/Spinner";
import { getUser, updateUser } from "../../services/UserService";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  const [loading, setLoading] = useState(true);
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    status: "",
    mobile: "",
    password: "",
    add: "",
    desc: "",
    role: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getdata = async () => {
    const data = await getUser(id);

    if (!data) {
      setINP(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, password, address, mobile, desc, status, role } = inpval;

    try {
      await updateUser(id, {
        name,
        email,
        password,
        address,
        mobile,
        desc,
        status,
        role,
      });

      navigate("/users");
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);

      // Check if the error is due to duplicate email or mobile
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 409)
      ) {
        toast.error("Email or mobile is already existed");
      } else {
        toast.error("Failed to update user");
      }
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
              value={inpval.name}
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
              value={inpval.email}
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
              value={inpval.status}
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
              value={inpval.mobile}
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
              value={inpval.password}
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
              value={inpval.role}
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
              value={inpval.address}
              onChange={setdata}
              name="add"
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
              value={inpval.desc}
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
              onClick={updateuser}
              className="btn btn-primary"
            >
              {loading ? <Spinner autoHeight /> : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
