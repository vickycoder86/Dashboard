import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import "flowbite";
// import logo from "../../src/images/logo-with-text.png";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the Data Grid

import "./Customerinfo.css"
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Customerinfo = ({ closePopup, isopen }) => {
  const location = useLocation();
  // console.log(" customer location is",location.state)

  useEffect(() => {}, [location]);

  const navigate = useNavigate();

  const [custname, setCustName] = useState(location.state.name);
  const [custAddress, setCustAddress] = useState(location.state.address);
  const [custGst, setCustGst] = useState(location.state.city);
  const [custPhone, setCustPhone] = useState(location.state.admin_mobile);
  const [custId, setCustId] = useState(location.state.id);
  const [adminName, setAdminName] = useState(location.state.admin_name);
  const [installPrice, setInstallPrice] = useState(
    location.state.installation_price
  );
  const [renewalPrice, setRenewalPrice] = useState(
    location.state.renewal_price
  );
  const [companydata, setCompanydata] = useState(location.state.companies);
  // console.log(companydata);

  const [userData, setUserData] = useState(location.state.users);
  // console.log(userData);

  const [orderBookEnable, setOrderBookEnable] = useState(
    location.state.orderbook_enabled
  );
  const [referby, setReferBy] = useState(location.state.refer_by);
  const [remarks, setRemarks] = useState(location.state.remarks);

  const [handler, setHandler] = useState(location.state.handler);
  const [invoicesLimit, setInvoicesLimit] = useState(
    location.state.invoiceslimit
  );
  const [companieslimit, setcompanieslimit] = useState(
    location.state.companieslimit
  );

  const [showCompainesdata, setShowCompainesData] = useState(true);

  //this is for companies list
  const [rowData, setRowData] = useState(location.state.companies);
  // console.log(rowData);

  const UpdateCompanyData = ({
    id,
    name,
    gstno,
    industry,
    created_at,
    payment_alert_date,
    freeze_date,
    terminate_date,
    orderbook_enabled,
  }) => (
    <button
    className="inline-flex my-2 w-[50px] items-center justify-center px-2 py-4 font-sans font-semibold tracking-wide text-white bg-stone-800 hover:bg-stone-700  h-[30px]"
    style={{margin: "4px", borderRadius: "5px", alignItems: "center"}}
    onClick={() =>
        navigate("/CompanyData", {
          state: {
            id: id,
            name: name,
            industry: industry,
            created_at: created_at,
            payment_alert_date: payment_alert_date,
            freeze_date: freeze_date,
            terminate_date: terminate_date,
            orderbook_enabled: orderbook_enabled,
            orderbook_enabled: orderbook_enabled,
            gstno: gstno,
          },
        })
      }
    >
      EDIT
    </button>
  );
  //function to view customerUsage with Paramater customer ID
  const viewCustomerUsage = ({ id, name }) => {
    navigate("/CustomerUsage", {
      state: { id: custId, name: custname },
    });
  };

  //this is for companies list

  //  company Manage column visibility state
  const [columnsVisibilityCompany, setColumnsVisibilityCompany] = useState({
    id: true,
    name: true,
    gst_no: true,
    industry: true,
    created_at: true,
    payment_alert_date: true,
    freeze_date: true,
    terminate_date: true,
    orderbook_enabled: true,
    Actions: true,
  });

  //  company Manage sidebar visibility state
  const [isSidebarVisibleCompany, setSidebarVisibleCompany] = useState(false);
  const [columnDefsCompany, setColumnDefsCompany] = useState([
    {
      field: "id",
      headerName: "Company ID",
      headerCheckboxSelection: true,
      filter: true,
      floatingFilter: true,
      checkboxSelection: true,
      pinned: "left",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Company Name",
      filter: true,
      floatingFilter: true,
      pinned: "left",

      flex: 2,
    },
    {
      field: "gst_no",
      headerName: "Gst No",
      filter: true,
      floatingFilter: true,
      width: 185,
      // flex: 4,
    },
    {
      field: "industry",
      headerName: "industry",
      filter: true,
      floatingFilter: true,
      width: 140,
      // flex: 4,
    },
    {
      field: "created_at",
      headerName: "Created at",
      valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 140,

      // flex: 3,
    },
    {
      field: "payment_alert_date",
      headerName: "Payment Alert Date",
      valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      // flex: 3,
    },
    {
      field: "freeze_date",
      headerName: "Freeze Date",
      valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },

    {
      field: "terminate_date",
      headerName: "Terminate Date",
      valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
      filter: true,
      floatingFilter: true,
      width: 145,
      // flex: 4,
    },
    {
      field: "orderbook_enabled",
      headerName: "Orderbook Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: (params) => {
        return params.value ? "YES" : "NO";
      },
      // flex: 4,
    },
    {
      field: "Actions",
      width: 100,
      pinned: "right",
      cellRenderer: (props) => {
        // console.log(props);
        // return <WishHappyBirthday name={props.data.Customer_Name} station= {props.data.Station}/>;
        return (
          <UpdateCompanyData
            id={props.data.id}
            name={props.data.name}
            gstno={props.data.gst_no}
            industry={props.data.industry}
            created_at={props.data.created_at}
            payment_alert_date={props.data.payment_alert_date}
            freeze_date={props.data.freeze_date}
            terminate_date={props.data.terminate_date}
            orderbook_enabled={props.data.orderbook_enabled}
          />
        );
      },
      // flex:2
    },
  ]);

  // company Filter visible columns based on checkbox state
  const visibleColumnsCompany = columnDefsCompany.filter(
    (col) => columnsVisibilityCompany[col.field]
  );

  // company Handle checkbox change to toggle column visibility
  const handleCheckboxChangeCompany = (column) => {
    setColumnsVisibilityCompany({
      ...columnsVisibilityCompany,
      [column]: !columnsVisibilityCompany[column],
    });
  };

  // company Toggle sidebar visibility
  const toggleSidebarCompany = () => {
    setSidebarVisibleCompany(!isSidebarVisibleCompany);
  };

  //this is for users list

  //this is for users list:-

  //  users Manage column visibility state
  const [columnsVisibilityUsers, setColumnsVisibilityUsers] = useState({
    email: true,
    fname: true,
    lname: true,
    mobile: true,
    // added_at:true,
    role: true,
    logged_in_devices_count: true,
  });

  //  users Manage sidebar visibility state
  const [isSidebarVisibleUsers, setSidebarVisibleusers] = useState(false);

  const [rowDataUsers, setRowDataUsers] = useState(location.state.users);
  // console.log(rowDataUsers);

  const [columnDefsUsers, setColumnDefsUsers] = useState([
    {
      field: "email",
      headerName: "Email",
      headerCheckboxSelection: true,
      filter: true,
      floatingFilter: true,
      checkboxSelection: true,
      // pinned: "left",
      width: 290,
      // flex: 1,
    },
    {
      field: "fname",
      headerName: "First Name",
      filter: true,
      floatingFilter: true,
      width: 180,
      // pinned: "left",
    },
    {
      field: "lname",
      headerName: "Last Name",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    // {
    //   field: "added_at",
    //   headerName: "added_at",
    //   valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
    //   filter: true,
    //   floatingFilter: true,
    //   tooltipField: "name",

    //   // flex: 3,
    // },
    {
      field: "role",
      headerName: "Role",
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 140,
      // flex: 3,
    },
    {
      field: "logged_in_devices_count",
      headerName: "Logged in(devices)",

      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
  ]);

  // users Filter visible columns based on checkbox state
  const visibleColumns = columnDefsUsers.filter(
    (col) => columnsVisibilityUsers[col.field]
  );

  // users Handle checkbox change to toggle column visibility
  const handleCheckboxChange = (column) => {
    setColumnsVisibilityUsers({
      ...columnsVisibilityUsers,
      [column]: !columnsVisibilityUsers[column],
    });
  };

  // users Toggle sidebar visibility
  const toggleSidebarUsers = () => {
    setSidebarVisibleusers(!isSidebarVisibleUsers);
  };

  const UpdateCustomerData = () => {
    navigate("/Customer", {
      state: {
        id: custId,
        name: custname,
        address: custAddress,
        city: custGst,
        admin_mobile: custPhone,
        admin_name: adminName,
        installation_price: installPrice,
        renewal_price: renewalPrice,
        companies: companydata,
        orderbook_enabled: orderBookEnable,
        users: userData,
        refer_by: referby,
        remarks: remarks,
        handler: handler,
        invoiceslimit: invoicesLimit,
        companieslimit: companieslimit,
      },
    });
  };

  return (
    <>
      <div className="mt-4 mb-5">
          <SideBar />

          <div className="w-full max-w-sm h-[290px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-[240px]">
            <div className="flex justify-end px-4 pt-4">
              <div
                id="dropdown"
                className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul className="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={UpdateCustomerData}
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => setShowCompainesData(!showCompainesdata)}
                    >
                      {showCompainesdata ? "Hide Details" : "Show Details"}
                    </a>
                  </li>
                  <li>
                    <a
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={viewCustomerUsage}
                    >
                      View Usage
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10">
              {/* <img
                className="w-36 h-20 mb-5 rounded-full shadow-lg p-3"
                src={logo1}
                alt="Customer Logo"
              /> */}
              <div className="flex">
                <div className="font-medium  text-gray-900 dark:text-white">
                  Customer ID :
                </div>
                <div className="mb-1 px-2 text-md dark:text-white">{custId}</div>
              </div>
              <div className="flex">
                <div className="font-medium  text-gray-900 dark:text-white">
                  Customer Name :
                </div>
                <h5 className="mb-1 px-2 text-md  text-gray-900 dark:text-white">
                  {custname}
                </h5>
              </div>
              <div className="flex">
                <div className="font-medium  text-gray-900 dark:text-white">
                  Address :
                </div>
                <h5 className="mb-1 px-2 text-md  text-gray-900 dark:text-white">
                  {custAddress}
                </h5>
              </div>
              <div className="flex gap-2">
                <div className="font-medium  text-gray-900 dark:text-white">
                  Admin:
                </div>
                <h5 className="mb-1 text-md  text-gray-900 dark:text-white">
                  {adminName}
                </h5>
                <h5 className="mb-1 text-md  text-gray-900 dark:text-white">
                  ({custPhone})
                </h5>
              </div>
              <div className="flex gap-2">
                <div className="font-medium  text-gray-900 dark:text-white">
                  Installation Price:
                </div>
                <h5 className="mb-1 text-md  text-gray-900 dark:text-white">
                  &#8377;{installPrice}
                </h5>
                <div className="font-medium text-gray-900 dark:text-white">
                  Renewal Price:
                </div>
                <div className="mb-1 text-md  text-gray-900 dark:text-white">
                  &#8377;{renewalPrice}
                </div>
              </div>
              <div className="flex gap-2 py-1">
                <div className="font-medium text-red-600">Invoices Limit:</div>
                <h5 className="mb-1 text-md  text-gray-900 dark:text-white">
                  {invoicesLimit}
                </h5>
                <div className="font-medium text-red-600 ml-4">
                  Compaines Limit:
                </div>
                <div className="mb-1 text-md  text-gray-900 dark:text-white">
                  {companieslimit}
                </div>
              </div>

              <div className="flex mt-4 md:mt-6">
                <a
                  
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-black text-rose-50 rounded-lg hover:bg-stone-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={UpdateCustomerData}
                  style={{cursor: "pointer"}}
                >
                  Edit
                </a>
                <button
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setShowCompainesData(!showCompainesdata)}
                >
                  {showCompainesdata ? "Hide Details" : "Show Details"}
                </button>
                <button
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={viewCustomerUsage}
                >
                  View Usage
                </button>
              </div>
            </div>
          </div>

          {showCompainesdata ? (
            <>
              {/* this is for company list */}
              <h1 className="ml-[240px] text-center  m-[25px]" style={{fontSize: "20px", fontWeight: "bolder"}}>
                <span id="mark">Company List</span>
              </h1>

              {/*  company Sidebar Toggle Button */}
              <button
                id="viewHideButton"
                onClick={toggleSidebarCompany}
                title="Hide & Show Columns"
                style={{
                  position: "absolute",

                  right: isSidebarVisibleCompany ? "200px" : "10px",
                  zIndex: 1,
                }}
              >
                {isSidebarVisibleCompany ? (
                  <i class="bi bi-arrow-right-circle-fill text-[#00A0E3]"></i>
                ) : (
                  <i class="bi bi-layout-sidebar-inset-reverse   text-[#00A0E3]"></i>
                )}
              </button>

              {/* company Sidebar */}
              <div
                style={{
                  width: isSidebarVisibleCompany ? "190px" : "0",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  float: "right",
                  padding: isSidebarVisibleCompany ? "20px" : "0",
                  borderLeft: isSidebarVisibleCompany ? "1px solid #ccc" : "none",
                  backgroundColor: "#000000",
                  color: "white",
                  position: "relative",
                }}
              >
                {isSidebarVisibleCompany && (
                  <>
                    <h3>Show/Hide Columns</h3>
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.id}
                        onChange={() => handleCheckboxChangeCompany("id")}
                      />
                      ID
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.name}
                        onChange={() => handleCheckboxChangeCompany("name")}
                      />
                      Name
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.gst_no}
                        onChange={() => handleCheckboxChangeCompany("gst_no")}
                      />
                      Gst No
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.industry}
                        onChange={() => handleCheckboxChangeCompany("industry")}
                      />
                      Industry
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.created_at}
                        onChange={() => handleCheckboxChangeCompany("created_at")}
                      />
                      Created at
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.payment_alert_date}
                        onChange={() =>
                          handleCheckboxChangeCompany("payment_alert_date")
                        }
                      />
                      Payment Alert
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.freeze_date}
                        onChange={() => handleCheckboxChangeCompany("freeze_date")}
                      />
                      Freeze Date
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.terminate_date}
                        onChange={() =>
                          handleCheckboxChangeCompany("terminate_date")
                        }
                      />
                      Terminate Date
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCompany.orderbook_enabled}
                        onChange={() =>
                          handleCheckboxChangeCompany("orderbook_enabled")
                        }
                      />
                      Orderbook
                    </label>
                  </>
                )}
              </div>

              <div
                className="ag-theme-quartz-dark"
                style={{ height: 280, marginLeft: 240 }}
              >
                {/*  Company AgGrid */}
                <AgGridReact
                  
                  
                    rowData={rowData}
                    columnDefs={visibleColumnsCompany}
                    pagination={true}
                    rowSelection="multiple"
                  
                  // defaultColDef={{ flex: 2 }}
                />
              </div>
              {/* this is for Users list */}

              <h1 className="ml-[225px] text-center text-blue-800 font-bold m-3" style={{fontSize: "20px", fontWeight: "bolder"}}>
                <span id="mark">Users List</span>
              </h1>

              {/*  users Sidebar Toggle Button */}
              <button
                id="viewHideButton"
                onMouseEnter={toggleSidebarUsers}
                title="Hide & Show Columns"
                style={{
                  position: "absolute",
                  
                  right: isSidebarVisibleUsers ? "200px" : "10px",
                  zIndex: 1,
                }}
              >
                {isSidebarVisibleUsers ? (
                  <i class="bi bi-arrow-right-circle-fill text-[#00A0E3]"></i>
                ) : (
                  <i class="bi bi-layout-sidebar-inset-reverse   text-[#00A0E3]"></i>
                )}
              </button>

              {/* users Sidebar */}
              <div
                style={{
                  width: isSidebarVisibleUsers ? "190px" : "0",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  float: "right",
                  padding: isSidebarVisibleUsers ? "20px" : "0",
                  borderLeft: isSidebarVisibleUsers ? "1px solid #ccc" : "none",
                  backgroundColor: "#000000",
                  color: "white",
                  position: "relative",
                  
                }}
              >
                {isSidebarVisibleUsers && (
                  <>
                    <h3>Show/Hide Columns</h3>
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityUsers.email}
                        onChange={() => handleCheckboxChange("email")}
                      />
                      Email
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityUsers.fname}
                        onChange={() => handleCheckboxChange("fname")}
                      />
                      First name
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityUsers.lname}
                        onChange={() => handleCheckboxChange("lname")}
                      />
                      Last name
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityUsers.mobile}
                        onChange={() => handleCheckboxChange("mobile")}
                      />
                      Mobile
                    </label>
                    <br />
                    {/* <label>
                  <input
                  className="mr-2"
                    type="checkbox"
                    checked={columnsVisibilityUsers.added_at}
                    onChange={() => handleCheckboxChange("added_at")}
                  />
                  Added at
                </label>
                <br /> */}
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityUsers.role}
                        onChange={() => handleCheckboxChange("role")}
                      />
                      Role
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={columnsVisibilityUsers.logged_in_devices_count}
                        onChange={() =>
                          handleCheckboxChange("logged_in_devices_count")
                        }
                      />
                      Logged In(Device)
                    </label>
                  </>
                )}
              </div>
              <div
                className="ag-theme-quartz-dark"
                style={{ height: 300, marginLeft: 240 }}
              >
                {/*  users AgGrid */}
                <AgGridReact
                  rowData={rowDataUsers}
                  columnDefs={visibleColumns}
                  pagination={true}
                  rowSelection="multiple"
                  // defaultColDef={{ flex: 2 }}
                />
              </div>
            </>
          ) : null}
          </div>
    </>
  );
};

export default Customerinfo;
