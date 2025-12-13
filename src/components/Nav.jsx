import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import logo from '../assets/libraryLogo.png'

const Nav = () => {
    const { user, logOutMan } = useAuth()

    const [theme, settheme] = useState(localStorage.getItem("theme") || "light")
    useEffect(() => {
        document.querySelector('html').setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])
    const handletheme = (e) => {
        console.log(e)
        const newtheme = e ? "dark" : "light"
        settheme(newtheme)
    }
    console.log(user)
    const list =
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/books'}>Books</NavLink></li>
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
            <li><div className=""><input onChange={(e) => handletheme(e.target.checked)} defaultChecked={localStorage.getItem("theme") === "dark"} type="checkbox" value="synthwave" className="toggle theme-controller" /></div></li>
        </>
    return (
        <div className="navbar bg-base-100 z-50 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            list
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><img className='size-10 ' src={logo} alt="" /><span className='text-orange-500 sm:block hidden font-black text-2xl'>BookCourier</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        list
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <img className='size-10 rounded-4xl mx-4' src={user?.photoURL} alt="" />
                            <p onClick={() => logOutMan()} className='btn'>Logout</p>
                        </> :
                        <>
                            <Link to={'/login'} className='px-6 py-2 rounded-full bg-orange-500 mx-2 text-white font-semibold'>Login</Link>
                            <Link to={'/register'} className='px-6 py-2 rounded-full border border-orange-500 font-medium'>Register</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default Nav