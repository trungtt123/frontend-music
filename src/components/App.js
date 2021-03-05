import SongList from './SongList';
import AddSong from './AddSong';
import AddArtist from './AddArtist';
import EditSong from './EditSong';
import EditArtist from './EditArtist';
import Logo from './Logo';
import Login from './Login';
import background from "../background1.png";
import { API_URL } from '../API';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
function App(props) {
    const [user, setUser] = useState();
    const styleBackGround = {
        backgroundImage: 'url(' + background + ')',
        backgroundSize: "contain",
        height: '100vh',
        color: "#f5f5f5",
    }
    function callbacklogin(social, userSocialID) {
        fetch(API_URL + `/user/getuser/${social}/${userSocialID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let user = result.user;
                    let _id = user._id;
                    let userName = user.name;
                    let userPermission = user.permission;
                    setUser({ _id, social, userSocialID, userName, userPermission});
                },
                (error) => {
                    setUser({});
                }
            )
    }
    if (user === undefined) {
        return (
            <div className="bg_image" style={styleBackGround} >
                <Router>
                    <Route
                        path='/'
                        render={props => <SongList {...props} user={user} />}
                    />
                    <Route>
                        <Login parrentcallbacklogin={callbacklogin} />
                        <Logo />
                    </Route>
                </Router>
            </div>
        );
    }
    else
    return (
        <div className="bg_image" style={styleBackGround} >
            <Router>
                <Switch>
                    <Route component={AddArtist} exact path = '/addartist'/>
                    <Route
                        path='/addsong'
                        render={props => <AddSong {...props} user={user} />}
                    />
                    <Route
                        path='/editsong'
                        render={props => <EditSong {...props} user={user} />}
                    />
                    <Route
                        path='/editartist'
                        render={props => <EditArtist {...props} user={user} />}
                    />
                    <Route
                        path='/'
                        render={props => <SongList {...props} user={user} />}
                    />
                </Switch>
                <Route>
                    <Login parrentcallbacklogin={callbacklogin} />
                    <Logo />
                </Route>
            </Router>

        </div>

    );
}

export default App;
