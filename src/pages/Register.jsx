import { Link, useLocation, useNavigate } from 'react-router'
import { use, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';


const Register = () => {
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { manualregister, gsign, updateProfileMan, setuser } = useAuth()
    const [msg, setmsg] = useState('')
    const regEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    const handlemanulregister = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.image.files[0]
        const email = e.target.email.value
        const password = e.target.password.value
        const role = e.target.role.value
        setmsg('')
        if (!regEx.test(password)) {
            console.log('vulp')
            setmsg('Invalid password')
            return
        }

        manualregister(email, password)
            .then(res => {
                console.log(res)
                const formdata = new FormData()
                formdata.append('image', photo)
                console.log("photo", photo)
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`, formdata)
                    .then(async (ans) => {
                        console.log("res link", ans?.data?.data?.display_url)
                        const profile = {
                            displayName: name,
                            photoURL: ans?.data?.data?.display_url
                        }
                        axiosSecure.post('/users', {
                            name: name,
                            email: email,
                            photoURL: ans?.data?.data?.display_url,
                            role: role,
                            password: password
                        }).then(e => console.log(e.data))

                        updateProfileMan(res?.user, profile)
                        setuser({ ...res?.user, displayName: name, photoURL: ans?.data?.data?.display_url })
                        toast.success("Registration Completed")
                        setTimeout(() => {
                            navigate('/')
                        }, 2100)
                    })

            })
            .catch(error => {
                console.log('error', error)
                setmsg(`${error}`)
            })
    }

    const handlepopup = (e) => {
        const role = e.target.role.value
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
                    axiosSecure.patch(`/users/${userData[0]._id}`, { role: role }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                }
                navigate(location.state ? location.state : '/dashboard')
            }
            )
            .catch(err => console.log(err))
    }
    const [show, setShow] = useState(false);
    const [currentpw, setpw] = useState(``)
    const handlepassword = (e) => {
        e.preventDefault()
        setpw(e.target.value)
        console.log(e.target.value)

        if (!regEx.test(e.target.value)) {
            setmsg('6/6+ chars, upper & lower case required')
        }
        else {
            setmsg('')
        }
    }
    return (
        <div className="py-6">
            <p className="text-4xl my-6 font-black text-center text-orange-500">Create a free account</p>
            <div className="mx-auto card border-2 border-orange-500 pl-2 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body ">
                    <fieldset className="fieldset">
                        <form onSubmit={handlemanulregister} action="">
                            <select name="role" required className="select mb-2.5 mt-0.5" defaultValue="">
                                <option value="" disabled hidden>Select Your Role</option>
                                <option value="Reader">Reader</option>
                                <option value="Librarian">Librarian</option>
                            </select>
                            <label className="label">Name</label>
                            <input required type="text" name='name' className="input placeholder-gray-400 mb-2.5 mt-0.5" placeholder="Name" />
                            <fieldset className="fieldset">
                                <label className="label">Profile Image</label>
                                <input required name='image' type="file" className="file-input" />
                            </fieldset>
                            <label className="label">Email</label>
                            <input required type="email" name='email' className="input placeholder-gray-400 mb-2.5 mt-0.5" placeholder="Email" />
                            <label className="label">Password</label>
                            <div className="mt-0.5 relative input">
                                <input onChange={handlepassword} defaultValue={currentpw} required name='password' type={show ? "text" : "password"} placeholder="Enter password" className="placeholder-gray-400 w-full pr-10" />
                                <button type="button" onClick={() => setShow(!show)} className="z-10 absolute right-3 top-3  text-gray-500">
                                    {show ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <p className='text-red-500 mt-1 text-[14px]'>{msg}</p>
                            <button className="btn bg-orange-500 border-0 p-4 w-full mt-4">Register</button>
                        </form>

                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn my-2 bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Sign up with Google
                        </button>
                        <div className="text-center my-1">
                            <p className="font-semibold text-[15px]">Already have an account? <Link className="text-blue-500" to={'/login'}>Login</Link></p>
                        </div>
                    </fieldset>
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
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Register