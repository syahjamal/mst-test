import fetch from "cross-fetch";
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress"
import api from '../Axios';

function Provinsi() {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;


    const onChangeHandle = async (value) =>{
    console.log(value);
    const response = await fetch(
        // "https://postal-api.onphpid.com/provinces"
        api("/propinsi.json")
    );
    const province = response.json();
    setOptions(Object.keys(province).map(key => province[key]));

    }

    useEffect(() => {
    if(!open){
        setOptions([])
    }
    }, [open])

    return (
        <div style={{width: 400}} >
            <Autocomplete
              id="App"
              freeSolo
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => option.nama === value.nama}
              getOptionLabel={option => option.nama}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField {...params} 
                label="province" 
                margin="normal" 
                variant="outlined" 
                onChange={ev => {
                  if (ev.target.value !== "" || ev.target.value !== null) {
                    onChangeHandle(ev.target.value);
                    console.log(onChangeHandle)
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}/>
              )}
            />
        </div>
    )
}

export default Provinsi
