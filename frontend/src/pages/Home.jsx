import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, setUser } from "../Redux/features/users/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchUserDetails = async () => {
    console.log("redux data", user)
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });
      dispatch(setUser(response?.data?.data))
      if (response?.data?.logout) {
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

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar />
      </section>
      {/* Message Component */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
