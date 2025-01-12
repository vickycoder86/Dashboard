import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../Sidebar";
import nodata from "../../images/nodata.png"

const CustomerUsage = () => {
  const location = useLocation();
  const [custname, setCustName] = useState(location.state.name);
  const [usageData, setUsageData] = useState(null); // State to hold API data
  const [selectYear, setSelectYear] = useState("2024-25"); // Default selected year
  const navigate = useNavigate();

  const SESSION_ID = localStorage.getItem("Session_Id");

  // Redirect to login if session is not available
  useEffect(() => {
    const jwtToken = localStorage.getItem("Session_Id");
    if (!jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const customerID = location.state.id;

  // Fetch customer usage data
  const getCustomerUsage = async () => {
    try {
      const response = await axios.get(
        `https://app.simplehisaab.com/api/v1/admin-portal/getCustomerUsageMetrics?customer_id=${customerID}`,
        {
          headers: {
            "Session-Id": SESSION_ID,
          },
        }
      );
      setUsageData(response.data);
    } catch (error) {
      console.error("Error fetching customer usage data:", error);
    }
  };

  useEffect(() => {
    getCustomerUsage();
  }, []);

  const handleChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleClose = () => {
    navigate(-1);
  };

  // Display loading message while data is being fetched
  if (!usageData) {
    return <div className="items-center flex justify-center py-4">
      <img src={nodata}/>
      </div>;
  }

  // Check for missing or empty data
  if (
    !usageData.year_wise_transaction_summary ||
    usageData.year_wise_transaction_summary.length === 0 ||
    !usageData.year_wise_api_usage ||
    usageData.year_wise_api_usage.length === 0
  ) {
    return <div className="text-center py-10">No data yet</div>;
  }

  const yearTransactionData = usageData.year_wise_transaction_summary.find(
    (item) => item.year === selectYear
  );

  const yearApiUsageData = usageData.year_wise_api_usage.find(
    (item) => item.year === selectYear
  );

  return (
    <>
      <div>
        <SideBar />
        <div className="p-4 sm:p-6 ml-[240px]">
          <h1 className="text-center font-bold py-2 text-2xl">
            <span id="mark">Customer Usage</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <p className="font-bold px-2">Customer Name: {custname}</p>
            <p className="font-bold px-2">
              Total Database Storage:{" "}
              {usageData.total_database_storage_formatted}
            </p>
            <p className="font-bold px-2">
              Total File Storage: {usageData.total_file_storage_formatted}
            </p>
            <p className="font-bold px-2">
              Total Files: {usageData.total_files}
            </p>
            <p className="font-bold px-2">
              Total TRN Files: {usageData.total_trn_files}
            </p>
            <p className="font-bold px-2">
              Total Item Files: {usageData.total_item_files}
            </p>
          </div>

          <div className="my-4">
            <label className="font-bold px-2">Select Year:</label>
            <select
              value={selectYear}
              onChange={handleChange}
              className="rounded-md py-2 px-4 border border-gray-300"
            >
              {usageData.year_wise_transaction_summary.map((item) => (
                <option key={item.year} value={item.year}>
                  {item.year}
                </option>
              ))}
            </select>
          </div>

          <h3 className="font-bold py-2 px-2 mt-[30px]">
            Transaction Summary for {selectYear}
          </h3>
          <div
            className="overflow-x-auto"
            style={{
              boxShadow: "0 0 5px 2px #F0F0F0",
              borderRadius: "8px",
              border: "1px solid #D6D6D6",
            }}
          >
            <table
              className="table-auto w-full"
              style={{
                textAlign: "left",
                lineHeight: "2.2",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #EDEDED" }}>
                  <th className=" px-2 py-1">Type</th>
                  <th className=" px-2 py-1">Count</th>
                  <th className=" px-2 py-1">Total Amount</th>
                  <th className=" px-2 py-1">First Created At (MM/DD/YY)</th>
                  <th className=" px-2 py-1">Last Created At (MM/DD/YY)</th>
                </tr>
              </thead>
              <tbody>
                {yearTransactionData?.data.map((record, index) => (
                  <tr key={index} style={{ borderBottom: "2px solid #EDEDED" }}>
                    <td className="px-2 py-1">{record.type}</td>
                    <td className="px-2 py-1">{record.count}</td>
                    <td className="px-2 py-1">{record.total_amt}</td>
                    <td className="px-2 py-1">
                      {new Date(record.first_created_at).toLocaleString()}
                    </td>
                    <td className="px-2 py-1">
                      {new Date(record.last_created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: "2px solid #000", fontWeight: "bold" }}>
                  <td className="px-2 py-1">Total</td>
                  <td className="px-2 py-1">
                    {yearTransactionData?.data.reduce(
                      (sum, record) => sum + record.count,
                      0
                    )}
                  </td>
                  <td className="px-2 py-1">
                    {yearTransactionData?.data.reduce(
                      (sum, record) => sum + record.total_amt,
                      0
                    )}
                  </td>
                  <td className="px-2 py-1"></td>
                  <td className="px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold py-2 px-2 mt-[60px]">
            API Usage Summary for {selectYear}
          </h3>
          <div
            className="overflow-x-auto"
            style={{
              boxShadow: "0 0 5px 2px #F0F0F0",
              borderRadius: "8px",
              border: "1px solid #D6D6D6",
            }}
          >
            <table
              className="table-auto w-full"
              style={{
                textAlign: "left",
                lineHeight: "2.4",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #EDEDED" }}>
                  <th className=" px-2 py-1">API Type</th>
                  <th className="px-2 py-1">Count</th>
                </tr>
              </thead>
              <tbody>
                {yearApiUsageData?.data.map((apiRecord, index) => (
                  <tr key={index} style={{ borderBottom: "2px solid #EDEDED" }}>
                    <td className="px-2 py-1">{apiRecord.type}</td>
                    <td className="px-2 py-1">{apiRecord.count}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "2px solid #000", fontWeight: "bold" }}>
                  <td className="px-2 py-1">Total</td>
                  <td className="px-2 py-1">
                    {yearApiUsageData?.data.reduce(
                      (sum, apiRecord) => sum + apiRecord.count,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <i className="fa-solid fa-arrow-left" style={{ color: "red" }}></i>
            <button
              className="inline-flex w-full sm:w-[200px] items-center justify-center font-sans font-semibold tracking-wide py-2 mt-4 text-white bg-stone-800 hover:bg-stone-700 rounded-lg h-[50px]"
              onClick={handleClose}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerUsage;
