import React, { useState, useEffect } from 'react';
import { API_URL } from '../API';
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router';
function EditArtist(props) {
    const history = useHistory();
    const [nameOfArtist, setNameOfArtist] = useState();
    const [ageOfArtist, setAgeOfArtist] = useState();
    const [countryOfArtist, setCountryOfArtist] = useState();
    const [artist, setArtist] = useState();
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
    const getSelectedArtist = (artistID) => {
        fetch(API_URL + `/artist/getartistfromid/${artistID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setArtist(result.artist);
                },
                (error) => {
                    setArtist({});
                }
            )
    }
    useEffect(() => {
        getSelectedArtist(props.location.state.selectedArtist);
    }, []);
    const handleSubmit = async (event) => {
        let nameArtist, ageArtist, countryArtist, contactArtist;
        nameOfArtist === undefined ? nameArtist = artist.name : nameArtist = nameOfArtist;
        ageOfArtist === undefined ? ageArtist = artist.age : ageArtist = ageOfArtist;
        countryOfArtist === undefined ? countryArtist = artist.country : countryArtist = countryOfArtist;
        contactAddressForArtist === undefined ? contactArtist = artist.contact : contactArtist = contactAddressForArtist;
        const data = {
            idArtist: artist._id,
            nameArtist,
            ageArtist,
            countryArtist,
            contactArtist
        };
        console.log(JSON.stringify(data));
        await fetch(API_URL + '/artist/updateartist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        history.push('/addsong');
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
    if (artist !== undefined)
        return (
            <>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h2">
                                   Edit the artist
                            </Typography>

                                <TextField
                                    id="artistName"
                                    helperText="Name of the artist"
                                    onChange={handleNameOfTheArtistChange}
                                    defaultValue={artist.name}
                                    required
                                ></TextField>

                                <TextField
                                    id="artistAge"
                                    helperText="Age of the artist"
                                    onChange={handleAgeOfTheArtistChange}
                                    defaultValue={artist.age}
                                    required
                                ></TextField>

                                <TextField
                                    id="artistCountry"
                                    helperText="Country of the artist"
                                    onChange={handleCountryOfTheArtistChange}
                                    defaultValue={artist.country}
                                    required
                                ></TextField>

                                <TextField
                                    id="artistContact"
                                    helperText="Contact address for the artist"
                                    onChange={handleContactAddressOfTheArtistChange}
                                    defaultValue={artist.contact}
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

            </>

        )
    else return <></>
}

export default React.memo(EditArtist);