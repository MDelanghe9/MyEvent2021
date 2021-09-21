import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AccountBox from '../components/accountBox';
// import GoogleLoginUtils from  '../components/utils/GoogleLoginUtils';
// import GoogleLogoutUtils from '../components/utils/GoogleLogoutUtils';
import NavLogin from "../components/navBarLogin";
import Footer from "../components/footer";

function LoginPage(props) {


  useEffect(() => {
    console.log("start");
  });

  return (
    <>
    <NavLogin />
      <AccountBox {...props}/>
      {/* <GoogleLoginUtils {...props}/>
      <GoogleLogoutUtils {...props} /> */}
      <Footer/>
    </>
  );
}

export default LoginPage;