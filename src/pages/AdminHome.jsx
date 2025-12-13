import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer
} from 'recharts';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats1=[], isLoading: l1 } = useQuery({
        queryKey: ['delivery-stats1'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/delivery-status/stats`);
            return res.data;
        }
    });

    const { data: stats2=[], isLoading: l2 } = useQuery({
        queryKey: ['delivery-stats2'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/total-count/stats`);
            return res.data;
        }
    });

    const chartData =
        stats1
            ?.filter(item => item?._id)
            ?.map(item => ({
                name: item._id,
                count: item.count
            })) || [];

    if (l1 || l2) return <p className='text-4xl font-black text-center py-20'>Loading......</p>


    return (
        <div className="p-6 space-y-8">

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    <span className="text-orange-500">Admin Dashboard</span>
                </h1>
                <p className="text-gray-400 mt-1">
                    View system-wide statistics and delivery analytics.
                </p>
            </div>

            {/* All Orders Stats */}
            <div>
                <h2 className="text-xl font-semibold text-orange-500 mb-3">
                    All Orders Info
                </h2>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    {stats1?.map(
                        single =>
                            single._id && (
                                <div
                                    key={single._id}
                                    className="bg-white p-6 rounded-2xl shadow border border-gray-100 text-center"
                                >
                                    <div className="text-4xl font-black text-orange-500">
                                        {single.count}
                                    </div>
                                    <div className="text-gray-600 text-lg font-medium uppercase tracking-wide mt-1">
                                        {single._id}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>

            {/* All Users Stats */}
            <div>
                <h2 className="text-xl font-semibold text-orange-500 mb-3">
                    All Users Info
                </h2>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    {stats2?.map(
                        single =>
                            single._id && (
                                <div
                                    key={single._id}
                                    className="bg-white p-6 rounded-2xl shadow border border-gray-100 text-center"
                                >
                                    <div className="text-4xl font-black text-orange-500">
                                        {single.count}
                                    </div>
                                    <div className="text-gray-600 text-lg font-medium uppercase tracking-wide mt-1">
                                        {single._id}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>

            {/* Graph Section */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                    Delivery Status Graph
                </h2>

                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Line
                                dataKey="count"
                                stroke="#fb923c"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
