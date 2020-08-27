import React,{useState,useEffect} from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './components/InfoBox'
import Map from './components/Map'
function App() {
  
  const [countries,setCountries] = useState([])


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

   setCountries(countries)
  
  })
  .catch(err=>{

  })



}
getCountiresData()
},[])//load only once act as compo.did.mount(when [] empty) and then only when coutnries change


const onCountryChange = async(e) =>{
e.preventDefault()
const countryCode = e.target.value
console.log(countryCode)

}
  return (
    <div className="App">

    <div className="left-part">
    
    <div className= "app__header">
    <h1>Covid -19 tracker</h1>
  
    <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value="{country}"
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
<InfoBox title = "Coronavirus Cases" cases = {123} total={3000} />
<InfoBox title = "Recovered" cases = {123} total={3000} />       
<InfoBox title = "Deaths" cases = {123} total={3000} />
    </div>
  <Map/>


    </div>
  <Card className = "right-part">
  <CardContent>
  <h3>Live Cases by Country</h3>

  <h3>Worldwide new cases</h3>
  </CardContent>

  </Card>  
    </div>
  );
}

export default App;
