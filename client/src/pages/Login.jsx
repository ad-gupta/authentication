import React, { useState } from "react";
import SideBG from "../assets/side-bg.png";
import LoginMan from "../assets/login-man.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isToRemember, setIsToRememeber] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/login", {
        username: formData.username,
        password: formData.password,
        isToRemember
      });

      console.log(data)

      toast.success("Welcome! You have successfully logged in");
      navigate('/home')
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-end"
      style={{
        backgroundImage: `url(${SideBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-1/2 max-md:w-full max-md:rounded-none max-md:p-10 relative bg-white px-15 rounded-l-4xl h-screen flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-7">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a unique username"
            />
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a strong password"
            />
          </div>

          <div className="mb-7 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="id1"
              checked={isToRemember}
              onChange={() => setIsToRememeber(!isToRemember)}
              className="h-4 w-4"
            />
            <label
              htmlFor="id1"
              className="text-sm font-medium text-slate-500 "
            >
              Remember me
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <div className="w-full text-center mt-6">
            <button
              type="submit"
              className="bg-black max-md:text-md max-sm:px-10 text-white p-2 px-24 text-lg rounded-md hover:bg-gray-800"
            >
              Login
            </button>
            <p className="text-center text-sm mt-4">
              <span className="text-slate-500">Forgot Password? </span>
              <button className="text-blue-500 cursor-pointer" onClick={() => toast.success("Forgot Password is currently unavailable")}>
                Generate New
              </button>
            </p>
            <p className="text-center text-sm mt-2">
              <span className="text-slate-500">Don't have an account? </span>
              <Link to="/register" className="text-blue-500">
                Create One
              </Link>
            </p>
          </div>
        </form>
        <div className="-left-36 max-sm:hidden bottom-0 absolute w-72 max-md:-left-10 max-md:w-56">
          <img src={LoginMan} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
