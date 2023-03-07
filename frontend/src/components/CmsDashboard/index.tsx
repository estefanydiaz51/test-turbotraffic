
import { Box } from '@mui/material'
import CmsNavigator from '../CmsNavigator'


type NavigatorProps = {
  children: React.ReactNode
}

function CmsDashboard ({ children }: NavigatorProps) {
  return (
    <Box sx={{ display: 'flex'}}>
      <CmsNavigator>
        { children}
      </CmsNavigator>
    </Box>
  )
  
}

export default CmsDashboard