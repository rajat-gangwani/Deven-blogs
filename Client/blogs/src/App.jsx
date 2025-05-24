import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import TermsOfService from "./pages/TermsOfService";

// Layout Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";  // <-- Import Footer
import PrivacyPolicy from "./pages/PrivacyPolicy";

const RootLayout = () => (
  <>
    <Navbar />
    <div className="pt-19 min-h-screen flex flex-col justify-between">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />  {/* Footer appears on all pages */}
    </div>
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/:category", element: <BlogCategory /> },
        { path: "/blog/detail/:slug", element: <BlogDetail /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        
        { path: "/admin", element: <AdminDashboard /> },
        { path: "/terms-&-conditions", element: <TermsOfService /> },
        { path: "/privacy-policy", element: <PrivacyPolicy/> },
      ],
    },
  ],
  { future: { v7_relativeSplatPath: true } }
);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
