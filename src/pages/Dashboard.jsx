import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { FaCartShopping } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { RiBookShelfLine } from "react-icons/ri";
import { GrDeliver } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineManageSearch } from "react-icons/md";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import logo from '../assets/libraryLogo.png'

const Dashboard = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['users-by-email', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/by-email?email=${user.email}`)

      return res.data
    }
  })
  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )
  if (data?.length === 0) {
    return refetch()
  }
  console.log("data", data)
  const reader = [
    { title: "BookCourier", link: '/', icon: <img className='size-10 h-6 w-15' src={logo} alt="" /> },
    { title: "Home", link: '/dashboard', icon: <IoMdHome /> },
    { title: "My Orders", link: '/dashboard/user-orders', icon: <FaCartShopping /> },
    { title: "Invoices", link: '/dashboard/invoices', icon: <MdOutlinePayments /> },
    { title: "Wishlist", link: '/dashboard/wishlist', icon: <FaRegStar /> },
    { title: "Profile", link: '/dashboard/profile', icon: <CgProfile /> },
  ]
  const librarian = [
    { title: "BookCourier", link: '/', icon: <img className='size-10 h-6 w-15' src={logo} alt="" /> },
    { title: "Home", link: '/dashboard', icon: <IoMdHome /> },
    { title: "Add Book", link: '/dashboard/add-book', icon: <IoIosAddCircle /> },
    { title: "My Books", link: '/dashboard/librarian-books', icon: <RiBookShelfLine /> },
    { title: "Orders", link: '/dashboard/librarian-orders', icon: <GrDeliver /> },
  ]
  const admin = [
    { title: "BookCourier", link: '/', icon: <img className='size-10 h-6 w-15' src={logo} alt="" /> },
    { title: "Home", link: '/dashboard', icon: <IoMdHome /> },
    { title: "All Users", link: '/dashboard/all-users', icon: <FaUsers /> },
    { title: "Manage Books", link: '/dashboard/manage-books', icon: <MdOutlineManageSearch /> },
    { title: "Profile", link: '/dashboard/profile', icon: <CgProfile /> },
  ]
  if (data.length > 0) {
    const who = data[0]?.role === "Admin" ? admin : data[0]?.role === "Reader" ? reader : librarian
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              {/* Sidebar toggle icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <div className="px-4">Dashboard</div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              {
                who.map((single, index) =>
                  <li className='my-2' key={index}>
                    <Link to={single.link}>
                      <button className="is-drawer-close:tooltip flex justify-center items-center gap-2 is-drawer-close:tooltip-right" data-tip={single.title}>
                        {/* Home icon */}
                        <p className='text text-2xl'>{single.icon}</p>
                        <span className="is-drawer-close:hidden">{single.title}</span>
                      </button>
                    </Link>
                  </li>
                )
              }

            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default Dashboard