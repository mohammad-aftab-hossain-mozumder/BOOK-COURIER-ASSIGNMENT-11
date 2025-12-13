import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const LibrarianHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/librarian-email/${user?.email}/stats`
      );
      return res.data;
    },
  });

  const deliveryData =
    data?.deliveryStatus
      ?.filter((item) => item._id)
      ?.map((item) => ({
        name: item._id,
        count: item.count,
      })) || [];

  const paymentData =
    data?.paymentStatus
      ?.filter((item) => item._id === "unpaid")
      ?.map((item) => ({
        name: "Still on user's cart",
        count: item.count,
      })) || [];

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  return (
    <div className="p-6 space-y-10">

      {/* ------------------- Stats Section ------------------- */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {data?.deliveryStatus?.map(
          (single) =>
            single._id && (
              <div
                key={single._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all"
              >
                <h2 className="text-4xl font-black text-orange-500">
                  {single.count}
                </h2>
                <p className="mt-2 text-lg font-semibold text-gray-700">
                  {single._id}
                </p>
              </div>
            )
        )}

        {data?.paymentStatus?.map(
          (single) =>
            single._id === "unpaid" && (
              <div
                key={single._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all"
              >
                <h2 className="text-4xl font-black text-orange-500">
                  {single.count}
                </h2>
                <p className="mt-2 text-lg font-semibold text-gray-700">
                  Still on user's cart
                </p>
              </div>
            )
        )}
      </div>

      {/* ------------------- Delivery Chart ------------------- */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Delivery Status
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deliveryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line dataKey="count" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------- Payment Chart ------------------- */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Cart Status
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line dataKey="count" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default LibrarianHome;
