import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const toggleSave = (blogId) => {
    setSavedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const categorizedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.category]) acc[blog.category] = [];
    acc[blog.category].push(blog);
    return acc;
  }, {});

  return (
    <section className="overflow-x-hidden min-h-screen w-full py-12 px-4 sm:px-6 md:px-10 lg:px-24 bg-[#F5F5F5] dark:bg-[#1C1C1E] transition-colors duration-700">
      {Object.entries(categorizedBlogs).map(([category, categoryBlogs]) => (
        <div key={category} className="mb-24">
          <div className="flex justify-between items-center mb-5 px-2">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2C2C2E] dark:text-[#FFD600] capitalize">
              {category}
            </h3>
            <button
              onClick={() => navigate(`/blog/${category}`)}
              className="flex items-center gap-1 text-sm md:text-base text-black dark:text-[#FFF9C4] dark:hover:text-[#FFD600] font-semibold transition-colors"
            >
              View More <FiArrowRight size={18} />
            </button>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.2 },
              640: { slidesPerView: 1.6 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.5 },
            }}
            className="pt-3"
          >
            {categoryBlogs.map((blog) => (
              <SwiperSlide key={blog.slug} className="pb-8">
                <BlogCard
                  blog={{
                    ...blog,
                    isSaved: !!savedBlogs[blog.id],
                    thumbnail: blog.thumbnailUrl || "/placeholder.jpg",
                  }}
                  isSaved={!!savedBlogs[blog.id]}
                  onSaveToggle={() => toggleSave(blog.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default Blog;
