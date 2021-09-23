import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from  './refreshToken';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GoogleLoginUtils(props) {
  const onSuccess = (res) => {
    isUser(res);
   // refreshTokenSetup(res);
   // props.history.push("/home"); 
  };

  const isUser = async (res) => {
    try {
      const user = res.profileObj
      const response = await axios.post("http://localhost:4242/api/users/register", {user});
      console.log(response);
      console.log('Connexion reussi:', res.profileObj);
      alert(
        `Connexion reussie 😉 ! Bienvenue ${res.profileObj.name}`
      );
      const newAuthRes = await res.reloadAuthResponse();
      localStorage.setItem('authToken', newAuthRes.id_token);
      refreshTokenSetup(res);
      props.history.push("/home"); 
    } catch (error) {
      console.log(error.response);
    }
  };


  const onFailure = (res) => {
    console.log('Login rater =>', res);
    toast.error(
      `Echec de la connexion 😢`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Connexion"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={false}
        className='googleInput'
      />
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default GoogleLoginUtils;