import React from 'react'
import {
    Typography,
    Card,
    CardContent
  } from "@material-ui/core";

  

const index = ({title,cases,total}) => {
    return (
<Card>
<CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
</Card>
        )
}

export default index
