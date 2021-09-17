import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GoogleLogoutUtils() {
  const onSuccess = () => {
    console.log('deconnexion réussie ');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Deconnexion"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default GoogleLogoutUtils;