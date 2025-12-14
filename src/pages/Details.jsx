import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const [rating, setRating] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const [userRatings, setUserRatings] = useState([]);

  // Book data
  const { data = {}, refetch, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });
  const { data: userdata = [], isLoading: l2 } = useQuery({
    queryKey: ["user-by-email", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/by-email?email=${user?.email}`);
      return res.data;
    },
  });

  // Orders + Rati
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      const orders = await axiosSecure.get(
        `/orders/of-user?email=${user?.email}`
      );


      orders.data?.forEach((o) => {
        if (o.bookId === id && o.paymentStatus === "paid") {
          setOrderData(o);
          setRating(o.rating);
        }
      });

      const ratings = await axiosSecure.get(`/ratings/book-id?id=${id}`);
      setUserRatings(ratings.data);
    };

    fetchData();
  }, [user?.email, id, orderData]);

  if (isLoading||l2) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  // Rating handler
  const handleRating = async (orderId, star) => {
    await axiosSecure.patch(`/orders/${orderId}`, { rating: star })
    await axiosSecure.post(`/ratings`, {
      rating: star,
      readerName: user?.displayName,
      readerEmail: user?.email,
      bookId: data?._id,
    }).then(() => {
      setOrderData([1, 2])
      Swal.fire({
        title: "Thanks for Your Rating",
        icon: "success",
        draggable: true
      });
    });


    const ratings = await axiosSecure.get(`/ratings/book-id?id=${id}`);
    setUserRatings(ratings.data);

    setRating(star);
    refetch();
  };

  // Wishlist
  const handleWishlist = async () => {
    await axiosSecure.post("/wishlist", {
      bookName: data.title,
      price: data.price,
      image: data.imageurl,
      author: data.author,
      readerEmail: user?.email,
      bookId: id,
    }).then(() => {
      Swal.fire({
        title: "Book Added to Your Wishlist",
        icon: "success",
        draggable: true
      });
    })
  };

  // Order
  const handleOrder = async (e) => {
    // e.preventDefault();
    const form = e.target;

    await axiosSecure.post("/orders", {
      number: form.number.value,
      address: form.address.value,
      readerEmail: user?.email,
      readerName: user?.displayName,
      librarianEmail: data?.librarianEmail,
      librarianName: data?.librarianName,
      bookName: data?.title,
      price: data?.price,
      bookId: id,
      rating: 0,
      paymentStatus: "pending",
      orderedDate: new Date().toISOString().split("T")[0],
    }).then(() => {
      Swal.fire({
        title: "Book Added to Cart. Complete Your Payment!",
        icon: "success",
        draggable: true
      });
      navigate('/dashboard/user-orders')
    })
  };

  return (
    <div className="w-full min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Book Card */}
        <div className="bg-base-100 rounded-3xl shadow-lg border border-base-300 overflow-hidden">

          {/* Image */}
          <img
            src={data?.imageurl}
            alt={data?.title}
            className="w-full h-[420px] object-cover"
          />

          {/* Content */}
          <div className="p-8 space-y-8">

            {/* Title + Price */}
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                  {data?.title}
                </h1>
                <p className="mt-2 text-base-content/60 text-lg">
                  By <span className="font-medium text-orange-500">{data?.author}</span>
                </p>
              </div>

              <p className="text-4xl font-black text-orange-500">
                ${data?.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-base-content">
                Description
              </h2>
              <p className="text-base-content/70 leading-relaxed">
                {data?.desc}
              </p>
            </div>

            {/* Librarian Info */}
            <div className="bg-base-200 rounded-2xl p-6 grid sm:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-base-content/60">Librarian Name</p>
                <p className="text-lg font-semibold text-base-content">
                  {data?.librarianName}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/60">Librarian Email</p>
                <p className="text-lg font-semibold text-base-content">
                  {data?.librarianEmail}
                </p>
              </div>
            </div>

            {/* Rating + Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

              {orderData?.rating === 0 && (
                <div>
                  <p className="text-lg font-semibold text-orange-500 mb-2">
                    Give a rating
                  </p>
                  <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map(star => (
                      <input
                        key={star}
                        type="radio"
                        name="rating"
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === star}
                        onChange={() => handleRating(orderData?._id, star)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {
                userdata[0]?.role === "Reader" &&
                <div className="flex gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                    className="px-6 py-2 rounded-full bg-orange-500 mx-2 text-white font-semibold"
                  >
                    Order Now
                  </button>

                  <button
                    onClick={handleWishlist}
                    className="px-6 py-2 rounded-full border border-orange-500 font-medium"
                  >
                    Wishlist
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

        {/* User Ratings */}
        {userRatings.length > 0 && (
          <div className="bg-base-100 rounded-3xl shadow-md border border-base-300 p-8">
            <h2 className="text-2xl font-bold mb-6 text-base-content">
              Reader Reviews
            </h2>

            <div className="space-y-4">
              {userRatings.map(single => (
                <div key={single._id} className="border-b pb-4">
                  <p className="font-semibold text-base-content">
                    {single.readerName}
                  </p>
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map(star => (
                      <input
                        key={star}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={single.rating === star}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-base-100 rounded-3xl shadow-xl">

            <form
              onSubmit={handleOrder}
              method="dialog"
              className="space-y-5"
            >
              <h3 className="text-2xl font-bold text-center text-base-content">
                Confirm Order
              </h3>

              <input
                required
                type="text"
                name="address"
                placeholder="Delivery Address"
                className="input input-bordered w-full focus:border-orange-500"
              />

              <input
                required
                type="number"
                name="number"
                placeholder="Phone Number"
                className="input input-bordered w-full focus:border-orange-500"
              />

              <input
                readOnly
                value={user?.displayName}
                className="input input-bordered w-full bg-base-200"
              />

              <input
                readOnly
                value={user?.email}
                className="input input-bordered w-full bg-base-200"
              />

              <button className="btn w-full bg-orange-500 hover:bg-orange-600 border-0 text-white">
                Confirm Order
              </button>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost text-red-500 w-full">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
    </div>
  );

};

export default Details;
