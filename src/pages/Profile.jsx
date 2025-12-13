import { useState } from 'react'
import useAuth from "../hooks/useAuth"
import { updateProfile } from 'firebase/auth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['users-by-email', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/by-email?email=${user.email}`)
      return res.data
    }
  })

  if (isLoading) {
    return <p className="text-center mt-20 text-3xl font-bold">Loading...</p>
  }

  if (data[0].role === "Librarian") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-4xl font-black text-red-600">
          You Are Forbidden to Access This Route
        </p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const photo = e.target.photo.value

    try {
      await updateProfile(user, { displayName: name, photoURL: photo })

      await axiosSecure.patch(`/users/by-email-patch/${user?.email}`, {
        name,
        photoURL: photo
      })

      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      {/* PROFILE CARD */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">

        <div className="flex justify-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-md"
          />
        </div>

        <div className="text-center mt-6 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.displayName}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl p-6 shadow-xl border border-gray-300 dark:border-gray-700">

            <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Update Profile
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  name="photo"
                  type="text"
                  defaultValue={user?.photoURL}
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
