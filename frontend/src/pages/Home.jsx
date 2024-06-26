import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return <>
    Home
    {/* Message Component */}
    <section>
      <Outlet />
    </section>
  </>
};

export default Home;
