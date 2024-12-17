// // Orders.js
import { AppBar, Button, Hidden, IconButton, MenuItem, Paper, Select, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from "@material-ui/core";
import {
  mdiListBoxOutline,
  mdiFile,
  mdiFileChartCheckOutline,
  mdiFileDocumentEditOutline,
  mdiSync,
  mdiTable,
  mdiFileExcelBox,
  mdiFilePowerpointBox,
  mdiFileWordBox,
  mdiImageAlbum,
  mdiAttachment,
  mdiDeleteForever,
  mdiZipBox,
  mdiCloudUpload,
  mdiCloudUploadOutline,
  mdiFilePdfBox,
  mdiWechat,
  mdiFaceAgent,
  mdiAccount,
  mdiRobotExcited,
  mdiChevronRight,
  mdiCartCheck,
  mdiInvoiceListOutline,
  mdiReceiptTextCheckOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import 'react-vertical-timeline-component/style.min.css';
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import mahLogo from "../mahindra-logo-new.webp";
import { DataGrid, renderEditInputCell, renderEditSingleSelectCell } from "@material-ui/data-grid";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { useNavigate } from "react-router-dom";
import { getPurchaseOrdersByCustomerId, getPurchaseRequestsByCustomerId, postPurchaseReq } from "../api";
import { SpinnerCircularSplit } from "spinners-react";

// import { color } from "@mui/system";
   
 
// import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

// // Helper component to manage individual tab content
// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//       style={{ padding: '20px' }}
//     >
//       {value === index && (
//         <Box>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// };

// // Main component to be exported
// const Orders = () => {
//   // State to track the currently active tab
//   const [value, setValue] = useState(0);

//   // Handler for tab change
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div style={{ margin: '50px' }}>
//       {/* AppBar to hold the Tabs */}
//       <AppBar position="static" style={{ backgroundColor: '#6200ea' }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           centered
//         >
//           {/* Define each Tab */}
//           <Tab label="Profile" />
//           <Tab label="Settings" />
//           <Tab label="Activity" />
//         </Tabs>
//       </AppBar>

//       {/* Tab content for each Tab */}
//       <TabPanel value={value} index={0}>
//         <h2>Profile Page</h2>
//         <p>This is the Profile page. You can display user details here.</p>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <h2>Settings Page</h2>
//         <p>This is the Settings page. Users can update their preferences here.</p>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <h2>Activity Page</h2>
//         <p>This is the Activity page. You can show recent activities here.</p>
//       </TabPanel>
//     </div>
//   );
// };

// // Export the component as "Orders"
// export default Orders;



const testt = () => {
  document.getElementById("inputfile").click();
};
const Orders = () => {

  const navigate = useNavigate();
  const navtoObjPage = (ID)=>{
    var title ='';
    if(tabHidden == '0')
      title = "Purchase Orders";
      else if(tabHidden == '1')
        title = "Sales Orders";
       else if(tabHidden == '2')
          title = "Billing Statements";
        else
        title = "Rejected Orders";
    navigate(`/Order/${ID}`, { state: {pageType:"Order",title:title}});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.zoom = "75%"; 

    // Optional: Cleanup function to reset zoom on component unmount if needed
    return () => {
      document.body.style.zoom = "100%";
    };
  }, []);


  //page one
  const docTypeOptions = [
    { label: "Inquiry", value: "Inquiry" },
    { label: "Order", value: "Order" },
    { label: "Return", value: "Return" }
  ];
  
  // Custom Edit Component for the dropdown
  const EditDropdownCell = ({ id, value, field, api }) => {
    const handleChange = (event) => {
      const newValue = event.target.value;
      api.setEditCellValue({ id, field, value: newValue });
    };
  
    return (
      <Select
        value={value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        style={{ height: '100%' }}
        
      >
        {docTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  };
  const InProcAndQuotecolumns = [
    { field: "id", headerName: "ID", width: 150,hide:true },
    { field: "purchaseOrderUuid",hide:true},
    { minWidth: 250, field: "purchaseOrderId", 
       sortComparator: (v1, v2) => parseInt(v1, 10) - parseInt(v2, 10),
       headerName: "Purchase Order", flex: 1 },
       { minWidth: 250, field: "purchaseEnquiryId", 
        sortComparator: (v1, v2) => parseInt(v1, 10) - parseInt(v2, 10),
        headerName: "Purchase Inquiry", flex: 1 },
    { minWidth: 250, field: "docType", headerName: "Document Type", flex: 1, editable: true, renderEditCell: (params) => <EditDropdownCell {...params} /> },
    { minWidth: 250, field: "salesOrg", headerName: "Sales Organisation", flex: 1, editable: true },
    { minWidth: 250, field: "distributionChannels", headerName: "Distribution Channels", flex: 1 },
    { minWidth: 200, field: "division", headerName: "division", flex: 1 },
    { minWidth: 200, field: "createdAt", headerName: "createdAt", flex: 1 },
    {
      headerName:' ',
      disableColumnMenu: true,
      field: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
        style={{ position: 'sticky', left: 0, background: 'white', zIndex: 1 }}
          className="stickyCell"
          onClick={() =>{
            navtoObjPage(params.row.purchaseOrderUuid)}}
          color="primary"
          aria-label="show row id"
        >
          <Icon path={mdiChevronRight} size={1} />
        </IconButton>
      ),
    },
  ];
  const columns = [
    { field: "id", headerName: "ID",hide:true, width: 150 },
    { field: "purchaseOrderUuid",hide:true},
    { minWidth: 250, field: "purchaseOrderId", 
      sortComparator: (v1, v2) => parseInt(v1, 10) - parseInt(v2, 10),
      headerName: "Purchase Order", flex: 1 },
      { minWidth: 250, field: "purchaseEnquiryId", 
        sortComparator: (v1, v2) => parseInt(v1, 10) - parseInt(v2, 10),
        headerName: "Purchase Inquiry", flex: 1 },
    { minWidth: 250, field: "docType", headerName: "Document Type", flex: 1, editable: true, renderEditCell: (params) => <EditDropdownCell {...params} /> },
    { minWidth: 250, field: "salesOrg", headerName: "Sales Organisation", flex: 1, editable: true },
    { minWidth: 250, field: "distributionChannels", headerName: "Distribution Channels", flex: 1 },
    { minWidth: 200, field: "division", headerName: "division", flex: 1 },
    { minWidth: 200, field: "createdAt", headerName: "createdAt", flex: 1 },
    {
      headerName:' ',
      disableColumnMenu: true,
      field: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
        style={{ position: 'sticky', left: 0, background: 'white', zIndex: 1 }}
          className="stickyCell"
          onClick={() =>
            navtoObjPage(params.row.purchaseOrderUuid)}
          color="primary"
          aria-label="show row id"
        >
          <Icon path={mdiChevronRight} size={1} />
        </IconButton>
      ),
    },
  ];
  const shOptions = [
    { label: "Inquiry", value: "Inquiry" },
    { label: "Order", value: "Order" },
    { label: "Return", value: "Return" },
  ];
  const [rows,setRows] = useState([]);
  const [salesOrdersRows,setsalesOrdersRows] = useState([]);
  const [invoicesRows,setinvoicesRows] = useState([]);
  const [RejectedOrderRows,setRejectedOrderRows] = useState([]);
  const [rowsLoader,setRowsLoader] = useState(true);
  const [salesOrdersRowsLoader,setsalesOrdersRowsLoader] = useState(true);
  const [invoicesRowsLoader,setinvoicesRowsLoader] = useState(true);
  const [RejectedOrderRowsLoader,setRejectedOrderRowsLoader] = useState(true);
  useEffect(()=>{
    const fetchPurchaseRequests = async () =>{
      try {
        let res = await getPurchaseOrdersByCustomerId(sessionStorage.getItem('cId'),0);
        console.log(res.data.value);
        let rowsArr =[];
        let salesOrdersRowsArr =[];
        let invoicesRowsArr =[];
        let RejectedOrderRowsArr =[];
        res.data.value.forEach(async (row,index) => {
          let newRow={};
          newRow.id = index+1;
          newRow.docType = row.docType || null;
          newRow.purchaseOrderUuid = row.purchaseOrderUuid || null;
          newRow.status = row.status || null;
          newRow.purchaseEnquiryId = row.purchaseEnquiryId || null;
          newRow.purchaseOrderId = row.purchaseOrderId || null;
          newRow.salesOrg = row.salesOrg || null;
          newRow.distributionChannels = row.distributionChannels || null;
          newRow.division = row.division || null;
          newRow.createdAt = row.createdAt || null;
          if(row.status == 'Approved'||row.status == 'SO Pending'||row.status == 'SO Not Released'||row.status == 'Sent For Release')
          rowsArr.push(newRow);
        else if(row.status == 'Rejected')
          RejectedOrderRowsArr.push(newRow);
        else if(row.status == 'Payment Confirmed')
          invoicesRowsArr.push(newRow);
        else
        salesOrdersRowsArr.push(newRow);
        });
        setRows(rowsArr);
        let sortedsalesOrdersRowsArr=salesOrdersRowsArr.sort(
          (a, b) => parseInt(b.purchaseOrderId, 10) - parseInt(a.purchaseOrderId, 10)
        );
        let sortedmyordersArr=invoicesRowsArr.sort(
          (a, b) => parseInt(b.purchaseOrderId, 10) - parseInt(a.purchaseOrderId, 10)
        );
        let sortedRejectedOrderRowsArr = RejectedOrderRowsArr.sort(
          (a, b) => parseInt(b.purchaseOrderId, 10) - parseInt(a.purchaseOrderId, 10)
        );
        setsalesOrdersRows(sortedsalesOrdersRowsArr);
        setinvoicesRows(sortedmyordersArr);
        setRejectedOrderRows(sortedRejectedOrderRowsArr);
        setRowsLoader(false);
        setsalesOrdersRowsLoader(false);
        setinvoicesRowsLoader(false);
        setRejectedOrderRowsLoader(false);
        console.log(rowsArr);
      } catch (error) {
        console.error("Failed to fetch Purchase Requests:", error);
      }
      setRowsLoader(false);
      setsalesOrdersRowsLoader(false);
      setinvoicesRowsLoader(false);
        setRejectedOrderRowsLoader(false);
    }
fetchPurchaseRequests();
  },[])
  //doctype,salesorg,distributionchnl,diision,createdat
  // const rows = [
  //   { id: 1, ID: 'QTN-001', DocType: 'Quotation', OrderType: 'Standard', Customer: 'ABC Corp', Status: 'Open', Priority: 'High', Date: '2024-10-01' },
  //   { id: 2, ID: 'QTN-002', DocType: 'Inquiry', OrderType: 'Express', Customer: 'XYZ Inc', Status: 'Closed', Priority: 'Low', Date: '2024-10-02' },
  //   { id: 3, ID: 'QTN-003', DocType: 'Quotation', OrderType: 'Bulk Order', Customer: 'LMN Ltd', Status: 'Draft Requests', Priority: 'Medium', Date: '2024-10-03' },
  //   { id: 4, ID: 'QTN-004', DocType: 'Inquiry', OrderType: 'Standard', Customer: 'DEF Enterprises', Status: 'Draft Requests', Priority: 'High', Date: '2024-10-04' },
  //   { id: 5, ID: 'QTN-005', DocType: 'Quotation', OrderType: 'Custom', Customer: 'GHI Co', Status: 'Draft Requests', Priority: 'Low', Date: '2024-10-05' },
  // ];
  
  const Item = {
    DocType: "Sales Order",
    SalesOrg: "1000",
    DistributionChannel: "10",
    Division: "01",
    OrderType: "OR",
    Items: [
      {
        ItemNo: 1,
        MaterialNumber: "MAT-001",
        MaterialGroup: "Electronics",
        Plant: "PlantA",
        mainID: "550e8400-e29b-41d4-a716-446655440000",
      },
      {
        ItemNo: 2,
        MaterialNumber: "MAT-002",
        MaterialGroup: "Electronics",
        Plant: "PlantA",
        mainID: "550e8400-e29b-41d4-a716-446655440001",
      },
    ],
    Partners: [
      {
        PartnerRole: "Sold-to Party",
        PartnerNumber: "1000001",
        mainID: "550e8400-e29b-41d4-a716-446655440002",
      },
      {
        PartnerRole: "Ship-to Party",
        PartnerNumber: "2000001",
        mainID: "550e8400-e29b-41d4-a716-446655440003",
      },
    ],
  };

  //page one

  // const tabHidden = true;
  const [tabHidden, setTabHidden] = useState("0");
  console.log(tabHidden);
  const tabChange = (tabClicked) => {
    setTabHidden(tabClicked);
  };
  const handleCellEditCommit = (newRow) =>{
console.log(newRow);
  }
 

  return (
    <div>
    <div style={{display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: '0'}}>
      <div
        style={{
          // background: "rgb(211 197 255)",
          background: "rgb(255 222 222)",
          
          width: "100%",
          height: "100%",
          zIndex: "-1",
          position: "fixed",
        }}
      ></div>
      <AppBar
        position="static"
        style={{
          marginBottom: '50px',
          backgroundColor: "#800000",
          boxShadow: "0 1px 10px rgb(5 4 0)",
        }}
      >
        <span
          style={{
            marginRight: "auto",
            color: "#ffffff",
            fontSize: "xx-large",
            fontFamily: "none",
            marginLeft: 'auto',
            marginBottom: '20px',
            marginTop: "10px",
          }}
        >
          Purchase & Sales Orders
        </span>
        <Tabs centered indicatorColor="black" style={{}}>
          <Tab
            className="prtab"
            onClick={() => tabChange("0")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiCartCheck}
                  size={1}
                  color="#FF9800"
                  style={{ marginRight: "8px" }}
                />
                Purchase Orders
              </div>
            }
          />
          <Tab
            className="prtab"
            onClick={() => tabChange("1")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiInvoiceListOutline}
                  size={1}
                  color="#2196F3"
                  style={{ marginRight: "8px" }}
                />
                Sales Orders
              </div>
            }
          />
          // Tab for Quotations/Negotiations
          <Tab
            className="prtab"
            onClick={() => tabChange("2")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiReceiptTextCheckOutline}
                  size={1}
                  color="#4CAF50"
                  style={{ marginRight: "8px" }}
                />
                Billing Statements
              </div>
            }
          />
             <Tab
            className="prtab"
            onClick={() => tabChange("3")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiTrashCanOutline}
                  size={1}
                  color="red"
                  style={{ marginRight: "8px" }}
                />
                Rejected Orders
              </div>
            }
          />
        </Tabs>
      </AppBar>
      
      {tabHidden == "0" && (      <div id="firstTab" >
      <section  style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}>
        <div className="prSectionO"
            style={{
              // boxShadow: 'rgb(255 122 122) 0px 0px 15px',
              borderRadius: '20px',
              // backgroundColor: 'aliceblue',
              display: "flex",
              flexDirection: "column",
            }}
          >
             <div style={{display:'flex',flexDirection:'row'}}>
              <section
                style={{
                  boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
                  borderRadius: '10px',
                  backgroundColor: "#e5c100",
                  width: "90px",
                  height: "90px",
                  textAlign: 'center',
                  alignContent: "center",
                  marginLeft: "80p",
                  marginTop: "-30px",
                  marginLeft: "50px",
                }}
              >
                <Icon
                  path={mdiCartCheck}
                  size={1.5}
                />
              </section>
              <span style={{    marginTop: 'auto',    marginLeft: '50px',
    marginBottom: '5px',
    fontSize: 'x-large',
    fontFamily: 'auto',
    color: '#6d6d6d'}}>Purchase Orders.</span>

    {/* <Button onClick={()=>newPurchaseReq()} className="normalButton" style={{borderRadius:'20px',    borderRadius: '20px',
    marginLeft: 'auto',
    marginRight: '25vh',
    marginTop: 'auto',
    backgroundColor: '#e5c10082'}}><Icon
                  path={mdiFileDocumentEditOutline}
                  size={1}
                  style={{    marginRight: '2vh'                  }}
                />
          <span style={{ 
    color: '#6d6d6d'}}>New Request.</span></Button> */}
            </div>
            {rowsLoader?(
              <SpinnerCircularSplit
              style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
              color="rgb(229 193 0)"
            ></SpinnerCircularSplit>
            ):(<div style={{ padding: '30px',  minHeight: '350px'}}>
                {/* <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value='false' ></input></td>
                      <td></td>
                      <td><input type="number" min={1} ></input></td>
                    </tr>
                  </tbody>
                </table> */}
  <Paper sx={{ height: '400px', width: '100%' }}>
    <DataGrid
           rows={rows}
           columns={columns}
           initialState={{ pinnedColumns: { left: ['Actions'] },
             sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          }, }}
           pageSize={30}
           style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
            scrollbarColor: '#e5c100 #d6d6d6' }}
                  autoHeight
          //  checkboxSelection
          //  disableSelectionOnClick
           pinnedColumns={{"right":["Actions"]}}
          //  onRowClick={}
          //  onRowClick={handleRowClick}
          //  onCellClick={(params) => params.api.startCellEditMode({ id: params.id, field: params.field })}
          onCellEditCommit={handleCellEditCommit}

          
     >
      
    </DataGrid>
    {/* <DataGrid></DataGrid> */}
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}
    </Paper>


                </div>)}
                
          </div>
          
        </section>
      </div>)}
     

        {tabHidden == "1" && (      <div id="secondTab" >
      <section  style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}>
        <div className="prSectionO"
            style={{
              // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
              borderRadius: '20px',
              // backgroundColor: 'aliceblue',
              display: "flex",
              flexDirection: "column",
            }}
          >
             <div style={{display:'flex',flexDirection:'row'}}>
              <section
                style={{
                  boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
                  borderRadius: '10px',
                  backgroundColor: "#e5c100",
                  width: "90px",
                  height: "90px",
                  textAlign: 'center',
                  alignContent: "center",
                  marginLeft: "80p",
                  marginTop: "-30px",
                  marginLeft: "50px",
                }}
              >
                <Icon
                  path={mdiInvoiceListOutline}
                  size={1.5}
                />
              </section>
              <span style={{    marginTop: 'auto',    marginLeft: '50px',
    marginBottom: '5px',
    fontSize: 'x-large',
    fontFamily: 'auto',
    color: '#6d6d6d'}}>Sales Orders.</span>
            </div>
            {salesOrdersRowsLoader?(
               <SpinnerCircularSplit
               style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
               color="rgb(229 193 0)"
             ></SpinnerCircularSplit>
            ):(<div style={{ padding: '30px',  minHeight: '350px'}}>
                {/* <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value='false' ></input></td>
                      <td></td>
                      <td><input type="number" min={1} ></input></td>
                    </tr>
                  </tbody>
                </table> */}
  <Paper sx={{ height: '400px', width: '100%' }}>
    <DataGrid
           rows={salesOrdersRows}
           columns={InProcAndQuotecolumns}
          
           style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
            scrollbarColor: '#e5c100 #d6d6d6' }}
                  autoHeight
          //  checkboxSelection
          //  disableSelectionOnClick
          onCellEditCommit={handleCellEditCommit}
     >
      
    </DataGrid>
    {/* <DataGrid></DataGrid> */}
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}
    </Paper>


                </div>)}
                
          </div>
          
        </section>
      </div>)}

      {tabHidden == "2" && (<div id="thirdTab" >
        <section  style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}>
        <div className="prSectionO"
            style={{
              // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
              borderRadius: '20px',
              // backgroundColor: 'aliceblue',
              display: "flex",
              flexDirection: "column",
            }}
          >
             <div style={{display:'flex',flexDirection:'row'}}>
              <section
                style={{
                  boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
                  borderRadius: '10px',
                  backgroundColor: "#e5c100",
                  width: "90px",
                  height: "90px",
                  textAlign: 'center',
                  alignContent: "center",
                  marginLeft: "80p",
                  marginTop: "-30px",
                  marginLeft: "50px",
                }}
              >
                <Icon
                  path={mdiReceiptTextCheckOutline}
                  size={1.5}
                />
              </section>
              <span style={{    marginTop: 'auto',    marginLeft: '50px',
    marginBottom: '5px',
    fontSize: 'x-large',
    fontFamily: 'auto',
    color: '#6d6d6d'}}>Billing Statements</span>
            </div>
            {RejectedOrderRowsLoader?( <SpinnerCircularSplit
              style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
              color="rgb(229 193 0)"
            ></SpinnerCircularSplit>):(
              <div style={{ padding: '30px',  minHeight: '350px'}}>
                {/* <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value='false' ></input></td>
                      <td></td>
                      <td><input type="number" min={1} ></input></td>
                    </tr>
                  </tbody>
                </table> */}
  <Paper sx={{ height: '400px', width: '100%' }}>
    <DataGrid
           rows={invoicesRows}
           columns={InProcAndQuotecolumns}
          
           style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
            scrollbarColor: '#e5c100 #d6d6d6' }}
                  autoHeight
          //  checkboxSelection
          //  disableSelectionOnClick
          onCellEditCommit={handleCellEditCommit}
     >
      
    </DataGrid>
    {/* <DataGrid></DataGrid> */}
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}
    </Paper>


                </div>
            )}
                
          </div>
          
        </section>
      </div>)}

      {tabHidden == "3" && (      <div id="fourthTab" >
      <section  style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}>
        <div className="prSectionO"
            style={{
              // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
              borderRadius: '20px',
              // backgroundColor: 'aliceblue',
              display: "flex",
              flexDirection: "column",
            }}
          >
             <div style={{display:'flex',flexDirection:'row'}}>
              <section
                style={{
                  boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
                  borderRadius: '10px',
                  backgroundColor: "#e5c100",
                  width: "90px",
                  height: "90px",
                  textAlign: 'center',
                  alignContent: "center",
                  marginLeft: "80p",
                  marginTop: "-30px",
                  marginLeft: "50px",
                }}
              >
                <Icon
                  path={mdiTrashCanOutline}
                  size={1.5}
                />
              </section>
              <span style={{    marginTop: 'auto',    marginLeft: '50px',
    marginBottom: '5px',
    fontSize: 'x-large',
    fontFamily: 'auto',
    color: '#6d6d6d'}}>Rejected Orders.</span>


            </div>
            {invoicesRowsLoader?(
              <SpinnerCircularSplit
              style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
              color="rgb(229 193 0)"
            ></SpinnerCircularSplit>
            ):(<div style={{ padding: '30px',  minHeight: '350px'}}>
                {/* <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value='false' ></input></td>
                      <td></td>
                      <td><input type="number" min={1} ></input></td>
                    </tr>
                  </tbody>
                </table> */}
  <Paper sx={{ height: '400px', width: '100%' }}>
    <DataGrid
           rows={RejectedOrderRows}
           columns={InProcAndQuotecolumns}
           initialState={{ pinnedColumns: { left: ['Actions'] },
             sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          }, }}
           pageSize={30}
           style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
            scrollbarColor: '#e5c100 #d6d6d6' }}
                  autoHeight
          //  checkboxSelection
          //  disableSelectionOnClick
           pinnedColumns={{"right":["Actions"]}}
          //  onRowClick={}
          //  onRowClick={handleRowClick}
          //  onCellClick={(params) => params.api.startCellEditMode({ id: params.id, field: params.field })}
          onCellEditCommit={handleCellEditCommit}

          
     >
      
    </DataGrid>
    {/* <DataGrid></DataGrid> */}
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}
    </Paper>


                </div>)}
                
          </div>
          
        </section>
      </div>)}

      {/* <footer style={{display: 'flex',
    flexDirection: 'row', backgroundColor: '#030e22' ,    marginTop: '40px',
    padding: '40px',    alignItems: 'end',
    justifyContent: 'space-between'}}>
        <img style={{    marginLeft: '50px'}} src={mahLogo}></img>
        <div><var style={{border:'1px solid',    marginRight: '20px',
    color: '#c5c5c5'}}></var>
        <span style={{color:'white'}}>Copyright© 2024 Mahindra&Mahindra Ltd. All Rights Reserved.</span></div>
        
    </footer> */}


    </div>
    <footer style={{
        // position: 'fixed',
        // bottom: '0',
        // left: '0',
        // zIndex:'-1',
        // width:'100%',

  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#030e22',
  marginTop: '40px',
  padding: '20px 40px',  // Adjusted padding for a more balanced layout
  alignItems: 'center',  // Centered items vertically
  justifyContent: 'space-between'
}}>
  <img style={{ marginLeft: '20px', maxHeight: '50px' }} src={mahLogo} alt="Mahindra Logo" />
  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{
      border: '1px solid #c5c5c5', // Border color adjusted to match text color
      height: '20px', // Height added to make the border visible
      marginRight: '20px'
    }}></div>
    <span style={{ color: 'white' }}>
      Copyright © 2024 Mahindra & Mahindra Ltd. All Rights Reserved.
    </span>
  </div>
</footer>
    </div>
  );
};
export default Orders;