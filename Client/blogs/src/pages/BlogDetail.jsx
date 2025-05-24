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
        const response = await fetch(`http://localhost:5050/api/blogs/${slug}`);
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
      const response = await fetch(`http://localhost:5050/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if you have a token (e.g., Bearer token) here
          // "Authorization": `Bearer ${yourAuthToken}`,
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
              className="text-yellow-700 hover:text-yellow-900 underline transition-colors duration-300 font-semibold"
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
              className="w-full max-w-4xl rounded-3xl shadow-xl my-12 mx-auto border-4 border-yellow-300 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          );
        }
        if (domNode.name === "blockquote") {
          return (
            <blockquote
              key={index}
              className="border-l-8 border-yellow-600 pl-8 italic text-xl text-yellow-900 bg-yellow-50 rounded-lg my-12 shadow-md"
            >
              {domToReact(domNode.children)}
            </blockquote>
          );
        }
        if (domNode.name === "code") {
          return (
            <code
              key={index}
              className="bg-yellow-200 px-2 py-1 rounded-lg text-sm font-mono text-yellow-900 shadow-inner"
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
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9C4]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-yellow-500 border-opacity-60"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-6 bg-[#FFF9C4]">
        <p className="mb-6 font-semibold text-3xl text-red-700">{error}</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-8 py-4 bg-yellow-400 text-black font-extrabold rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          ← Explore More Blogs
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDE7] to-[#FFF9C4] py-12 px-6 sm:px-10 lg:px-20 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl px-8 sm:px-14 py-14 bg-gradient-to-r from-yellow-300 to-yellow-400 text-black shadow-2xl ring-4 ring-yellow-400"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-wide break-words drop-shadow-md">
            {blog.title}
          </h1>
        </motion.section>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="bg-yellow-200 border-l-12 border-yellow-500 rounded-3xl px-8 sm:px-12 py-8 shadow-lg text-yellow-900 text-2xl font-semibold italic leading-relaxed tracking-wide"
        >
          <p>{blog.description}</p>
        </motion.section>

        {/* Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="prose prose-yellow max-w-full bg-white rounded-3xl px-10 py-12 shadow-lg border border-yellow-300"
          style={{ color: "#5C3D00" }}
        >
          {parsedContent}
        </motion.section>

        {/* Delete Button (Admin Only) */}
        {isLoggedIn && userRole === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex justify-center pt-6"
          >
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-red-700 text-white font-extrabold text-lg rounded-full shadow-xl hover:bg-red-800 hover:scale-105 transition-transform duration-300 flex items-center gap-3"
              aria-label="Delete blog"
            >
              <span role="img" aria-hidden="true">🗑️</span> Delete Blog
            </button>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex justify-center pt-12"
        >
          <button
            onClick={() => navigate("/blog")}
            className="px-10 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-extrabold text-xl rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
            aria-label="Explore more blogs"
          >
            🔍 Explore More Blogs
          </button>
        </motion.div>
      </div>

      {/* Inline Custom Styling */}
      <style>
        {`
          /* Prose Overrides */
          .prose-yellow a {
            color: #FDD835;
            font-weight: 600;
            text-decoration-thickness: 2px;
            transition: color 0.3s ease;
          }
          .prose-yellow a:hover {
            color: #FFD600;
          }

          .prose-yellow p {
            margin-bottom: 1.5em;
            line-height: 1.8;
            font-size: 1.125rem;
          }

          .prose-yellow h2,
          .prose-yellow h3,
          .prose-yellow h4 {
            margin-top: 2.5em;
            margin-bottom: 1.2em;
            color: #FBC02D;
            font-weight: 700;
          }

          .prose-yellow img {
            display: block;
            margin: 3rem auto;
            max-width: 100%;
            height: auto;
            border-radius: 1.5rem;
            box-shadow: 0 10px 32px rgba(251, 176, 45, 0.35);
            transition: transform 0.3s ease;
          }
          .prose-yellow img:hover {
            transform: scale(1.05);
          }

          .prose-yellow blockquote {
            color: #5D4037;
            border-left: 6px solid #FBC02D;
            padding-left: 1.5rem;
            font-style: italic;
            background: #FFF8E1;
            box-shadow: 0 4px 12px rgba(251, 176, 45, 0.2);
          }

          .prose-yellow code {
            background: #FFF59D;
            color: #F57F17;
            font-weight: 700;
            padding: 0.15em 0.3em;
            border-radius: 0.4rem;
          }
        `}
      </style>
    </main>
  );
};

export default BlogDetail;
