import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import iconadd from '../iconadd.png';
import iconedit from '../iconedit.png';
import icondelete from '../icondelete.png';
import { API_URL } from '../API';
function ButtonControl(props) {
    const user = props.user;
    const history = useHistory();
    const styleicon = {
        position: 'absolute',
        top: '41%',
        left: '95%',
    };
    const styleiconadd = {
        position: 'absolute',
        left: '12px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: "50% 50% 50% 50%"
    };
    const styleiconedit = {
        position: 'absolute',
        top: '55px',
        left: '12px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: "50% 50% 50% 50%"
    };
    const styleicondelete = {
        position: 'absolute',
        top: '110px',
        left: '12px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: "50% 50% 50% 50%"
    }
    const handleClickButtonAdd = () => {
        user === undefined ? alert('Login to continue') : history.push('/addsong');
    }
    const handleClickButtonEdit = async () => {
        if (user === undefined) {
            alert('Login to continue!!!');
            return;
        }
        let songEdit = await fetch(API_URL + `/song/getsongfromid/${props.selectedSong}`).then(res => res.json());
        if (songEdit.song === null) alert('No song have been selected !!!');
        else {
            let userID = songEdit.song.userID;
            console.log(user);
            if (userID !== user._id && user.userPermission !== 'admin') {
                alert('You do not have permission to edit this song!!!');
            }
            else {
                history.push({
                    pathname: '/editsong',
                    search: `?song=${props.selectedSong}`,
                    state: { selectedSong: props.selectedSong }
                });
            }
        }
    }
    const handleClickButtonDelete = async () => {
        if (user === undefined) {
            alert('Login to continue!!!');
            return;
        }
        let songEdit = await fetch(API_URL + `/song/getsongfromid/${props.selectedSong}`).then(res => res.json());
        if (songEdit.song === null) alert('No song have been selected !!!')
        else {
            let userID = songEdit.song.userID;
            if (userID !== user._id && user.userPermission !== 'admin') {
                alert('You do not have permission to delete this song!!!');
            }
            else {
                if (window.confirm('Do you sure delete the song?')) {
                    let res = await fetch(API_URL + `/song/deletesong/${props.selectedSong}`);
                    if (res.status === 200) {
                        history.push('/');
                        props.tabelrightcallbackdeletebuttoncontrol();
                    }
                    else alert('Delete failed!!!');
                }
            }
        }
    }
    return (
        <>
            <div className="button" style={styleicon}>
                <img 
                    src={iconadd} 
                    style={styleiconadd} 
                    title="Add a song"
                    onClick={() => handleClickButtonAdd()} 
                />
                <img 
                    src={iconedit} 
                    style={styleiconedit} 
                    title="Edit selected the song"
                    onClick={() => handleClickButtonEdit()} 
                />
                <img 
                    src={icondelete} 
                    style={styleicondelete} 
                    title="Delete selected the song"
                    onClick={() => handleClickButtonDelete()} 
                />
            </div>
        </>
    );
}
export default ButtonControl;