import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`
    try {
      const response = await axios.post(URL, data)
      console.log("response", response)
      toast.success(response?.data?.message)
      if (response?.data?.success) {
        setData({
          email: "",
        })
        navigate('/password',
          {
            state: response?.data?.data
          }
        )
      }
    } catch (error) {
      console.log("error", error)
      toast.error(error?.response?.data?.message)
    }
  }
  return <>
    <div className="my-2" >
      <div className=" bg-white p-4 w-full max-w-sm rounded overflow-hidden mx-auto">
        <div className="w-fit mx-auto">
          <HiOutlineUserCircle size={80} />
        </div>
        <h3>Welcome to chat app!</h3>
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="email">Email: </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary" id="email" name="email" type="email" placeholder="enter your email" onChange={handleChange} value={data?.email} required />
          </div>

          <button
            className="bg-primary cursor-pointer w-full font-bold text-white text-sm text-md px-4 py-3 rounded hover:bg-secondary  mt-2">
            Let's Go
          </button>
          <p className="my-2 text-sm px-1 text-center" >
            New User ? <Link to={'/register'} className="hover:text-primary hover:underline font-semibold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  </>;
};

export default CheckEmail;
