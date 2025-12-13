import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../hooks/useAxiosSecure'
import axios from 'axios'

const Success = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()
    console.log(sessionId)
    useEffect(() => {
        if (sessionId) {
            axios.patch(`https://assignemnt-11-server.vercel.app/payment-success?session_id=${sessionId}`)
                .then(res => console.log(res.data))
        }
    }, [sessionId, axiosSecure])
   return (
  <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
    
    {/* Success Card */}
    <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-3xl shadow-xl p-10 text-center space-y-6">

      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-orange-500">
        Payment Successful
      </h1>

      {/* Description */}
      <p className="text-base-content/70 leading-relaxed">
        Your payment has been completed successfully.  
        Thank you for using <span className="font-semibold text-orange-500">BookCourier</span>.
      </p>

      {/* Divider */}
      <div className="divider"></div>

      {/* Button */}
      <button
        onClick={() => window.location.href = '/dashboard'}
        className="btn w-full bg-orange-500 hover:bg-orange-600 border-0 text-white text-lg"
      >
        Go to Home
      </button>

    </div>
  </div>
);

}

export default Success