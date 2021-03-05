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
import iconadd from '../iconadd.png';
import iconedit from '../iconedit.png';
import icondelete from '../icondelete.png';
function AddSong(props) {
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState();
    const [valueArtistID, setValueArtistID] = useState('');
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
        console.log(props.user);
        const data = {
            name: nameOfTheSong,
            url: urlOfTheSong,
            artistID: valueArtistID,
            user: props.user
        };
        console.log(JSON.stringify(data));
        await fetch(API_URL + '/song/createsong', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        history.push('/');
    }
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
        width: '41%', //560px
        height: '70%',//440px
        top: '25.5%',//160px
        left: '51%',//700px
    }
    const styleicon = {
        position: 'absolute',
        top: '47%',
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
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(20),
            "& .MuiTextField-root": {
                margin: theme.spacing(2),
                width: '30%',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: '20%',
            maxWidth: '30%',
        },
        paper: {
            padding: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    const handleClickButtonAdd = () => {
        history.push('/addartist');
    }
    const handleClickButtonEdit = () => {
        if (valueArtistID === '') {
            alert('No artist have been selected');
            return;
        }
        history.push({
            pathname: '/editartist',
            search: `?artist=${valueArtistID}`,
            state: { selectedArtist: valueArtistID }
        });
    }
    const handleClickButtonDelete = async () => {
        if (valueArtistID === '') {
            alert('No artist have been selected');
            return;
        }
        if (window.confirm('Do you sure delete the artist?')) {
            await fetch(API_URL + `/artist/deleteartistfromid/${valueArtistID}`);
            setValueArtistID('');
            getArtistList();
        }
    }
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
    return (
        <>
            <div className="button" style={styleicon}>
                <img
                    src={iconadd}
                    style={styleiconadd}
                    alt="iconadd"
                    title="Add a artist"
                    onClick={() => handleClickButtonAdd()}
                />
                <img
                    src={iconedit}
                    style={styleiconedit}
                    alt="iconedit"
                    title="Edit the selected artist"
                    onClick={() => handleClickButtonEdit()}
                />
                <img
                    src={icondelete}
                    style={styleicondelete}
                    alt="icondelete"
                    title="Delete the selected artist"
                    onClick={() => handleClickButtonDelete()}
                />
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h2">
                                Add a song
                            </Typography>
                            <TextField
                                id="songName"
                                helperText="Name of the song"
                                onChange={handleNameOfTheSongChange}
                                required
                            ></TextField>

                            <TextField
                                id="url"
                                helperText="Url of the song"
                                onChange={handleUrlOfTheSongChange}
                                required
                            ></TextField>

                            <TextField
                                id="artist"
                                helperText="Search ArtistID* in right table"
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
    )
}

export default React.memo(AddSong);