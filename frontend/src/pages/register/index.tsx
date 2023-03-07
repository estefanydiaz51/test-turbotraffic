import CmsForm from "@/components/CmsForm"
import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { Container } from "@mui/material"
import { useRouter } from "next/router"

function Register() {
  const { addUser } = useUser()
  const { render } = useAuth('none', '/dashboard')
  const route = useRouter()


  const handleSubmit = async (name: string) => {
    const response = await addUser(name)
    if (response.token) {
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
        onSubmit={handleSubmit}
        isLogged={false}
      />
    </Container>
  )
}

export default Register