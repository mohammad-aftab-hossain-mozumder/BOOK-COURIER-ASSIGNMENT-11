import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { Link } from 'react-router'
import { FaFilter } from 'react-icons/fa'

const Books = () => {
  const axiosSecure = useAxiosSecure()
  const [lastData, setLastData] = useState([])

  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get('/books')
      setLastData(res.data)
      return res.data

    }
  })
  const handlesearch = (e) => {
    e.preventDefault()
    const searchtext = e.target.search.value
    fetch(`https://assignemnt-11-server.vercel.app/books/search?searchtext=${searchtext}`)
      .then(res => res.json())
      .then(ans => {
        console.log('s', ans)
        setLastData(ans)
      })
  }
  const handlesort = (type) => {
    console.log(type)
    const sorted = [...lastData]
    if (type === 'ltoh') sorted.sort((a, b) => a.price - b.price)
    if (type === 'htol') sorted.sort((a, b) => b.price - a.price)
    setLastData(sorted)
  }

if (isLoading||lastData.length===0) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )
  return (
    <div className="">
      <div className="flex p-5 justify-between items-center">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="px-6 py-2 flex justify-center items-center rounded-full border border-orange-500 font-medium">filter<FaFilter /></div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li onClick={() => handlesort('ltoh')}><a>Low to High Price</a></li>
            <li onClick={() => handlesort('htol')}><a>High to Low Price</a></li>
          </ul>
        </div>
         <form onSubmit={handlesearch} className="flex justify-center items-center">
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="
      input 
      w-72
      rounded-l-full rounded-r-none
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-gray-200
      border border-orange-400
      focus:outline-none focus:border-orange-500
    "
          />

          <button
            type="submit"
            className="
      btn
      rounded-r-full rounded-l-none
      bg-orange-500 hover:bg-orange-600
      text-white font-semibold
      border-0
      px-6
    "
          >
            Search
          </button>
        </form>

        <div className=""></div>
      </div>
      {/* <details className="dropdown">
        <summary className="btn m-1">open or close</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li onClick={() => handlesort('ltoh')}><a>Low to High Price</a></li>
          <li onClick={() => handlesort('htol')}><a>High to Low Price</a></li>
        </ul>
      </details> */}


      {/* <form onSubmit={handlesearch} className='flex m-5 justify-center items-center'>
        <input name='search' type="text" placeholder="Search" className="input rounded-r-none input-warning" />
        <button className='btn rounded-l-none bg-orange-500 border-0 p-4'>Search</button>
      </form> */}
      <div className="grid mx-auto lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">

        {
          lastData?.map(single => single.situation === "Published" &&
            <Link to={`/books/${single._id}`} className="w-full">
              < div key={single._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100" >

                {/* Image */}
                < div className="relative" >
                  <img src={single.imageurl} className="w-full h-56 object-cover" alt={single.title} />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">

                  {/* Title + Price beside each other */}
                  <div className="flex justify-between items-start gap-3">
                    <h2 className="text-xl font-bold text-gray-800 leading-snug line-clamp-2">
                      {single.title}
                    </h2>
                    <span className="text-xl font-bold text-orange-500 whitespace-nowrap">
                      $ {single.price}
                    </span>
                  </div>

                  {/* Author */}
                  <p className="text-sm text-gray-500">
                    By <span className="font-medium text-orange-500">{single.author}</span>
                  </p>

                </div>
              </div>
            </Link>
          )
        }
      </div >
    </div >

  )
}

export default Books
