import React from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const Wishlist = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['wishlist-by-email', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/by-email?email=${user?.email}`)
      return res.data
    }
  })

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        Your Wishlist
      </h1>

      <div className="grid mx-auto lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

        {data?.map(single => (
          <div
            key={single._id}
            className="group bg-white rounded-2xl
             border border-gray-100
             shadow-sm hover:shadow-lg
             transition-all duration-300
             overflow-hidden"
          >

            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={single.image}
                alt={single.bookName}
                className="w-full h-56 object-cover
                 transition-transform duration-300
                 group-hover:scale-105"
              />

              {/* Price Badge */}
              <span
                className="absolute top-3 right-3
                 bg-orange-500 text-white
                 px-3 py-1 rounded-full
                 text-sm font-semibold shadow"
              >
                ${single.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">

              {/* Title */}
              <h2
                className="text-lg font-bold text-gray-800
                 leading-snug line-clamp-2"
                title={single.bookName}
              >
                {single.bookName}
              </h2>

              {/* Author */}
              <p className="text-sm text-gray-600">
                By{" "}
                <span className="font-medium text-orange-500">
                  {single.author}
                </span>
              </p>

              {/* CTA */}
              <div className="pt-4 mt-auto">
                <Link to={`/books/${single.bookId}`} className="block w-full">
                  <button
                    className="w-full py-3 rounded-full
                     bg-orange-500 hover:bg-orange-600
                     text-white font-semibold
                     transition-all duration-200"
                  >
                    View Details
                  </button>
                </Link>
              </div>

            </div>
          </div>

        ))}

      </div>
    </div>
  )
}

export default Wishlist
