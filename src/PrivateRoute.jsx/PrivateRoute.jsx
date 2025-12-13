import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation, useNavigate } from 'react-router'

const PrivateRoute = ({ children }) => {
    const { user, loader } = useAuth()
    const location = useLocation()
    if (loader) {
        return <p className='text-4xl font-black'>Loading......</p>
    }
    if (!user) {
        return <Navigate state={location?.pathname} to={'/login'}></Navigate>
    }
    return children
}

export default PrivateRoute