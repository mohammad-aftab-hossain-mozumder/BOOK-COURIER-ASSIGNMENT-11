import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get('/books')
      return res.data
    }
  })

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/books/${id}`)
    refetch()
  }

  const handleSituation = (id, situation) => {
    const newSituation = situation === "Published" ? "Unpublished" : "Published"
    axiosSecure.patch(`/books-all/admin/${id}`, { situation: newSituation })
      .then(() => refetch())
  }

  if (isLoading) {
    return <p className="text-center py-10 text-xl font-semibold">Loading...</p>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500">
          Manage Books
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          View, delete, and update book status.
        </p>
      </div>

      {/* MAIN WRAPPER CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 overflow-x-auto">

        <table className="table">
          <thead className="bg-orange-50 dark:bg-gray-800/80 text-orange-500 dark:text-orange-400">
            <tr>
              <th>Book</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((single) => (
              <tr
                key={single._id}
                className="hover:bg-orange-50 dark:hover:bg-gray-800/50 transition-all"
              >
                {/* BOOK INFO */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={single?.imageurl} alt="Book" />
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {single?.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {single?.author}
                      </div>
                    </div>
                  </div>
                </td>

                {/* STATUS BADGE */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm shadow
                      ${single.situation === "Published"
                        ? "bg-green-500"
                        : "bg-red-500"
                      }`}
                  >
                    {single.situation}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-center">
                  <div className="flex gap-2 justify-center">

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(single._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow"
                    >
                      Delete
                    </button>

                    {/* TOGGLE STATUS BUTTON */}
                    <button
                      onClick={() => handleSituation(single._id, single.situation)}
                      className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm shadow"
                    >
                      {single.situation === "Published"
                        ? "Make Unpublished"
                        : "Make Published"}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ManageBooks
