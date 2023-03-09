
import { Box } from '@mui/material'
import { FC } from 'react'
import CmsNavigator from '../CmsNavigator'


interface NavigatorProps {
  children: JSX.Element
}

const CmsDashboard: FC<NavigatorProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex'}}>
      <CmsNavigator>
        { children}
      </CmsNavigator>
    </Box>
  )
  
}

export default CmsDashboard