import CmsCard from "@/components/CmsCard"
import CmsDashboard from "@/components/CmsDashboard"
import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { Typography } from "@mui/material"
import { useEffect } from "react"

function Admin () {
  const { users, getUsers } = useUser()
  const { render } = useAuth('admin', '/dashboard')


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const admin = localStorage.getItem('auth')
      const user = admin ? JSON.parse( admin ) : null
      if( user ) {
        getUsers(user.token)
      }
    }
  }, [render])
  
  return render && (
    <CmsDashboard>
        <Typography paragraph>
          Admin
          Bienvenido
        </Typography>
        {users  ? users.map(user => 
          <CmsCard
            key={user.id} {...user} 
          />
        ) : ''}
    </CmsDashboard>
  )
}


export default Admin