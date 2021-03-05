import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { API_URL } from '../API';
import { useHistory } from 'react-router';
import {
    localization,
    tableIcons,
    overriding
} from "./MaterialTableUtils";
import ButtonControl from './ButtonControl';
function TableRight(props) {
    const d = new Date();
    const mess = {
        id: 'bb5f0de8-1fc0-4d95-a509-da8ab4d1815e',
        data : {
            time: d.getTime(),
            userid: '098d4125-e284-4936-a69a-f9c4060f3efd',
            data: 'Hi!!!'
        }
    }
    let hi = JSON.stringify(mess);
    console.log(hi);
    const styleTableRight = {
        position: 'absolute',
        width: '60%', // 800px
        height: '77%', //500px
        top: '20%', //130px
        left: '32%', //460px
    }
    const history = useHistory();
    const [selectedSong, setSelectedSong] = useState(props.selectedSong);
    const [songList, setSongList] = useState();
    function getSongList() {
        fetch(API_URL + "/song/getallsongfortableright")
            .then(res => res.json())
            .then(
                (result) => {
                    setSongList(result.songs);
                },
                (error) => {
                    setSongList([]);
                }
            )
    }
    function handleSelectSong(song) {
        fetch(API_URL + `/song/updatetotalviewofthesong/${song.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let url = `/playing?song=${song.nameArtistAndNameSong}`;
                    history.push(url);
                },
                (error) => {
                    console.log(error)
                }
            )
        props.parrentcallbacktableright(song.id);
        setSelectedSong(song.id);
    }
    useEffect(() => {
        getSongList();
    }, [selectedSong]);
    const columns = [
        {
            field: 'top',
            title: 'Top',
            render: rowData =>
                (<div style={{ fontSize: '15px', marginLeft: '6px' }}>  {rowData['top']}  </div>)
        },
        {
            field: 'nameArtistAndNameSong',
            title: 'Song',
            cellStyle: {
                width: '30%',
                maxWidth: '30%'
            },
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['nameArtistAndNameSong']}  </div>)
        },
        {
            field: 'totalView',
            title: 'Total View',
            type: 'numeric',
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['totalView']}  </div>)
        },
        {
            field: 'timeIsAdded',
            title: 'Time Is Added',
            type: 'numeric',
            cellStyle: {
                width: '20%',
                maxWidth: '20%'
            },
            render: rowData =>
                (<div style={{ fontSize: '15px' }}>  {rowData['timeIsAdded']}  </div>)
        },
        {
            field: 'user',
            title: 'User Posted',
            type: 'numeric',
            render: rowData =>
                (<div style={{ fontSize: '15px', marginRight: '5px' }}>  {rowData['user']}  </div>)
        }
    ];
    const tabelrightcallbackdeletebuttoncontrol = async () =>{
        getSongList();
        alert('Deleted Successfully');
    }
    return (
        <>
            <ButtonControl 
                user={props.user} 
                tabelrightcallbackdeletebuttoncontrol={tabelrightcallbackdeletebuttoncontrol} 
                selectedSong={selectedSong}
            />
            <MaterialTable
                icons={tableIcons}
                components={overriding}
                localization={localization}
                columns={columns}
                onRowClick={
                    ((e, selRow) => {
                        if (selRow.id !== selectedSong) {
                            setSelectedSong(selRow.id);
                            handleSelectSong(selRow);
                        }

                    })
                }
                options={
                    {
                        rowStyle: rowData => ({
                            backgroundColor: (selectedSong === rowData.id) ? '#EEE' : '#FFF',
                        })

                    }
                }
                title={"Top Song"}
                style={styleTableRight}
                data={songList}
            />
        </>
    );
}
export default TableRight;