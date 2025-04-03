import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(form);
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 rounded-lg shadow-md p-6 bg-white">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="current-password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          {/* <div className="flex items-center justify-between">
            <a className="text-blue-500 font-medium hover:underline" href="#">
              Forgot Password?
            </a>
          </div> */}
          <button
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white"
            type="submit"
          >
            Login
          </button>
          <p className="text-center text-slate-700">
            Don't have an account?{" "}
            <a className="text-blue-500 hover:underline" href="/">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
