import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../services/ApiService";
import { login } from "../../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login(email, password);

      if (res?.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
        if (res.data.userData.status === "InActive") {
          navigate("/");
          toast.error("You are not Allow to login");
        } else if (res.data.userData.role === "manager") {
          // toast.success(res.data.message);
          navigate("/dashboard");
        } else {
          // toast.success(res.data.message);
          navigate("/user-dash");
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <section className="login-section">
        <div className="logfull">
          <div
            className="login"
            style={{ height: "480px", paddingTop: "35px" }}
          >
            <h2>Login</h2>
            <h3>Welcome back!</h3>

            <form className="login-form">
              <div className="textbox">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="material-symbols-outlined"> email </span>
              </div>

              <div className="textbox">
                <input
                  type={showPassword ? "text" : "password"} // Here is the change
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="material-symbols-outlined"> lock </span>
              </div>

              <div id="ch" style={{ display: "flex", width: "100%" }}>
                <input
                  style={{ width: "15px", margin: "-18px 6px 0px 0px" }}
                  type="checkbox"
                  id="togglePassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label
                  id="sp"
                  htmlFor="togglePassword"
                  style={{ marginRight: "45px", color: "#157ae1" }}
                >
                  Show Password
                </label>
              </div>

              <button type="submit" onClick={(e) => handleLogin(e)}>
                {" "}
                LOGIN
              </button>

              <p style={{ color: "gray", fontSize: "18px" }}>
                Don&apos;t have account?
                <span
                  style={{ cursor: "pointer", color: "#157ae1" }}
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Register
                </span>{" "}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
