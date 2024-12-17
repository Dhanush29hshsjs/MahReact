import React from 'react';
import Icon from "@mdi/react";
import { AppBar, Toolbar, Typography, Button,IconButton } from '@material-ui/core';
import logo from '../mahindra-logo-new.webp';
import {
    mdiFileDocument,
    mdiBell,
    mdiClipboardText,
    mdiAccount,
    mdiCart, 
    mdiLogout,
  } from "@mdi/js";
  import "../App.css";
import { useNavigate } from 'react-router-dom';

function MyAppBar({scrollTodocsRef , scrollTonotificationsRef}) {
  const navigate = useNavigate();
  const goToUserProfile = ()=>{
    let id = sessionStorage.getItem('cId'); 
    navigate(`/Profile/${id}`);
  };
  const goToInquiry= () =>{
    navigate('/Inquiry');
  }
  const goToOrders = () => {
    navigate("/Orders");
  };
  return (
<AppBar position="static" className='appbarcss'>
  <Toolbar>
    <img src={logo} alt="Logo" style={{ marginRight: 'auto' }} />

    {/* User Profile */}
    <Button onClick={goToUserProfile} color="inherit" className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiAccount} size={1}  className="toolbar-button-icon" />
      <span className="toolbar-button-text">User Profile</span>
    
    </Button>

    {/* User Documents */}
    <Button color="inherit" onClick={scrollTodocsRef} className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiFileDocument} size={1}   className="toolbar-button-icon"/>
      <span className="toolbar-button-text">User Documents</span>
     
    </Button>

{/* Purchase Requests */}
<Button color="inherit" onClick={goToInquiry} className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiClipboardText} size={1} className="toolbar-button-icon" />
      <span className="toolbar-button-text">Purchase Requests</span>

    </Button>

    {/* Purchase Orders */}
    <Button color="inherit" onClick={goToOrders} className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiCart} size={1}  className="toolbar-button-icon" />
      <span className="toolbar-button-text">Purchase Orders</span>
 
    </Button>

    

    {/* Notifications */}
    <IconButton color="inherit" onClick={scrollTonotificationsRef} className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiBell} size={1}  className="toolbar-button-icon"/>
      <span className="toolbar-button-text">Notifications</span>
    
    </IconButton>

    {/* Logout Button */}
    <Button color="inherit" className="toolbar-button" style={{ position: 'relative' }}>
      <Icon path={mdiLogout} size={1}  className="toolbar-button-icon" />
      <span className="toolbar-button-text">Logout</span>
    
    </Button>
  </Toolbar>
</AppBar>


  );
}

export default MyAppBar;
