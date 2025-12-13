import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'react-awesome-reveal'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Coverage from '../components/Coverage';
import Why from '../components/Why';
import Join from '../components/Join';
import Top from '../components/Top';


const Home = () => {

  const { data = [], isLoading } = useQuery({
    queryKey: ['recent'],
    queryFn: async () => {
      const res = await axios.get('https://assignemnt-11-server.vercel.app/books/recent')
      return res.data
    }
  })

  const books = [
    {
      title: "Vintage Book Collection",
      imageurl: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-71b40b91--Books_1200x.jpg?v=1620061288",
      desc: "A curated collection of vintage books for antique lovers and collectors."
    },
    {
      title: "Modern Library Set",
      imageurl: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-b57dac15--Books8_1200x.jpg?v=1620061403",
      desc: "A set of contemporary literature books for a modern home library setup."
    },
    {
      title: "Primary Education Guide",
      imageurl: "https://popular.com.sg/cdn/shop/files/gempages_524603827551208314-56ee6178-452e-4e70-83ce-f7e32446516d.jpg?v=20510506079826951",
      desc: "Essential educational material and study guide for primary school students."
    }
  ];

  if (isLoading || data.length === 0) return (
    <div className="flex justify-center items-center">
      <p className='loading size-30 text-orange-500 text-center loading-infinity loading-xl'></p>
    </div>
  )

  return (
    <div className="">
      <div className="flex flex-col justify-center">
        <Link to={'/books'}><p className='btn left-1/2 -translate-x-1/2 border-0 py-6 px-12 text-white absolute top-70 bg-orange-500  z-10'>Show All Books</p></Link>
        <div className="">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="mySwiper"
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[390px]">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={book.imageurl}
                    alt={book.title}
                  />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 text-white rounded-b-xl">
                    <h2 className="text-lg font-bold">{book.title}</h2>
                    <p className="text-sm mt-1">{book.desc.slice(0, 60)}...</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>


        </div>

      </div>
      <div className="mt-15 ">
        <p className="text-4xl text-center font-black text-orange-500 mb-6">
          Popular Books of The Week
        </p>
        <div className="grid mx-auto lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">
          {
            data.map(single => (
              <Zoom
                key={single?._id}
                duration={600}
                fraction={0.25}
              >
                <div
                  className="group bg-white rounded-2xl border border-gray-100
          shadow-sm hover:shadow-xl
          transition-all duration-300 overflow-hidden"
                >

                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={single.imageurl}
                      alt={single.title}
                      className="w-full h-56 object-cover
              transition-transform duration-300
              group-hover:scale-105"
                    />

                    {/* Price Badge */}
                    <span className="absolute top-3 right-3
              bg-orange-500 text-white
              px-3 py-1 rounded-full
              text-sm font-semibold shadow">
                      ${single.price}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3">

                    <h2
                      className="text-lg font-bold text-gray-800
              leading-snug line-clamp-2"
                    >
                      {single.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      By{" "}
                      <span className="font-medium text-orange-500">
                        {single.author}
                      </span>
                    </p>

                    <div className="border-t border-gray-100 pt-4 mt-2">
                      <Link to={`/books/${single._id}`} className="block w-full">
                        <button
                          className="w-full py-3 rounded-full
                  bg-orange-500 hover:bg-orange-600
                  text-white font-semibold
                  transition-all duration-200"
                        >
                          View Details
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              </Zoom>
            ))
          }
        </div>

      </div>
      <Top></Top>
      <Join></Join>
      <Why></Why>
      <Coverage></Coverage>
    </div>
  )
}

export default Home
