import {UseAuth} from './AuthProvider'
import {Navigate} from 'react-router-dom'

export default function PrivateRoute({children}){
	//understand this one better
	const {auth} = UseAuth();

	if(auth.loading) return <p>Loding...</p>
	return auth.isLogged ? children : <Navigate to='/login' replace />
}



