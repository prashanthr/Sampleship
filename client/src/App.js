import './App.css';
import * as React from 'react';
import {useUser} from './context/user-context.js'
import FullPageSpinner from './components/lib.js'
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const Login = React.lazy(() => import('./components/Login/login'))
function App() {
    const user = useUser();
    return (
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <Login />}
      </React.Suspense>
    )  }

export default App;
