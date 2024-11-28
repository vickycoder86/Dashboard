import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import { SESSION_ID, UPDATE_COMPANY } from "../api/restapi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calender from "../Calender";

const CompanyData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("comapany location is ", location.state);

  const [companyId, setCompanyId] = useState(location.state.id);
  const [paymentalertDate, setPaymentAlertDate] = useState(
    location.state.payment_alert_date
  );
  const [freezedate, setFreezeDate] = useState(location.state.freeze_date);
  const [terminateDate, setTerminateDate] = useState(
    location.state.terminate_date
  );
  const [orderbookStatus, setOrderBookStatus] = useState(
    location.state.orderbook_enabled
  );

  function handleClose() {
    // closePopup();
    navigate(-1); // Navigates back to the previous page
  }

  //create a function so i can update customer data as needed
  let updateCompanydatabody = {
    id: companyId,
    payment_alert_date: paymentalertDate,
    freeze_date: freezedate,
    terminate_date: terminateDate,
    orderbook_enabled: orderbookStatus,
  };

  //created a function to uddate Customer data
  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UPDATE_COMPANY, updateCompanydatabody, {
        headers: {
          "Session-Id": SESSION_ID,
        },
      });
      // console.log("update company Response:", response.data);

      // Show success
      toast.success("Data Update successful!", {});
    } catch (error) {
      console.error("Data Update Error:", error);
      toast.error("Data not Updated. Please try again.");
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  const getSelectValue = (e) => {
    setOrderBookStatus(e.target.value);
  };

  return (
    <>
      <SideBar />
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5 ml-[200px]">
        <div className=" bg-white border-sky-600 rounded-md">
          <form onSubmit={formSubmit}>
            <h1 className="text-center text-[32px] text-sky-600 ">
              Company Data
            </h1>
            <p className="text-[16px] py-2 text-black ml-4 font-bold">
              Payment Alert Date
            </p>
            <Calender value={paymentalertDate} onChange={setPaymentAlertDate} />

            <p className="text-[16px] text-black ml-4 font-bold">Freeze Date</p>
            <Calender value={freezedate} onChange={setFreezeDate} />

            <p className="text-[16px]  text-black ml-4 font-bold">
              Terminate Date
            </p>
            <Calender value={terminateDate} onChange={setTerminateDate} />

            <p className="text-[16px] text-black ml-4 py-2   font-bold">
              OrderedBook Enabled
            </p>
            <select
              className="text-[16px] text-black ml-4 font-bold rounded-md py-2 w-[300px]"
              defaultValue={orderbookStatus}
              value={orderbookStatus}
              onChange={getSelectValue}
            >
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
            <div>
              <button
                className="inline-flex ml-2 w-[180px] items-center justify-center px-8 py-4 mt-6  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[50px]"
                onClick={handleUpdateCompany}
              >
                Update Data
              </button>

              <button
                className="inline-flex ml-4 my-2 w-[150px] items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[50px]"
                onClick={handleClose} // Close button handler
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CompanyData;
