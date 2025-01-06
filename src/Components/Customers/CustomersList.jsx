import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the Data Grid

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import axios from "axios";
import { GET_ALL_CUSTOMERS, } from "../api/restapi";

//conditional rules for any colums which will apply on whole row

const rowClassRules = {
  green: (row) => row.data.section === "C",
};

// User Name 
const userName = localStorage.getItem("user_name");

let gridApi;

function CustomersList(props) {
  // by this code we can stop user to go to login page if already logged

  useEffect(() => {
    const jwtToken = localStorage.getItem("Session_Id");
    if (jwtToken) {

    }else{
      navigate("/");
    }
  }, []);

  //till here

  const SESSION_ID = localStorage.getItem("Session_Id")

  const getallCustomerList = async () => {
    try {
      const response = await axios.get(GET_ALL_CUSTOMERS, {
        headers: {
          "Session-Id": SESSION_ID,
        },
      });
      setRowData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallCustomerList();
  }, []);

  const [rowData, setRowData] = useState();
  const [isopen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  //this for any action you wants to perform in any button
  const DisplayCustomer = ({
    id,
    name,
    address,
    city,
    admin_mobile,
    admin_name,
    installation_price,
    renewal_price,
    companies,
    orderbook_enabled,
    users,
    refer_by,
    remarks,
    handler,
    invoiceslimit,
    companieslimit,
  }) => (
    <button
      
      className="inline-flex my-2 w-[50px] items-center justify-center px-2 py-4 font-sans font-semibold tracking-wide text-white bg-stone-800 hover:bg-stone-700  h-[30px]"
      style={{margin: "4px", borderRadius: "5px", alignItems: "center"}}
      onClick={() =>
        navigate("/Customerinfo", {
          state: {
            id: id,
            name: name,
            address: address,
            admin_mobile: admin_mobile,
            city: city,
            admin_name: admin_name,
            installation_price: installation_price,
            renewal_price: renewal_price,
            companies: companies,
            orderbook_enabled: orderbook_enabled,
            users: users,
            refer_by: refer_by,
            remarks: remarks,
            handler: handler,
            invoiceslimit: invoiceslimit,
            companieslimit: companieslimit,
          },
        })
      }
    >
      Edit
    </button>
  );
  const CustomerViewDetails = ({ name, station, GSt, phone }) => (
    <button
      className="inline-flex  my-2 w-[100px] items-center justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[30px]"
      // onClick={() =>
      //   navigate("/Popup", {
      //     state: { name: name, station: station, phone: phone, GSt: GSt },
      //   })
      // }
    >
      VIEW DETAILS
    </button>
  );
  const CustomerViewUsage = ({ name, station, GSt, phone }) => (
    <button
      className="inline-flex  my-2 w-[80px] items-center justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[30px]"
      // onClick={() =>
      //   navigate("/Popup", {
      //     state: { name: name, station: station, phone: phone, GSt: GSt },
      //   })
      // }
    >
      View Usage
    </button>
  );

  //define colums which we wants to display on screen
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      headerName: "Customer ID",
      headerCheckboxSelection:true,
      filter: true,
      floatingFilter: true,
      checkboxSelection: true,
      pinned: "left",
      flex: 1,
      
      
    },
    {
      field: "name",
      headerName: "Customer Name",
      filter: true,
      floatingFilter: true,
      pinned: "left",
    },
    {
      field: "address",
      headerName: "Address",
      filter: true,
      floatingFilter: true,
      width: 240,
      // flex: 4,
    },
    {
      field: "city",
      headerName: "City",
      filter: true,
      floatingFilter: true,
      width: 150,
      // flex: 4,
    },
    {
      field: "refer_by",
      headerName: "Refer By",
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 150,
      // flex: 3,
    },
    {
      field: "admin_name",
      headerName: "Admin",
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 150,
      // flex: 4,
    },
    {
      field: "admin_mobile",
      headerName: "Phone No(Admin)",
      filter: true,
      floatingFilter: true,
      width: 160,
      // flex: 4,
    },
    {
      field: "installation_price",
      headerName: "Installation Price",
      filter: true,
      floatingFilter: true,
      width: 150,
      // flex: 4,
    },
    {
      field: "renewal_price",
      headerName: "Renewal Price",
      filter: true,
      floatingFilter: true,
      width: 150,
      // flex: 4,
    },
    {
      field: "invoices_limit",
      headerName: "Invoices Limit",
      filter: true,
      floatingFilter: true,
      width: 150,
      // flex: 4,
    },
    {
      field: "companies_limit",
      headerName: "Compaines Limit",
      filter: true,
      floatingFilter: true,
      width: 140,
      // flex: 4,
    },
    {
      field: "handler",
      headerName: "Handler",
      filter: true,
      floatingFilter: true,
      width: 150,
      // flex: 4,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      filter: true,
      floatingFilter: true,
      // flex: 20,
    },
    {
      field: "created_at",
      headerName: "Created at",
      filter: true,
      floatingFilter: true,
      width: 220,
      // flex: 6,
    },

    // {
    //   headerName: "Address",
    //   valueGetter: ({ data }) => {
    //     const { state, city, street, pincode } = data.address;
    //     return `${state}, ${city}, ${street}, ${pincode}`;
    //   },
    //   filter: true,
    //   floatingFilter: true,
    // },
    {
      field: "Actions",
      pinned: "right",
      width: 90,
      cellRenderer: (props) => {
        // console.log(props);
        return (
          <DisplayCustomer
            name={props.data.name}
            address={props.data.address}
            city={props.data.city}
            admin_mobile={props.data.admin_mobile}
            admin_name={props.data.admin_name}
            installation_price={props.data.installation_price}
            renewal_price={props.data.renewal_price}
            id={props.data.id}
            companies={props.data.companies}
            orderbook_enabled={props.data.orderbook_enabled}
            users={props.data.users}
            refer_by={props.data.refer_by}
            remarks={props.data.remarks}
            handler={props.data.handler}
            invoiceslimit={props.data.invoices_limit}
            companieslimit={props.data.companies_limit}
          />
        );
      },
      // flex:2
    },
    // {
    //   field: "Actions",
    //   cellRenderer: (props) => {
    //     console.log(props);
    //     // return <WishHappyBirthday name={props.data.Customer_Name} station= {props.data.Station}/>;
    //     return (
    //       <CustomerViewDetails

    //       />
    //     );
    //   },
    //   // flex:2
    // },
    // {
    //   field: "Actions",
    //   cellRenderer: (props) => {
    //     console.log(props);
    //     // return <WishHappyBirthday name={props.data.Customer_Name} station= {props.data.Station}/>;
    //     return (
    //       <CustomerViewUsage

    //       />
    //     );
    //   },
    //   // flex:2
    // },
  ]);

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportClick = () => {
    // Export the data as a CSV file
    gridApi.exportDataAsCsv();
  };

  //  customer list Manage column visibility state
  const [columnsVisibilityCustomer, setColumnsVisibilityCustomer] = useState({
    id:true,
    name:true,
    address:true,
    city:true,
    admin_mobile:true,
    admin_name:true,
    installation_price:true,
    renewal_price:true,
    companies:true,
    remarks:true,
    handler:true,
    Actions:true,
   
  });

  // customer list Filter visible columns based on checkbox state
  const visibleColumnsCompany = columnDefs.filter(
    (col) => columnsVisibilityCustomer[col.field]
  );

  //  customer list Manage sidebar visibility state
  const [isSidebarVisibleCustomer, setSidebarVisibleCustomer] = useState(false);

  // customer list Handle checkbox change to toggle column visibility
  const handleCheckboxChangeCompany = (column) => {
    setColumnsVisibilityCustomer({
      ...columnsVisibilityCustomer,
      [column]: !columnsVisibilityCustomer[column],
    });
  };

  // company Toggle sidebar visibility
  const toggleSidebarCompany = () => {
    setSidebarVisibleCustomer(!isSidebarVisibleCustomer);
  };


  return (
    <>
      <SideBar />
      
      <div className="ag-theme-quartz" style={{ height: 620, marginLeft: 240, }}>
        <div style={{display: "flex" , alignItems: "center" , justifyContent: "space-between", margin: "15px 0 15px 0", lineHeight: "1.5"}}>
          <div>
            <p style={{fontSize: "25px", fontWeight: 700}}>Customer List</p>
            <p style={{color: "#919191"}}>Welcome {userName}</p>
          </div>
          <div>
            <button
            className=" m-2 w-[140px] h-[30px] mt-2 text-white bg-stone-800 hover:bg-stone-700 rounded-md "
            onClick={onExportClick}
          >
            Export to Excel
          </button>
          </div>
        </div>
        {/*  company Sidebar Toggle Button */}
        <button
                id="viewHideButton"
                onClick={toggleSidebarCompany}
                title="Hide & Show Columns"
                style={{
                  position: "absolute",

                  right: isSidebarVisibleCustomer ? "200px" : "10px",
                  zIndex: 1,
                }}
              >
                {isSidebarVisibleCustomer ? (
                  <i class="bi bi-arrow-right-circle-fill text-[#00A0E3]"></i>
                ) : (
                  <i class="bi bi-layout-sidebar-inset-reverse   text-[#00A0E3]"></i>
                )}
              </button>

              {/* company Sidebar */}
              <div
                style={{
                  width: isSidebarVisibleCustomer ? "170px" : "0",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  float: "right",
                  padding: isSidebarVisibleCustomer ? "20px" : "0",
                  borderLeft: isSidebarVisibleCustomer ? "1px solid #ccc" : "none",
                  backgroundColor: "#000000",
                  color: "white",
                  position: "relative",
                }}
              >
                {isSidebarVisibleCustomer && (
                  <>
                    <h3>Show/Hide Columns</h3>
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.id}
                        onChange={() => handleCheckboxChangeCompany("id")}
                      />
                      Customer ID
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.name}
                        onChange={() => handleCheckboxChangeCompany("name")}
                      />
                      Customer Name
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.address}
                        onChange={() => handleCheckboxChangeCompany("address")}
                      />
                      Address
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.city}
                        onChange={() => handleCheckboxChangeCompany("city")}
                      />
                      City
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.admin_name}
                        onChange={() => handleCheckboxChangeCompany("admin_name")}
                      />
                      Admin
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.admin_mobile}
                        onChange={() =>
                          handleCheckboxChangeCompany("admin_mobile")
                        }
                      />
                      Mobile
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.installation_price}
                        onChange={() => handleCheckboxChangeCompany("installation_price")}
                      />
                      Installation Price
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.renewal_price}
                        onChange={() =>
                          handleCheckboxChangeCompany("renewal_price")
                        }
                      />
                      Renewal Price
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.handler}
                        onChange={() =>
                          handleCheckboxChangeCompany("handler")
                        }
                      />
                     Handler
                    </label>
                    <br />
                    <label>
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={columnsVisibilityCustomer.remarks}
                        onChange={() =>
                          handleCheckboxChangeCompany("remarks")
                        }
                      />
                     Remarks
                    </label>
                  </>
                )}
              </div>

        <AgGridReact
          rowData={rowData}
          columnDefs={visibleColumnsCompany}
          rowSelection="multiple"
          pagination={true}
          rowClassRules={rowClassRules}
          onGridReady={onGridReady}
          enableBrowserTooltips={true}
          enableCellTextSelection={true}
          
        />
      </div>
    </>
  );
}

export default CustomersList;

