"use client";

import { LoadingContext } from "@/context/LoadingContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // walletAddress: "",
    profilePicture: null,
  });

  useEffect(()=>{
    setIsLoading(false)
  },[])

  const {isLoading, setIsLoading} = useContext(LoadingContext);

  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      let base64Image = null;

      if (formData.profilePicture) {
        const reader = new FileReader();
        base64Image = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.profilePicture);
        });
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        // walletAddress: formData.walletAddress,
        password: formData.password,
        profilePicture: base64Image,
        role: "user",
      };

      console.log("Payload for signup:", payload);

      const res = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User created successfully");
        const token = data.token;
        saveTokenToLocalStorage(token);
        router.push("/userdashboard");
        setIsLoading(false);
      } else {
        alert(data.error || "Signup failed");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);
      alert("Something went wrong during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  function saveTokenToLocalStorage(token) {
    localStorage.setItem("authToken", token);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-4">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Back Icon */}
            <div>
              <p
                onClick={() => router.push("/")}
                className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
              >
                <IoArrowBackOutline />
              </p>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Create an Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Re-type Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?
              <Link
                href="/auth/signin"
                 onClick={() => setIsLoading(true)}
                className="text-indigo-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="/signup.jpg"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
