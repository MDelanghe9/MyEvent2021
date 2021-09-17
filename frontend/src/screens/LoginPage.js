import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { AccountBox } from '../components/accountBox';
import GoogleLoginUtils from  '../components/utils/GoogleLoginUtils';
import GoogleLogoutUtils from '../components/utils/GoogleLogoutUtils';

function LoginPage() {

  return (
    <>
      <AccountBox/>
      <GoogleLoginUtils />
      <GoogleLogoutUtils />
      
    </>
  );
}

export default LoginPage;