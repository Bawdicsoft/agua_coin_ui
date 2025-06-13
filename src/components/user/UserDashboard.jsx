"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import {
  MdDashboard,
  MdShoppingCart,
  MdRedeem,
  MdBolt,
  MdExpandMore,
  MdExpandLess,
  MdAccountCircle,
  MdAccountBalanceWallet,
} from "react-icons/md";
import ThemeToggle from "../common/ThemeToggle";
import AvatarMenu from "../common/AvatarMenu";
import WalletConnectButton from "../common/WalletConnectButton";
import Breadcrumb from "../common/Breadcrumb";

export default function UserDashboard({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { theme } = useTheme();
  const menuRef = useRef();

  const menus = [
    {
      title: "Purchase",
      icon: <MdShoppingCart />,
      children: ["New Purchase", "Purchase History", "Invoices"],
    },
    {
      title: "Redeem",
      icon: <MdRedeem />,
      children: ["Voucher Redeem", "Redeem History", "Reports"],
    },
    {
      title: "Mint",
      icon: <MdBolt />,
      children: ["New Mint", "Mint History", "Analytics"],
    },
  ];

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div style={{ ...styles.dashboard, backgroundColor: "var(--background-main)", color: "var(--text-primary)" }}>
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? "60px" : "240px",
          backgroundColor: "var(--background-sidebar)",
          borderRight: "1px solid var(--border-color)",
        }}
      >
        <div style={styles.logo}>
          <span>🚀</span>
          {!collapsed && <span style={styles.logoText}>MyApp</span>}
        </div>

        <button style={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MdExpandMore /> : <MdExpandLess />}
        </button>

        <nav>
          {menus.map((menu) => (
            <div key={menu.title}>
              <div
                style={{
                  ...styles.menuItem,
                  backgroundColor: openMenu === menu.title ? "var(--background-submenu)" : "transparent",
                }}
                onClick={() => toggleMenu(menu.title)}
              >
                <span style={{ marginRight: "8px" }}>{menu.icon}</span>
                {!collapsed && menu.title}
                {!collapsed && (openMenu === menu.title ? <MdExpandLess style={{ marginLeft: "auto" }} /> : <MdExpandMore style={{ marginLeft: "auto" }} />)}
              </div>

              {openMenu === menu.title && !collapsed && (
                <div style={styles.submenu}>
                  {menu.children.map((child) => (
                    <div
                      key={child}
                      style={{ ...styles.submenuItem, color: "var(--color-warning)" }}
                      onClick={() => setCurrentPage(child)}
                    >
                      {child}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Header */}
         <header style={{ ...styles.header, backgroundColor: "var(--background-header)", borderBottom: "1px solid var(--border-color)" }}>
          <Breadcrumb />

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative" }}>
            {/* 👇 NEW BUTTON integrated here */}
            <WalletConnectButton />

            <ThemeToggle />

            <div onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} style={styles.avatar}>
              <MdAccountCircle size={20} />
            </div>

            {avatarMenuOpen && (
              <div ref={menuRef} style={{ position: "absolute", top: "45px", right: 0 }}>
                <AvatarMenu
                  collapsed={false}
                  onSelect={(page) => {
                    console.log(page);
                    setAvatarMenuOpen(false);
                  }}
                  onLogout={() => {
                    alert("Logged out!");
                    setAvatarMenuOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "2rem" }}>{children || <h2>{currentPage}</h2>}</div>
      </main>

      {/* Wallet Modal */}
      {walletModalOpen && (
        <Modal onClose={() => setWalletModalOpen(false)}>
          <h2>Connect Your Wallet</h2>
          <p>This is a reusable modal. Add your wallet integration here.</p>
          <button onClick={() => setWalletModalOpen(false)} style={styles.closeBtn}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          color: "#111",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "90%",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  sidebar: {
    padding: "1rem",
    transition: "width 0.3s",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    color: "var(--color-primary)",
  },
  logoText: {
    marginLeft: "8px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  collapseBtn: {
    background: "transparent",
    color: "inherit",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  menuItem: {
    padding: "0.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
  },
  submenu: {
    marginLeft: "1rem",
    marginTop: "0.3rem",
  },
  submenuItem: {
    padding: "0.3rem 0.5rem",
    marginTop: "0.3rem",
    borderRadius: "3px",
    cursor: "pointer",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "0.5rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "32px",
    height: "32px",
    background: "var(--color-secondary, #eee)",
    borderRadius: "50%",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  walletBtn: {
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeBtn: {
    background: "var(--color-danger, #f44336)",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

// "use client";
// import { useTheme } from "@/context/ThemeContext";
// import { useState, useEffect, useRef } from "react";
// import {
//   MdDashboard,
//   MdShoppingCart,
//   MdRedeem,
//   MdBolt,
//   MdExpandMore,
//   MdExpandLess,
//   MdAccountCircle,
//   MdLogout,
//   MdVpnKey,
//   MdAccountBalanceWallet,
// } from "react-icons/md";
// import ThemeToggle from "../common/ThemeToggle";
// import AvatarMenu from "../common/AvatarMenu";

// export default function UserDashboard({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [currentPage, setCurrentPage] = useState("Dashboard");
//   const [walletModalOpen, setWalletModalOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const menuRef = useRef();


//   const menus = [
//     {
//       title: "Purchase",
//       icon: <MdShoppingCart />,
//       children: ["New Purchase", "Purchase History", "Invoices"],
//     },
//     {
//       title: "Redeem",
//       icon: <MdRedeem />,
//       children: ["Voucher Redeem", "Redeem History", "Reports"],
//     },
//     {
//       title: "Mint",
//       icon: <MdBolt />,
//       children: ["New Mint", "Mint History", "Analytics"],
//     },
//   ];

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//   }, [theme]);

//     useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setAvatarMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

  

//   const toggleMenu = (menu) => {
//     setOpenMenu((prev) => (prev === menu ? null : menu));
//   };

//   return (
   

//     <div
//       style={{
//         ...styles.dashboard,
//         backgroundColor: "var(--background-main)",
//         color: "var(--text-primary)",
//       }}
//     >
//       <aside
//         style={{
//           ...styles.sidebar,
//           width: collapsed ? "60px" : "240px",
//           background: "var(--background-sidebar)",
//           borderRight: "1px solid var(--border-color)",
//         }}
//       >
//         <div style={styles.logo}>
//           <span>🚀</span>
//           {!collapsed && <span style={styles.logoText}>MyApp</span>}
//         </div>

//         <button
//           style={styles.collapseBtn}
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           {collapsed ? <MdExpandMore /> : <MdExpandLess />}
//         </button>

//         <nav>
//           {menus.map((menu) => (
//             <div key={menu.title}>
//               <div
//                 style={{
//                   ...styles.menuItem,
//                   backgroundColor:
//                     openMenu === menu.title
//                       ? "var(--background-submenu)"
//                       : "transparent",
//                 }}
//                 onClick={() => toggleMenu(menu.title)}
//               >
//                 <span style={{ marginRight: "8px" }}>{menu.icon}</span>
//                 {!collapsed && menu.title}
//                 {!collapsed &&
//                   (openMenu === menu.title ? (
//                     <MdExpandLess style={{ marginLeft: "auto" }} />
//                   ) : (
//                     <MdExpandMore style={{ marginLeft: "auto" }} />
//                   ))}
//               </div>

//               {openMenu === menu.title && !collapsed && (
//                 <div style={styles.submenu}>
//                   {menu.children.map((child) => (
//                     <div
//                       key={child}
//                       style={{
//                         ...styles.submenuItem,
//                         color: "var(--color-warning)",
//                       }}
//                       onClick={() => setCurrentPage(child)}
//                     >
//                       {child}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </aside>

//       <main style={styles.mainContent}>
//         <header
//           style={{
//             ...styles.header,
//             background: "var(--background-header)",
//             borderBottom: "1px solid var(--border-color)",
//           }}
//         >
//           <div style={{ color: "var(--text-secondary)" }}>
//             Dashboard {currentPage !== "Dashboard" && ` / ${currentPage}`}
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "1rem",
//               position: "relative",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
//               <button
//                 style={styles.walletBtn}
//                 onClick={() => setWalletModalOpen(true)}
//               >
//                 <MdAccountBalanceWallet size={18} style={{ marginRight: 4 }} />
//                 Connect Wallet
//               </button>

//               <ThemeToggle />

//               <div
//                 onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
//                 style={styles.avatar}
//               >
//                 <MdAccountCircle size={20} />
//               </div>
//             </div>

         
          
//           {avatarMenuOpen && (
//         <div ref={menuRef}>
//           <AvatarMenu
//             collapsed={false}
//             onSelect={(page) => {
//               console.log(page);
//               setAvatarMenuOpen(false);
//             }}
//             onLogout={() => {
//               alert("Logged out!");
//               setAvatarMenuOpen(false);
//             }}
//           />
//         </div>
//       )}
          
//           </div>
//         </header>

//         <div style={{ padding: "2rem" }}>
//           {children || <h2>{currentPage}</h2>}
//         </div>
//       </main>

//       {walletModalOpen && (
//         <Modal onClose={() => setWalletModalOpen(false)}>
//           <h2>Connect Your Wallet</h2>
//           <p>This is a reusable modal. Add your wallet integration here.</p>
//           <button
//             onClick={() => setWalletModalOpen(false)}
//             style={styles.closeBtn}
//           >
//             Close
//           </button>
//         </Modal>
//       )}
//     </div>
//   );
// }

// function Modal({ children, onClose }) {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "rgba(0,0,0,0.6)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           color: "#111",
//           padding: "2rem",
//           borderRadius: "8px",
//           minWidth: "300px",
//           maxWidth: "90%",
//           position: "relative",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   dashboard: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "sans-serif",
//   },
//   sidebar: {
//     padding: "1rem",
//     transition: "width 0.3s",
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "1rem",
//     color: "var(--color-primary)",
//   },
//   logoText: {
//     marginLeft: "8px",
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//   },
//   collapseBtn: {
//     background: "transparent",
//     color: "inherit",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "1.2rem",
//     marginBottom: "1rem",
//   },
//   menuItem: {
//     padding: "0.5rem",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     borderRadius: "4px",
//   },
//   submenu: {
//     marginLeft: "1rem",
//     marginTop: "0.3rem",
//   },
//   submenuItem: {
//     padding: "0.3rem 0.5rem",
//     background: "transparent",
//     marginTop: "0.3rem",
//     borderRadius: "3px",
//     cursor: "pointer",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//   },
//   header: {
//     padding: "0.5rem 1rem",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerActions: {
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem",
//     position: "relative",
//   },
//   avatar: {
//     width: "32px",
//     height: "32px",
//     background: "var(--color-secondary, #eee)",
//     borderRadius: "50%",
//     color: "inherit",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//   },
//   avatarMenu: {
//     position: "absolute",
//     top: "45px",
//     right: 0,
//     borderRadius: "8px",
//     overflow: "hidden",
//     zIndex: 999,
//     transition: "all 0.2s",
//   },
//   avatarItem: {
//     padding: "0.5rem 1rem",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//     color: "inherit",
//     whiteSpace: "nowrap",
//   },
//   walletBtn: {
//     background: "var(--color-primary)",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   closeBtn: {
//     background: "var(--color-danger, #f44336)",
//     color: "#fff",
//     padding: "0.5rem 1rem",
//     borderRadius: "4px",
//     border: "none",
//     cursor: "pointer",
//     marginTop: "1rem",
//   },
// };



 // <div
    //   style={{
    //     ...styles.dashboard,
    //     backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
    //     color: theme === "dark" ? "#fff" : "#111",
    //   }}
    // >
    //   <aside
    //     style={{
    //       ...styles.sidebar,
    //       width: collapsed ? "60px" : "240px",
    //       background: theme === "dark" ? "#1e1e1e" : "#fff",
    //       borderRight: theme === "dark" ? "1px solid #333" : "1px solid #ddd",
    //     }}
    //   >
    //     <div style={styles.logo}>
    //       <span>🚀</span>
    //       {!collapsed && <span style={styles.logoText}>MyApp</span>}
    //     </div>

    //     <button
    //       style={styles.collapseBtn}
    //       onClick={() => setCollapsed(!collapsed)}
    //     >
    //       {collapsed ? <MdExpandMore /> : <MdExpandLess />}
    //     </button>

    //     <nav>
    //       {menus.map((menu) => (
    //         <div key={menu.title}>
    //           <div
    //             style={{
    //               ...styles.menuItem,
    //               backgroundColor:
    //                 openMenu === menu.title
    //                   ? theme === "dark"
    //                     ? "#2e2e2e"
    //                     : "#e2e8f0"
    //                   : "transparent",
    //             }}
    //             onClick={() => toggleMenu(menu.title)}
    //           >
    //             <span style={{ marginRight: "8px" }}>{menu.icon}</span>
    //             {!collapsed && menu.title}
    //             {!collapsed &&
    //               (openMenu === menu.title ? (
    //                 <MdExpandLess style={{ marginLeft: "auto" }} />
    //               ) : (
    //                 <MdExpandMore style={{ marginLeft: "auto" }} />
    //               ))}
    //           </div>

    //           {openMenu === menu.title && !collapsed && (
    //             <div style={styles.submenu}>
    //               {menu.children.map((child) => (
    //                 <div
    //                   key={child}
    //                   style={{
    //                     ...styles.submenuItem,
    //                     color:
    //                       theme === "dark"
    //                         ? "var(--color-warning)"
    //                         : "var(--color-primary)",
    //                   }}
    //                   onClick={() => setCurrentPage(child)}
    //                 >
    //                   {child}
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </nav>
    //   </aside>

    //   <main style={styles.mainContent}>
    //     <header
    //       style={{
    //         ...styles.header,
    //         background: theme === "dark" ? "#1a1a1a" : "#fff",
    //         borderBottom:
    //           theme === "dark" ? "1px solid #333" : "1px solid #ddd",
    //       }}
    //     >
    //       <div style={{ color: theme === "dark" ? "#888" : "#555" }}>
    //         Dashboard {currentPage !== "Dashboard" && ` / ${currentPage}`}
    //       </div>

    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           gap: "1rem",
    //           position: "relative",
    //         }}
    //       >
    //         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    //           <button
    //             style={styles.walletBtn}
    //             onClick={() => setWalletModalOpen(true)}
    //           >
    //             <MdAccountBalanceWallet size={18} style={{ marginRight: 4 }} />
    //             Connect Wallet
    //           </button>
    //           <ThemeToggle /> {/* 👉 New toggle here */}
    //           <div
    //             onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
    //             style={styles.avatar}
    //           >
    //             <MdAccountCircle size={20} />
    //           </div>
    //         </div>

    //         {avatarMenuOpen && (
    //           <div
    //             style={{
    //               position: "absolute",
    //               top: "45px",
    //               right: 0,
    //               background: theme === "dark" ? "#222" : "#fff",
    //               border: `1px solid ${theme === "dark" ? "#333" : "#ddd"}`,
    //               borderRadius: "4px",
    //               zIndex: 999,
    //             }}
    //           >
    //             <div
    //               style={styles.avatarItem}
    //               onClick={() => setCurrentPage("Profile")}
    //             >
    //               <MdAccountCircle /> {!collapsed && " Profile"}
    //             </div>
    //             <div
    //               style={styles.avatarItem}
    //               onClick={() => setCurrentPage("Change Password")}
    //             >
    //               <MdVpnKey /> {!collapsed && " Change Password"}
    //             </div>
    //             <div
    //               style={styles.avatarItem}
    //               onClick={() => alert("Logged out!")}
    //             >
    //               <MdLogout /> {!collapsed && " Logout"}
    //             </div>
    //             <div
    //               style={styles.avatarItem}
    //               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    //             >
    //               {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </header>

    //     <div style={{ padding: "2rem" }}>
    //       {children || <h2>{currentPage}</h2>}
    //     </div>
    //   </main>

    //   {walletModalOpen && (
    //     <Modal onClose={() => setWalletModalOpen(false)}>
    //       <h2>Connect Your Wallet</h2>
    //       <p>This is a reusable modal. Add your wallet integration here.</p>
    //       <button
    //         onClick={() => setWalletModalOpen(false)}
    //         style={styles.closeBtn}
    //       >
    //         Close
    //       </button>
    //     </Modal>
    //   )}
    // </div>