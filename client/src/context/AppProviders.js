import * as React from 'react'
import {AuthProvider} from '../components/AuthContext/authContext.js'
import {UserProvider} from './user-context'

function AppProviders({children}) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}
export default AppProviders
