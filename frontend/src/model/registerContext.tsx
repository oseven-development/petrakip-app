import React, { useContext, useState } from 'react'

interface RegisterContextContent {
  mail: string
  password: string
}

interface RegisterContextUpdate {
  setMailAndPassword: (mail: string, password: string) => void
}

const RegisterContext = React.createContext<RegisterContextContent>({
  mail: '',
  password: '',
})
const RegisterUpdateContext = React.createContext<RegisterContextUpdate>({
  setMailAndPassword: () => null,
})

export const useRegister = () => {
  return useContext(RegisterContext)
}

export const useRegisterUpdate = () => {
  return useContext(RegisterUpdateContext)
}

export const RegisterProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({ mail: '', password: '' })

  function setMailAndPassword(mail: string, password: string) {
    setUser({ mail, password })
  }

  return (
    <RegisterContext.Provider value={user}>
      <RegisterUpdateContext.Provider
        value={{ setMailAndPassword: setMailAndPassword }}
      >
        {children}
      </RegisterUpdateContext.Provider>
    </RegisterContext.Provider>
  )
}
