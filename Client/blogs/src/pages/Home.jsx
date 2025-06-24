import React from "react";
import Hero from "../Components/Hero";
import Blog from "./Blog"
import HomeSubscribe from "../Components/HomeSubscribe";

const Home = () => {
  return (
    <div className="w-full dark:bg-black overflow-x-hidden">
      <div className="max-w-screen mx-auto px-4">
        <Hero />
        {/* Optionally include Gallery and Subscribe when needed */}
      </div>
        <Blog/>
        <HomeSubscribe/>
    </div>
  );
};

export default Home;
