import { Link, useLocation, useNavigate } from "react-router"
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const location = useLocation()
  const { gsign, manualsignin } = useAuth()
  // const [msg, setmsg] = useState('')
  const handlemanuallogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    manualsignin(email, password)
      .then(res => {
        console.log(res)
        navigate(location.state ? location.state : '/dashboard')
      })
      .catch(err => {
        console.log(err)
        toast.error(`${err}`)
      })
  }
  const handlepopup = (e) => {
    const role = e.target.role.value
    console.log(role)
    gsign()
      .then(async (result) => {
        console.log("result.user", result.user.email)
        const res = await axiosSecure.get(`/users/by-email?email=${result.user.email}`);
        const userData = res.data;
        console.log("userData", userData)
        if (userData.length === 0) {
          axiosSecure.post('/users', {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            role: role,
          }).then(e => console.log("e.data", e.data))
        }
        else {
          axiosSecure.patch(`/users/normal/${userData[0]._id}`, { role: role}, {
            headers: {
              "Content-Type": "application/json"
            }
          })
        }
        navigate(location.state ? location.state : '/dashboard')
      }
      )


  }



  const [show, setShow] = useState(false);
  return (
    <div className="my-10">
      <p className="text-4xl my-6 font-black text-center text-orange-500">Login now!</p>
      <div className="mx-auto border-2 border-orange-500 pl-2 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <form onSubmit={handlemanuallogin} action="">
              <label className="label">Email</label>
              <input required type="email" name='email' className="mb-2.5 mt-0.5 input placeholder-gray-400" placeholder="Email" />
              <label className="label">Password</label>
              <div className="relative mt-0.5 input">
                <input required name="password" type={show ? "text" : "password"} placeholder="Enter password" className="placeholder-gray-400 w-full pr-10" />
                <button type="button" onClick={() => setShow(!show)} className="z-10 absolute right-3 top-3  text-gray-500">
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button className="btn bg-orange-500 border-0 p-4 w-full mt-4">Login</button>
            </form>
            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn my-2 bg-white text-black border-[#e5e5e5]">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
            </button>
            <div className="text-center my-1">
              <p className="font-semibold text-[15px]">New here? <Link className="text-blue-500" to={'/register'}>Register</Link></p>
            </div>
          </fieldset>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          <div className="flex justify-center items-center p-4">
            <form onSubmit={handlepopup} method="dialog" className='backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-5 border border-orange-500' action="">

              <select name="role" required className="select mb-2.5 w-full mt-0.5" defaultValue="">
                <option value="" disabled hidden>Select Your Role</option>
                <option value="Reader">Reader</option>
                <option value="Librarian">Librarian</option>
              </select>

              {/* <input required defaultValue={single.} required className='input required defaultValue={single.}' name='bidded' type="number" placeholder='bid your price' /> */}
              <button className='btn w-full bg-orange-500 border-0 p-4'>Confirm</button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-dash w-full text-red-600 btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer />
    </div>

  )
}

export default Login

