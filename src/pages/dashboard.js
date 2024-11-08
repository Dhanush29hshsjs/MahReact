import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mdiCloudUpload,
  mdiDeleteForever,
  mdiBell,
  mdiClipboardText,
  mdiMessageText,
  mdiCart,
  mdiProgressClock,
  mdiCheckCircle,
  mdiTruckDelivery,
  mdiClockOutline,
  mdiCloseCircle,
  mdiCashCheck,
  mdiAlertCircle,
  mdiCashRemove,
  mdiAccountVoice,
  mdiCashClock,
  mdiTruckDeliveryOutline,
  mdiCheckDecagram,
  mdiCheckDecagramOutline,
  mdiTextBoxCheckOutline,
  mdiAccountCreditCardOutline,
  mdiTextBoxEditOutline,
  mdiBellBadgeOutline,
  mdiUpdate,
} from "@mdi/js";
import Icon from "@mdi/react";
import emptyProfilePic from "../emptyProfilePic.webp";
import "../App.css";
import uploadimage from "../userdocuments.jpg";
import MyAppBar from "../components/Appbar";
import Appfooter from "../components/Appfooter";
import { getUserByLoginCred, getNotificationsByCustomerId, getPurchaseRequestsByCustomerId, getPurchaseOrdersByCustomerId, uploadUserFile, getUserFileByCustomerId, deleteUserFileByCustomerId } from "../api";
import {
  SpinnerCircular,
  SpinnerDotted,
  SpinnerDiamond,
  SpinnerRomb,
  SpinnerCircularSplit,
} from "spinners-react";
// import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Dashboard = () => {
  const email = "Pradeep@gmail.com";
  const password = "11111";
  sessionStorage.setItem('pass', password);

  const [userInfo, setUserInfo] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [docUrls ,setDocUrls] =useState({});
  const [uploads, setUploads] = useState({});
  const [userInfoLoader, setUserInfoLoader] = useState(true);
  const [notificationsLoader, setnotificationsLoader] = useState(true);
  const [PurchaseRequestsLoader, setPurchaseRequestsLoader] = useState(true);
  const [PurchaseOrdersLoader, setPurchaseOrdersLoader] = useState(true);
  const [UploadSectionLoader, setUploadSectionLoader] = useState(true);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserByLoginCred(email, password); // Assumes getUserByLoginCred is an async function
        if (data.length == 1) setUserInfo(data[0]);
        // alert(userInfo.name)
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
      setUserInfoLoader(false);
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userInfo) return; // Only proceed if userInfo is set
      try {
        // setnotificationsLoader(true);
        const data = await getNotificationsByCustomerId(userInfo.customerId,30);
        data.data.value.forEach((notification) => {
          switch (notification.commentsText.substring(11)) {
            case "Negotiated Quotation":
              notification.icon = mdiTextBoxEditOutline;
              break;
            case "Payment Reminder":
              notification.icon = mdiCashClock;
              break;
            case "Out for Delivery":
              notification.icon = mdiTruckDeliveryOutline;
              break;
            case "Payment Confirmed":
              notification.icon = mdiCashCheck;
              break;
              case "Quotation Received":
                notification.icon = mdiTextBoxCheckOutline;
                break; 
                case "Sales Order & Payment Request":
                  notification.icon = mdiAccountCreditCardOutline;
                  break; 
                  case "PO Accepted":
                    notification.icon = mdiCheckDecagramOutline;
                    break;   
            default:
              notification.icon = mdiBellBadgeOutline;
              break;
          }
        }); 
        if(notifications != data.data.value) 
        setNotifications(data.data.value);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
      setnotificationsLoader(false);
    };
    const fetchPurchaseRequests = async () =>{
      try {
      setPurchaseRequestsLoader(true);
      let prdata = await getPurchaseRequestsByCustomerId(userInfo.customerId,15);
      prdata.data.value.forEach((PR)=>{
        PR.purchaseEnquiryId += " - "
      })
        setPurchaseRequests(prdata.data.value);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
      setPurchaseRequestsLoader(false)
    };
    const fetchPurchaseOrders = async () =>{
      try {
      setPurchaseOrdersLoader(true);
      let podata = await getPurchaseOrdersByCustomerId(userInfo.customerId,15);
      podata.data.value.forEach((PO)=>{
        PO.purchaseOrderId += " - "
      })
        setPurchaseOrders(podata.data.value);
      } catch (error) {
        console.error("Failed to fetch PurchaseOrders:", error);
      }
      setPurchaseOrdersLoader(false);
      
      
    };
    const fetchUserDocs = async ()=>{
      try {
        const userDocs = await getUserFileByCustomerId(userInfo.customerId);
        console.log(userDocs);
            setDocUrls({bankMandate:userDocs.bankMandate? URL.createObjectURL(userDocs.bankMandate):null,
              gstCertificate:userDocs.gstCertificate?URL.createObjectURL(userDocs.gstCertificate):null,
               panCard:userDocs.panCard?URL.createObjectURL(userDocs.panCard):null,
               profilePic:userDocs.profilePic?URL.createObjectURL(userDocs.profilePic):null});
               userDocs.bankMandate = userDocs.bankMandate? true : false;
               userDocs.gstCertificate = userDocs.gstCertificate? true : false;
               userDocs.panCard = userDocs.panCard? true : false;
               setUploads(userDocs);
               setUploadSectionLoader(false);
      } catch (error) {
        console.error("Failed to fetch User Documents:", error);
      }
    }

    fetchNotifications();
    setInterval(() => {
      fetchNotifications();
    }, 10000);
    fetchPurchaseRequests();
    fetchPurchaseOrders();
    fetchUserDocs();
  }, [userInfo]);
  const refreshNotifications = async ()=>{
    try {
      // setnotificationsLoader(true);
      const data = await getNotificationsByCustomerId(userInfo.customerId,30);
      data.data.value.forEach((notification) => {
        switch (notification.commentsText.substring(11)) {
          case "Negotiated Quotation":
            notification.icon = mdiTextBoxEditOutline;
            break;
          case "Payment Reminder":
            notification.icon = mdiCashClock;
            break;
          case "Out for Delivery":
            notification.icon = mdiTruckDeliveryOutline;
            break;
          case "Payment Confirmed":
            notification.icon = mdiCashCheck;
            break;
            case "Quotation Received":
              notification.icon = mdiTextBoxCheckOutline;
              break; 
              case "Sales Order & Payment Request":
                notification.icon = mdiAccountCreditCardOutline;
                break; 
                case "PO Accepted":
                  notification.icon = mdiCheckDecagramOutline;
                  break;   
          default:
            notification.icon = mdiBellBadgeOutline;
            break;
        }
      }); 
      if(notifications != data.data.value) 
      setNotifications(data.data.value);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  const handleDrop = async (event) => {
        
    
    
    let file;
    if(event.target && event.target.files)
      file = event.target.files[0];
    else alert('Oops! You haven’t selected any files. Please choose at least one file to upload.');

    const reader = new FileReader();
        reader.onload = async function (e) {
          setUploadSectionLoader(true);
            const arrayBuffer = e.target.result;
            const key = event.target.getAttribute('data-key');
             let res = await uploadUserFile(key,arrayBuffer,file.type,userInfo.customerId);
             setUploads((prev) => ({ ...prev, [key]: true }));
             try {
              const userDocs = await getUserFileByCustomerId(userInfo.customerId);
              console.log(userDocs);
                  setDocUrls({bankMandate:userDocs.bankMandate? URL.createObjectURL(userDocs.bankMandate):null,
                    gstCertificate:userDocs.gstCertificate?URL.createObjectURL(userDocs.gstCertificate):null,
                     panCard:userDocs.panCard?URL.createObjectURL(userDocs.panCard):null});
                     userDocs.bankMandate = userDocs.bankMandate? true : false;
                     userDocs.gstCertificate = userDocs.gstCertificate? true : false;
                     userDocs.panCard = userDocs.panCard? true : false;
                     setUploads(userDocs);
                     setUploadSectionLoader(false);
            } catch (error) {
              console.error("Failed to fetch User Documents:", error);
            }
          }
            reader.readAsArrayBuffer(file);
          
            
          
          
          
    // await $.ajax({
    //   url:'https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files',
    //   method : "POST",
    //   timeout:0,
    //   data:JSON.stringify(file),
    //   contentType:"application/json",
    //   success:async function (params) {
    //     console.log(params);
    //     const reader = new FileReader();
    //     reader.onload = async function (e) {
    //         const arrayBuffer = e.target.result; // File data in ArrayBuffer format

    //        await $.ajax({
    //             url: `https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${params.ID},IsActiveEntity=true)/content`,
    //             method: 'PUT',
    //             data: arrayBuffer,
    //             processData: false, // Do not process the data
    //             contentType: newFiles[index].fileObj.type, // Set content type to file's MIME type
    //             success: function () {
    //                 // alert('File uploaded successfully!');
    //             },
    //             error: function (err) {
    //                 console.error('Error uploading file:', err);
    //                 // alert('File upload failed.');
    //             }
    //         });
    //     };
    //     reader.readAsArrayBuffer(newFiles[index].fileObj);
    //   },
    //   error:function (params) {
    //     console.log(params);
    //   }
    // });  
    
  };
  const handleUpload = (uploadKey) => {
    // Simulate file upload
    
    document.getElementById(uploadKey).click();
    // setUploads((prev) => ({ ...prev, [uploadKey]: true }));
  };
  const handleRemove =async (uploadKey) => {
    // Reset the upload status
    let res =await deleteUserFileByCustomerId(userInfo.customerId,uploadKey);
    setUploads((prev) => ({ ...prev, [uploadKey]: false }));
  };
  const navigate = useNavigate();
  const goToUserProfile = (cId) => {
    if(cId)
    navigate(`/Profile/${cId}`);
  };
  const goToInquiry = () => {
    navigate("/Inquiry");
  };
  return (
    <div className="appbackground">
      <video autoPlay loop muted className="video-background">
        <source
          src={`${process.env.PUBLIC_URL}/assets/mahindrabackground.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="video-backgroundOverlay"></div>

      <MyAppBar></MyAppBar>
      {/* <AppBar ><Toolbar>
      </Toolbar></AppBar> */}

      <div className="dashboard-grid">
        <div className="transpWindow">
          <div
            className="typing-container"
            style={{ marginTop: "70px", paddingBottom: "0px" }}
          >
            Welcome to Mahindra Corporate Sales
          </div>
          <div
            className="typing-container"
            style={{ fontSize: "15px", fontFamily: "monospace" }}
          >
            Streamlining your vehicle procurement experience!
          </div>
        </div>

        <div className="dashboard-content">
          <div className="tabOne">
            {/* User Info */}
            <div className={"UserInfoSDiv"}>
              <section
                onClick={()=>goToUserProfile(userInfo.customerId)}
                id="UserInfoS"
                className={"UserInfoS"}
              >
                {userInfoLoader ? (
                  <div
                    className="UserInfoSA"
                    style={{
                      display: "flex",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="rgb(255 244 233)"
                    ></SpinnerCircularSplit>
                  </div>
                ) : (
                  <div className="UserInfoSA">
                    <img className="profilepic" src={docUrls.profilePic?docUrls.profilePic:emptyProfilePic}></img>

                    <text className="profileName">{userInfo.name}</text>
                    <h4
                      style={{
                        color: "white",
                        marginTop: "10px",
                        fontSize: "small",
                        fontFamily: "serif",
                        textDecoration: "underline",
                      }}
                    >
                      {userInfo.email}
                    </h4>
                  </div>
                )}

                {userInfoLoader ? (
                  <div></div>
                ) : (
                  <div className="user-section-content">
                    <h5 style={{ marginBottom: "unset" }}>Information</h5>
                    <hr
                      style={{
                        borderBottomStyle: "double",
                        borderBottomColor: "orange",
                      }}
                    />
                    <p
                      style={{
                        margin: "unset",
                        marginBottom: "10px",
                        width: "inherit",
                        wordBreak: "break-all",
                      }}
                    >
                      <h5
                        style={{
                          margin: "unset",
                          marginBottom: "4px !important",
                          fontFamily: "sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        Name:
                      </h5>{" "}
                      <text
                        style={{ fontSize: "small", color: "lightslategray" }}
                      >
                        {userInfo.name}
                      </text>
                    </p>
                    <div style={{ display: "flex", width: "inherit" }}>
                      <p
                        style={{
                          margin: "unset",
                          marginBottom: "10px",
                          width: "50%",
                          wordBreak: "break-all",
                        }}
                      >
                        <h5
                          style={{
                            margin: "unset",
                            marginBottom: "4px !important",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                          }}
                        >
                          Location:
                        </h5>{" "}
                        <text
                          style={{ fontSize: "small", color: "lightslategray" }}
                        >
                          {userInfo.location}
                        </text>
                      </p>
                      <p
                        style={{
                          margin: "unset",
                          marginBottom: "10px",
                          width: "50%",
                          wordBreak: "break-all",
                        }}
                      >
                        <h5
                          style={{
                            margin: "unset",
                            marginBottom: "4px !important",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                          }}
                        >
                          VAN:
                        </h5>{" "}
                        <text
                          style={{ fontSize: "small", color: "lightslategray" }}
                        >
                          {userInfo.van}
                        </text>
                      </p>
                    </div>
                    <h5 style={{ margin: "unset" }}>Contact</h5>
                    <hr />
                    <div style={{ display: "flex", width: "inherit" }}>
                      <p
                        style={{
                          margin: "unset",
                          marginBottom: "10px",
                          width: "50%",
                          wordBreak: "break-all",
                        }}
                      >
                        <h5
                          style={{
                            margin: "unset",
                            marginBottom: "4px !important",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                          }}
                        >
                          Phone Number:
                        </h5>{" "}
                        <text
                          style={{ fontSize: "small", color: "lightslategray" }}
                        >
                          {userInfo.phone}
                        </text>
                      </p>
                      <p
                        style={{
                          margin: "unset",
                          marginBottom: "10px",
                          width: "50%",
                          wordBreak: "break-all",
                        }}
                      >
                        <h5
                          style={{
                            margin: "unset",
                            marginBottom: "4px !important",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                          }}
                        >
                          Email:
                        </h5>{" "}
                        <text
                          style={{ fontSize: "small", color: "lightslategray" }}
                        >
                          {userInfo.email}
                        </text>
                      </p>
                    </div>
                    <p className="flashing-message">Click for More Info !</p>
                  </div>
                )}
              </section>
              {/* Purchase Requests */}
              <section
                onClick={goToInquiry}
                id="PurchaseRequestsS"
                className="dashboard-section"
              >
                <div className="section-header">
                  <Icon path={mdiClipboardText} size={1} color="#ff9800" />
                  <h2>Purchase Requests</h2>
                </div>
                <div
                  className={`section-content ${
                    PurchaseRequestsLoader ? "flex-display" : ""
                  }`}
                  style={{
                    scrollbarColor: "#d7cbff #f1f1f1",
                    // display: "flex",
                    minHeight: "200px",
                  }}
                >
                  {PurchaseRequestsLoader ? (
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="rgb(255 244 233)"
                    ></SpinnerCircularSplit>
                  ) : (
                    <ul>
                      {/* <li>
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "5px", color: "lightcyan" }}>
                          Request #2001 - Completed
                        </span>
                      </li> */}
                      {purchaseRequests.map((purchaseRequest)=>(
                        <li>
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "5px", color: "lightcyan" }}>
                          {purchaseRequest.purchaseEnquiryId}
                        </span>
                      </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* Purchase Orders */}
              <section id="PurchaseOrdersS" className="dashboard-section">
                <div className="section-header">
                  <Icon path={mdiCart} size={1} color="#43a047" />
                  <h2>Purchase Orders</h2>
                </div>
                <div
                  className={`section-content ${
                    PurchaseOrdersLoader ? "flex-display" : ""
                  }`}
                  style={{
                    // display: "flex",
                    minHeight: "200px",
                    scrollbarColor: "rgb(255 199 204) rgb(241, 241, 241)",
                  }}
                >
                  {PurchaseOrdersLoader ? (
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="rgb(255 244 233)"
                    ></SpinnerCircularSplit>
                  ) : (
                    <ul>
                      {/* <li>
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "5px", color: "lightcyan" }}>
                          Order #1001 - Delivered
                        </span>
                      </li> */}
                     {purchaseOrders.map((PO)=>(
                       <li>
                       <Icon path={mdiCheckCircle} size={1} color="green" />
                       <span style={{ marginLeft: "5px", color: "lightcyan" }}>
                         {PO.purchaseOrderId}
                       </span>
                     </li>
                     ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
            <div className="notificationsDiv">
              <div className="notificationsDivcontent">
                <div
                  className="notificationsDivbar"
                  style={{ alignItems: "center" }}
                >
                  <div
                    style={{
                      marginRight: "auto",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Icon path={mdiBell} size={1} color="white" />
                    <span
                      style={{
                        fontFamily: "math",
                        marginLeft: "5px",
                        color: "white",
                        fontPalette: "normal",
                      }}
                    >
                      NOTIFICATIONS
                    </span>
                  </div>
                  <button
                    onClick={()=>refreshNotifications()}
                    className="button"
                    style={{
                      marginTop: "-20px",
                      marginBottom: "-20px",
                      overflow: "hidden",
                      height: "60px",
                      borderRadius: "10px",
                      backgroundColor: "#ffffff52",
                      border: "none",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Icon path={mdiUpdate} size={1} color="white" />
                      <span
                        style={{
                          fontFamily: "sans-serif",
                          marginLeft: "5px",
                          color: "white",
                          fontPalette: "normal",
                        }}
                      >
                        UPDATE
                      </span>
                    </span>
                  </button>
                </div>
                <div
                  className={`notificationsDivTab ${
                    notificationsLoader ? "flex-display" : ""
                  }`}
                >
                  {notificationsLoader ? (
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="#ff736f"
                    ></SpinnerCircularSplit>
                  ) : (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {notifications.map((notification) => (
                        <li
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "auto",
                          }}
                        >
                          <Icon
                            path={notification.icon}
                            size={1}
                            color="orangered"
                          />
                          <span style={{ marginLeft: "10px", fontFamily:'sans-serif'}}>
                            {notification.commentsText}
                          </span>
                        </li>
                      ))}
                      {/* <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1001 - Delivered
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon
                          path={mdiClockOutline}
                          size={1}
                          color="orangered"
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1002 - Pending
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCloseCircle} size={1} color="red" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1003 - Cancelled
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiTruckDelivery} size={1} color="blue" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1004 - Shipped
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCashCheck} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1005 - Payment Confirmed
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon
                          path={mdiAlertCircle}
                          size={1}
                          color="orangered"
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1006 - Pending Approval
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1007 - Delivered
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCashRemove} size={1} color="red" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1008 - Awaiting Payment
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCloseCircle} size={1} color="red" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1009 - Cancelled
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiTruckDelivery} size={1} color="blue" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1010 - Shipped
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCashRemove} size={1} color="red" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1011 - Payment Failed
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1012 - Delivered
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon
                          path={mdiClockOutline}
                          size={1}
                          color="orangered"
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1013 - Pending
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiTruckDelivery} size={1} color="blue" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1014 - Shipped
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1015 - Delivered
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCloseCircle} size={1} color="red" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1016 - Cancelled
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCashCheck} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1017 - Payment Confirmed
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon
                          path={mdiAlertCircle}
                          size={1}
                          color="orangered"
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1018 - Pending Approval
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiCheckCircle} size={1} color="green" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1019 - Delivered
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "auto",
                        }}
                      >
                        <Icon path={mdiTruckDelivery} size={1} color="blue" />
                        <span style={{ marginLeft: "10px" }}>
                          Order #1020 - Shipped
                        </span>
                      </li> */}
                    </ul>
                  )}
                </div>
              </div>
              {/* User Documents */}
              {/* <section id="UserDocumentsS" className="dashboard-section">
              <div className="section-header">
                <Icon path={mdiFileDocument} size={1} color="#8e24aa" />
                <h2>User Documents</h2>
              </div>
              <div className="section-content">
                <ul>
                  <li>Document A.pdf</li>
                  <li>Document B.docx</li>
                </ul>
              </div>
            </section> */}

              <section id="UploadSection" className="dashboard-sectionDocs">
                <div className="section-headerDocs">
                  <img
                    src={uploadimage}
                    alt="Upload"
                    style={{
                      height: "100%",
                      width: "100%",
                      transform: "scale(1.5)",
                    }}
                  />
                </div>
                <div
                  className={`section-contentDocs ${
                    UploadSectionLoader ? "flex-display" : ""
                  }`}
                  style={{
                    minHeight: "200px",
                  }}
                >
                  {UploadSectionLoader ? (
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="rgb(255 244 233)"
                    ></SpinnerCircularSplit>
                  ) : (
                    <ul>
                      {[
                        { name: "GST Certificate", key: "gstCertificate" },
                        { name: "PAN Card", key: "panCard" },
                        { name: "Bank Mandate", key: "bankMandate" },
                      ].map((doc, index) => (
                        <li key={doc.key}>
                          
                          {uploads[doc.key] ? (
                            <>
                            <a href={docUrls[doc.key]}>{doc.name}</a>
                              <Icon
                                path={mdiCheckCircle}
                                size={1}
                                color="green"
                              />
                              <span
                                style={{
                                  marginLeft: "5px",
                                  color: "lightcyan",
                                }}
                              >
                                Uploaded
                              </span>
                              <button
                                onClick={() => handleRemove(doc.key)}
                                className="button"
                                style={{
                                  marginTop: "-20px",
                                  marginBottom: "-20px",
                                  overflow: "hidden",
                                  height: "38px",
                                  borderRadius: "10px",
                                  backgroundColor: "#ffffff52",
                                  border: "none",
                                }}
                              >
                                <Icon
                                  path={mdiDeleteForever}
                                  size={1}
                                  color="red"
                                />
                              </button>
                            </>
                          ) : (
                            <>
                            <span>{doc.name}</span>
                            {/* <input id={doc.key} type="file" hidden onChange={
                              (event) => handleDrop(event)} 
                              /> */}
                              <input 
  id={doc.key} 
  data-key={doc.key}
  type="file" 
  hidden 
  onChange={(event) => handleDrop(event)}  
/>
                              <Icon
                                path={mdiProgressClock}
                                size={1}
                                color="orangered"
                              />
                              <span
                                style={{
                                  marginLeft: "5px",
                                  color: "lightcyan",
                                }}
                              >
                                Pending
                              </span>
                              <button
                                onClick={() => handleUpload(doc.key)}
                                className="button"
                                style={{
                                  marginTop: "-20px",
                                  marginBottom: "-20px",
                                  overflow: "hidden",
                                  height: "38px",
                                  borderRadius: "10px",
                                  backgroundColor: "#ffffff52",
                                  border: "none",
                                }}
                              >
                                <Icon
                                  path={mdiCloudUpload}
                                  size={1}
                                  color="white"
                                />
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          </div>

          <div className="sections-grid"></div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </div>

    // <div className="dashboard">
    //     <header className="dashboard-header">
    //         <h1>Corporate Sales Dashboard</h1>
    //     </header>

    // </div>
  );
};

export default Dashboard;
