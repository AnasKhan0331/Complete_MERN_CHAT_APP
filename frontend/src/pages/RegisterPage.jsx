import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const [uploadPhoto, setUploadPhoto] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    setUploadPhoto(file)
  }
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  console.log("data", data)
  return <>
    <div className="my-2" >
      <div className=" bg-white p-4 w-full max-w-sm mx-2 rounded overflow-hidden mx-auto">
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
            <input className="py-1 px-2 bg-slate-200 focus:outline-primary hidden" id="profile_pic" name="profile_pic" type="file" value={data.profile_pic} onChange={handleUpload} />
          </div>
          <button className="bg-primary w-full text-white text-sm text-md px-4 py-3 rounded hover:bg-secondary  mt-2">
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
