import React from 'react'
import { Link } from 'react-router'

// Simple, clean, no-animation "Why Choose BookCourier" section
// Fully responsive and clear in all themes

export default function Why() {
  const features = [
    {
      title: 'Fast & Convenient',
      desc: 'Request pickups or deliveries from nearby libraries without travelling.',
    },
    {
      title: 'Large Library Network',
      desc: 'Access more books through our wide network of partnered libraries.',
    },
    {
      title: 'Safe & Secure Handling',
      desc: 'Your books are carefully packaged and handled professionally.',
    },
    {
      title: 'Flexible Scheduling',
      desc: 'Choose a delivery or pickup time that suits your routine.',
    },
  ]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 text-grey-700">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Why choose <span className="text-orange-500 dark:text-orange-500">BookCourier</span>
        </h2>
        <p className="text-center mt-3 text-sm sm:text-base max-w-2xl mx-auto text-grey-700">
          A simple and reliable library delivery system designed for students, researchers, and readers.
        </p>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {features.map((f, i) => (
            <div key={i} className=" border rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-grey-700">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
      
          <Link to={'/register'} className='px-6 py-3 rounded-full bg-orange-500 text-white font-semibold'>Get started</Link>
          <a
            className="px-6 py-3 rounded-full border border-orange-500 font-medium"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}