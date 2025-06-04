import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { useAuth } from "../Context/AuthContext";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/logomain.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isLoggedIn, userRole, logout } = useAuth();
  const isAdmin = userRole === "admin";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {

      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setSidebarOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    {
      label: "Blog",
      submenu: [
        { path: "/blog/finance", label: "Finance" },
        { path: "/blog/mindset", label: "Mindset" },
        { path: "/blog/communication", label: "Communication" },
        { path: "/blog/strategy", label: "Strategies" },
        { path: "/blog/Marketing%20and%20Sales", label: "Marketing & Sales" },
      ],
    },
    { path: "/about", label: "About Us" },
    ...(isLoggedIn && isAdmin ? [{ path: "/admin", label: "Create Blog" }] : []),
  ];

  const hoverBg = "hover:bg-yellow-400 hover:text-black transition";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-4 bg-black text-yellow-300 shadow-md`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-2">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="w-10 h-10" />
            <Link to="/" className="-translate-x-2 text-lg md:text-2xl font-serif text-yellow-300">THE DEVEN</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((nav, idx) => (
              nav.submenu ? (
                <div key={idx} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md font-semibold ${hoverBg}`}
                  >
                    {nav.label}
                    <AiOutlineDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-11 left-0 bg-white dark:bg-gray-800 text-black dark:text-yellow-200 shadow-xl rounded-md p-2"
                      >
                        {nav.submenu.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            to={sub.path}
                            className="block px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={idx}
                  to={nav.path}
                  className={`px-3 py-2 rounded-md font-semibold ${hoverBg}`}
                >
                  {nav.label}
                </Link>
              )
            ))}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className={`px-3 py-2 rounded-md font-semibold ${hoverBg}`}>Login</Link>
                <Link to="/signup" className={`px-3 py-2 rounded-md font-semibold ${hoverBg}`}>Signup</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">Logout</button>
            )}
            <button onClick={toggleSearch} className={hoverBg}><FiSearch size={20} /></button>
            <button onClick={toggleDarkMode} className={hoverBg}>
              {darkMode ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleSearch} className={hoverBg}><FiSearch size={20} /></button>
            <button onClick={toggleDarkMode} className={hoverBg}>
              {darkMode ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
            </button>
            <button onClick={() => setSidebarOpen(true)} className={hoverBg}><FiMenu size={24} /></button>
          </div>
        </div>

        {/* Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4"
            >
              <SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 z-50 bg-black/50 flex"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-72 bg-white dark:bg-gray-900 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-yellow-400"><AiOutlineClose size={24} /></button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((nav, idx) => (
                  nav.submenu ? (
                    <div key={idx}>
                      <button
                        onClick={() => setMobileSubmenuOpen((prev) => !prev)}
                        className="w-full flex justify-between items-center text-left font-semibold text-gray-800 dark:text-yellow-200"
                      >
                        {nav.label}
                        <AiOutlineDown className={`transition-transform ${mobileSubmenuOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileSubmenuOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-2 flex flex-col gap-1"
                          >
                            {nav.submenu.map((sub, subIdx) => (
                              <Link
                                key={subIdx}
                                to={sub.path}
                                className="text-gray-700 dark:text-yellow-300 hover:bg-yellow-400 hover:text-black px-2 py-1 rounded"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={idx} to={nav.path} className="text-gray-800 dark:text-yellow-300 px-2 py-2 rounded hover:bg-yellow-400 hover:text-black">
                      {nav.label}
                    </Link>
                  )
                ))}
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="text-gray-800 dark:text-yellow-300 hover:underline">Login</Link>
                    <Link to="/signup" className="text-gray-800 dark:text-yellow-300 hover:underline">Signup</Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
