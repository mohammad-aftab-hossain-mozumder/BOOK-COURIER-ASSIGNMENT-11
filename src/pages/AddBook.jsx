import { use, useState } from "react"
// import { Authcontext } from "../contextapi/Authcontext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth";
import useAxiosSecure from '../hooks/useAxiosSecure'
const AddBook = () => {
  const { user } = useAuth()
  const [loading, setloading] = useState(false)
  const axiosSecure = useAxiosSecure()
  const handleadd = (e) => {
    e.preventDefault()
    setloading(true)
    const title = e.target.title.value
    const imageurl = e.target.imageurl.value
    const author = e.target.tools.value
    const situation = e.target.situation.value
    const desc = e.target.desc.value
    const price = Number(e.target.price.value)
    const addform = {
      title: title,
      imageurl: imageurl,
      author: author,
      situation: situation,
      desc: desc,
      price: price,
      librarianName: user.displayName,
      librarianEmail: user.email,
      librarianimg: user.photoURL,
      time: new Date()
    }
    axiosSecure.post('/books', addform).then(() => {

      // setloading(false)
      toast.success("Book Added Successfully!")
      e.target.reset()
      setloading(false)
    })
  }

  if (loading) {
    return (
      <div className="">
        <span className="loading loading-spinner text-success"></span>
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
  return (
    // loading?<p className="text-6xl font-black">loading</p>:
    <div className="flex mb-25 mt-5 justify-center items-center min-h-screen p-4">
      <form onSubmit={handleadd} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-5 border border-indigo-100">
        <h2 className="text-2xl font-semibold text-center text-orange-500">Add Your Book</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input required type="url" name='imageurl' placeholder="https://example.com/art.jpg"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
            <input required type="text" name='title' placeholder="Book Title"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Price[$]</label>
            <input required name="price" type="number" placeholder="150"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Author</label>
            <input required name='tools' type="text" placeholder="Book Author Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select required name='situation' className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800">
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea required name='desc' placeholder="Write about your book..." rows="3"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800"></textarea>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Librarian Name</label>
            <input type="text" value={user?.displayName} readOnly
              className="w-full rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Librarian Email</label>
            <input type="email" value={user?.email} readOnly
              className="w-full rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 text-black" />
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-xl shadow-md transition-all">Add</button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default AddBook
