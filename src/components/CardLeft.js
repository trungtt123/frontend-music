import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactPlayer from 'react-player';
import { API_URL } from '../API';
function CardLeft(props) {
    const styleCardLeft = {
        position: 'absolute',
        width: '23%', // 310px
        height: '55%', // 360px
        top: '20%', //130px
        left: '7%' // 100px
    }
    const [song, setSong] = useState();
    const [tym, setTym] = useState();
    function getSongForCardLeft(song_id) {
        fetch(API_URL + `/song/getsongforcardleft/${song_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result.song);
                    setSong(result.song);
                },
                (error) => {
                    setSong({});
                }
            )
    }
    function getTymOfUser(social, userSocialID) {
        fetch(API_URL + `/user/gettymofuser/${social}/${userSocialID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setTym(result.tym);
                },
                (error) => {
                    setTym([]);
                }
            )
    }
    function UpdateTymForUser() {
        if (props.user !== undefined) {
            fetch(API_URL + `/user/updatetymforuser/${props.user.social}/${props.user.userSocialID}/${song.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        getTymOfUser(props.user.social, props.user.userSocialID);
                    },
                    (error) => {

                    }
                )
        }
        else alert('Login to continue');
    }
    useEffect(() => {
        getSongForCardLeft(props.selectedSong);
    }, []);
    if (props.user !== undefined) {
        if (tym === undefined) {
            getTymOfUser(props.user.social, props.user.userSocialID);
        }
    }
    if (song !== undefined) {
        if (song.id !== props.selectedSong) {
            getSongForCardLeft(props.selectedSong);
        }
        let title = <b>🎧 {song.name} ♪</b>;
        let artist = `${song.artist.name}`;
        let age = `${song.artist.age}`;
        let country = `${song.artist.country}`;
        let contact = `${song.artist.contact}`;
        let url = `${song.url}`;
        let favorite = 'default';
        if (tym !== undefined) {
            let findSongID = tym.find(songID => songID === song.id);
            if (findSongID !== undefined) {
                favorite = 'secondary';
            }
        }
        return (
            <Card style={styleCardLeft}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">

                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}

                />
                <CardContent>
                    <Typography variant="body2" color="textPrimary">
                        <b>Artist: </b> {artist}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        <b>Age: </b> {age}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        <b>Country: </b> {country}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        <b>Contact:</b> {contact}
                    </Typography>

                    <ReactPlayer
                        width="100%"
                        height="75px"
                        style={{ marginTop: "11%" }}
                        url={url}
                        config={{
                            soundcloud: {
                                options: { auto_play: true }
                            }
                        }}
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" color={favorite} onClick={() => UpdateTymForUser()}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="show more">
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Card>

        )
    }
    else {
        return <> </>
    }
}

export default React.memo(CardLeft);