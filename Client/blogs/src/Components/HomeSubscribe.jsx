import React, { useState, useRef, useEffect } from "react";
import logoImage from "../assets/logo.png";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
const HomeSubscribe = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const controls = useAnimation();
  const { isLoggedIn } = useAuth();
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert("⚠️ You are already logged in!");
    } else {
      navigate("/signup");
    }
  };
  {
    /* Second Section */
  }
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);
  return (
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
            At{" "}
            <span className="font-semibold text-black dark:text-yellow-400">
              DEVEN
            </span>
            , we simplify the journey of entrepreneurship by breaking down
            complex concepts into clear, actionable steps—ensuring no aspiring
            founder is left stranded between a great idea and limited resources.{" "}
            <span className="block mt-2">Let’s make every blog count.</span>
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
  );
};

export default HomeSubscribe;
