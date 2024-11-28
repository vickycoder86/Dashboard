import React, { useEffect } from "react";
import SideBar from "./Sidebar";
import graph from "../../src/images/graph-1.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // by this code we can stop user to go to login page if already logged

  useEffect(() => {
    const jwtToken = localStorage.getItem("Session_Id");
    if (jwtToken) {
      navigate("/Home");
    } else {
      navigate("/");
    }
  }, []);

  //till here

  return (
    <>
      <SideBar />
    </>
  );
};

export default Home;
