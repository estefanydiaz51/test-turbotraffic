import { Box, Button, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { FC, useEffect, useState } from "react"

interface Error {
  state: boolean,
  text: string
}
interface CmsFormProps {
  isLogged: boolean,
  error: Error,
  onSubmit: (value: string) => void
}

const CmsForm: FC<CmsFormProps> = ({ isLogged, onSubmit, error }) => {
  const [form, setForm] = useState({name: ''})
  const [isError, setIsError] = useState(error)

  useEffect(() => {
    setIsError(error)
  }, [error])

  const validationsForm = (value: string) => {
    if(value.length < 8){
      setIsError({
        state: true,
        text: 'El usuario debe tener más de 8 caracteres'
      })
      return false
    }
    return true
  } 


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setForm({
      name: value
    })

    if( validationsForm(value )) {
      setIsError({
        state: false,
        text: ''
      })
    }
   }

  const hasErrorForm = () => {
    let hasError = false
    let copyError  = { ...isError  }

    if(form.name.length < 8){
      copyError = {
        ...copyError,
          state: true,
          text: 'El usuario debe tener más de 8 caracteres'
        }
      hasError = true
    }
    if(error.text === 'El usuario no existe'){
      copyError = {
        ...copyError,
          state: true,
          text: 'El usuario no existe'
        }
      hasError = true
    }
    if(error.text === 'El usuario ya existe'){
      copyError = {
        ...copyError,
          state: true,
          text: 'El usuario ya existe'
        }
      hasError = true
    }
    setIsError(copyError)
    return hasError
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if(!hasErrorForm()) {
      onSubmit(form.name)
    } 
  }

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        background: 'rgba(109, 72, 122, 0.26)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.9px)',
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
          value={form.name}
          sx={{
            "& .MuiInputBase-root": {
              color: 'primary.main'
            },
            "& .MuiInputBase-root:hover": {
              backgroundColor: 'rgba(109, 72, 122, 0.26)',
            },
            "& .MuiInputBase-root.Mui-focused": {
              backgroundColor: 'rgba(109, 72, 122, 0.26)',
            },
            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline" : {
              borderColor: 'primary.main'
            },
            "& label":{
              color: 'primary.main'
            }
          }}
          error={isError.state}
          helperText={isError.text}
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