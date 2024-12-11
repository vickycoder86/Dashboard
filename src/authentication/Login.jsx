import React, { useEffect, useRef, useState } from "react";
import logo from "../../src/images/logo-with-text.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LOGIN } from "../Components/api/restapi";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import waves from "../images/Waves.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("Session_Id");
    if (sessionId) {
      navigate(-1);
    }
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
      const response = await axios.post(LOGIN, {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem(
        "user_name",
        `${response.data.fname} ${response.data.lname}`
      );
      localStorage.setItem("Session_Id", response.data.session_id);

      toast.success("Login successful!", { position: "top-center", autoClose: 700 });
      setTimeout(() => navigate("/Home"), 800);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={900}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />

      <form onSubmit={handleLogin}>
        <div className="flex justify-center min-h-screen p-6 sm:p-16">
          <div className="flex flex-col items-center max-w-md w-full rounded-md p-6 sm:p-10">
            <img src={logo} className="w-[250px] sm:w-[350px] h-auto" alt="Logo" />
            <h1 className="text-[18px] sm:text-[20px] text-gray-700 font-semibold text-center mt-4">
              Welcome back
            </h1>
            <p className="text-gray-500 text-[14px] sm:text-[16px] font-semibold text-center mt-2">
              Continue with your email and password
            </p>
            <Box sx={{ "& .MuiTextField-root": { m: 1, width: "42ch", marginTop: "25px" } }}>
              <TextField
                id="outlined-required"
                label="Email &nbsp;"
                inputRef={email}
                InputLabelProps={{ sx: { fontSize: "17px", fontWeight: "bold" } }}
                InputProps={{ sx: { fontSize: "16px" } }}
              />
              <div className="flex">
                <TextField
                  id="outlined-password"
                  label="Password &nbsp;"
                  type={visible ? "text" : "password"}
                  inputRef={password}
                  InputLabelProps={{ sx: { fontSize: "17px", fontWeight: "bold" } }}
                  InputProps={{ sx: { fontSize: "16px" } }}
                />
              </div>
            </Box>
            <button
              className="bg-[#00A0E3] text-white h-12 w-[360px] text-[15px] sm:text-[17px] font-bold rounded-md mt-6"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div
        style={{
          position: "fixed",
          top: 300,
          left: 0,
          width: "100vw",
          height: "80vh",
          backgroundImage: `url(${waves})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      ></div>
    </>
  );
};

export default Login;
