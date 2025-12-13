import React from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
const ReaderRoute = ({children}) => {
  const { user, loader } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['users-by-email', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/by-email?email=${user.email}`)
            return res.data
        }
    })
    if (isLoading||loader) {
        return <p className='text-4xl font-black'>Loading......</p>
    }
    if(data[0].role!=="Reader"){
        return <p className='text-4xl font-black'>You Are Forbidden to Access This Route</p>
    }
    return children
}

export default ReaderRoute