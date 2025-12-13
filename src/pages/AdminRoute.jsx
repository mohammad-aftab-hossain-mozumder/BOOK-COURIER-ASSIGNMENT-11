import React from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const AdminRoute = ({ children }) => {
    const { user, loader } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['users-by-email', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/by-email?email=${user.email}`)
            return res.data
        }
    })
    if (isLoading || loader) {
        return (
            <div className="flex justify-center items-center">
                <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
            </div>
        )
    }
    if (data[0].role !== "Admin") {
        return <p className='text-4xl font-black'>You Are Forbidden to Access This Route</p>
    }
    return children
}

export default AdminRoute