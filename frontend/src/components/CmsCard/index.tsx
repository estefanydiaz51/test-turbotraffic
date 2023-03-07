import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

interface CmsCardProps {
  id: string,
  name: string,
  role: string,
}

function CmsCard({name, role}: CmsCardProps) {
  return (
    <Card 
      sx={{ maxWidth: 345, 
        background:'#E7EBF0',
        margin: '10px'
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5"
            component="div"
            color="primary"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default CmsCard