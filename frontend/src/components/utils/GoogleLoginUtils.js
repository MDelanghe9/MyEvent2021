import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from  './refreshToken';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GoogleLoginUtils() {
  const onSuccess = (res) => {
    console.log('Connexion reussi:', res.profileObj);
    alert(
      `Connexion reussi 😉 ${res.profileObj.name}`
    );
    refreshTokenSetup(res);

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
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLoginUtils;