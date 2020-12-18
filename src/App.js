import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mst from './images/mst.jpg';
import './App.css';
import fetch from "cross-fetch";
import CircularProgress from "@material-ui/core/CircularProgress"


function App() {
// =================================================
// Provinsi

const [open, setOpen] = useState(false);
const [options, setOptions] = useState([]);
const loading = open && options.length === 0;

 const [title, setTitle] = useState('')


const onChangeHandle = async (value) =>{
console.log(value);
const response = await fetch(
    // "https://postal-api.onphpid.com/provinces"
    "https://ibnux.github.io/data-indonesia/propinsi.json"
);
const province = await response.json();
setOptions(Object.keys(province).map(key => province[key]));

}

useEffect(() => {
if(!open){
    setOptions([])
}
}, [open])

// ============================================================
// Kota
const [openKota, setopenKota] = useState(false);
const [optionsKota, setoptionsKota] = useState([]);
const loadingKota = openKota && optionsKota.length === 0;

const [titleKota, setTitleKota]=useState('');


const onChangeHandleKota = async (value) =>{
console.log(value);
const response = await fetch(
    // "https://postal-api.onphpid.com/provinces"
    "https://ibnux.github.io/data-indonesia/kabupaten/"+title.id+".json"
);
const province = await response.json();
setoptionsKota(Object.keys(province).map(key => province[key]));

}

useEffect(() => {
if(!openKota){
    setoptionsKota([])
}
}, [openKota])

// ============================================================
// Sub District
const[openKec, setOpenKec] = useState(false);
const[optionsKec, setOptionsKec] = useState([]);
const loadingKec = openKec && optionsKec.length === 0;

const [titelKec, setTitleKec]=useState('')

const onChangeHandleKec = async (value) =>{
  console.log(value);
  const response = await fetch(
      // "https://postal-api.onphpid.com/provinces"
      "https://ibnux.github.io/data-indonesia/kecamatan/"+titleKota.id+".json"
  );
  const kecamatan = await response.json();
  setOptionsKec(Object.keys(kecamatan).map(key => kecamatan[key]));
  
  }
  
  useEffect(() => {
  if(!openKec){
      setOptionsKec([])
  }
  }, [openKec])


  return (
    <div className="App">
      <div className="App__container">
          <img src={mst}/>
          <div className="App__text">
              <h2>Cari data provinsi</h2>
          </div>
          <div style={{width: 400}} >

            {/* Provinsi */}
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
              onChange={(ev, value) => setTitle(value)}
              renderInput={(params) => (
                <TextField {...params} 
                label="Provinsi" 
                margin="normal" 
                variant="outlined" 
                onChange={(ev,val) => {
                  if (ev.target.value !== "" || ev.target.value !== null) {
                    onChangeHandle(ev.target.value);
                    console.log(onChangeHandle(ev.target.value))
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

            {/* Kota */}
            <Autocomplete 
              id="App"
              freeSolo
              open={openKota}
              onOpen={() => {
                setopenKota(true);
              }}
              onClose={() => {
                setopenKota(false);
              }}
              getOptionSelected={(option, value) => option.nama === value.nama}
              getOptionLabel={option => option.nama}
              options={optionsKota}
              loading={loadingKota}
              onChange={(event, value) => setTitleKota(value)}
              renderInput={(params) => (
                <TextField {...params} 
                label="Kota/Kabupaten" 
                margin="normal" 
                variant="outlined" 
                onChange={ev => {
                  if (ev.target.value !== "" || ev.target.value !== null) {
                    onChangeHandleKota(ev.target.value);
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingKota ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}/>
              )}
            />
          </div>
          <div style={{width: 400}}>
            {/* Kecamatan */}
            <Autocomplete 
              id="App"
              freeSolo
              open={openKec}
              onOpen={() => {
                setOpenKec(true);
              }}
              onClose={() => {
                setOpenKec(false);
              }}
              getOptionSelected={(option, value) => option.nama === value.nama}
              getOptionLabel={option => option.nama}
              options={optionsKec}
              loading={loadingKec}
              onChange={(event, value) => setTitleKec(value)}
              renderInput={(params) => (
                <TextField {...params} 
                label="Kecamatan" 
                margin="normal" 
                variant="outlined" 
                onChange={ev => {
                  if (ev.target.value !== "" || ev.target.value !== null) {
                    onChangeHandleKec(ev.target.value);
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingKec ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}/>
              )}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Urban"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Postal"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </div>
      </div>
    </div>
  );
}

export default App;