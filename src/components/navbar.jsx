"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import { navLinks } from "../content/data";

export default function Navbar({ setIsLoading }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (href) => {
    setIsLoading(true); // 👈 Set loading to true BEFORE navigating
    setIsMenuOpen(false);
    router.push(href);
  };

  useEffect(()=>{
    setIsLoading(false)
  },[])

  const renderLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <li key={link.name}>
        <Link
          href={link.href}
          onClick={() => {
            if (isMobile) setIsMenuOpen(false);
            setIsLoading(true); // 👈 Optional: loading on link click
          }}
          className="block w-full px-4 py-2 rounded text-white font-medium hover:bg-white/10 transition"
        >
          {link.name}
        </Link>
      </li>
    ));

  return (
    <nav className="fixed top-0 left-0 bg-[#207CFF] text-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setIsLoading(true)}
        >
          <div className="relative w-10 h-10">
            <Image src="/Agua-newlogo.png" alt="Agua Logo" fill sizes="40px" />
          </div>
          <span className="text-xl font-semibold mx-4">Agua</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-10 items-center">
          {renderLinks()}
          <li>
            <Button
              onClick={() => handleNav("/auth/signin")}
              variant="outline"
              size="md"
              className="border-white text-white bg-[#207CFF] hover:text-[#207CFF] hover:bg-white hover:cursor-pointer"
            >
              Login
            </Button>
          </li>
        </ul>

        {/* Mobile Login Button + Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            onClick={() => handleNav("/auth/signin")}
            setIsLoading={true}
            variant="outline"
            size="md"
            className="border-white bg-white text-[#207CFF] hover:bg-[#207CFF] hover:text-white px-6 mx-4 font-semibold hover:cursor-pointer"
          >
            Login
          </Button>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="text-white"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-[#207CFF] overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4">{renderLinks(true)}</ul>
      </div>
    </nav>
  );
}
