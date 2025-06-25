// src/components/CTASection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import logoImage from "../assets/logo.png"; // <-- your brand logo image

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const CTASection = () => {
  const ref = useRef(null);
  const controls = useAnimation();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isLoggedIn && email) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="w-full px-6 sm:px-10 lg:px-24 py-10 md:py-20 bg-[#F5F5F5] dark:bg-[#1C1C1E] transition-colors duration-700">
      <div
        ref={ref}
        className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-24 md:flex-row md:items-center justify-between"
      >
        <motion.div
          className="w-full md:w-6/12 flex flex-col gap-10 md:gap-14 order-1"
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
        >
          {/* <p className="text-[#2C2C2E] dark:text-[#DDD6A6] text-center text-lg sm:text-xl xl:text-2xl leading-relaxed max-w-3xl mx-auto md:mx-0 md:text-left">
            At{" "}
            <span className="font-semibold text-black dark:text-yellow-400">
              DEVEN
            </span>
            , we simplify the journey of entrepreneurship by breaking down
            complex concepts into clear, actionable steps—ensuring no aspiring
            founder is left stranded between a great idea and limited resources.
            <span className="block mt-2">Let’s make every blog count.</span>
          </p> */}

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
                  ? "bg-gray-400 cursor-not-allowed text-gray-800 dark:bg-gray-500 dark:text-gray-200"
                  : "bg-[#FFD600] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FFD600] dark:bg-[#FDD835] dark:text-[#1C1C1E] dark:hover:bg-[#F5F5F5] dark:hover:text-[#0D0D0D]"
              }`}
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        <motion.div
          className="hidden md:flex w-full md:w-6/12 justify-center relative"
          variants={imageAnimation}
          initial="hidden"
          animate={controls}
        >
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

export default CTASection;