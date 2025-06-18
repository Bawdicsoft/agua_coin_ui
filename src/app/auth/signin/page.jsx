"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { IoArrowBackOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { ToastContext } from "@/context/ToastContext";
import { LoadingContext } from "@/context/LoadingContext";

export default function SigninPage() {
  const [userDetail, setUserDetail] = useState([]);
  const { showToast } = useContext(ToastContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { auth, login } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // alert("Please fill in all fields.");
      showToast({
        type: "error",
        message: data.error || "Please fill in all fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log("Login response:", data);

      if (res.ok) {
        const { token, user } = data;

        // ✅ Save to AuthContext
        login(token, user);

        // Optional: local state (if needed elsewhere temporarily)
        setUserDetail(user);
        {
          user.role === "user"
            ? router.push("/dashboard/user")
            : router.push("/dashboard/admin");
        }
        showToast({ type: "success", message: `Welcome to ${user.name}` });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        showToast({
          type: "error",
          message: data.error || "Login failed. Please try again.",
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      showToast({
        type: "error",
        message:
          data.error || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  function saveTokenToLocalStorage(token) {
    localStorage.setItem("authToken", token);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-8">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="/signup.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Back Icon */}
            <div className="mb-4">
              <p
                onClick={() => router.push("/")}
                className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
              >
                <IoArrowBackOutline />
              </p>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Login to Your Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <IoEyeOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                onClick={() => setIsLoading(true)}
                className="text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
