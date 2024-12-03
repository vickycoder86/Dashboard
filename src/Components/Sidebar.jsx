import React, { useState } from "react";
import logo from "../../src/images/logo-with-text.png";
import logo1 from "../images/logo white.png";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ismenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage theme state

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const open = () => {
    setIsMenuOpen(!ismenuOpen);
  };

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("Session_Id");
    localStorage.removeItem("user_name");
    toast.error("Logout successful!", 
      setTimeout(() => navigate("/"), 1000)
    );
  }

  function viewCustomerList() {
    navigate("/CustomersList");
  }

  function viewCompainesList() {
    navigate("/CompainesList");
  }

  function viewHome() {
    navigate("/Home");
  }

  const userName = localStorage.getItem("user_name");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode); // Toggle dark class on the body
  };

  return (
    <>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={open}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>

      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-[230px] overflow-y-auto text-center ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } ${ismenuOpen ? "left-[10px]" : "left-0"}`}
      >
        <div className="p-2.5 mt-1 flex items-center">
          <img src={isDarkMode ? logo1 : logo} alt="Logo" />
          <i
            className="bi bi-x ml-12 cursor-pointer lg:hidden"
            onClick={open}
          ></i>
        </div>
        <hr className={`my-2 ${isDarkMode ? "border-white" : "border-black"}`} />
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
          <i className={`bi bi-house-door-fill ${isDarkMode ? "text-white" : "text-black"}`}></i>
          <button
            className="text-[15px] ml-4"
            onClick={viewHome}
            style={{ color: isDarkMode ? "#f0f0f0" : "#333" }}
          >
            Home
          </button>
        </div>
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
          <i className={`bi bi-people-fill ${isDarkMode ? "text-white" : "text-black"}`}></i>
          <button
            className="text-[15px] ml-4"
            onClick={viewCustomerList}
            style={{ color: isDarkMode ? "#f0f0f0" : "#333" }}
          >
            Customers
          </button>
        </div>
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
          <i className={`bi bi-building-fill ${isDarkMode ? "text-white" : "text-black"}`}></i>
          <button
            className="text-[15px] ml-4"
            onClick={viewCompainesList}
            style={{ color: isDarkMode ? "#f0f0f0" : "#333" }}
          >
            Companies
          </button>
        </div>

        <div className="flex text-[18px] gap-16 mt-60">
          <i className={`bi bi-gear ${isDarkMode ? "text-white" : "text-black"}`}title="Setting"></i>
          <i
            className={`bi bi-brightness-high cursor-pointer ${isDarkMode ? "text-white" : "text-black"}`}
            onClick={toggleTheme} title="Change Mode" // Toggle theme
          ></i>
          <i
            className={`bi bi-box-arrow-right cursor-pointer ${isDarkMode ? "text-white" : "text-black"}`}
            onClick={logout} title="Logout"
          ></i>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default SideBar;
