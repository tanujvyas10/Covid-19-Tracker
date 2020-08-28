import React,{useState,useEffect} from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import {sortTable,resolvePrint} from './Utils/index'
import "leaflet/dist/leaflet.css";
import InfoBox from './components/InfoBox'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import Table from './components/Table/Table'
function App() {
  
  const [countries,setCountries] = useState([])
const [country,setCountry] = useState("worldwide")
const  [countryInfo,setCountryInfo] = useState({})
const [tableData,setTableData] = useState([])
const [mapCountries, setMapCountries] = useState([]);
const [casesType, setCasesType] = useState("cases");
const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });
const [mapZoom, setMapZoom] = useState(3);
useEffect(()=>{
  const getCountiresData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response)=> response.json())
    .then((data)=>{
   const countries = data.map((country)=>(
     {
      name: country.country,
      value: country.countryInfo.iso2,
     }
   ))

    let sortedTable = sortTable(data)
    
   setCountries(countries)
   console.log("table data",data)
   setMapCountries(data);
   setTableData(sortedTable)
  })
  .catch(err=>{

  })



}
getCountiresData()
},[])//load only once act as compo.did.mount(when [] empty) and then only when coutnries change



useEffect(()=>{
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response=> response.json())
  .then((data)=>{
    setCountryInfo(data)
  })
},[])

const onCountryChange = async(e) =>{
e.preventDefault()
const countryCode = e.target.value

const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all'
: `
https://disease.sh/v3/covid-19/countries/${countryCode}`



await fetch(url)
.then(response=>response.json())
.then(data=>{
  setCountryInfo(data)
  setCountry(countryCode)
  setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  setMapZoom(4);
})


}
  return (
    <div className="App">

    <div className="left-part">
    
    <div className= "app__header">
    <h1>Covid -19 tracker</h1>
  
    <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

    </div>

    <div className = "app__stats">
<InfoBox onClick = {(e)=> setCasesType('cases')} title = "Coronavirus Cases" cases = {resolvePrint( countryInfo.todayCases)} total={resolvePrint(countryInfo.cases)} />
<InfoBox onClick = {(e)=> setCasesType('recover')} title = "Recovered" cases = {resolvePrint(countryInfo.todayRecovered)} total={resolvePrint(countryInfo.recovered)} />       
<InfoBox onClick = {(e)=> setCasesType('deaths')} title = "Deaths" cases = {resolvePrint(countryInfo.todayDeaths)} total={resolvePrint(countryInfo.deaths)} />
    </div>
  <Map
  countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
  />


    </div>
  <Card className = "right-part">
  <CardContent>
  <h3>Live Cases by Country</h3>
<Table countries = {tableData} />
  <h3>Worldwide new cases</h3>
  </CardContent>
<LineGraph casesType = {"cases"}/>
  </Card>  
    </div>
  );
}

export default App;
