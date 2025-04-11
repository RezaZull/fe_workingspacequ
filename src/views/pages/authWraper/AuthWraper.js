import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { localStorageKey, localStorageService } from '../../../utils/localStorageService'

const AuthWrapper = () => {
  const location = useLocation() // current location

  const userLogged = localStorageService.getData(localStorageKey.authData)
  return userLogged && userLogged != null ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  )
}
export default AuthWrapper
