import React from 'react'
import {useAuth} from '../components/AuthContext/authContext.js'

const UserContext = React.createContext()

function UserProvider(props) {
  const {user} = useAuth();
  return <UserContext.Provider value={user} {...props} />
}

function useUser() {
  const context = React.useContext(UserContext)
  return context
}

export {UserProvider, useUser}
