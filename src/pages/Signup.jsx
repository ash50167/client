import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Full name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post(`${API_URL}/api/auth/signup`, form);
      toast.success("Account created Succesfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 rounded-lg shadow-md p-6 bg-white">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-slate-700">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className={`outline-none border-2 rounded-md px-3 py-2 w-full text-slate-500 focus:border-blue-300 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              className={`outline-none border-2 rounded-md px-3 py-2 w-full text-slate-500 focus:border-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              className={`outline-none border-2 rounded-md px-3 py-2 w-full text-slate-500 focus:border-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              className={`outline-none border-2 rounded-md px-3 py-2 w-full text-slate-500 focus:border-blue-300 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white">
            Sign Up
          </button>
          <p className="text-center text-slate-700">
            Already have an account?{" "}
            <a className="text-blue-500 hover:underline" href="/login">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
