// src/pages/auth/SignIn.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice"; 

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // clear any stale auth info
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      const token = response.data.token;

      // Save token and user info
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.roles?.[0] || "ROLE_USER";
      localStorage.setItem("userType", role);
      localStorage.setItem("userEmail", decoded.sub);

      // Update Redux
      dispatch(loginSuccess({ token, user: decoded }));

      // Redirect
      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      // on failure, clear storage again
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userEmail");
      setError(err.response?.data?.message || "Authentication failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-600 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                  error ? "border-red-500" : ""
                }`}
              />
            </div>
          ))}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-900 transition">
            Sign In
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>
        <button className="flex items-center justify-center w-full border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="text-xl mr-2" />
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
