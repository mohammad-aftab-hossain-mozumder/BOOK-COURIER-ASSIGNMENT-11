import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import AdminHome from './AdminHome';
import ReaderHome from './ReaderHome';
import LibrarianHome from './LibrarianHome';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['/users/by-email', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/by-email?email=${user.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <p className='text-4xl font-black'>Loading......</p>
    }
    if (data.length === 0) {
        return refetch()
    }
    if (data.length > 0) {
        const role = data[0]?.role
        if (role === "Admin") {
            return <AdminHome />
        }

        if (role === "Reader") {
            return <ReaderHome />;
        }

        if (role === "Librarian") {
            return <LibrarianHome />;
        }
    }
}

export default DashboardHome