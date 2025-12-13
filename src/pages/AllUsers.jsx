import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'

const AllUsers = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users=[], refetch, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data
    }
  })

  const updateRole = async (id, role) => {
    await axiosSecure.patch(`/users/admin/${id}`, { role }, {
      headers: { "Content-Type": "application/json" }
    })
    refetch()
  }

  if (isLoading||users.length===0) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500">
          All Users
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all users, roles & permissions.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 overflow-x-auto">

        <table className="table">
          <thead className="bg-orange-50 dark:bg-gray-800 text-orange-500 dark:text-orange-400">
            <tr>
              <th>User Info</th>
              <th className="text-center">Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map(user => (
              <tr
                key={user._id}
                className="hover:bg-orange-50 dark:hover:bg-gray-800/40 transition-all"
              >
                {/* USER INFO */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="User" />
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {user.name || "No Name"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* ROLE BADGE */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm shadow-sm
                      ${user.role === "Admin" ? "bg-red-500" :
                        user.role === "Librarian" ? "bg-blue-500" :
                          "bg-green-500"}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-center">
                  {user.role === "Reader" && (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => updateRole(user._id, "Librarian")}
                        className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm shadow"
                      >
                        Make Librarian
                      </button>

                      <button
                        onClick={() => updateRole(user._id, "Admin")}
                        className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow"
                      >
                        Make Admin
                      </button>
                    </div>
                  )}

                  {user.role === "Librarian" && (
                    <button
                      onClick={() => updateRole(user._id, "Admin")}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow"
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role === "Admin" && (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">
                      No Actions
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

export default AllUsers
