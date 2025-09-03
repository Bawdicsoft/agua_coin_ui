// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { FiMenu, FiX } from "react-icons/fi";
// import Button from "./Button";
// import { navLinks } from "../content/data";

// export default function Navbar({ setIsLoading }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");
//   const menuRef = useRef(null);

//   // Map your navLinks to section IDs (you can customize these)
//   const sectionMap = {
//     "About": "about",
//     "Protocol": "protocol", 
//     "Mining": "mining",
//     "DAO": "dao",
//     "Roadmap": "roadmap",
//     "FAQ": "faq",
//     "Community": "community"
//   };

//   // Function to handle smooth scrolling to sections
//   const scrollToSection = (sectionId, isMobile = false) => {
//     if (isMobile) setIsMenuOpen(false);
    
//     // If we're not on the home page, navigate to home first with hash
//     if (pathname !== '/') {
//       setIsLoading(true);
//       router.push(`/#${sectionId}`);
//       return;
//     }
    
//     // If we're already on home page, scroll to section
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       });
//       // Update URL hash without scrolling
//       window.history.replaceState(null, null, `#${sectionId}`);
//     }
//     setActiveSection(sectionId);
//   };

//   // Update active section on hash change
//   useEffect(() => {
//     const handleHashChange = () => {
//       const hash = window.location.hash.replace('#', '');
//       if (hash) setActiveSection(hash);
//     };

//     // Initial check
//     handleHashChange();

//     // Listen for hash changes
//     window.addEventListener('hashchange', handleHashChange);
    
//     return () => {
//       window.removeEventListener('hashchange', handleHashChange);
//     };
//   }, []);

//   // Detect section when scrolling
//   useEffect(() => {
//     const handleScroll = () => {
//       if (pathname !== '/') return;
      
//       const sections = Object.values(sectionMap);
//       const scrollPosition = window.scrollY + 100;
      
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const offsetBottom = offsetTop + element.offsetHeight;
          
//           if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     // Initial check
//     handleScroll();
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [pathname]);

//   const handleNav = (href) => {
//     setIsLoading(true);
//     setIsMenuOpen(false);
//     router.push(href);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   useEffect(() => {
//     setIsLoading(false);
//   }, []);

//   const renderLinks = (isMobile = false) =>
//     navLinks.map((link) => {
//       const sectionId = sectionMap[link.name];
//       const isActive = activeSection === sectionId && pathname === '/';
      
//       return (
//         <li key={link.name}>
//           <button
//             onClick={() => scrollToSection(sectionId, isMobile)}
//             className={`block w-full px-4 py-2 rounded font-medium hover:bg-white/10 transition ${
//               isActive ? "text-blue-900 font-bold" : "text-white"
//             }`}
//           >
//             {link.name}
//           </button>
//         </li>
//       );
//     });

//   return (
//     <nav className="fixed top-0 left-0 bg-[#207CFF] text-white shadow-md w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2"
//           onClick={() => {
//             setIsLoading(true);
//             setActiveSection('');
//           }}
//         >
//           <div className="relative w-10 h-10">
//             <Image src="/Agua-newlogo.png" alt="Agua Logo" fill sizes="40px" />
//           </div>
//           <span className="text-xl font-semibold mx-4">Agua</span>
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden lg:flex gap-10 items-center">
//           {renderLinks()}
//           <li>
//             <Button
//               onClick={() => handleNav("/auth/signin")}
//               variant="outline"
//               size="md"
//               className="border-white text-white bg-[#207CFF] hover:text-[#207CFF] hover:bg-white hover:cursor-pointer"
//             >
//               Login
//             </Button>
//           </li>
//         </ul>

//         {/* Mobile Login Button + Menu Toggle */}
//         <div className="flex items-center gap-2 lg:hidden">
//           <Button
//             onClick={() => handleNav("/auth/signin")}
//             variant="outline"
//             size="md"
//             className="border-white text-white bg-[#207CFF] hover:text-[#207CFF] hover:bg-white px-6 mx-4 font-semibold hover:cursor-pointer"
//           >
//             Login
//           </Button>

//           <button
//             onClick={() => setIsMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//             className="text-white"
//           >
//             {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         ref={menuRef}
//         className={`lg:hidden bg-[#207CFF] overflow-hidden transition-all duration-300 ${
//           isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
//         }`}
//       >
//         <ul className="flex flex-col gap-1 px-4">{renderLinks(true)}</ul>
//       </div>
//     </nav>
//   );
// }









import { MdArrowOutward } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
  const [account, setAccount] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Map your nav items to section IDs
  const sectionMap = {
    "About": "about",
    "Metals": "metals",
    "Protocol": "protocol",
    "Mining": "mining", 
    "DAO": "dao",
    "Roadmap": "roadmap",
    "FAQ": "faq",
    "Community": "community"
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId, isMobile = false) => {
    // If we're not on the home page, navigate to home first with hash
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }
    
    // If we're already on home page, scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Update URL hash without scrolling
      window.history.replaceState(null, null, `#${sectionId}`);
    }
    setActiveSection(sectionId);
  };

  // Update active section on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveSection(hash);
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Detect section when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return;
      
      const sections = Object.values(sectionMap);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Render navigation links
  const renderNavLinks = (isMobile = false) => {
    const navItems = ["About", "Metals", "Protocol", "Mining", "DAO", "Roadmap", "FAQ", "Community"];
    
    return navItems.map((item) => {
      const sectionId = sectionMap[item];
      const isActive = activeSection === sectionId && pathname === '/';
      
      return (
        <li key={item}>
          <a
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(sectionId, isMobile);
            }}
            className={`px-3 py-2 rounded font-medium transition ${
              isActive 
                ? "text-blue-900 font-bold bg-white/20" 
                : "text-white hover:bg-white/10"
            } ${isMobile ? "w-full text-left" : ""}`}
            style={{ cursor: 'pointer' }}
          >
            {item}
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <div className="navbar text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-[#207CFF] hover:border-transparent lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#207CFF] rounded-box z-50 mt-3 w-52 p-2 shadow border border-white"
            >
              {renderNavLinks(true)}
            </ul>
          </div>

          <img className="w-10 h-10" src="/Agua-newlogo.png" alt="Agua Logo" />
          
          <a 
            className="btn btn-ghost text-xl hover:bg-transparent hover:border-transparent hover:shadow-none"
            onClick={() => {
              if (pathname !== '/') {
                router.push('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('');
                window.history.replaceState(null, null, ' ');
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            Agua
          </a>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {renderNavLinks()}
          </ul>
        </div>
        
        <div className="navbar-end">
          <ButtonWrapper />
        </div>
      </div>
    </>
  );
}

export default Navbar;

const ButtonWrapper = () => {
  const router = useRouter();
  
  return (
    // <div className="flex items-center justify-center gap-4">
    //   <button
    //     className="btn bg-white border border-[#297EFF] rounded-3xl text-[#297EFF] hover:bg-[#297EFF] hover:text-white"
    //     onClick={() => router.push("/signin")}
    //   >
    //     Login/SignUp
    //   </button>
    //   <NeumorphismButton />
    // </div>
    <></>
  );
};

const NeumorphismButton = () => {
  return (
    <button
      className={`
        px-3 py-1 md:px-4 md:py-2
        rounded-full 
        border border-amber-50
        flex items-center gap-2 
        text-white text-sm md:text-base
        transition-all
        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-white
    `}
    >
      <span>Join Community</span>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
        <MdArrowOutward className="text-black text-sm md:text-md" />
      </div>
    </button>
  );
};