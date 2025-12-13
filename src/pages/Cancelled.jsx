import { FaTimesCircle, FaRedo, FaHome } from "react-icons/fa";
import { Link } from "react-router";

export default function Cancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <FaTimesCircle className="text-red-500 text-6xl" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 text-sm">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          
          {/* Primary Button */}
          <Link
            to="/dashboard/user-orders"
            className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-2.5 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            <FaRedo />Go To My Orders and Try Again
          </Link>

          {/* Secondary Button */}
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 w-full border border-orange-500 text-orange-500 py-2.5 rounded-full hover:bg-orange-50 transition"
          >
            <FaHome /> Back to Home
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400">
          Need help? Please contact our support team.
        </p>
      </div>
    </div>
  );
}
