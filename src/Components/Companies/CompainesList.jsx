import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the Data Grid

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import axios from "axios";
import { GET_ALL_COMPAINES, } from "../api/restapi";


// User Name 
const userName = localStorage.getItem("user_name");


//conditional rules for any colums which will apply on whole row

const rowClassRules = {
  green: (row) => row.data.section === "C",
};

let gridApi;

function CompainesList(props) {

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
      const response = await axios.get(GET_ALL_COMPAINES,{
        headers:{
          "Session-Id":SESSION_ID
        }
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
  const DisplayCustomer = ({ id,name, gstno, industry, created_at,payment_alert_date,freeze_date,terminate_date,orderbook_enabled }) => (
    
    <button className="inline-flex my-2 w-[50px] items-center justify-center px-2 py-4 font-sans font-semibold tracking-wide text-white bg-stone-800 hover:bg-stone-700  h-[30px]"
      style={{margin: "4px", borderRadius: "5px", alignItems: "center"}}
      onClick={() =>
        navigate("/CompanyData", {
          state: {id:id ,name: name, industry: industry, created_at: created_at, payment_alert_date: payment_alert_date, freeze_date:freeze_date,terminate_date:terminate_date,orderbook_enabled:orderbook_enabled,orderbook_enabled:orderbook_enabled,gstno:gstno},
          
        })
        
      }
      
    >
      EDIT
    </button>
    
  );
  const CustomerViewDetails = ({ name, station, GSt, phone }) => (
    <button className="inline-flex  my-2 w-[100px] items-center justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[30px]"
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
    <button className="inline-flex  my-2 w-[80px] items-center justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[30px]"
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
      headerName: "Company ID",
      headerCheckboxSelection:true,
      filter: true,
      floatingFilter: true,
      checkboxSelection: true,
      pinned:"left",
      flex:1,
    },
    {
      field: "name",
      headerName: "Company Name",
      filter: true,
      floatingFilter: true,
      pinned:"left",

      flex: 2,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    {
      field: "gst_no",
      headerName: "Gst Number",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    {
      field: "industry",
      headerName: "Industry ",
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 140,
      // flex: 3,
    },
    {
      field: "created_at",
      headerName: "Created Date",
      valueFormatter: (cell) => new Date(cell.value).toLocaleDateString(),
      filter: true,
      floatingFilter: true,
      tooltipField: "name",
      width: 150,
      // flex: 4,
    },
    {
      field: "payment_alert_date",
      headerName: "Payment Alert Date",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    {
      field: "freeze_date",
      headerName: "Freeze Date",
      filter: true,
      floatingFilter: true,
      // flex: 4,
    },
    {
      field: "terminate_date",
      headerName: "Terminate Date",
      filter: true,
      floatingFilter: true,
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
      pinned:"right",
      width: 85,
      flex:1,
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
            created_at={props.data.created_at}
            freeze_date={props.data.freeze_date}
            terminate_date={props.data.terminate_date}
            payment_alert_date={props.data.payment_alert_date}
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

//export data to csv in AgGrid
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  
  return (
    <>
    <SideBar />
      <div className="ag-theme-quartz" style={{ height: 620 ,marginLeft: 240}}>
        <div style={{display: "flex" , alignItems: "center" , justifyContent: "space-between", margin: "15px 0 15px 0", lineHeight: "1.5"}}>
          <div>
            <p style={{fontSize: "25px", fontWeight: 700}}>Companies List</p>
            <p style={{color: "#919191"}}>Welcome {userName}</p>
          </div>
          <div>
            <button
            className=" m-2 w-[140px] h-[30px] mt-2 text-white bg-stone-800 hover:bg-stone-700 rounded-md "
            onClick={() => onExportClick()}>Export to Excel</button>
          </div>
        </div>
        
       
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          pagination={true}
          rowClassRules={rowClassRules}
          onGridReady={onGridReady}
          enableBrowserTooltips={true}
          
          
          
          
         
        />
      </div>
      
    </>
  );
}

export default CompainesList;

