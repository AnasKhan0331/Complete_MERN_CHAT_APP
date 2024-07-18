import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import logo from "../../public/assets/images/logo.png";
import { logout, setOnlineUser, setSocketConnection, setUser } from "../Redux/features/users/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const basePath = location.pathname === '/'

  const fetchUserDetails = async () => {
    console.log("redux user", user)
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });
      dispatch(setUser(response?.data?.data))
      if (response?.data?.data?.logout) {
        dispatch(logout)
        navigate('/email')
      }
    } catch (error) {
      console.error("Error fetching user details:", error.response || error.message || error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /***socket connection */
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
    })
    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data))
      console.log("data", data)
    })
    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>
      {/* Message Component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div className={` hidden justify-center items-center flex-col gap-3 ${!basePath ? "hidden" : "lg:flex"}`}>
        <div className="">
          <img src={logo} alt="logo" width={250} />
        </div>
        <p className="text-lg text-slate-500">Select user to send message</p>
      </div>
    </div >
  );
};

export default Home;
