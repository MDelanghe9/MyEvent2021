import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from  './refreshToken';
import axios from "axios";

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GoogleLoginUtils(props) {
  const onSuccess = (res) => {
    isUser(res);
    refreshTokenSetup(res);
    props.history.push("/home");
  };

  const isUser = async (res) => {
    try {
      const user = res.profileObj
      const response = await axios.post("http://localhost:4242/api/users/register", {user});
      console.log(response);
      console.log('Connexion reussi:', res.profileObj);
      alert(
        `Connexion reussi 😉 ${res.profileObj.name}`
      );
      const newAuthRes = await res.reloadAuthResponse();
      localStorage.setItem('authToken', newAuthRes.id_token);
    } catch (error) {
      console.log(error.response);
    }
  };


  const onFailure = (res) => {
    console.log('Login rater =>', res);
    alert(
      `Connexion loupe 😢`
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
    </div>
  );
}

export default GoogleLoginUtils;