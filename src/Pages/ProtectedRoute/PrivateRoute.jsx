import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if(!isAuthenticated) {
        toast.warning('Please login to access admin page!', {
            autoClose: 7000,
            toastId: 1
        })
    }

    return isAuthenticated ? <>{props.children}</> : <Navigate to='/login' />
}

export default PrivateRoute