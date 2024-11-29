import React, { useState } from "react";
import logo from "../../src/images/logo-with-text.png";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ismenuOpen, setIsMenuOpen] = useState(false);

  //for menu dropdown hide/show
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //for main menu hide /open
  const open = () => {
    setIsMenuOpen(!ismenuOpen);
  };

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("Session_Id");
    localStorage.removeItem("user_name");
    // Show success toast and delay navigation
    toast.error("Logout successful!", 
      
      // Delay navigation slightly to allow the toast to show
    setTimeout(() => navigate("/"), 1000)
      // Navigate after toast closes
    );
  }

  function viewCustomerList() {
    // navigate("/Customers")
    navigate("/CustomersList");
  }

  function viewCompainesList() {
    // navigate("/Customers")
    navigate("/CompainesList");
  }

  function viewHome() {
    navigate("/Home");
  }

  const userName = localStorage.getItem("user_name");
  

  return (
    <>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={open}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>

      <div
        //i can decrease size of sidebar with w-[250px] or low
        className={`sidebar fixed top-0  bottom-0 lg:left-0 left-[-300px] p-2 w-[230px] overflow-y-auto text-center bg-gray-900 ${
          ismenuOpen ? "left-[10px]" : "left-0"
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 bg-blue-600 rounded-md"></i>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              DashBoard
            </h1>
            <i
              className="bi bi-x ml-12 cursor-pointer lg:hidden"
              onClick={open}
            ></i>
          </div>
          <hr className="my-2 text-gray-600" />
        </div>
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            className=" text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            placeholder="Search"
          />
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
          <i className="bi bi-house-door-fill"></i>
          <button className=" text-[15px] ml-4  text-gray-200"onClick={viewHome}>Home</button>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
          <i className="bi bi-people-fill"></i>
          <button
            className=" text-[15px] ml-4  text-gray-200"
            onClick={viewCustomerList}
          >
            Customers
          </button>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
          <i className="bi bi-building-fill"></i>
          <button
            className=" text-[15px] ml-4  text-gray-200"
            onClick={viewCompainesList}
          >
            Companies
          </button>
        </div>
        <hr className="my-4 text-gray-600" />

        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600"
          onClick={toggleDropdown}
        >
          <i className="bi bi-chat-left-text-fill"></i>
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200">Transaction</span>
            <span
              className={`text-sm ${isOpen ? "rotate-180" : ""}`}
              id="arrow"
            >
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>

        {/* Dropdown content */}
        <div
          className={`text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200 ${
            isOpen ? "" : "hidden"
          }`}
          id="submenu"
        >
          <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
            Task
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
            Message
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
            Others
          </h1>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
          <i className="bi bi-box-arrow-in-right"></i>
          <span className=" text-[15px] ml-4  text-gray-200" onClick={logout}>
            Logout
          </span>

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
        <h1 className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300   text-white">
          Welcome <p className="text-yellow-600 pl-2"> {userName}</p>
        </h1>
        <img src={logo} className="mt-20" />
      </div>
    </>
  );
};

export default SideBar;

//bootstrap icons