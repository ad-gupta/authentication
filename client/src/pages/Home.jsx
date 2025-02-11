import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`/api/v1/logout`);
      if (data.success) {
        localStorage.removeItem("access_token");
        navigate("/");
      }
    } catch (error) {
      dispatch(logoutFail(error));
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-300 to-blue-300 text-white">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-opacity-30 backdrop-blur-lg shadow-md">
        <h1 className="text-2xl font-bold">MelodyVerse</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-purple-100">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Thank you Infloso.AI
        </h2>
      </div>
    </div>
  );
};

export default Home;
