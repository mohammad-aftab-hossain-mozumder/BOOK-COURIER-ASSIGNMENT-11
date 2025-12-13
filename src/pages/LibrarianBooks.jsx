import { useQuery } from '@tanstack/react-query';
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

const LibrarianBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["books-librarian"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/librarian?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-3xl font-bold text-center py-10 text-orange-500">Loading...</p>;
  }

  return (
    <div className="p-6">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
         <span className="text-orange-500">Your Uploaded Books</span>
        </h1>
        <p className="text-gray-500 mt-1">Manage and update your library contributions.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
        
        <table className="table">
          {/* Head */}
          <thead className="bg-orange-50 text-gray-700">
            <tr className="text-sm uppercase">
              <th className="py-4">Book Details</th>
              <th className="py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {
              data.map(single => (
                <tr 
                  key={single._id} 
                  className="hover:bg-orange-50/40 transition-all duration-200"
                >
                  <td>
                    <div className="flex items-center gap-4">
                      
                      {/* Book Image */}
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img 
                            src={single.imageurl} 
                            alt={single.title} 
                          />
                        </div>
                      </div>

                      {/* Book Info */}
                      <div>
                        <p className="font-semibold text-lg">{single.title}</p>
                        <p className="text-sm text-orange-500 font-medium">{single.author}</p>
                      </div>
                    </div>
                  </td>

                  {/* Edit Button */}
                  <td className="text-center">
                    <Link 
                      to={`/dashboard/librarian-books/${single._id}`}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 justify-center transition-all"
                    >
                      <FaEdit />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianBooks;
