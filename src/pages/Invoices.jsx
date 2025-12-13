import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

const Invoices = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/by-email?email=${user?.email}`)
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

      <h1 className="text-2xl font-bold mb-5 text-orange-500">
        Payment Invoices
      </h1>

      <div
        className="
        overflow-x-auto 
        bg-white dark:bg-gray-900
        rounded-2xl shadow-lg
        border border-gray-200 dark:border-gray-700
      "
      >

        <table className="table table-sm">

          {/* Header */}
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <tr className="text-sm">
              <th className="py-3">Book Title</th>
              <th className="py-3">Payment ID</th>
              <th className="py-3">Payment Date</th>
              <th className="py-3">Amount</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data?.map((single) => (
              <tr
                key={single.paymentId}
                className="
                  hover:bg-gray-50 
                  dark:hover:bg-gray-800 
                  transition-all 
                  text-gray-700 dark:text-gray-200
                "
              >

                {/* Book Title */}
                <td className="font-semibold">{single.parcelName}</td>

                {/* Payment ID */}
                <td className="text-gray-600 dark:text-gray-300">
                  {single.paymentId}
                </td>

                {/* Payment Date */}
                <td>{single.date}</td>

                {/* Amount */}
                <td className="font-bold text-orange-500">
                  ${single.amount}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default Invoices
