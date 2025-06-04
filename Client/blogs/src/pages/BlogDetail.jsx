import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";

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
        const response = await fetch(`http://localhost:5000/api/blogs/${slug}`);
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
      const response = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
              className="w-full max-w-full sm:max-w-3xl md:max-w-4xl rounded-3xl shadow-xl my-8 mx-auto border border-gray-300"
              loading="lazy"
            />
          );
        }
        if (domNode.name === "blockquote") {
          return (
            <blockquote
              key={index}
              className="border-l-8 border-gray-400 pl-6 italic text-base sm:text-lg md:text-xl text-gray-700 bg-gray-100 rounded-lg my-8 shadow-md break-words"
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
            >
              {domToReact(domNode.children)}
            </code>
          );
        }
      }
    },
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-12 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-8 w-full">

        {/* 📅 Published info */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold "
        >
          <p className="text-sm sm:text-base font-bold text-blue-500 italic">
            Published on {formatDate(blog.createdAt)} by <span className="ml-1.5font-semibold">Kapil Gatani</span>
          </p>
        </motion.div>

        {/* 📝 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-wide text-center drop-shadow-sm"
        >
          {blog.title}
        </motion.h1>

        {/* 🖼️ Thumbnail - static, no hover effect */}
        {blog.thumbnail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <img
              src={blog.thumbnail}
              alt={`${blog.title} thumbnail`}
              className="w-full sm:max-w-3xl md:max-w-4xl rounded-3xl shadow-2xl border border-gray-300 object-cover max-h-[400px]"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* 📝 Description */}
        {/* <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="bg-gray-100 border-l-8 border-gray-300 rounded-3xl px-5 sm:px-8 py-4 shadow-md text-gray-700 font-semibold italic leading-relaxed tracking-wide"
        >
          <p className="text-sm sm:text-base md:text-lg">{blog.description}</p>
        </motion.section> */}

        {/* 🧾 Full Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="prose prose-gray max-w-full bg-white rounded-3xl px-4 sm:px-6 md:px-10 py-10 shadow-md border border-gray-200"
        >
          {parsedContent}
        </motion.section>

        {/* 🗑️ Admin Delete */}
        {isLoggedIn && userRole === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex justify-center pt-3"
          >
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-red-600 text-white font-extrabold text-lg rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300 flex items-center gap-2"
              aria-label="Delete blog"
            >
              🗑️ Delete Blog
            </button>
          </motion.div>
        )}

        {/* 🔍 Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={() => navigate("/blog")}
            className="px-10 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-extrabold text-xl rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
            aria-label="Explore more blogs"
          >
            🔍 Explore More Blogs
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default BlogDetail;
