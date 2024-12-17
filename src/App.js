// import React ,{useState} from "react";
// import {
//   mdiCloudUpload,
//   mdiDeleteForever,
//   mdiFileDocument,
//   mdiBell,
//   mdiClipboardText,
//   mdiMessageText,
//   mdiCart,
//   mdiProgressClock,
//   mdiCheckCircle,     
//   mdiTruckDelivery,   
//   mdiClockOutline,    
//   mdiCloseCircle,     
//   mdiCashCheck,       
//   mdiAlertCircle,     
//   mdiCashRemove    
// } from "@mdi/js";
// import Icon from "@mdi/react";
// import propic from "./profilePic.jpg";
// import "./App.css";
// import uploadimage from "./userdocuments.jpg";
// import MyAppBar from "./components/Appbar";
// import Appfooter from "./components/Appfooter";
// // import { AppBar, Toolbar, Typography } from "@material-ui/core";

// const Dashboard = () => {
//   const [uploads, setUploads] = useState({
//     upload1: false,
//     upload2: false,
//     upload3: false,
//   });
//   const handleUpload = (uploadKey) => {
//     // Simulate file upload
//     setUploads((prev) => ({ ...prev, [uploadKey]: true }));
//   };
//   const handleRemove = (uploadKey) => {
//     // Reset the upload status
//     setUploads((prev) => ({ ...prev, [uploadKey]: false }));
//   };
//   return (
//     <div className="appbackground">
//       <video autoPlay loop muted className="video-background">
//         <source
//           src={`${process.env.PUBLIC_URL}/assets/mahindrabackground.mp4`}
//           type="video/mp4"
//         />
//         Your browser does not support the video tag.
//       </video>
//       <div className="video-backgroundOverlay"></div>
      
//       <MyAppBar></MyAppBar>
//         {/* <AppBar ><Toolbar>
//       </Toolbar></AppBar> */}
        
      
//       <div className="dashboard-grid">
//         <div className="transpWindow">
//         <div className="typing-container" style={{  marginTop: '70px',
//     paddingBottom: '0px'}}>
//       Welcome to Mahindra Corporate Sales
//     </div>
//     <div className="typing-container" style={{fontSize: '15px',    fontFamily: 'monospace'}}>
//     Streamlining your vehicle procurement experience!
//     </div>
//         </div>

//         <div className="dashboard-content">
//           <div className="tabOne">
//             {/* User Info */}
//             <div className={"UserInfoSDiv"}>
//             <section id="UserInfoS" className={"UserInfoS"} >
//               <div className="UserInfoSA">
//                 <img className="profilepic" src={propic}></img>
//                 <text className="profileName">Dhanush Gangatkar</text>
//                 <h4
//                   style={{
//                     color: "white",
//                     marginTop: "10px",
//                     fontSize: "small",
//                     fontFamily: "serif",
//                     textDecoration: "underline",
//                   }}
//                 >
//                   maara@gmail.com
//                 </h4>
//               </div>

//               <div className="user-section-content">
//                 <h5 style={{ marginBottom: "unset" }}>Information</h5>
//                 <hr
//                   style={{
//                     borderBottomStyle: "double",
//                     borderBottomColor: "orange",
//                   }}
//                 />
//                 <p
//                   style={{
//                     margin: "unset",
//                     marginBottom: "10px",
//                     width: "inherit",
//                     wordBreak: "break-all",
//                   }}
//                 >
//                   <h5
//                     style={{
//                       margin: "unset",
//                       marginBottom: "4px !important",
//                       fontFamily: "sans-serif",
//                       fontWeight: '400'
//                     }}
//                   >
//                     Name:
//                   </h5>{" "}
//                   <text style={{ fontSize: "small", color: "lightslategray" }}>
//                     Dhanush Gangatkar
//                   </text>
//                 </p>
//                 <div style={{ display: "flex", width: "inherit" }}>
//                   <p
//                     style={{
//                       margin: "unset",
//                       marginBottom: "10px",
//                       width: '50%',
//                       wordBreak: "break-all",
//                     }}
//                   >
//                     <h5
//                       style={{
//                         margin: "unset",
//                         marginBottom: "4px !important",
//                         fontFamily: "sans-serif",
//                         fontWeight: '400'
//                       }}
//                     >
//                       Location: 
//                     </h5>{" "}
//                     <text
//                       style={{ fontSize: "small", color: "lightslategray" }}
//                     >
//                       Bangalore
//                     </text>
//                   </p>
//                   <p
//                     style={{
//                       margin: "unset",
//                       marginBottom: "10px",
//                       width: '50%',
//                       wordBreak: "break-all",
//                     }}
//                   >
//                     <h5
//                       style={{
//                         margin: "unset",
//                         marginBottom: "4px !important",
//                         fontFamily: "sans-serif",
//                         fontWeight: '400'
//                       }}
//                     >
//                       Code: 
//                     </h5>{" "}
//                     <text
//                       style={{ fontSize: "small", color: "lightslategray" }}
//                     >
//                       PE001
//                     </text>
//                   </p>
//                 </div>
//                 <h5 style={{ margin: "unset" }}>Contact</h5>
//                 <hr/>
//                 <div style={{ display: "flex", width: "inherit" }}>
//                   <p
//                     style={{
//                       margin: "unset",
//                       marginBottom: "10px",
//                       width: '50%',
//                       wordBreak: "break-all",
//                     }}
//                   >
//                  <h5
//                       style={{
//                         margin: "unset",
//                         marginBottom: "4px !important",
//                         fontFamily: "sans-serif",
//                         fontWeight: '400'
//                       }}
//                     >
//                       Phone Number: 
//                     </h5>{" "}
//                     <text
//                       style={{ fontSize: "small", color: "lightslategray" }}
//                     >
//                       (123) 456-7890
//                     </text>
//                   </p>
//                   <p
//                     style={{
//                       margin: "unset",
//                       marginBottom: "10px",
//                       width: '50%',
//                       wordBreak: "break-all",
//                     }}
//                   >
//                      <h5
//                       style={{
//                         margin: "unset",
//                         marginBottom: "4px !important",
//                         fontFamily: "sans-serif",
//                         fontWeight: '400'
//                       }}
//                     >
//                       Email: 
//                     </h5>{" "}
//                     <text
//                       style={{ fontSize: "small", color: "lightslategray" }}
//                     >
//                       john.doe@example.com
//                     </text>
//                   </p>
//                 </div>
//                 <p className="flashing-message">
//   Click for More Info !
// </p>

                
//               </div>
//             </section>
// {/* Purchase Requests */}
// <section id="PurchaseRequestsS" className="dashboard-section">
//   <div className="section-header">
//     <Icon path={mdiClipboardText} size={1} color="#ff9800" />
//     <h2>Purchase Requests</h2>
//   </div>
//   <div className="section-content" style={{ scrollbarColor: '#d7cbff #f1f1f1' }}>
//     <ul>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2001 - Completed</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2002 - In Review</span>
//       </li>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2003 - Completed</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2004 - In Review</span>
//       </li>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2005 - Completed</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2006 - In Review</span>
//       </li>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2007 - Completed</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2008 - In Review</span>
//       </li>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2009 - Completed</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Request #2010 - In Review</span>
//       </li>
//     </ul>
//   </div>
// </section>




// {/* Purchase Orders */}
// <section id="PurchaseOrdersS" className="dashboard-section">
//   <div className="section-header">
//     <Icon path={mdiCart} size={1} color="#43a047" />
//     <h2>Purchase Orders</h2>
//   </div>
//   <div className="section-content" style={{ scrollbarColor: 'rgb(255 199 204) rgb(241, 241, 241)' }}>
//     <ul>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Order #1001 - Delivered</span>
//       </li>
//       <li>
//         <Icon path={mdiProgressClock} size={1} color="orangered" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Order #1002 - Pending</span>
//       </li>
//       <li>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Order #1003 - Delivered</span>
//       </li>
//     </ul>
//   </div>
// </section>

//             </div>
//             <div className="notificationsDiv">
//                   <div className="notificationsDivcontent">
//   <div className="notificationsDivbar" style={{    alignItems: 'center'}}>
//     <div style={{     marginRight: 'auto',   alignItems: 'center',    display: 'flex'}}>
//     <Icon path={mdiBell} size={1} color="white" />
//     <span style={{    fontFamily: 'math',
//     marginLeft: '5px',
//     color: 'white',
//     fontPalette: 'normal'}}>NOTIFICATIONS</span>
//     </div>
//     <button className="button"  style={{marginTop: '-20px',
//     marginBottom: '-20px',
//     overflow: 'hidden',
//     height: '60px',
//     borderRadius: '10px',
//     backgroundColor: '#ffffff52',
//     border: 'none'}}>
//       <span style={{    display: 'flex',
//     alignItems: 'center'}}>
//       <Icon path={mdiMessageText} size={1} color="white" />
//       <span   style={{fontFamily: 'sans-serif',
//     marginLeft: '5px',
//     color: 'white',
//     fontPalette: 'normal'}}>MESSAGES</span>
//       </span>
//     </button>
//   </div>
//   <div className="notificationsDivTab">
  
//   <ul style={{ listStyleType: 'none', padding: 0 }}>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1001 - Delivered</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiClockOutline} size={1} color="orangered" />
//         <span style={{ marginLeft: '10px' }}>Order #1002 - Pending</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCloseCircle} size={1} color="red" />
//         <span style={{ marginLeft: '10px' }}>Order #1003 - Cancelled</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiTruckDelivery} size={1} color="blue" />
//         <span style={{ marginLeft: '10px' }}>Order #1004 - Shipped</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCashCheck} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1005 - Payment Confirmed</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiAlertCircle} size={1} color="orangered" />
//         <span style={{ marginLeft: '10px' }}>Order #1006 - Pending Approval</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1007 - Delivered</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCashRemove} size={1} color="red" />
//         <span style={{ marginLeft: '10px' }}>Order #1008 - Awaiting Payment</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCloseCircle} size={1} color="red" />
//         <span style={{ marginLeft: '10px' }}>Order #1009 - Cancelled</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiTruckDelivery} size={1} color="blue" />
//         <span style={{ marginLeft: '10px' }}>Order #1010 - Shipped</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCashRemove} size={1} color="red" />
//         <span style={{ marginLeft: '10px' }}>Order #1011 - Payment Failed</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1012 - Delivered</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiClockOutline} size={1} color="orangered" />
//         <span style={{ marginLeft: '10px' }}>Order #1013 - Pending</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiTruckDelivery} size={1} color="blue" />
//         <span style={{ marginLeft: '10px' }}>Order #1014 - Shipped</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1015 - Delivered</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCloseCircle} size={1} color="red" />
//         <span style={{ marginLeft: '10px' }}>Order #1016 - Cancelled</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCashCheck} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1017 - Payment Confirmed</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiAlertCircle} size={1} color="orangered" />
//         <span style={{ marginLeft: '10px' }}>Order #1018 - Pending Approval</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiCheckCircle} size={1} color="green" />
//         <span style={{ marginLeft: '10px' }}>Order #1019 - Delivered</span>
//       </li>
//       <li style={{ display: 'flex', alignItems: 'center', fontFamily: 'auto' }}>
//         <Icon path={mdiTruckDelivery} size={1} color="blue" />
//         <span style={{ marginLeft: '10px' }}>Order #1020 - Shipped</span>
//       </li>
//     </ul>
//   </div>
// </div>
//           {/* User Documents */}
//           {/* <section id="UserDocumentsS" className="dashboard-section">
//               <div className="section-header">
//                 <Icon path={mdiFileDocument} size={1} color="#8e24aa" />
//                 <h2>User Documents</h2>
//               </div>
//               <div className="section-content">
//                 <ul>
//                   <li>Document A.pdf</li>
//                   <li>Document B.docx</li>
//                 </ul>
//               </div>
//             </section> */}

// <section id="UploadSection" className="dashboard-sectionDocs">
//   <div className="section-headerDocs">
//     <img src={uploadimage} alt="Upload" style={{    height: '100%',
//     width: '100%',
//     transform: 'scale(1.5)'}}/>
//   </div>
//   <div className="section-contentDocs">
//     <ul>
//       {[
//         { name: 'GST Certificate', key: 'gstCertificate' },
//         { name: 'PAN Card', key: 'panCard' },
//         { name: 'Bank Mandate', key: 'bankMandate' },
//       ].map((doc, index) => (
//         <li key={doc.key}>
//           <span>{doc.name}</span>
//           {uploads[doc.key] ? (
//             <>
//               <Icon path={mdiCheckCircle} size={1} color="green" />
//               <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Uploaded</span>
//               <button 
//                 onClick={() => handleRemove(doc.key)} 
//                 className="button"  
//                 style={{
//                   marginTop: '-20px',
//                   marginBottom: '-20px',
//                   overflow: 'hidden',
//                   height: '38px',
//                   borderRadius: '10px',
//                   backgroundColor: '#ffffff52',
//                   border: 'none'
//                 }}>
//                 <Icon path={mdiDeleteForever} size={1} color="red" />
//               </button>
//             </>
//           ) : (
//             <>
//               <Icon path={mdiProgressClock} size={1} color="orangered" />
//               <span style={{ marginLeft: '5px', color: 'lightcyan' }}>Pending</span>
//               <button 
//                 onClick={() => handleUpload(doc.key)} 
//                 className="button"  
//                 style={{
//                   marginTop: '-20px',
//                   marginBottom: '-20px',
//                   overflow: 'hidden',
//                   height: '38px',
//                   borderRadius: '10px',
//                   backgroundColor: '#ffffff52',
//                   border: 'none'
//                 }}>
//                 <Icon path={mdiCloudUpload} size={1} color="white" />
//               </button>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
// </section>




//             </div>
//           </div>

//           <div className="sections-grid">
        
          

           
//           </div>
          
//         </div>
        
//       </div>
//       <Appfooter>

//       </Appfooter>
//     </div>

//     // <div className="dashboard">
//     //     <header className="dashboard-header">
//     //         <h1>Corporate Sales Dashboard</h1>
//     //     </header>

//     // </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import UserProfile from './pages/userProfile';
import Orders from './pages/purchaseRequest';
import POrders from './pages/purchaseOrder'
import PrObjectPage from './pages/prObjPage';

function App() {
  return (
    <Router>
      <div>
        {/* Route definitions */}
        <Routes>
        {/* <Route path="/" element={<PrObjectPage />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/Profile/:cId" element={<UserProfile />} />
          <Route path="/Inquiry" element={<Orders />} />
          <Route path="/Orders" element={<POrders />} />
          <Route path="/Inquiry/:id" element={<PrObjectPage />} />
          <Route path="/Order/:id" element={<PrObjectPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

