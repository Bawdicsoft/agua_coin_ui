// import { footernavLinks } from "@/content/data";
// import Link from "next/link";
// import { FaTelegram, FaRedditAlien, FaFacebookF } from "react-icons/fa6";
// import { RiTwitterXFill } from "react-icons/ri";
// import { TiSocialGithub } from "react-icons/ti";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();



//   const socialLinks = [
//     { icon: FaTelegram, href: "#" },
//     { icon: TiSocialGithub, href: "#" },
//     { icon: RiTwitterXFill, href: "#" },
//     { icon: FaRedditAlien, href: "#" },
//     { icon: FaFacebookF, href: "#" },
//   ];

//   return (
//     <footer className="relative overflow-hidden bg-[#000B1F] py-12 text-white">
//       {/* Background Glow */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[#000B1F] opacity-95"></div>
//         <div className="absolute w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-sigma-glow top-[-10%] right-[-10%] opacity-20 blur-3xl"></div>
//       </div>

//       {/* Footer Content */}
//       <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
//         <div className="flex flex-col md:flex-row justify-between gap-12">
//           {/* Brand */}
//           <div className="space-y-4">
//             <h2 className="text-3xl font-bold gradient-text">AGUA</h2>
//             <p className="text-white/60 max-w-xs text-sm">
//               Bridging digital assets with tangible value through innovation and community.
//             </p>
//           </div>

//           {/* Links */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
//             {footernavLinks.map((section, i) => (
//               <div key={i}>
//                 <h3 className="font-semibold text-white mb-2">{section.title}</h3>
//                 <ul className="space-y-1">
//                   {section.links.map((link, j) => (
//                     <li key={j}>
//                       <Link
//                         href={link.href}
//                         className="text-white/60 hover:text-white text-sm transition"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Socials */}
//         <div className="mt-10 flex justify-center md:justify-start space-x-4">
//           {socialLinks.map(({ icon: Icon, href }, index) => (
//             <Link
//               key={index}
//               href={href}
//               className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#E2BB57] text-white hover:text-[#1A2335] transition duration-300"
//             >
//               <Icon className="text-lg" />
//             </Link>
//           ))}
//         </div>

//         {/* Bottom */}
//         <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
//           © {currentYear} AGUA. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;







import { FaTelegramPlane, FaRedditAlien } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { TiSocialGithub } from "react-icons/ti";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 pt-10 mt-10 overflow-hidden bg-[#000B1F]">
      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-90"></div>
        <div className="absolute w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-sigma-glow top-[-10%] right-[-10%] opacity-20"></div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Logo */}
          <h2 className="text-2xl font-bold gradient-text">AGUA</h2>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            {["About", "Whitepaper", "Roadmap", "DAO", "FAQ", "Support"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white/60 hover:text-white text-base md:text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[FaTelegramPlane, TiSocialGithub, RiTwitterXFill, FaRedditAlien].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sigma-purple transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <Icon className="text-2xl" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 mt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Terms & Conditions | Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Compliance & Risk Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
