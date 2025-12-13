import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "https://assignemnt-11-server.vercel.app"
})
const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { user, logOutMan } = useAuth()
  useEffect(() => {

    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config
    })

    const resInterceptor= axiosSecure.interceptors.response.use((response)=>{
      return response
    },
    (err)=>{
      console.log(err)
      if(err?.status===401||err?.status===403){
        logOutMan()
        .then(()=>navigate('/login'))
      }
      return Promise.reject(err)
    })
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }

  }, [user, logOutMan, navigate])

  return axiosSecure;
};

export default useAxiosSecure