import { render, screen } from '@testing-library/react'
import CmsForm from './index'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const mockError = {
  state: false,
  text: ''
}


const mockErrorHaveLessEightCharacters = {
  state: true,
  text: 'El usuario debe tener más de 8 caracteres'
}


interface Error {
  state: boolean,
  text: string
}
interface CmsFormProps {
  isLogged: boolean,
  error: Error,
  onSubmit: (value: string) => void
}

const renderCmsForm = (isLogged: boolean, error: Error, onSubmit: ()=> {}) => {
  return render (<CmsForm 
    isLogged={isLogged}
    error={error}
    onSubmit={onSubmit}
  />)
  
}

describe('<CmsForm />', () => {
  let component: any = null
  const handleSubmitMock = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('should validate that it is a Register form', () => {
    it('should create an instance', () => {
      component = renderCmsForm(false, mockError, handleSubmitMock) 
      expect(component).toBeDefined()
    })
  
    it('should validate that component is rendered correctly', () => {
      component = renderCmsForm(false, mockError, handleSubmitMock) 
      expect(screen.getByText('Registrarse')).toBeInTheDocument()
    })
  })


  describe('should validate that it is a Login form', () => {
    it('should create an instance', ()=> {
      component = renderCmsForm(true, mockError, handleSubmitMock) 
      expect(component).toBeDefined()
    })
    it('should validate that component is rendered correctly', () => {
      component = renderCmsForm(true, mockError, handleSubmitMock) 
      expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    })
  })


  describe('should validate the different errors in the input text', ()=>{
    const handleSubmitMock = jest.fn()
    beforeEach(() => {
      renderCmsForm(false, mockErrorHaveLessEightCharacters, handleSubmitMock) 
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('when the name input have less that 8 characters', async()=> {
      const inputName = screen.getByTestId('name')
      const user = userEvent.setup()
      await user.type(inputName, 'abc')
      const errorMsg = screen.getByText('El usuario debe tener más de 8 caracteres')
      expect(errorMsg).toBeInTheDocument()
    })
  })
})


