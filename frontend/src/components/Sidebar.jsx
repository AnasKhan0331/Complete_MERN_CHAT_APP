import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { FaImage, FaVideo } from "react-icons/fa6";
import { FiArrowUpLeft } from "react-icons/fi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { logout } from "../Redux/features/users/userSlice";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import SearchUser from "./SearchUser";

const Sidebar = () => {
    const socketConnection = useSelector((state) => state?.user?.socketConnection);
    const user = useSelector((state) => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/email");
        localStorage.clear();
    };
    // useEffect(() => {
    //     if (socketConnection) {
    //         socketConnection.emit('sidebar', user?._id)
    //         socketConnection?.on("conversation", (data) => {
    //             const conversationUserDetails = data?.map((conversationUser, ind) => {
    //                 if (conversationUser?.sender?._id === conversationUser?.reciever?._id) {
    //                     return {
    //                         ...conversationUser,
    //                         userDetails: user?.sender,

    //                     }
    //                 }
    //                 else if (conversationUser?.reciever?._id !== user?._id) {
    //                     return {
    //                         ...conversationUser,
    //                         userDetails: user?.reciever,
    //                     }
    //                 } else {
    //                     return {
    //                         ...conversationUser,
    //                         userDetails: user?.reciever,
    //                     }
    //                 }
    //             })
    //             console.log("conversationUserDetails", conversationUserDetails)
    //             console.log("conversationUserDetails?.name", conversationUserDetails?.name)
    //             setAllUser(conversationUserDetails)
    //         })
    //     }
    // }, [socketConnection, user])
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user._id)

            socketConnection.on('conversation', (data) => {
                console.log('conversation', data)
                const conversationUserData = data.map((conversationUser, index) => {
                    if (conversationUser?.sender?._id === conversationUser?.reciever?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.sender
                        }
                    }
                    else if (conversationUser?.reciever?._id !== user?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.reciever
                        }
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                })
                setAllUser(conversationUserData)
            })
        }
    }, [socketConnection, user])
    console.log("all user", allUser)
    console.log("allUser?.unSeenMs", allUser?.unSeenMsg)
    return (
        <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
            <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
                <div>
                    <NavLink
                        className={({ isActive }) =>
                            `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"
                            }`} title="chat">
                        <IoChatbubbleEllipses size={20} />
                    </NavLink>
                    <div
                        title="add friend"
                        onClick={() => setOpenSearchUser(true)}
                        className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
                    >
                        <FaUserPlus size={20} />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <button
                        className="mx-auto"
                        title={user?.name}
                        onClick={() => setEditUserOpen(true)}
                    >
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </button>
                    <button
                        title="logout"
                        className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
                        onClick={handleLogout}
                    >
                        <span className="-ml-2">
                            <BiLogOut size={20} />
                        </span>
                    </button>
                </div>
            </div>
            <div className="w-full">
                <div className="h-16 flex items-center">
                    <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
                </div>
                <div className="bg-whiteb p-[0.5px]">
                    <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar px-2">
                        {allUser.length === 0 && (
                            <div className="mt-12">
                                <div className="flex justify-center items-center my-4 text-slate-500">
                                    <FiArrowUpLeft size={50} />
                                </div>
                                <p className="text-lg text-center text-slate-400">
                                    Explore users to start a conversation with.
                                </p>
                            </div>
                        )}
                        {
                            allUser?.map((conv, ind) => {
                                return (
                                    <NavLink to={"/" + conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                                        <div className="">
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    imageUrl={conv?.userDetails?.profile_pic}
                                                    name={conv?.userDetails?.name}
                                                    width={40}
                                                    height={40}
                                                />
                                                <div className="flex flex-col">
                                                    <div className="line-clamp-1 text-ellipsis">
                                                        <h3>{conv?.userDetails?.name}</h3>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        {
                                                            conv?.lastSeen?.imageUrl && (
                                                                <div className='flex items-center gap-1'>
                                                                    <span><FaImage /></span>
                                                                    {!conv?.lastMsg?.text && <span className="text-xs">image</span>}
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            conv?.lastSeen?.videoUrl && (
                                                                <div className='flex items-center gap-1'>
                                                                    <span><FaVideo /></span>
                                                                    {!conv?.lastMsg?.text && <span className="text-xs">Video</span>}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        <p>{conv?.lastSeen?.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            Boolean(conv?.unSeenMsg) && (
                                                <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unSeenMsg}</p>
                                            )
                                        }
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/**edit user details*/}
            {editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
            )}
            {/**Search User */}
            {openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(false)} user={user} />
            )}
        </div>
    );
};

export default Sidebar;
