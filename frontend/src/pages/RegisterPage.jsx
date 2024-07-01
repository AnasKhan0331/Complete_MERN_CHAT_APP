import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../utils/uploadImage";
const RegisterPage = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const [uploadPhoto, setUploadPhoto] = useState(null)
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

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`
    try {
      const response = await axios.post(URL, data)
      toast.success(response?.data?.message)
      if (response?.data?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })
        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return <>
    <div className="my-2" >
      <div className=" bg-white p-4 w-full max-w-sm rounded overflow-hidden mx-auto">
        <h3>Welcome to chat app!</h3>
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="name">Name: </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary" type="text" id="name" name="name" placeholder="enter your name" onChange={handleChange} value={data.name} required />
          </div>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="email">Email: </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary" id="email" name="email" type="email" placeholder="enter your email" onChange={handleChange} value={data.email} required />
          </div>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="password">Password: </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary" id="password" name="password" type="password" placeholder="enter your password" onChange={handleChange} value={data.password} required />
          </div>
          <div className="flex flex-col gap-1 my-3">
            <label htmlFor="profile_pic">Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center border hover:border-primary rounded cursor-pointer">
                <p className="text-xs max-w-[300] text-ellipsis line-clamp-1">
                  {
                    uploadPhoto ? uploadPhoto.name : "Upload Profile Photo"
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}>
                      <IoMdClose />
                    </button>
                  )
                }
              </div>
            </label>
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary hidden" id="profile_pic" name="profile_pic" type="file" onChange={handleUpload} />
          </div>
          <button disabled={!data.profile_pic}
            className="bg-primary w-full text-white text-sm text-md px-4 py-3 rounded hover:bg-secondary  mt-2">
            Register
          </button>
          <p className="my-2 text-sm px-1 text-center" >
            Already have an account? <Link to={'/email'} className="hover:text-primary hover:underline font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  </>;
};

export default RegisterPage;
