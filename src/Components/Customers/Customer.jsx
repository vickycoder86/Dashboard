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
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="flex items-center justify-center ml-[240px] py-8 ">
        <div className=" bg-white border-sky-600">
          <h1 className="text-center text-[32px] text-sky-600">
            Customer Data
          </h1>
          <p className="text-[18px] text-black ml-6">Customer ID</p>
          <input
            value={custId}
            disabled={true}
            onChange={(e) => setCustId(e.target.value)}
            type="text"
            placeholder="Enter Your content "
            className="w-[200px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
          />
          <div className="flex">
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Customer Name
            </p>
            <input
              value={custname}
              onChange={(e) => setCustName(e.target.value)}
              type="text"
              placeholder="Enter Your content "
              className="w-[300px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />

            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Address
            </p>
            <input
              value={custAddress}
              onChange={(e) => setCustAddress(e.target.value)}
              type="text"
              placeholder="Enter Your content "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-3 outline-none bg-transparent"
            />

            <p className="text-[16px] py-6  text-black ml-4 font-bold">City</p>
            <input
              value={custCity}
              onChange={(e) => setCustCity(e.target.value)}
              type="text"
              placeholder="Enter Your content "
              className="w-[90px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-3 outline-none bg-transparent"
            />
          </div>
          <div className="flex">
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Refer By
            </p>
            <input
              value={custrefBy}
              onChange={(e) => setCustRefBy(e.target.value)}
              type="text"
              placeholder="Enter referal name "
              className="w-[280px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />

            <p className="text-[16px] py-6  text-black ml-4 font-bold">Admin</p>
            <input
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
              type="text"
              placeholder="Enter Admin name "
              className="w-[280px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Admin Number
            </p>
            <input
              value={adminMobile}
              onChange={(e) => setAdminMobile(e.target.value)}
              type="text"
              placeholder="Mobile Number "
              className="w-[150px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-3 outline-none bg-transparent"
            />
          </div>
          <div className="flex">
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Installation Price
            </p>
            <input
              value={installPrice}
              onChange={(e) => setInstallPrice(e.target.value)}
              type="text"
              placeholder="Enter Installation Price "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Renewal price
            </p>
            <input
              value={renewalPrice}
              onChange={(e) => setRenuwalPrice(e.target.value)}
              type="text"
              placeholder="Enter in amounts "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
          </div>
          <div className="flex">
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Invoices Limit
            </p>
            <input
              value={invoiceLimit}
              onChange={(e) => setInvoiceLimit(e.target.value)}
              type="text"
              placeholder="Enter in Digits "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Compaines Limit
            </p>
            <input
              value={compainesLimit}
              onChange={(e) => setCompainesLimit(e.target.value)}
              type="text"
              placeholder="Enter in Digits "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
          </div>
          <div className="flex">
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Handle By
            </p>
            <input
              value={handler}
              onChange={(e) => setHandler(e.target.value)}
              type="text"
              placeholder="Enter Handler name "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
            <p className="text-[16px] py-6  text-black ml-4 font-bold">
              Remarks
            </p>
            <input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              type="textarea"
              placeholder="Enter Remarks.... "
              className="w-[350px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
            />
          </div>

          <button
            className="inline-flex ml-6 my-2 w-[250px] items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
            onClick={handleUpdateCustomer}
          >
            Update Data
          </button>

          <button
            className="inline-flex ml-6 my-2 w-[200px] items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[60px]"
            onClick={handleClose} // Close button handler
          >
            CLOSE
          </button>
        </div>
      </section>
    </>
  );
};

export default Customer;
