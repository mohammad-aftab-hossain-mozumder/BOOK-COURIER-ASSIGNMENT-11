import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

const UserOrders = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user-order', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/of-user?email=${user?.email}`)
      return res.data
    }
  })

  const handleCancel = async (id) => {
    await axiosSecure.patch(`/orders/${id}`, { deliveryStatus: "cancelled" })
    refetch()
  }

  const handlePay = async (single) => {
    const paymentInfo = {
      price: single.price,
      bookName: single.bookName,
      parcelId: single._id,
      readerEmail: single.readerEmail,
    }

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo)
    window.location.assign(res.data.url)
  }
  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5 text-orange-500">
        My Orders
      </h1>

      <div className="
        overflow-x-auto 
        bg-white dark:bg-gray-900 
        rounded-2xl 
        shadow-lg 
        border border-gray-200 dark:border-gray-700
      ">

        <table className="table table-sm">

          {/* Table Header */}
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <tr className="text-sm">
              <th className="py-3">Book</th>
              <th className="py-3">Order Date</th>
              <th className="py-3">Payment</th>
              <th className="py-3">Delivery</th>
              <th className="text-center py-3">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {data?.map(single => (
              <tr
                key={single._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-200"
              >

                <td className="font-semibold">{single.bookName}</td>

                <td>{single.orderedDate}</td>

                <td className="capitalize font-medium">
                  {single.paymentStatus}
                </td>

                <td className="capitalize font-medium">
                  {single.deliveryStatus}
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-center space-x-2">

                  {/* Pay Now */}
                  {single.paymentStatus !== "paid" && (
                    <button
                      onClick={() => handlePay(single)}
                      className="
                        btn btn-sm 
                        bg-orange-500 hover:bg-orange-600 
                        text-white font-semibold border-0
                      "
                    >
                      Pay Now
                    </button>
                  )}

                  {/* Cancel Order */}
                  {single.paymentStatus === "paid" &&
                    single.deliveryStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(single._id)}
                        className="
                          btn btn-sm 
                          bg-red-500 hover:bg-red-600 
                          text-white font-semibold border-0
                        "
                      >
                        Cancel
                      </button>
                    )}

                  {/* Cancelled */}
                  {single.deliveryStatus === "cancelled" && (
                    <span className="text-red-500 font-semibold">
                      Cancelled
                    </span>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  )
}

export default UserOrders
