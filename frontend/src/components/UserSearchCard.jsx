import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import Avatar from './Avatar';
const UserSearchCard = ({ user, onClose }) => {
    console.log("UserSearchCard", onClose)
    return (
        <Link to={"/" + user?._id} onClick={onClose} className=" flex items-center gap-3 p-2 lg:p-4 border border-transparent border-t-slate-300 hover:border hover:border-primary rounded cursor-pointer">
            <div>
                <Avatar width={40} height={40} name={user?.name} userId={user?._id} imageUrl={user?.profile_pic} />
            </div>
            <div>
                <div className='font-semibold text-ellipsis line-clamp-1'>
                    {user?.name}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </Link>
    )
}

export default UserSearchCard
