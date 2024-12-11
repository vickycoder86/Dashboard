import React, { useState } from "react";
import logo from "../../src/images/logo-with-text.png";
import logo1 from "../images/logo white.png";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hover } from "@testing-library/user-event/dist/hover";

const SideBar = () => {
  
  const [ismenuOpen, setIsMenuOpen] = useState(false);



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

 

  return (
    <>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={open}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>

      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-[230px] overflow-y-auto text-center bg-black text-white ${ismenuOpen ? "left-[10px]" : "left-0"}`}
      >
        <div className="p-2.5 mt-1 flex items-center">
          <img src={logo} alt="Logo" />
          <a href="">
            <i
              className="bi bi-x ml-12 cursor-pointer lg:hidden"
              onClick={open}
            ></i>
          </a>
        </div>
        <hr className="my-2 border-white" />
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-500">
          <i className="bi bi-house-door-fill text-white"></i>
          <button
            className="text-[15px] ml-4 text-white"
            onClick={viewHome}
          >
            Home
          </button>
        </div>
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-500">
          <i className="bi bi-people-fill text-white"></i>
          <button
            className="text-[15px] ml-4 text-white"
            onClick={viewCustomerList}
          >
            Customers
          </button>
        </div>
        
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-400  ">
        <i className="bi bi-building-fill text-white"></i>
          <button
            className="text-[15px] ml-4"
            onClick={viewCompainesList}
            
          >
            Companies
          </button>
        </div>

        <div className="flex text-[18px] gap-16" style={{position: "absolute", bottom: "2%", paddingLeft: "13px"}}>
        <i className="bi bi-gear text-white" title="Setting"></i>
        <i
            className="bi-brightness-high cursor-pointer" title="Change Mode coming soon.." // Toggle theme
          ></i>
          <i
            className="bi bi-box-arrow-right cursor-pointer text-white"
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
