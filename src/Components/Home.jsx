import React, { useEffect } from "react";
import SideBar from "./Sidebar";
import graph from "../images/graph-3.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dasbbord from "../images/dashboaed coming soon.png"

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
      <div className="flex justify-between px-4 py-3" style={{alignItems: "center"}}>
        {/* Left Section */}
        <div className="ml-[240px]">
          <h1 style={{fontSize: "20px", fontWeight: 700}}>
            Welcome <span className=" text-black">{userName}</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-5" >
          <div className="p-2.5 flex items-center rounded-md  cursor-pointer text-red-500 hover:text-red-600" style={{fontSize: "20px"}} >
            <i className="bi bi-box-arrow-in-right"></i>
            <span
              className="text-[15px] ml-4 font-bold  text-red-500 hover:text-red-600"
              style={{fontSize: "20px"}}
              title="Logout"
              onClick={logout}
            >
              Logout
            </span>
          </div>
          <i className="bi bi-bell-fill block text-[24px]" style={{color: "#c7c3c3"}} title="Alert"></i>
          <button style={{backgroundColor: "#bbe7fc", color: "#1c1b75" ,fontSize: "22px" ,fontWeight: "bold", height: "45px", width: "45px",borderRadius: "50%", display: "inline-block" , boxShadow: "1px 1px 1px 1px #E6E6E6"}} title={userName}>
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
      <div>
          <img src={Dasbbord} alt=""
          style={{display: "block", marginLeft:"44%", marginTop:"11%",height:"250px"}}
          />
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
    </>
    
  );
};

export default Home;
