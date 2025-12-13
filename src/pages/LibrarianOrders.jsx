import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const LibrarianOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['order-of-librarian', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/of-librarian?email=${user?.email}`);
      return res.data;
    }
  });

  const handleCancel = async (id) => {
    await axiosSecure.patch(`/orders/${id}`, { deliveryStatus: "cancelled" });
    refetch();
  };

  const handleShip = async (id) => {
    await axiosSecure.patch(`/orders/${id}`, { deliveryStatus: "shipped" });
    refetch();
  };

  const handleDelivery = async (id) => {
    await axiosSecure.patch(`/orders/${id}`, { deliveryStatus: "delivered" });
    refetch();
  };

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-orange-500">Orders Management</span>
        </h1>
        <p className="text-gray-500 mt-1">Track and update your book delivery requests.</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
        <table className="table">
          <thead className="bg-orange-50">
            <tr className="uppercase text-sm text-gray-600">
              <th>Book Title</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {
              data?.map(single => single?.deliveryStatus &&
                <tr key={single._id} className="hover:bg-orange-50/40 transition-all">

                  {/* Book Name */}
                  <td className="font-medium text-gray-800">
                    {single?.bookName}
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${single.deliveryStatus === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${single.deliveryStatus === "shipped" ? "bg-blue-100 text-blue-700" : ""}
                      ${single.deliveryStatus === "delivered" ? "bg-green-100 text-green-700" : ""}
                      ${single.deliveryStatus === "cancelled" ? "bg-red-100 text-red-600" : ""}
                    `}>
                      {single?.deliveryStatus}
                    </span>
                  </td>

                  {/* Buttons */}
                  <td className="flex gap-2 py-4 justify-center">

                    {/* Pending → Ship */}
                    {single.deliveryStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleShip(single._id)}
                          className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm transition-all"
                        >
                          Make Shipped
                        </button>
                        <button
                          onClick={() => handleCancel(single._id)}
                          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Shipped → Delivered */}
                    {single.deliveryStatus === "shipped" && (
                      <>
                        <button
                          onClick={() => handleDelivery(single._id)}
                          className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm transition-all"
                        >
                          Make Delivered
                        </button>
                        <button
                          onClick={() => handleCancel(single._id)}
                          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Completed or Cancelled → No Actions */}
                    {(single.deliveryStatus === "cancelled" ||
                      single.deliveryStatus === "delivered") && (
                      <span className="text-sm text-gray-400 italic">
                        No actions available
                      </span>
                    )}

                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianOrders;
