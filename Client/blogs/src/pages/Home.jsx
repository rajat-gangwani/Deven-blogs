import React from "react";
import Hero from "../Components/Hero";         // Hero banner section
import Blog from "./Blog";                    // Blog listing section
import CTASection from "../Components/CTAsection"; // CTA section we created

const Home = () => {
  return (
    <div className="w-full dark:bg-[#1C1C1E] overflow-x-hidden">
      <div className="max-w-screen mx-auto px-4">
        {/* Hero Section */}
        <Hero />

        {/* Blog Section */}
        <Blog />

        {/* Call-to-Action Section */}
        <CTASection />
      </div>
    </div>
  );
};

export default Home;