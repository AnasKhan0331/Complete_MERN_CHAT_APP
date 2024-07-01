import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import Divider from './Divider'

const EditUserDetails = ({ onClose, user }) => {
    const [data, setdata] = useState({
        name: user?.user,
        profile_pic: user?.profile_pic,
    })
    useEffect(() => {
        setdata((prev) => {
            return {
                ...prev,
                ...user
            }
        })
    }, [user])
    console.log("user edit scenario", user)
    const handleChange = (e) => {
        const { name, profile_pic } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        const uploadPhoto = await uploadFile(file)
        setData((prev) => {
            return {
                ...prev,
                profile_pic: uploadPhoto?.url
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-30 flex justify-center items-center'>
            <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'>Edit Users Details</p>
                <form className='grid gap-1 mt-3' onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            name="name"
                            id='name'
                            value={data?.name}
                            onChange={handleChange}
                            className='w-full py-1 px-2
                            focus:outline-primary border-0.5'
                        />
                    </div>
                    <div className="">
                        <label htmlFor="profile_pic">Profile:</label>
                        <div className='my-1 flex items-center gap-3'>
                            <Avatar name={user?.name} width='70' height='50'
                            // imageUrl={user?.profile_pic} 
                            />
                            <button className='text-md font-bold'>
                                Change Photo
                            </button>
                            <input type="file" className="hidden" onChange={handleUploadPhoto} />
                        </div>
                    </div>
                    <Divider />
                    <div className='flex gap-2 w-fit ml-auto '>
                        <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)
