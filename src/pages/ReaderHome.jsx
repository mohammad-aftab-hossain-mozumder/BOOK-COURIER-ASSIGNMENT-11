import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from 'recharts'

const ReaderHome = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['stats-reader'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/reader-email/${user?.email}/stats`)
      return res.data
    }
  })

  const deliveryData =
    data?.deliveryStatus
      ?.filter(item => item._id)
      ?.map(item => ({
        name: item._id,
        count: item.count
      })) || []

  const paymentData =
    data?.paymentStatus
      ?.filter(item => item._id === 'pending')
      ?.map(item => ({
        name: "Items in Cart (Unpaid)",
        count: item.count
      })) || []

  // theme adaptive tick colors
  const tickColor = "#9CA3AF" // light gray (works in both themes)

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  return (
    <div className="p-6 space-y-10">

      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          <span className="text-orange-500">Hi, {user?.displayName || "Reader"}</span> 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Your reading & order activity overview.
        </p>
      </div>


      {/* stats cards */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">

        {data?.deliveryStatus?.map(single => single._id && (
          <div
            key={single._id}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 text-center
                       border border-gray-200 dark:border-gray-700"
          >
            <p className="text-4xl font-extrabold text-orange-500">{single.count}</p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mt-2 font-medium capitalize">
              {single._id.replace('-', ' ')}
            </p>
          </div>
        ))}

        {data?.paymentStatus?.map(single => single._id === "pending" && (
          <div
            key={single._id}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 text-center
                       border border-gray-200 dark:border-gray-700"
          >
            <p className="text-4xl font-extrabold text-orange-500">{single.count}</p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mt-2 font-medium">
              Items in Cart
            </p>
          </div>
        ))}

      </div>



      {/* delivery chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                      border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Delivery Status Overview
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          Track your orders across delivery stages.
        </p>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: tickColor }} />
              <YAxis tick={{ fill: tickColor }} />
              <Tooltip
                contentStyle={{
                  background: "var(--tw-prose-body)",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb"
                }}
                labelStyle={{ color: "#111" }}
                itemStyle={{ color: "#111" }}
              />
              <Line
                dataKey="count"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                activeDot={{ r: 7 }}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* payment chart */}
      {paymentData.length !== 0 &&
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                        border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Cart Summary
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Items currently in cart (unpaid).
          </p>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: tickColor }} />
                <YAxis tick={{ fill: tickColor }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--tw-prose-body)",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb"
                  }}
                  labelStyle={{ color: "#111" }}
                  itemStyle={{ color: "#111" }}
                />
                <Line
                  dataKey="count"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      }

    </div>
  )
}

export default ReaderHome
