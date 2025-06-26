import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import avatarImage from "../assets/avatar.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/blog");
  };

  return (
    <motion.div
      className="h-fit w-full md:min-h-screen flex items-center justify-center py-5 md:py-28 px-6 sm:px-12 bg-[#F5F5F5] dark:bg-[#1C1C1E] transition-colors duration-700 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Circles */}
      <motion.div
        className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px]"
        animate={{ scale: [0.8, 1.1, 0.9], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center px-4 sm:px-8">

        {/* Text Content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 order-1"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="leading-tight font-extrabold text-center md:text-left text-[#0D0D0D] dark:text-white">
            <span className="font-serif uppercase block text-2xl sm:text-3xl xl:text-4xl tracking-wide">
              Welcome to
            </span>
            <span className="font-serif uppercase block text-5xl sm:text-6xl xl:text-7xl text-black dark:text-yellow-400 drop-shadow-md">
              DEVEN
            </span>
          </h1>

          {/* Only show this on larger screens */}
          <p className="hidden lg:block text-[#2C2C2E] dark:text-[#DDD6A6] text-lg sm:text-xl xl:text-2xl leading-relaxed max-w-xl mt-4">
            At{" "}
            <span className="font-semibold text-black dark:text-yellow-400">DEVEN</span>
            , we simplify the journey of entrepreneurship by breaking down complex concepts into clear, actionable steps—ensuring no aspiring founder is left stranded between a great idea and limited resources.
            <span className="block mt-2">Let’s make every blog count.</span>
          </p>

          {/* Explore button on larger screens */}
          <button
            onClick={handleExploreClick}
            className="hidden lg:inline-block mt-2 sm:mt-4 px-8 py-3 bg-[#FFD600] text-black font-medium rounded-lg hover:bg-[#FDD835] transition-colors duration-300 text-base xl:text-lg"
          >
            Explore Blogs
          </button>
        </motion.div>

        {/* Avatar */}
        <motion.div
          className="flex flex-col justify-center items-center order-2 gap-6 lg:order-none"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src={avatarImage}
            alt="Hero"
            className="w-40 sm:w-60 md:w-full max-w-sm sm:max-w-md md:max-w-lg xl:max-w-xl rounded-xl shadow-lg border-4 border-[#FFD600] dark:border-[#FDD835] hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />

          {/* Only show this paragraph on small screens */}
          <p className="block lg:hidden text-center mt-4 text-[#2C2C2E] dark:text-[#DDD6A6] text-lg sm:text-xl xl:text-2xl leading-relaxed max-w-xl">
            At{" "}
            <span className="font-semibold text-black dark:text-yellow-400">DEVEN</span>
            , we simplify the journey of entrepreneurship by breaking down complex concepts into clear, actionable steps—ensuring no aspiring founder is left stranded between a great idea and limited resources.
            <span className="block mt-2">Let’s make every blog count.</span>
          </p>

          {/* Explore button on small screens */}
          <button
            onClick={handleExploreClick}
            className="block lg:hidden mt-2 sm:mt-4 px-8 py-3 bg-[#FFD600] text-black font-medium rounded-lg hover:bg-[#FDD835] transition-colors duration-300 text-base xl:text-lg"
          >
            Explore Blogs
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;