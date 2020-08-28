import React from 'react'
import {
    Typography,
    Card,
    CardContent
  } from "@material-ui/core";

import './infoBox.css'

const index = ({title,cases,total,active, ...props}) => {
    return (
<Card className={`infoBox ${active && "infoBox-selected"} ${
  isRed && 'infoBox-red'
}`} onClick= {props.onClick}>
<CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox_cases`}>
          {cases}
        </h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
</Card>
        )
}

export default index
