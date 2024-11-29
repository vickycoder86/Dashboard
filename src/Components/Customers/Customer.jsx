import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SESSION_ID, UPDATE_CUSTOMER } from "../api/restapi";

const Customer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("customer location is ", location.state);

  const [custId, setCustId] = useState(location.state.id);
  const [custname, setCustName] = useState(location.state.name);
  const [custAddress, setCustAddress] = useState(location.state.address);
  const [custCity, setCustCity] = useState(location.state.city);
  const [custrefBy, setCustRefBy] = useState(location.state.refer_by);
  const [adminname, setAdminname] = useState(location.state.admin_name);
  const [adminMobile, setAdminMobile] = useState(location.state.admin_mobile);
  const [installPrice, setInstallPrice] = useState(
    location.state.installation_price
  );
  const [renewalPrice, setRenuwalPrice] = useState(
    location.state.renewal_price
  );
  const [invoiceLimit, setInvoiceLimit] = useState(
    location.state.invoiceslimit
  );
  const [compainesLimit, setCompainesLimit] = useState(
    location.state.companieslimit
  );
  const [handler, setHandler] = useState(location.state.handler);
  const [remarks, setRemarks] = useState(location.state.remarks);

  function handleClose() {
    // closePopup();
    navigate(-1); // Navigates back to the previous page
  }

  //create a function so i can update customer data as needed
  let updateCustomerdatabody = {
    id: custId,
    name: custname,
    address: custAddress,
    city: custCity,
    refer_by: custrefBy,
    admin_name: adminname,
    admin_mobile: adminMobile,
    installation_price: installPrice,
    renewal_price: renewalPrice,
    invoices_limit: invoiceLimit,
    companies_limit: compainesLimit,
    handler: handler,
    remarks: remarks,
  };

  //created a function to uddate Customer data
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        UPDATE_CUSTOMER,
        updateCustomerdatabody,
        {
          headers: {
            "Session-Id": SESSION_ID,
          },
        }
      );
      // console.log("update customer Response:", response.data);

      // Show success
      toast.success("Data Update successful!", {});
      setTimeout(() => {
        navigate(-1);
      }, 800);
    } catch (error) {
      console.error("Data Update Error:", error);
      toast.error("Data not Updated. Please try again.");
    }
  };

  return (
    <>
      <SideBar />
      <ToastContainer
        position="top-center"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="flex flex-col items-center justify-center lg:ml-[240px] px-4 py-8">
        <div className="bg-white border-sky-600 w-full max-w-6xl p-4">
          <h1 className="text-center text-2xl md:text-3xl text-sky-600 mb-6">Customer Data</h1>
  
          <div className="mb-4">
            <label className="block text-sm text-black">Customer ID</label>
            <input
              value={custId}
              disabled
              onChange={(e) => setCustId(e.target.value)}
              type="text"
              placeholder="Enter Your content"
              className="w-full md:w-1/3 border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
            />
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Customer Name</label>
              <input
                value={custname}
                onChange={(e) => setCustName(e.target.value)}
                type="text"
                placeholder="Enter Your content"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Address</label>
              <input
                value={custAddress}
                onChange={(e) => setCustAddress(e.target.value)}
                type="text"
                placeholder="Enter Your content"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[100px]">
              <label className="block text-sm font-bold text-black">City</label>
              <input
                value={custCity}
                onChange={(e) => setCustCity(e.target.value)}
                type="text"
                placeholder="Enter Your content"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Refer By</label>
              <input
                value={custrefBy}
                onChange={(e) => setCustRefBy(e.target.value)}
                type="text"
                placeholder="Enter referral name"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Admin</label>
              <input
                value={adminname}
                onChange={(e) => setAdminname(e.target.value)}
                type="text"
                placeholder="Enter Admin name"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-black">Admin Number</label>
              <input
                value={adminMobile}
                onChange={(e) => setAdminMobile(e.target.value)}
                type="text"
                placeholder="Mobile Number"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Installation Price</label>
              <input
                value={installPrice}
                onChange={(e) => setInstallPrice(e.target.value)}
                type="text"
                placeholder="Enter Installation Price"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Renewal Price</label>
              <input
                value={renewalPrice}
                onChange={(e) => setRenuwalPrice(e.target.value)}
                type="text"
                placeholder="Enter amounts"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Invoices Limit</label>
              <input
                value={invoiceLimit}
                onChange={(e) => setInvoiceLimit(e.target.value)}
                type="text"
                placeholder="Enter in Digits"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Companies Limit</label>
              <input
                value={compainesLimit}
                onChange={(e) => setCompainesLimit(e.target.value)}
                type="text"
                placeholder="Enter in Digits"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Handle By</label>
              <input
                value={handler}
                onChange={(e) => setHandler(e.target.value)}
                type="text"
                placeholder="Enter Handler name"
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
  
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-black">Remarks</label>
              <input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                type="textarea"
                placeholder="Enter Remarks..."
                className="w-full border border-slate-200 rounded-lg py-2 px-4 outline-none bg-transparent"
              />
            </div>
          </div>
  
          <div className="flex flex-wrap gap-4">
            <button
              className="w-full md:w-[250px] py-3 px-4 font-semibold text-white bg-blue-500 rounded-lg"
              onClick={handleUpdateCustomer}
            >
              Update Data
            </button>
  
            <button
              className="w-full md:w-[200px] py-3 px-4 font-semibold text-white bg-red-500 rounded-lg"
              onClick={handleClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </section>
    </>
  );
  
};

export default Customer;
