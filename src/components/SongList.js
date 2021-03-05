import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import TableRight from "./TableRight";
import CardLeft from './CardLeft';
import Login from './Login';
import { API_URL } from '../API';
import Status from "./Status";
function SongList(props) {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(TableRight, Login, CardLeft);
    const [selectedSong, setSelectedSong] = useState();
    const history = useHistory();
    function getIdSongInit() {
        history.push('/');
        fetch(API_URL + "/song/getsonginitforcardleft")
            .then(res => res.json())
            .then(
                (result) => {
                    setSelectedSong(result.song.id);
                },
                (error) => {
                    setSelectedSong({});
                }
            )
    }
    useEffect(() => {
        if (selectedSong === undefined) getIdSongInit();
    }, []);
    function callbacktableright(id) {
        setSelectedSong(id);
    }
    if (selectedSong !== undefined)
    return (
        <>
            <TableRight parrentcallbacktableright={callbacktableright}  user={props.user} selectedSong={selectedSong}/>
            <CardLeft selectedSong={selectedSong} user={props.user}/>
            <Status selectedSong={selectedSong} />
        </>
    );
    else {
        return <> </>
    }
}
export default SongList;