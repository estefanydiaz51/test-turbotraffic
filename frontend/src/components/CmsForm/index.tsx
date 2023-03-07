import useForm from "@/hooks/useForm"
import { Box, Button, TextField, Typography } from "@mui/material"
import Link from "next/link"


interface CmsFormProps {
  isLogged: boolean,
  onSubmit: (value: string) => void
}

function CmsForm({ isLogged, onSubmit }: CmsFormProps) {
  const { handleChange, name } = useForm({ name: '' })


  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    onSubmit(name)
  }


  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        background: 'rgba(109, 72, 122, 0.26)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.9px)',
        '-webkitBackdropFilter': 'blur(4.9px)',
        border: '1px solid rgba(109, 72, 122, 0.51)',
        borderRadius: '16px',
        display: 'flex',
        flexFlow: 'column'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Typography
          variant="h5"
          color="#2196f3"
          sx={{
            marginBottom: '10px'
          }}
        >
          Turbotraffic
        </Typography>
        <Typography
          variant="subtitle2"
          color="#2196f3"
          sx={{
            marginBottom: '10px',
            textAlign: 'start'
          }}
        >
          {isLogged ? 'Por favor, ingrese a su cuenta' : ''}
        </Typography>
        <TextField
          name="name"
          label="Nombre"
          focused
          sx={{
            "& .MuiInputBase-root": {
              color: 'primary.main'
            }
          }}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          size="small"
          sx={{
            marginTop: '10px',
            textTransform: 'none',
          }}
        >
          {isLogged ? 'Iniciar sesión' : 'Registrarse'}
        </Button>
      </Box>
      {
        isLogged ?
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              textAlign: 'center',
              alignItems: 'center',
              marginX: '20px',
              marginBottom: '20px'
            }}
          >
            <Typography
              variant="body2"
              color="primary"
              sx={{
                textAlign: 'start',
                fontSize: '14px',
                marginRight: '5px'
              }}
            >
              ¿No tienes una cuenta?
            </Typography>
            <Link
              href="/register"
              style={{
                textDecoration: 'none'
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                }}
              >
                Registrarse
              </Button>
            </Link>
          </Box>
          : ''
      }
    </Box>
  )
}

export default CmsForm