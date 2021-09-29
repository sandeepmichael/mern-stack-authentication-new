import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function Google(){
     const responseSuccessGoogle = (response) => {
         console.log(response)
         axios({
            method:"post",
            url:"http://localhost:5000/auth/googlelogin",
            data:{tokenId:response.tokenId}
        }).then((response) => {
            console.log("Google login success", response)
            localStorage.setItem("token", response.data.token)
            window.location.href = '/'
        })
     }

    const responseErrorGoogle = () => {

    }
 
return (
    <div className='App'>
        <div className='col-md-6 offset-md-3 text-center'></div>
       

     <GoogleLogin
    clientId="878786950565-kmum1ne551io15kq1ibvlae1to9bj11a.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
     />,

    </div>
)



}
export default Google;