import Home from "../src/Components/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./authentication/Login";

import CustomersList from "./Components/Customers/CustomersList";
import Customer from "./Components/Customers/Customer";
import CompanyData from "./Components/Companies/CompanyData";
import CustomerUsage from "./Components/Customers/CustomerUsage";
import Customerinfo from "./Components/Customers/Customerinfo";
import CompainesList from "./Components/Companies/CompainesList";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} /> 
        
        {/* <Route path="/" element={<Welcome />}/> */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Customerinfo" element={<Customerinfo />} />
        <Route path="/CustomersList" element={<CustomersList />} />
        <Route path="/CompainesList" element={<CompainesList />} />
        <Route path="/CompanyData" element={<CompanyData />} />
        <Route path="/CustomerUsage" element={<CustomerUsage />} />
      </Routes>
      {/* <Customers1 /> */}
    </>
  );
}

export default App;
