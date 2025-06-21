import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import avatarImage from "../assets/avatar.png";
import logoImage from "../assets/logo.png";
import brandlogo from "../assets/logomain.png";
import { useAuth } from "../Context/AuthContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  },
};

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/blog");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert("⚠️ You are already logged in!");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      {/* Top Hero Banner */}
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
    
    {/* Text Content First on mobile */}
    <motion.div
      className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 order-1 lg:order-none"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
    >
      {/* <motion.img
        src={brandlogo}
        alt="Logo"
        className="w-28 sm:w-36 md:w-44 h-auto object-contain shadow-xl"
        whileHover={{ scale: 1.05 }}
      /> */}

      <h1 className="leading-tight font-extrabold text-center md:text-left text-[#0D0D0D] dark:text-white">
  <span className="font-serif uppercase block text-2xl sm:text-3xl xl:text-4xl tracking-wide">
    Welcome to
  </span>
  <span className="font-serif uppercase block text-5xl sm:text-6xl xl:text-7xl text-black dark:text-yellow-400 drop-shadow-md">
    DEVEN
  </span>
</h1>


      {/* <p className="text-gray-700 dark:text-gray-300 max-w-xl text-lg sm:text-xl xl:text-2xl">
        Empowering minds through stories. Dive into curated blogs that inform, inspire, and ignite curiosity — tailored by category, delivered with heart.
      </p> */}

      {/* Show on large screens only */}
      <button
        onClick={handleExploreClick}
        className="hidden lg:inline-block mt-2 sm:mt-4 px-8 py-3 bg-[#FFD600] text-black font-medium rounded-lg hover:bg-[#FDD835] transition-colors duration-300 text-base xl:text-lg"
      >
        Explore Blogs
      </button>
    </motion.div>

    {/* Avatar Second on mobile */}
    <motion.div
      className="flex flex-col justify-center items-center order-2 lg:order-none gap-6"
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


      {/* Show on small screens only */}
      <button
        onClick={handleExploreClick}
        className="hidden lg:hidden mt-2 sm:mt-4 px-8 py-3 bg-[#FFD600] text-black font-medium rounded-lg hover:bg-[#FDD835] transition-colors duration-300 text-base xl:text-lg"
      >
        Explore Blogs
      </button>
    </motion.div>
  </div>
</motion.div>



      {/* Second Section */}
   <section className=" w-full px-6 sm:px-10 lg:px-24 py-5 md:py-20  bg-[#F5F5F5] dark:bg-[#1C1C1E] transition-colors duration-700">
  <div
    ref={ref}
    className=" max-w-7xl mx-auto flex flex-col gap-14 md:gap-24 md:flex-row md:items-center justify-between"
  >
    {/* Left Side Content (Text + Form) */}
    <motion.div
      className="w-full md:w-6/12 flex flex-col gap-10 md:gap-14 order-1"
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
    >
      {/* Text Paragraph */}
     <p className="text-[#2C2C2E] dark:text-[#DDD6A6] text-center text-lg sm:text-xl xl:text-2xl leading-relaxed max-w-3xl mx-auto md:mx-0 md:text-left">
  At <span className="font-semibold text-black dark:text-yellow-400">DEVEN</span>, we simplify the journey of entrepreneurship by breaking down complex concepts into clear, actionable steps—ensuring no aspiring founder is left stranded between a great idea and limited resources. <span className="block mt-2">Let’s make every blog count.</span>
</p>


      {/* Mobile Image - visible on small screens */}
      <div className="md:hidden flex justify-center">
        <div className="relative z-10 w-[280px] sm:w-[360px] overflow-hidden rounded-xl shadow-xl">
          <img
            src={logoImage}
            alt="Brand Logo"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Subscribe Form */}
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-4 sm:items-center max-w-md mx-auto md:mx-0"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-5 py-3 rounded-lg border border-[#2C2C2E] dark:border-[#444444] bg-[#FFF9C4] dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-[#FFF9C4] focus:outline-none focus:ring-4 focus:ring-[#FFD600] dark:focus:ring-[#FDD835] transition text-base"
          required
        />

        <button
          type="submit"
          disabled={isLoggedIn}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out shadow-md text-base w-full sm:w-auto ${
            isLoggedIn
              ? "bg-gray-400 cursor-not-allowed text-gray-800"
              : "bg-[#FFD600] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FFD600]"
          } dark:${
            isLoggedIn
              ? "bg-gray-500 text-gray-200"
              : "bg-[#FDD835] text-[#1C1C1E] hover:bg-[#F5F5F5] hover:text-[#0D0D0D]"
          }`}
        >
          Subscribe
        </button>
      </form>
    </motion.div>

    {/* Right Side Image - desktop only */}
    <motion.div
      className="hidden md:flex w-full md:w-6/12 justify-center relative"
      variants={imageAnimation}
      initial="hidden"
      animate={controls}
    >
      <motion.div
        className="absolute -right-10 -top-10 w-96 h-96 rounded-full z-0 blur-3xl opacity-30 bg-gradient-to-r from-[#FFD600] via-[#FDD835] to-[#FFF9C4]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <div className="relative z-10 w-[280px] sm:w-[360px] md:w-[420px] overflow-hidden rounded-xl shadow-xl">
        <img
          src={logoImage}
          alt="Brand Logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  </div>
</section>



    </>
  );
};

export default HeroSection;