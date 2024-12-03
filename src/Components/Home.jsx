import React, { useEffect } from "react";
import SideBar from "./Sidebar";
import graph from "../images/graph-3.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("user_name");

  // by this code we can stop user to go to login page if already logged

  useEffect(() => {
    const jwtToken = localStorage.getItem("Session_Id");
    if (jwtToken) {
      navigate("/Home");
    } else {
      navigate("/");
    }
  }, []);

  function logout() {
    localStorage.removeItem("Session_Id");
    localStorage.removeItem("user_name");
    toast.error(
      "Logout successful!",
      setTimeout(() => navigate("/"), 1000)
    );
  }

  //till here

  return (
    <>
      <SideBar />
      <div className="flex justify-between px-4 py-3">
        {/* Left Section */}
        <div className="ml-[240px]">
          <h1 className="font-bold">
            Welcome <span className=" text-black">{userName}</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="p-2.5 flex items-center rounded-md bg-pink-300 cursor-pointer text-red-800 hover:bg-red-400">
            <i className="bi bi-box-arrow-in-right"></i>
            <span
              className="text-[15px] ml-4 font-bold  text-red-800"
              onClick={logout}
            >
              Logout
            </span>
          </div>
          <i className="bi bi-bell-fill block text-[24px]"></i>
          <button className="rounded-full bg-blue-600 p-4 text-white">
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
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
      <div
        style={{
          position: "fixed",
          top: -5,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${graph})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      ></div>
    </>
  );
};

export default Home;
