import { AppBar, Toolbar, Button, TextField, InputAdornment } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../App.css";
import Icon from "@mdi/react";
import emptyProfilePic from "../emptyProfilePic.webp"

import {
  mdiAccountOutline,
  mdiDotsHorizontalCircle,
  mdiPencil,
  mdiLogout,
  mdiLockReset,
  mdiHumanEdit,
  mdiAccountEditOutline,
  mdiAccountArrowUpOutline,
  mdiFileUndoOutline,
  mdiAccountSyncOutline,
  mdiTrayRemove,
  mdiLockRemoveOutline,
  mdiLockOpenCheckOutline,
  mdiLockOpenVariantOutline,
} from "@mdi/js";
import resetPasswordImg from "../resetPasswordImage.png";
import mahLogo from "../mahindra-logo-new.webp";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { useParams } from "react-router-dom";
import { getDelProfilePic, getUserById, updateProfileData, uploadProfilePic } from "../api";
import { SpinnerCircularSplit } from "spinners-react";

var initialProfileData={};
const UserProfile = () => {
  const cId = useParams().cId;
  const [editableMode, setEditableMode] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profilePicUrl,setProfilePicUrl] = useState("")
  const [profileDataLoader, setProfileDataLoader] = useState(true);
  const [resetPass,setResetPass]=useState({
    currentPassword:sessionStorage.getItem('pass'),
    oldPassword:"",
    newPassword:"",
    confirmNewPassword:""
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfileData = async () => {
      try {
        let userData = await getUserById(cId);
        let profileData = {name:userData.name||"",
           address:userData.address||"",
            taxId:userData.taxId||"",
             van:userData.van||"",
              jobTitle:userData.jobTitle||"",
               department:userData.department||"",
                email:userData.email||"",
                 phone:userData.phone||"",
                  contactPerson:userData.contactPerson||"",
                   companyName:userData.companyName||"" }
        setProfileData(profileData);
        initialProfileData = profileData;
        let userProfilepic = await getDelProfilePic(cId,'get');
        if(userProfilepic.size != 0)
        setProfilePicUrl(URL.createObjectURL(userProfilepic))
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
      setProfileDataLoader(false);
    };
    fetchProfileData();
    
  }, []);
  const uploadClicked = async () => {
    document.getElementById('profilePicInput').click();
  }
  const deleteProfilePic = async()=>{
    let res =await getDelProfilePic(cId,'delete');
    setProfilePicUrl("");
    console.log(res);
  }
  const handleDrop = async (event) => {
    let file;
    if(event.target && event.target.files)
      file = event.target.files[0];
    else alert('Oops! You haven’t selected any image. Please choose one image to upload.');
     let res=await uploadProfilePic(cId,file,file.type);
     let userProfilepic = await getDelProfilePic(cId,'get');
        if(userProfilepic.size != 0)
        setProfilePicUrl(URL.createObjectURL(userProfilepic))
     console.log(res)
  };
  const editClicked = () => {
    setEditableMode(!editableMode);
  };
  const profileDiscardDraft = ()=>{
setProfileData(initialProfileData);
  };
  const updateProfile =async ()=>{
    let res = await updateProfileData(cId,profileData);
    initialProfileData = profileData;
    console.log(res);
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div
        style={{
          background:
            "linear-gradient(110deg, rgb(255 239 146), rgb(255 187 137))",
          zIndex: "-1",
          minWidth: "100%",
          minHeight: "100%",
          position: "fixed",
        }}
      ></div>
      <AppBar
        style={{
          position: "static",
          background: "rgb(255 255 255 / 45%)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 0 5px purple",
        }}
      >
        <Toolbar>
          <span
            style={{
              marginRight: "auto",
              color: "purple",
              fontSize: "xx-large",
              fontFamily: "none",
              marginLeft: "10px",
            }}
          >
            User Profile
          </span>

          <Icon path={mdiLogout} size={1} className="userProfileIconHBar" />

          {/* {menuVisible && (
        <nav className="dropdown-menu">
          <ul>
            <li style={{color:'black',    borderBottom: '1px solid #5a5959',display: 'flex',
    alignItems: 'center'}}>
                <Icon path={mdiPencil} size={1} color='#4CAF50'></Icon>
                <span style={{marginLeft:'5px',color:'white'}}>Edit</span></li>
            <li  style={{color:'black', borderBottom: '1px solid #5a5959',display: 'flex',
    alignItems: 'center'}}>
            <Icon path={mdiLockReset} size={1} color='#FF980'></Icon>
            <span style={{marginLeft:'5px',color:'white'}}>Reset Password</span>
            </li>
            <li style={{color:'black', borderBottom: '1px solid #5a5959',display: 'flex',
    alignItems: 'center'}}>
            <Icon path={mdiLogout} size={1} color='#F44336'></Icon>
            <span style={{marginLeft:'5px', color:'white'}}>Logout</span>
            </li>
          </ul>
        </nav>
      )} */}
        </Toolbar>
      </AppBar>
      <div
        style={{
          marginTop: "130px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "450px",
            width: "65%",
            backgroundColor: "aliceblue",
            borderRadius: "10px",
            boxShadow: "0 2px 15px #232323",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <section
              style={{
                height: "80px",
                width: "80px",
                backgroundColor: "#df2869",
                boxShadow: "#323131 0px 1px 10px",
                marginTop: "-45px",
                marginLeft: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon path={mdiAccountOutline} color="white" size={1.5} />
            </section>
            <span
              style={{
                alignSelf: "center",
                marginLeft: "40px",
                fontFamily: "none",
                fontSize: "x-large",
                marginTop: "14px",
                color: "#666666",
              }}
            >
              General Information
            </span>
            {!profileDataLoader && (
  <>
    {!editableMode && (
      <div onClick={() => editClicked()}>
        <Icon
          style={{
            marginTop: "14px",
            alignSelf: "center",
            marginLeft: "15px",
          }}
          className="userProfileIcon"
          path={mdiAccountEditOutline}
          size={1.2}
        />
      </div>
    )}
    <div style={{    marginLeft: 'auto'}} onClick={()=>{
      setResetPass({confirmNewPassword:"",newPassword:"",oldPassword:""})
      setResetPassword(!resetPassword);
    }}>
    <Icon
      style={{
        marginTop: "14px",
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "10px",
      }}
      className="userProfileIcon"
      path={mdiLockReset}
      size={1.2}
    />
    </div>
   
  </>
)}

            
          </div>

          {/* Form Fields Section */}
          <div
            style={{
              marginTop: "20px",
              alignContent: "center",
              height: "100%",
              alignSelf: profileDataLoader ? "center" : "auto",
            }}
          >
            {profileDataLoader ? (
              <SpinnerCircularSplit
                style={{ margin: "auto" }}
                color="rgb(255 244 233)"
              ></SpinnerCircularSplit>
            ) : (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Company Name
                    </label>
                    <input
                     onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                      value={profileData.companyName}
                      type="text"
                      placeholder="Enter company name"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Contact Person
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, contactPerson: e.target.value })}
                      value={profileData.contactPerson}
                      type="text"
                      placeholder="Enter contact person name"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      value={profileData.phone}
                      type="tel"
                      placeholder="Enter phone number"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      value={profileData.email}
                      type="email"
                      placeholder="Enter email address"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Department
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      value={profileData.department}
                      type="text"
                      placeholder="Enter department"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Job Title
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                      value={profileData.jobTitle}
                      type="text"
                      placeholder="Enter job title"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Virtual Account Number (VAN)
                    </label>
                    <input
                      type="text"
                      value={profileData.van}
                      readOnly
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0", // Gray background to show it's non-editable
                        color: "rgb(64 64 64)",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#666",
                        marginBottom: "5px",
                        display: "block",
                      }}
                    >
                      Tax ID
                    </label>
                    <input
                    onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                      value={profileData.taxId}
                      type="text"
                      placeholder="Enter Tax ID"
                      readOnly={!editableMode}
                      style={{
                        backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#666",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Address
                  </label>
                  <input
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    value={profileData.address}
                    type="text"
                    placeholder="Enter address"
                    readOnly={!editableMode}
                    style={{
                      backgroundColor: editableMode ? "#ffffff" : "#f0f0f0",
                      width: "100%",
                      height: "35px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            width: "22%",
            borderRadius: "10px",
            boxShadow: "0 2px 15px #232323",
            backgroundColor: "aliceblue",
          }}
        >
          <div style={{ textAlign: "center", justifyItems: "center" }}>
            <div class="flip-card">
              <input
                id="profilePicInput"
                type="file"
                hidden
                accept="image/*"
                onChange={(event) => handleDrop(event)}
              />
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    style={{
                      boxShadow: "0 2px 12px rgb(0 0 0)",
                      height: "160px",
                      width: "160px",
                      borderRadius: "100%",
                      marginTop: "-50px",
                    }}
                    src={profilePicUrl!=""?profilePicUrl:emptyProfilePic}
                    alt="Profile Picture"
                  />
                </div>
                <div
                  class="flip-card-back"
                  style={{
                    boxShadow: "0 2px 12px rgb(0 0 0)",
                    height: "160px",
                    width: "160px",
                    borderRadius: "100%",
                    marginTop: "-25px",
                  }}
                >
                  {profileDataLoader ? (
                    <SpinnerCircularSplit
                      style={{ margin: "auto" }}
                      color="rgb(255 244 233)"
                    ></SpinnerCircularSplit>
                  ) : (
                    <div>
                      <Button
                      onClick={()=>uploadClicked()}
                        style={{
                          flexDirection: "column",

                          gap: "10px",
                          display: "flex",
                        }}
                      >
                        <Icon
                          style={{ marginRight: "10px" }}
                          path={mdiHumanEdit}
                          size={1}
                          color="white"
                        />
                        <span
                          style={{ fontFamily: "cursive", fontSize: "small" }}
                        >
                          Update Image
                        </span>
                      </Button>
                      <hr />
                      <Button
                      onClick={()=>deleteProfilePic()}
                        style={{
                          flexDirection: "column",
                          gap: "10px",
                          display: "flex",
                        }}
                      >
                        <Icon
                          style={{ marginRight: "10px" }}
                          path={mdiTrayRemove}
                          size={1}
                          color="white"
                        />
                        <span
                          style={{ fontFamily: "cursive", fontSize: "small" }}
                        >
                          Remove Image
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {profileDataLoader ? (
            <SpinnerCircularSplit
              style={{ margin: "auto" }}
              color="rgb(255 244 233)"
            ></SpinnerCircularSplit>
          ) : (
            <div
              style={{
                height: "-webkit-fill-available",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editableMode ? (
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#666",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Name
                  </label>
                  <input
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    value={profileData.name}
                    type="text"
                    placeholder="Enter Name"
                    style={{
                      width: "100%",
                      height: "35px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ) : (
                <h3
                  style={{
                    overflowWrap: "anywhere",
                    marginTop: "60px",
                    fontFamily: "cursive",
                    fontVariantCaps: "petite-caps",
                  }}
                >
                  {profileData.name}
                </h3>
              )}

              <span
                style={{
                  overflowWrap: "anywhere",
                  marginTop: "50px",
                  fontSize: "medium",
                  fontFamily: "sans-serif",
                  color: "#808080",
                }}
              >
                (+91) {profileData.phone}
              </span>
              <span
                style={{
                  overflowWrap: "anywhere",
                  marginTop: "5px",
                  fontSize: "small",
                  fontFamily: "sans-serif",
                  color: "rgb(128, 128, 128)",
                  padding: "10px",
                }}
              >
                {profileData.email}
              </span>
            </div>
          )}
        </div>
        {resetPassword && <> <div onClick={()=>setResetPassword(!resetPassword)} id="passwordConfirmationBackground" style={{backgroundColor:"rgb(6 6 6 / 4%)",    backdropFilter: "blur(2.5px)",height:"100%",width:"100%",    zIndex: "1101",    position: "fixed",
    insetArea: "center"}}></div>
        <section id="passwordConfirmation" className="passwordReset">
        <img
                    style={{
                      height: 'max-content',
                      width:'35%'
                    }}
                    src={resetPasswordImg}
                    
                  />
                
                  <div style={{ overflow:'hidden',   alignItems: 'center', borderLeftStyle: 'inset',height:'inherit',width:'inherit',display: 'flex',flexDirection:'column'}}>
                    <h2 style={{    color: 'whitesmoke',
    fontFamily: 'math'}}>Reset Password</h2>
                    <div style={{    marginTop: '4vh', display:'flex',flexDirection:'column',    height: 'inherit',
    justifyContent: 'space-around',
    alignItems: 'center'}}>
      
      <TextField
        onChange={(e) => setResetPass({ ...resetPass, oldPassword: e.target.value })}
        type="password"
        required 
        size= "medium"
        style={{ width: '45ch' }} 
        label='Old Password' 
        variant="outlined"
        InputProps={{
          style: {
            color: 'white', // Set the text color to white
          },
    endAdornment: (
      <InputAdornment position="end">
        <Icon path={resetPass.currentPassword == resetPass.oldPassword?mdiLockOpenCheckOutline: mdiLockRemoveOutline} size={1} color={resetPass.currentPassword == resetPass.oldPassword?'green': 'red'} />
      </InputAdornment>
    ),
        }}
        InputLabelProps={{
          style: {
            color: '#cba523', // Set the label color to white
          },
        }}
      />
        
                  <TextField
        disabled={!resetPass.currentPassword == resetPass.oldPassword}
        type="password"
        required 
        style={{ width: '45ch' }} 
        label='New Password' 
        variant="outlined"
        InputProps={{
          style: {
            color: 'white', // Set the text color to white
          },
        }}
        InputLabelProps={{
          style: {
            color: '#cba523', // Set the label color to white
          },
        }}
      />
                  <TextField
        
        type="password"
        required 
        style={{ width: '45ch' }} 
        label='Confirm New Password' 
        variant="outlined"
        InputProps={{
          style: {
            color: 'white', // Set the text color to white
          },
        }}
        InputLabelProps={{
          style: {
            color: '#cba523', // Set the label color to white
          },
        }}
      />

                    </div>
                    <Button style={{marginTop: '4vh',     backgroundColor: '#bebebea3',
    color: 'lightgrey',   width: 'fit-content'}} >Set Password</Button>
                  </div>
        </section>
        </>}
       
        
        {editableMode && (
          <div
            id="userProfileFooter"
            className="footertab"
            style={{
              padding: "10px",
              zIndex: "1",
              position: "fixed",
              width: "90%",
              bottom: "7vh",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              placeContent: "end",
            }}
          >
            <button
              id="userprofilebutton"
              onClick={() => {editClicked();profileDiscardDraft();}}
              className="footerbarbutton"
              style={{
                display: "flex",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                marginRight: "10px",
                backgroundColor: "rgb(223 40 105 / 75%)",
                boxShadow: "0px 3px 8px rgb(0 0 0 / 66%)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {" "}
              <Icon
                path={mdiAccountSyncOutline}
                size={0.8}
                color="white"
              ></Icon>{" "}
              <span
                style={{
                  fontFamily: "auto",
                  fontSize: "larger",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Discard Changes
              </span>
            </button>
            <button
            onClick={()=>{editClicked();updateProfile()}}
              id="userprofilebutton"
              className="footerbarbutton"
              style={{
                display: "flex",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "rgb(223 40 105 / 75%)",
                boxShadow: "0px 3px 8px rgb(0 0 0 / 66%)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {" "}
              <Icon
                path={mdiAccountArrowUpOutline}
                size={0.8}
                color="white"
              ></Icon>{" "}
              <span
                style={{
                  fontFamily: "auto",
                  fontSize: "larger",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Update Profile
              </span>
            </button>
          </div>
        )}
      </div>
      <footer
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#030e22",
          marginTop: "40px",
          padding: "40px",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <img style={{ marginLeft: "50px" }} src={mahLogo}></img>
        <div>
          <var
            style={{
              border: "1px solid",
              marginRight: "20px",
              color: "#c5c5c5",
            }}
          ></var>
          <span style={{ color: "white" }}>
            Copyright© 2024 Mahindra&Mahindra Ltd. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};
export default UserProfile;
