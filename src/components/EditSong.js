import React, { useState, useEffect } from 'react';
import { API_URL } from '../API';
import MaterialTable from "material-table";
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router';
import {
    localization,
    tableIcons,
    overriding
} from "./MaterialTableUtils";
function EditSong(props) {
    const selectedSong = props.location.state.selectedSong;
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState();
    const [song, setSong] = useState();
    const [valueArtistID, setValueArtistID] = useState();
    const [nameOfTheSong, setNameOfTheSong] = useState();
    const [urlOfTheSong, setUrlOfTheSong] = useState();
    const [artistList, setArtistList] = useState();
    const handleNameOfTheSongChange = (event) => {
        setNameOfTheSong(event.target.value);
    }
    const handleUrlOfTheSongChange = (event) => {
        setUrlOfTheSong(event.target.value);
    }
    const handleSubmit = async (event) => {
        const data = {
            id: selectedSong, 
            name: nameOfTheSong === undefined ? song.name : nameOfTheSong,
            url: urlOfTheSong === undefined ? song.url : urlOfTheSong,
            artistID: valueArtistID === undefined ? song.artist._id : valueArtistID,
            user: props.user
        };
        console.log(JSON.stringify(data));
        await fetch(API_URL + '/song/updatesong', {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        });
        history.push('/');
    }
    const getSongForCardLeft = (song_id) => {
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
    useEffect(() => {
        getSongForCardLeft(selectedSong);
    }, []);
    const columns = [
        {
            field: 'name',
            title: 'Name',
            cellStyle: {
                width: '30%',
                maxWidth: '30%'
            },
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['name']}  </div>)
        },
        {
            field: 'country',
            title: 'Country',
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['country']}  </div>)   
        },
        {
            field: 'age',
            title: 'Age',
            type: 'numeric',
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['age']}  </div>)   
        },
        {
            field: '_id',
            title: 'ID',
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['_id']}  </div>)
        }
    ];
    const styleTableRight = {
        position: 'absolute',
        width: '560px',
        height: '440px',
        top: '160px',
        left: '700px',
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(20),
            "& .MuiTextField-root": {
                margin: theme.spacing(2),
                width: 200,
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        paper: {
            padding: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    function getArtistList() {
        fetch(API_URL + "/artist/getallartist")
            .then(res => res.json())
            .then(
                (result) => {
                    setArtistList(result.artists);
                },
                (error) => {
                    setArtistList([]);
                }
            )
    }
    useEffect(() => {
        getArtistList();
    }, []);
    if (song !== undefined){
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h2">
                                Edit the song
                            </Typography>
                            <TextField
                                id="songName"
                                label="Name of the song"
                                helperText="Name of the song"
                                onChange={handleNameOfTheSongChange}
                                defaultValue={song.name}
                                required
                            ></TextField>

                            <TextField
                                id="url"
                                label="Url of the Song"
                                helperText="Url of the song"
                                onChange={handleUrlOfTheSongChange}
                                defaultValue={song.url}
                                required
                            ></TextField>

                            <TextField
                                id="artist"
                                helperText="Search ArtistID* in right table"
                                defaultValue={song.artist._id}
                                value={valueArtistID}
                                required
                            ></TextField>
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </form>
            <MaterialTable
                icons={tableIcons}
                components={overriding}
                localization={localization}
                columns={columns}
                title={"Artist List"}
                style={styleTableRight}
                data={artistList}
                onRowClick={
                    ((e, selRow) => {
                        if (selRow.tableData.id !== selectedRow) {
                            setSelectedRow(selRow.tableData.id);
                            setValueArtistID(selRow._id);
                        }

                    })
                }
                options={
                    {
                        rowStyle: rowData => ({
                            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                        })
                    }
                }
            />
        </>
    )}
    else return <></>
}

export default React.memo(EditSong);