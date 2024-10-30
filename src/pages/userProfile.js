import { AppBar, Toolbar,Button } from '@material-ui/core';
import React, { useState ,useEffect} from 'react';
import "../App.css";
import Icon from '@mdi/react';
import profilePic from '../profilePic.jpg';

import {mdiAccountOutline, mdiDotsHorizontalCircle ,mdiPencil,mdiLogout,mdiLockReset} from '@mdi/js';
import mahLogo from '../mahindra-logo-new.webp';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const UserProfile = () =>{
    const [menuVisible,setMenuVisible] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const toggleMenu  = ()=> {
setMenuVisible(!menuVisible);
    };
    let dropdownMenu = null;

    // Use an if statement to set dropdownMenu based on menuVisible
    if (menuVisible) {
        dropdownMenu = (
            <nav className="dropdown-menu">
                <ul>
                    <li style={{ color: 'black', borderBottom: '1px solid #5a5959', display: 'flex', alignItems: 'center' }}>
                        <Icon path={mdiPencil} size={1} color='#4CAF50' />
                        <span style={{ marginLeft: '5px', color: 'white' }}>Edit</span>
                    </li>
                    <li style={{ color: 'black', borderBottom: '1px solid #5a5959', display: 'flex', alignItems: 'center' }}>
                        <Icon path={mdiLockReset} size={1} color='#FF9800' />
                        <span style={{ marginLeft: '5px', color: 'white' }}>Reset Password</span>
                    </li>
                    <li style={{ color: 'black', borderBottom: '1px solid #5a5959', display: 'flex', alignItems: 'center' }}>
                        <Icon path={mdiLogout} size={1} color='#F44336' />
                        <span style={{ marginLeft: '5px', color: 'white' }}>Logout</span>
                    </li>
                </ul>
            </nav>
        );
    };
return(
<div  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <div style={{background: 'linear-gradient(110deg, rgb(255 239 146), rgb(255 187 137))', zIndex:'-1',   minWidth: '100%',
    minHeight: '100%',
    position: 'fixed'}}></div>
    <AppBar style={{       position: 'static',    background: 'rgb(255 255 255 / 45%)',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 0 5px purple'}}>
        <Toolbar>
            <span style={{ marginRight: 'auto',    color: 'purple',
    fontSize: 'xx-large',
    fontFamily: 'none',
    marginLeft: '10px'}}>User Profile</span>
        <Button onClick={toggleMenu} id='UserProfileButton' color="inherit" className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiDotsHorizontalCircle} size={1} color="purple" />
      <span className="toolbar-button-text">more</span>
    
    </Button>
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
      )} */
      dropdownMenu}
      
        </Toolbar>
        
    </AppBar>
    <div style={{      marginTop: '130px',  display: 'flex',justifyContent: 'space-around'}}>
    <div style={{ 
  display: 'flex',
  flexDirection: 'column',
  height: '450px',
  width: '65%',
  backgroundColor: 'aliceblue',
  borderRadius: '10px',
  boxShadow: '0 2px 15px #232323',
  padding: '20px'
}}>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <section style={{
      height: '80px',
      width: '80px',
      backgroundColor: '#df2869',
      boxShadow: '#323131 0px 1px 10px',
      marginTop: '-45px',
      marginLeft: '30px',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon path={mdiAccountOutline} color='white' size={1.5} />
    </section>
    <span style={{
      alignSelf: 'center',
      marginLeft: '40px',
      fontFamily: 'none',
      fontSize: 'x-large',
      marginTop: '14px',
      color: '#666666'
    }}>
      General Information
    </span>
  </div>

  {/* Form Fields Section */}
  <div style={{ marginTop: '20px' }}>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666', 
            marginBottom: '5px',
            display: 'block' 
          }}>Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Contact Person</label>
          <input
            type="text"
            placeholder="Enter contact person name"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Department</label>
          <input
            type="text"
            placeholder="Enter department"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Virtual Account Number (VAN)</label>
          <input
            type="text"
            value="VAN-12345678"  // Demo data for VAN
            readOnly
            
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#f0f0f0',  // Gray background to show it's non-editable
              color: 'rgb(64 64 64)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#666',
            marginBottom: '5px',
            display: 'block' 
          }}>Tax ID</label>
          <input
            type="text"
            placeholder="Enter Tax ID"
            style={{
              width: '100%',
              height: '35px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div>
        <label style={{ 
          fontWeight: 'bold', 
          color: '#666',
          marginBottom: '5px',
          display: 'block' 
        }}>Address</label>
        <input
          type="text"
          placeholder="Enter address"
          style={{
            width: '100%',
            height: '35px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </form>
  </div>
</div>



        <div style={{   display: 'flex',
    flexDirection: 'column',  height: '400px',
    width: '22%',borderRadius: '10px',    boxShadow: '0 2px 15px #232323',
    backgroundColor: 'aliceblue'}}>
        <div style={{textAlign: 'center'}}>
            <img style={{  boxShadow: '0 2px 12px rgb(0 0 0)',  height: '160px',
    width: '160px',
    borderRadius: '100%',
    marginTop: '-50px'}} src={profilePic}></img>
        </div>
        <div style={{    height: '-webkit-fill-available',
    display: 'flex',
    flexDirection: 'column' ,    alignItems: 'center'}}>
            <h3 style={{    overflowWrap: 'anywhere',    marginTop: '60px',
    fontFamily: 'cursive',
    fontVariantCaps: 'petite-caps'}}>Dhanush Gangatkar</h3>
            <span style={{    overflowWrap: 'anywhere'    , marginTop: '50px',
    fontSize: 'medium',
    fontFamily: 'sans-serif',
    color: '#808080'}}>(+91) 919912332</span>
            <span style={{    overflowWrap: 'anywhere',     marginTop: '5px',
    fontSize: 'small',
    fontFamily: 'sans-serif',
    color: 'rgb(128, 128, 128)',
    padding: '10px',}}>dhanush.gangatkar@peolsolutions.com</span>
        </div>
    </div>
    </div>
    <footer style={{display: 'flex',
    flexDirection: 'row', backgroundColor: '#030e22' ,    marginTop: '40px',
    padding: '40px',    alignItems: 'end',
    justifyContent: 'space-between'}}>
        <img style={{    marginLeft: '50px'}} src={mahLogo}></img>
        <div><var style={{border:'1px solid',    marginRight: '20px',
    color: '#c5c5c5'}}></var>
        <span style={{color:'white'}}>Copyright© 2024 Mahindra&Mahindra Ltd. All Rights Reserved.</span></div>
        
    </footer>
</div>

);
}
export default UserProfile;