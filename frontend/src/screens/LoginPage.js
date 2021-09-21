import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AccountBox from '../components/accountBox';
import GoogleLoginUtils from  '../components/utils/GoogleLoginUtils';
import GoogleLogoutUtils from '../components/utils/GoogleLogoutUtils';

function LoginPage(props) {


  useEffect(() => {
    console.log("start");
  });

  return (
    <>
      <AccountBox/>
      <GoogleLoginUtils {...props}/>
      <GoogleLogoutUtils {...props} />
      
    </>
  );
}

export default LoginPage;