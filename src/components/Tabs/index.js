import React from 'react'
import {
    Typography,
    Card,
    CardContent
  } from "@material-ui/core";

import './Tabs.css'

const index = ({title,cases,total,active,isRed, ...props}) => {
    return (
<Card className={`Tabs ${active && "Tabs-selected"} ${
  isRed && "Tabs-red"
}`} onClick= {props.onClick}>
<CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`Tabs_cases ${!isRed && "Tabs_cases-green"}`}>
          {cases}
        </h2>

        <Typography className="Tabs_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
</Card>
        )
}

export default index
