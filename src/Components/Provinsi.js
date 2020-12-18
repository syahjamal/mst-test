import fetch from "cross-fetch";
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress"

function Provinsi() {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;


    const onChangeHandle = async (value) =>{
    console.log(value);
    const response = await fetch(
        "https://postal-api.onphpid.com/provinces"
        // "https://ibnux.github.io/data-indonesia/propinsi.json"
    );
    const province = await response.json();
    const province_data = province["data"]
    setOptions(Object.keys(province_data).map(key => province_data[key]["name"]["id"]));

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
              getOptionSelected={(option, value) => option=== value}
              getOptionLabel={option => option}
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
