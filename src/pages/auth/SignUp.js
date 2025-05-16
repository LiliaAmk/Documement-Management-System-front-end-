import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { usersAtom } from "../../atoms/atoms";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [users, setUsers] = useAtom(usersAtom);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "You need to fill this field";
    if (!email.trim()) newErrors.email = "You need to fill this field";
    if (!password.trim()) newErrors.password = "You need to fill this field";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (users.some((user) => user.email === email)) {
      setErrors({ email: "This email is already registered." });
      return;
    }

    setUsers([...users, { fullName, email, password }]);
    setErrors({});
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          {['fullName', 'email', 'password'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-600">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                  errors[field] ? "border-red-500" : ""
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-900 transition">Sign Up</button>
        </form>
        <div className="text-center my-4 text-gray-500">or</div>
        <button className="flex items-center justify-center w-full border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="text-xl mr-2" /> Continue with Google
        </button>
        <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/signin" className="text-purple-700">Sign in</a></p>
      </div>
    </div>
  );
}