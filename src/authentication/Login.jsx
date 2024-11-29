import React, { useEffect, useRef, useState } from "react";
import "../authentication/Login.css";
import logo from "../../src/images/logo-with-text.png";
import feat from "../../src/images/graph.webp";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LOGIN } from "../Components/api/restapi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const email = useRef();
  const password = useRef();
  const [visible, setVisible] = useState(false);


  // by this code we can stop user to go to login page if user is already logged

  useEffect(() => {
    const sessionId = localStorage.getItem("Session_Id");
    if (sessionId) {
      // alert("You are already logged in.");
      navigate(-1); // Redirect to the home or dashboard page
    }
    //set the autofoucs on email textbox when login page is loading
    if (email.current) {
      email.current.focus();
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
  
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
  
    if (!emailValue || !passwordValue) {
      toast.error("Email and password cannot be blank.");
      return;
    }
  
    try {
      const response = await axios.post(LOGIN, { email: emailValue, password: passwordValue });
      // console.log("Login Response:", response.data);
  
      localStorage.setItem(
        "user_name",`${response.data.fname} ${response.data.lname}`);
      localStorage.setItem("Session_Id", response.data.session_id);
  
      // Show success toast and delay navigation
      toast.success("Login successful!", {
        onClose: () => navigate("/Home"), // Navigate after toast closes
      });
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };
  

  return (
    <>
      <div>
        <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
        <center>
          <form onSubmit={handleLogin}>
            <div className="login-container">
              <div className="login-container-1">
                <img src={logo} className="logo-login" alt="Logo" />
                <h2 className="screen-text">
                  Screen <span>Lock</span>
                </h2>
                <input
                  className="login-inputbox"
                  type="text"
                  placeholder="Email"
                  ref={email}
                />
                <div className="flex">
                  <input
                    className="login-inputbox"
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    ref={password}
                  />
                  <div
                    className="pt-4"
                    onClick={() => setVisible(!visible)}
                    style={{ cursor: "pointer" }}
                  >
                    {visible ? (
                      <i className="bi bi-eye-fill"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill"></i>
                    )}
                  </div>
                </div>

                <button className="login-button" type="submit">
                  Login
                </button>
                <div className="pin">Forget pin?</div>
              </div>
              <hr />
              <div className="login-container-2">
                <img src={feat} className="feat-class" alt="Feature" />
                <div className="info">Access data on your fingertips</div>
              </div>
            </div>
          </form>
        </center>
      </div>
    </>
  );
};

export default Login;
