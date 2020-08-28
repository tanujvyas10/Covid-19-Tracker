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
import Tabs from './components/Tabs'
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
   
<div className = "left-part">
<div className= "app_header">
<h1>Covid -19 tracker</h1>

<FormControl className="app_dropdown">
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

<Card className = "description">

    
<CardContent>
<h2>Description:-</h2>
<br/>
<br/>
<li>Select the country from the selector above</li><br/>
<li>You will get the latest updates regarding of Total cases, Recovered and death in the selected country</li><br/>
<li>Dynamic graph tells about the latest data of selected nation</li><br/>
<li>Radius of the affected nation according to the latest updates</li>
</CardContent>

</Card> 
</div>

    <Card className = "center-part">

    
  <CardContent>
  <h3>Country Wise Sorted Live Cases </h3>
<Table countries = {tableData} />
  <h3>Worldwide new cases</h3>
  </CardContent>
<LineGraph  casesType = {casesType}/>
  </Card> 


    <div className="right-part">
    
  

    <div className = "app_stats">
    <Tabs isRed  active = {casesType === 'cases'} onClick = {(e)=> setCasesType('cases')} title = "Total Coronavirus Cases" cases = {resolvePrint( countryInfo.todayCases)} total={resolvePrint(countryInfo.cases)} />
    <Tabs active = {casesType === 'recovered'} onClick = {(e)=> setCasesType('recovered')} title = "Total Recovered" cases = {resolvePrint(countryInfo.todayRecovered)} total={resolvePrint(countryInfo.recovered)} />       
    <Tabs isRed  active = {casesType === 'deaths'} onClick = {(e)=> setCasesType('deaths')} title = "Total Deaths" cases = {resolvePrint(countryInfo.todayDeaths)} total={resolvePrint(countryInfo.deaths)} />
        </div>
      <Map
      casesType = {casesType}
      countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
      />
  
      

    </div>
   
    </div>
  );
}

export default App;
