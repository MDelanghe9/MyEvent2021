import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GoogleLogoutUtils(props) {
  const onSuccess = () => {
    localStorage.removeItem('authToken');
    alert(
      `Vous avez ete deconecter`
    );
    props.history.push("/");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Deconnexion"
        onLogoutSuccess={onSuccess}
        className='googleInput'
      ></GoogleLogout>
    </div>
  );
}

export default GoogleLogoutUtils;