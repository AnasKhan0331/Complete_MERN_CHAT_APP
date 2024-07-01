import React, { useState } from 'react';
import { BiLogOut } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Avatar from "./Avatar";
import EditUserDetails from './EditUserDetails';

const Sidebar = () => {
    const [editUser, setEditUser] = useState(true)
    const user = useSelector(state => state?.user);

    const handleLogout = () => {
        // Dispatch the logout action here
    };

    return (
        <div className='w-full h-full'>
            <div className="bg-slate-100 w-12 h-full rounded-tr-md rounded-br-md py-5 text-slate-600 flex flex-col justify-between">
                <div>
                    <NavLink
                        to='/chat'
                        title='chat'
                        className={({ isActive }) => `w-10 h-12 flex justify-center items-center hover:bg-slate-200 ${isActive ? 'bg-slate-300' : ''}`}>
                        <IoChatbubbleEllipses size={22} />
                    </NavLink>
                    <NavLink
                        to='/add-friend'
                        title='add friend'
                        className='w-10 h-12 flex justify-center items-center hover:bg-slate-200'>
                        <TiUserAdd size={22} />
                    </NavLink>
                </div>
                <div className='flex flex-col items-center'>
                    <button className=' mx-auto' title={user?.name}
                        onClick={() => setEditUser(true)}>
                        <Avatar width='40' height='40'
                            name={user?.name} />
                    </button>
                    <button
                        title='logout'
                        className='w-10 h-12 flex justify-center items-center hover:bg-slate-200'
                        onClick={handleLogout}>
                        <span className='-ml-2'>
                            <BiLogOut size={22} />
                        </span>
                    </button>
                </div>
            </div>
            {
                editUser && (
                    <EditUserDetails onClose={() => setEditUser(false)} user={user} />
                )

            }
        </div>
    );
};

export default Sidebar;
