import React from 'react';
import logo from '../mahindra-logo-new.webp';
function Appfooter() {
    return (
    <div className='Appfooter'>
        <div style={{display:'flex', backgroundColor:'#030e22' ,height:'340px',minInlineSize:'10px'}}>
            <div style={{height:'inherit',alignContent: 'center', width: '40%'}}>
                <img src={logo}></img>
            </div>
            <div style={{width: '30%', alignContent: 'center'}}><h3 style={{ color:'white'}}>COMPANY</h3><p style={{color:'white'}}>About Us</p><p style={{color:'white'}}>Our Partners</p></div>
            <div style={{width: '30%',    alignContent: 'center'}}><h3 style={{color:'white'}}>CONTACT US</h3><p style={{color:'white'}}>(+1) 999-999-2701</p><p style={{color:'white'}}>support@gmail.com</p></div>
        </div>
        <div style={{ backgroundColor:'#030e22',height:'60px',    padding: '2px'}}><hr></hr><p style={{color:'white',    textAlign: 'center'}}>Copyright© 2024 Mahindra&Mahindra Ltd. All Rights Reserved.</p></div>
    </div>
    );};
export default Appfooter;