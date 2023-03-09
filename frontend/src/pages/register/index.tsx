import CmsForm from "@/components/CmsForm"
import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { Container } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

function Register() {
  const { addUser } = useUser()
  const { render } = useAuth('none', '/dashboard')
  const route = useRouter()
  const [error, setError] = useState({
    state: false,
    text: ''
  })


  const handleSubmit = async (name: string) => {
    const response = await addUser(name)
    validations(response)
    if (response && response.token) {
      localStorage.setItem('user', response.token)
      localStorage.setItem('auth', JSON.stringify(response))
      route.push('/dashboard')
    }
  }


  const validations = (resp: any) => {
    if( resp.status === 403){
      setError({
        state: true,
        text: 'El usuario ya existe'
      })
    }
    if(resp.error === 'Validation failed'){
      setError({
        state: true,
        text: 'El usuario debe tener más de 8 caracteres'
      })
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
        error={error}
        isLogged={false}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default Register