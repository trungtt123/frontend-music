import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/login.css';
import { API_URL } from '../API';
function Login(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [userID, setUserID] = useState();
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const responseFacebook = async(response) => {
        const now = new Date();
        let data = {
            value: response,
            expiry: now.getTime() + 18000
        }
        localStorage.setItem('token',JSON.stringify(data)); 
        if (response.status === 'unknown') return;
        let lastName = response.name.slice(response.name.lastIndexOf(' '), response.name.length);
        props.parrentcallbacklogin('facebook', response.userID);
        setIsLoggedIn(true);
        setName(lastName);
        setPicture(response.picture.data.url);
        let dataUer = {
            userSocial: 'facebook',
            userSocialID: response.userID,
            nameUser: lastName,
            permissionUser: 'user'
        }
        await fetch(API_URL + '/user/createuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dataUer)
        });
    }
    const loginfacebook = {
        top: '78.5%',
        left: '7%',
        width: '23%',
        position: 'absolute',
    };
    const loggedinfacebook = {
        top: '3%',
        left: '88.8%',
        position: 'absolute',
    };
    useEffect(() => {
        const dataLocal = JSON.parse(localStorage.getItem('token'));
        const now = new Date();
        if (dataLocal !== null)
        (now.getTime() >= dataLocal.expiry) 
        ? localStorage.removeItem('token') 
        : responseFacebook(dataLocal.value);
    }, []);
    let fbContent;
    if (isLoggedIn){
        fbContent = (
            <>
                <div className="loggedin" style={loggedinfacebook}>
                    <p style={{ position: 'absolute', marginLeft: '-60px', marginTop: '48px', fontSize: '14px' }}><b><i>Welcome, {name}</i></b></p>
                    <img src={picture} alt={name} style={{ borderRadius: '40%' }} />
                </div>
            </>
        )
    } else {
        fbContent = (
            <div className='login' style={loginfacebook}>
                <FacebookLogin
                    appId='236503137964225'
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon='fa-facebook'
                    cssClass='btnFacebook'
                    textButton="&nbsp;&nbsp;&nbsp;Sign In with Facebook"
                />
                <div className="btnGoogle">
                    <i className="fa fa-google-plus" style={{ marginLeft: '25%', marginTop: '3%' }} />
                    &nbsp;Sign In with Google
                </div>
                <div className="btnTwitter">
                    <i className="fa fa-twitter" style={{ marginLeft: '25%', marginTop: '3%' }} />
                    &nbsp;&nbsp;Sign In with Twitter
                </div>
            </div>
        )
    }
    return (
        <div>
            {fbContent}
        </div>
    )

}
export default Login;