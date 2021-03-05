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
function AddArtist(props) {
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState();
    const [artistList, setArtistList] = useState();
    const [nameOfArtist, setNameOfArtist] = useState();
    const [ageOfArtist, setAgeOfArtist] = useState();
    const [countryOfArtist, setCountryOfArtist] = useState();
    const [contactAddressForArtist, setContactAddressForArtist] = useState();
    const handleNameOfTheArtistChange = (event) => {
        setNameOfArtist(event.target.value);
    }
    const handleAgeOfTheArtistChange = (event) => {
        setAgeOfArtist(event.target.value);
    }
    const handleCountryOfTheArtistChange = (event) => {
        setCountryOfArtist(event.target.value);
    }
    const handleContactAddressOfTheArtistChange = (event) => {
        setContactAddressForArtist(event.target.value);
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
    const handleSubmit = async (event) => {
        const data = {
            nameArtist: nameOfArtist,
            ageArtist: ageOfArtist,
            countryArtist: countryOfArtist,
            contactArtist: contactAddressForArtist
        };
        console.log(JSON.stringify(data));
        let result = await fetch(API_URL + '/artist/createartist', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(res => res.json());
        let notification = result.notification;
        notification === true 
        ? alert('Add successful artist!!!')
        : alert('The artist already exists!!!');
        history.push('/addsong');
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
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h2">
                                Add a artist
                            </Typography>

                            <TextField
                                id="artistName"
                                helperText="Name of the artist"
                                onChange={handleNameOfTheArtistChange}
                                required
                            ></TextField>

                            <TextField
                                id="artistAge"
                                helperText="Age of the artist"
                                onChange={handleAgeOfTheArtistChange}
                                required
                            ></TextField>

                            <TextField
                                id="artistCountry"
                                helperText="Country of the artist"
                                onChange={handleCountryOfTheArtistChange}
                                required
                            ></TextField>

                            <TextField
                                id="artistContact"
                                helperText="Contact address for the artist"
                                onChange={handleContactAddressOfTheArtistChange}
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

export default React.memo(AddArtist);