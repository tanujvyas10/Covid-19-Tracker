import React from 'react'
import './Table.css'
import numeral from "numeral";
function Table({ countries }) {



  return (
    <div className="table">
     <h1> Table</h1>
     {countries.map((country) => (
      <tr>
        <td>{country.country}</td>
        <td>
        <strong>{numeral(country.cases).format("0,0")}</strong>
        </td>
      </tr>
    ))}
    </div>
  );
}

export default Table;
