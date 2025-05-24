// components/Subscribe.jsx
import { motion } from "framer-motion";

const Subscribe = () => {
  return (
    <motion.section
      className="py-20 px-4 md:px-20 text-center bg-gray-100 dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to our newsletter</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Stay up-to-date with our latest content and news.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-md border w-full md:w-1/2 dark:bg-gray-700 dark:border-gray-600"
        />
        <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow">
          Subscribe
        </button>
      </div>
    </motion.section>
  );
};

export default Subscribe;
