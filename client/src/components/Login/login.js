import React from 'react';
import GoogleLogin from 'react-google-login';
import {AuthProvider} from '../AuthContext/authContext.js'
const ck = require('ckey');

export default function Login(){
return (
<div className="container centered justify-content-center">
<div className="col-xs-1 col-md-8">
   <div className="row text-center justify-content-center">
    <h1> Please Log In</h1>

    </div>
    <GoogleLogin
    clientId={ck.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={AuthProvider.googleLogIn}
    onFailure={AuthProvider.googleLogIn}
    cookiePolicy={'single_host_origin'}
    hosted_domain={'vibecartons.com'}
/>
    </div>
    </div>
  )
  console.log(ck.REACT_APP_GOOGLE_CLIENT_ID)
}
//Use Auth Context instead
/* const handleLogin = async googleData => {
  const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
      token: googleData.tokenId
    }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  } */
