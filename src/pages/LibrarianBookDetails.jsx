import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { toast, ToastContainer } from 'react-toastify'

const LibrarianBookDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    console.log("id", id)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["/books/", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`)
            return res.data
        }
    })
    if (isLoading) {
        return <p className='text-4xl font-black'>Loading......</p>
    }


    const handlePatch = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const imageurl = e.target.imageurl.value
        const author = e.target.tools.value
        const situation = e?.target?.situation?.value
        const desc = e.target.desc.value
        const price = Number(e.target.price.value)
        const addform = {
            title: title,
            imageurl: imageurl,
            author: author,
            situation: situation,
            desc: desc,
            price: price,
        }
        axiosSecure.patch(`/books/librarian/${id}`, addform).then(() => {
            refetch()
            // setloading(false)
            toast.success("Information Edited Successfully")
        })
    }
    return (
        <div className="flex mb-25 mt-5 justify-center items-center min-h-screen p-4">
            <form onSubmit={handlePatch} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-5 border border-indigo-100">
                <h2 className="text-2xl font-semibold text-center text-orange-500">Add Your Art</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                    <input defaultValue={data.imageurl} required type="url" name='imageurl' placeholder="https://example.com/art.jpg"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                        <input defaultValue={data.title} required type="text" name='title' placeholder="Book Title"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price[$]</label>
                        <input defaultValue={data.price} required name="price" type="number" placeholder="150"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Author</label>
                        <input defaultValue={data?.author} required name='tools' type="text" placeholder="Book Author Name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                        <select defaultValue={data?.situation} required name='situation' className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800">
                            <option value="Published">Published</option>
                            <option value="Unpublished">Unpublished</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea defaultValue={data.desc} required name='desc' placeholder="Write about your book..." rows="3"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:text-orange-500 outline-none text-gray-800"></textarea>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Librarian Name</label>
                        <input type="text" value={data?.librarianName} readOnly
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Librarian Email</label>
                        <input type="email" value={data?.librarianEmail} readOnly
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 text-black" />
                    </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-2 rounded-xl shadow-md transition-all">Save</button>
            </form>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default LibrarianBookDetails