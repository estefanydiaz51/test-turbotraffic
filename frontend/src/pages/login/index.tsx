import useAuth from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import CmsForm from '../../components/CmsForm'
function Login () {
  const { findUser } = useUser()
  const route = useRouter()
  const { render } = useAuth('none', '/dashboard')

  const handleSubmit = async(name: string) => {
    const response = await findUser(name)
    if(response.token){
      localStorage.setItem('user', response.token)
      localStorage.setItem('auth', JSON.stringify(response))
      route.push('/dashboard')
    }
  }
  return render && (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        maxWidth: '2000px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6rem',
        minHeight: '100vh',  
        background: 'linear-gradient(to top, #43c6ac, #f8ffae)'
      }}
    >
      <CmsForm 
        isLogged={true}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default Login