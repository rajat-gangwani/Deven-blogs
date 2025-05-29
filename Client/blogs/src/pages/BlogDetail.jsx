import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext"; // Adjust path if needed

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { userRole, isLoggedIn } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://deven-blogs-backend.onrender.com/api/blogs/${slug}`);
        if (!response.ok) throw new Error("Blog not found");
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchBlog();
    else {
      setError("Invalid blog slug.");
      setLoading(false);
    }
  }, [slug]);

  const handleDelete = async () => {
    if (!isLoggedIn || userRole !== "admin") {
      alert("You do not have permission to delete this blog.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://deven-blogs-backend.onrender.com/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete blog");
      alert("Blog deleted successfully!");
      navigate("/blog");
    } catch (err) {
      alert(err.message || "Something went wrong.");
    }
  };

  const parsedContent = parse(blog?.content || "", {
    replace: (domNode, index) => {
      if (domNode.type === "tag") {
        if (domNode.name === "a") {
          return (
            <a
              key={index}
              href={domNode.attribs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 underline transition-colors duration-300 font-semibold break-words"
              style={{ wordBreak: "break-word" }}
            >
              {domToReact(domNode.children)}
            </a>
          );
        }
        if (domNode.name === "img") {
          return (
            <img
              key={index}
              src={domNode.attribs.src}
              alt={domNode.attribs.alt || ""}
              className="w-full max-w-full sm:max-w-3xl md:max-w-4xl rounded-3xl shadow-xl my-12 mx-auto border border-gray-300 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          );
        }
        if (domNode.name === "blockquote") {
          return (
            <blockquote
              key={index}
              className="border-l-8 border-gray-400 pl-8 italic text-base sm:text-lg md:text-xl text-gray-700 bg-gray-100 rounded-lg my-12 shadow-md break-words"
              style={{ wordBreak: "break-word" }}
            >
              {domToReact(domNode.children)}
            </blockquote>
          );
        }
        if (domNode.name === "code") {
          return (
            <code
              key={index}
              className="bg-gray-200 px-2 py-1 rounded-lg text-xs sm:text-sm md:text-base font-mono text-gray-800 shadow-inner break-all"
              style={{ wordBreak: "break-all" }}
            >
              {domToReact(domNode.children)}
            </code>
          );
        }
      }
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-opacity-60"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-6 bg-gray-50">
        <p className="mb-6 font-semibold text-3xl text-red-700 text-center">{error}</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-8 py-4 bg-blue-400 text-white font-extrabold rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          ← Explore More Blogs
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-8 lg:px-16 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-10 w-full">

        {/* Thumbnail */}
        {blog.thumbnail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <img
              src={blog.thumbnail}
              alt={`${blog.title} thumbnail`}
              className="w-full sm:max-w-3xl md:max-w-4xl rounded-3xl shadow-2xl border border-gray-300 mb-6"
              style={{ objectFit: "cover", maxHeight: "450px" }}
            />
          </motion.div>
        )}

        {/* Title */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl px-6 sm:px-12 py-12 bg-white text-gray-900 shadow-xl ring-2 ring-gray-200 break-words"
          style={{ wordBreak: "break-word" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wide drop-shadow-sm">
            {blog.title}
          </h1>
        </motion.section>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="bg-gray-100 border-l-8 border-gray-300 rounded-3xl px-6 sm:px-10 py-6 shadow-md text-gray-700 font-semibold italic leading-relaxed tracking-wide break-words"
          style={{ wordBreak: "break-word" }}
        >
          <p className="text-sm sm:text-base md:text-lg">{blog.description}</p>
        </motion.section>

        {/* Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="prose prose-gray max-w-full bg-white rounded-3xl px-4 sm:px-8 md:px-12 py-12 shadow-md border border-gray-200"
          style={{ color: "#3B3B3B", wordBreak: "break-word" }}
        >
          {parsedContent}
        </motion.section>

        {/* Delete Button (Admin Only) */}
        {isLoggedIn && userRole === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex justify-center pt-4"
          >
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-red-600 text-white font-extrabold text-lg rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300 flex items-center gap-3"
              aria-label="Delete blog"
            >
              <span role="img" aria-hidden="true">
                🗑️
              </span>{" "}
              Delete Blog
            </button>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex justify-center pt-10"
        >
          <button
            onClick={() => navigate("/blog")}
            className="px-10 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-extrabold text-xl rounded-full shadow-xl hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
            aria-label="Explore more blogs"
          >
            🔍 Explore More Blogs
          </button>
        </motion.div>
      </div>

      {/* Inline Styling */}
      <style>{`/* [Truncated inline styling for brevity — keep existing styles here] */`}</style>
    </main>
  );
};

export default BlogDetail;
