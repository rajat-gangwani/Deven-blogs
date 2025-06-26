import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaShareAlt,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

const normalizeUrl = (url) => {
  if (!url) return "";
  return url.startsWith("/uploads")
    ? `${import.meta.env.VITE_API_URL}${url}`
    : url.replace(/([^:]\/)\/+/g, "$1");
};

const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  hover: {
    scale: 1.06,
    y: -10,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    rotate: 0.5,
    transition: { type: "spring", stiffness: 300, damping: 28, restDelta: 0.001 },
  },
};

const imageVariants = {
  rest: { scale: 1, rotate: 0, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  hover: { scale: 1.15, rotate: 3, y: -12, transition: { type: "spring", stiffness: 320, damping: 30 } },
};

const modalBackground = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalContent = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const readIndicatorVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const BlogCard = React.memo(({ blog }) => {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleError = useCallback((e) => {
    e.currentTarget.src = "/placeholder.jpg";
    e.currentTarget.onerror = null;
  }, []);

  const blogUrl = `${window.location.origin}/blog/detail/${blog.slug}`;

  const handleCardClick = () => {
    if (!isRead) setIsRead(true);
    navigate(`/blog/detail/${blog.slug}`);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    setShareModalOpen(true);
    setCopySuccess("");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopySuccess("Link copied to clipboard!");
    } catch {
      setCopySuccess("Failed to copy link");
    }
  };

  useEffect(() => {
    if (!copySuccess) return;
    const timer = setTimeout(() => setCopySuccess(""), 2000);
    return () => clearTimeout(timer);
  }, [copySuccess]);

  useEffect(() => {
    if (!shareModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShareModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shareModalOpen]);

  const closeModal = () => setShareModalOpen(false);

  const socialPlatforms = [
    {
      icon: FaFacebookF,
      color: "#3b5998",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      label: "Share on Facebook",
    },
    {
      icon: FaTwitter,
      color: "#1DA1F2",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog.title)}`,
      label: "Share on Twitter",
    },
    {
      icon: FaWhatsapp,
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(blog.title + " " + blogUrl)}`,
      label: "Share on WhatsApp",
    },
    {
      icon: FaInstagram,
      color: "#E1306C",
      href: "https://instagram.com",
      label: "Instagram (no direct sharing)",
    },
  ];

  const colors = {
    "--bg-light": "#F5F5F5",
    "--bg-dark": "#1C1C1E",
    "--card-bg": "#2C2C2E",
    "--text-dark": "#0D0D0D",
    "--text-light": "#F5F5F5",
    "--accent-yellow": "#FFD600",
    "--accent-yellow-light": "#FDD835",
    "--highlight-yellow": "#FFF9C4",
  };

  return (
    <div style={colors} className="w-full sm:max-w-md mx-auto px-2">
      <motion.article
        layout
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
        className="relative rounded-3xl overflow-hidden border cursor-pointer"
        style={{
          backgroundColor: colors["--card-bg"],
          borderColor: isRead ? colors["--accent-yellow-light"] + "80" : "#444",
          borderWidth: "1.5px",
        }}
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        tabIndex={0}
        aria-label={`Blog post: ${blog.title}`}
      >
        {/* Thumbnail */}
        <motion.div className="h-40 sm:h-56 relative overflow-hidden rounded-t-3xl" variants={imageVariants}>
          <img
            src={normalizeUrl(blog.thumbnailUrl)}
            alt={blog.title || "Blog thumbnail"}
            onError={handleError}
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          <motion.div
            className="absolute top-4 left-4 w-6 h-6 rounded-full flex items-center justify-center"
            variants={readIndicatorVariants}
            initial="hidden"
            animate={isRead ? "visible" : "hidden"}
            style={{
              backgroundColor: colors["--accent-yellow"],
              boxShadow: "0 0 10px " + colors["--accent-yellow-light"],
            }}
          >
            <FaCheckCircle className="text-black w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 text-sm sm:text-base" style={{ color: colors["--text-light"] }}>
  {/* Title with underline */}
  <h2 className="text-lg sm:text-xl font-extrabold leading-snug relative line-clamp-2" style={{ color: colors["--accent-yellow-light"] }}>
    {blog.title}
  </h2>

  {/* Category + Metadata */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 text-sm">
    {/* Category pill */}
    <span
      className="font-semibold rounded-full px-3 py-1 shadow-sm backdrop-blur-md w-max"
      style={{
        background: `linear-gradient(90deg, ${colors["--highlight-yellow"]}, ${colors["--accent-yellow-light"]})`,
        color: colors["--text-dark"],
      }}
    >
      {blog.category}
    </span>

    {/* Published + Author */}
    <div className="text-left sm:text-right leading-tight space-y-0.5">
      <p className="opacity-80">
        Published on{" "}
        <span className="font-medium">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </p>
      <p>
        by{" "}
        <span className="font-semibold" style={{ color: colors["--accent-yellow"] }}>
          Kapil Gattani
        </span>
      </p>
    </div>
  </div>

  {/* Blog excerpt */}
  <p className="text-sm sm:text-base line-clamp-3 text-gray-300 sm:text-gray-200">
    {blog.description}
  </p>

  {/* Share Button */}
  <button
    onClick={handleShareClick}
    className="w-fit inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
    style={{
      backgroundColor: colors["--accent-yellow"],
      color: colors["--text-dark"],
      padding: "0.5rem 1rem",
    }}
  >
    <FaShareAlt className="w-4 h-4" />
    Share
  </button>
</div>

      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalBackground}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(13, 13, 13, 0.85)" }}
            onClick={closeModal}
          >
            <motion.div
              variants={modalContent}
              className="relative bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm"
              style={{ background: `linear-gradient(135deg, ${colors["--bg-light"]}, ${colors["--highlight-yellow"]})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-black">Share "{blog.title}"</h3>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {socialPlatforms.map(({ icon: Icon, color, href, label }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                    style={{ backgroundColor: color, color: "#fff" }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full rounded-md py-2.5 text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
              >
                Copy Link
              </button>
              {copySuccess && <p className="text-center mt-2 text-sm font-medium text-black">{copySuccess}</p>}

              <button
                onClick={closeModal}
                className="absolute top-3 right-4 text-xl font-bold text-gray-700 hover:text-black"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default BlogCard;