import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../Redux/features/users/userSlice";
import Avatar from "../components/Avatar";

const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

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
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`
    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data?.password
        },
        withCredentials: true
      })
      toast.success(response?.data?.message)

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)
        setData({
          email: "",
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  console.log("data>>>", data)
  return <>
    <div className="my-2" >
      <div className=" bg-white p-4 w-full max-w-sm rounded overflow-hidden mx-auto">
        <div className="w-fit mx-auto">
          <Avatar width={60} name={location?.state?.name} imageUrl={location?.state?.profile_pic} height={60} />
          <h5>{location?.state?.name}</h5>
        </div>
        <h3>Welcome to chat app!</h3>
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="password">Password: </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary" id="password" name="password" type="password" placeholder="enter your password" onChange={handleChange} value={data.password} required />
          </div>
          <button
            className="bg-primary cursor-pointer w-full font-bold text-white text-sm text-md px-4 py-3 rounded hover:bg-secondary  mt-2">
            Let's Go
          </button>
          <p className="my-2 text-mds px-1 text-center" >
            <Link to={'/forgot-password'} className="hover:text-primary hover:underline font-bold">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  </>;
};

export default CheckPassword;
