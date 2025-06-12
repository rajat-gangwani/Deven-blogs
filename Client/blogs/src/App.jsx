import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import NotFound from "./pages/NotFound";

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
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Layout Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const RootLayout = () => (
  <div className="dark:bg-[#1C1C1E] bg-[#F5F5F5] transition-colors duration-700 min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow flex flex-col pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/:category", element: <BlogCategory /> },
        { path: "/blog/detail/:slug", element: <BlogDetail /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/admin",
          element: (
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          ),
        },
        { path: "/terms-&-conditions", element: <TermsOfService /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "*", element: <NotFound /> }, // Fallback 404 route
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
