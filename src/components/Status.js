import React, { useState, useEffect } from 'react';
import '../css/status.css';
import { API_URL } from '../API';


const Status = (props) => {
    const [song, setSong] = useState();
    const [TextStatus, setTextStatus] = useState('Enjoy Listening ♪');
    function getSongForCardLeft(song_id) {
        fetch(API_URL + `/song/getsongforcardleft/${song_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setSong(result.song);
                },
                (error) => {
                    setSong({});
                }
            )
    }
    useEffect(() => {
        getSongForCardLeft(props.selectedSong);
    }, []);
    if (song !== undefined) {
        if (song.id !== props.selectedSong) {
            getSongForCardLeft(props.selectedSong);
        }
            setTimeout(() => {
            setTextStatus(`The track is playing: ${song.name} - ${song.artist.name} ♪`)
        }, 20000);
        return (
            <div className='container'>
                <div className='status'>
                    <i>{TextStatus}</i>
                </div>
            </div >
        );
    }
    else {
        return <></>
    }
}
export default React.memo(Status);