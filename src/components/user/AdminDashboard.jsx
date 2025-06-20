"use client";
import { useTheme } from "@/context/ThemeContext";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { BrowserProvider } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletContext } from "@/context/WalletContext";
import { AuthContext } from "@/context/AuthContext";
import {
  MdShoppingCart,
  MdRedeem,
  MdBolt,
  MdExpandMore,
  MdExpandLess,
  MdAccountCircle,
  MdDashboard,
  MdAccountBalanceWallet,
  MdChevronLeft,
  MdChevronRight,
  MdPerson,
  MdNotifications,
  MdOutlinePayments 
} from "react-icons/md";
import ThemeToggle from "../common/ThemeToggle";
import AvatarMenu from "../common/AvatarMenu";
import Image from "next/image";
import { TbReport } from "react-icons/tb";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "AGUA Coin",
      infuraId: "https://rpc.testnet.fantom.network",
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://rpc.testnet.fantom.network",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};

export default function AdminDashboard({ children }) {
  const router = useRouter();
  const { breadcrumbs, addBreadcrumb, clearBreadcrumbs } = useBreadcrumb();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const { auth, logout } = useContext(AuthContext);
  const menuRef = useRef();
  const web3ModalRef = useRef(null);

  const styles = {
    dashboard: {
      display: "flex",
      height: "100vh",
      fontFamily: "sans-serif",
      backgroundColor: "var(--background-main)",
      color: "var(--text-primary)",
      overflow: "hidden",
    },
    sidebar: {
      padding: "1.5rem 0rem",
      transition: "width 0.3s ease",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-primary)",
    },
    logoIcon: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    logoText: {
      marginLeft: "0.75rem",
      fontWeight: "bold",
      fontSize: "1.4rem",
      letterSpacing: "0.5px",
    },
    collapseBtn: {
      position: "absolute",
      top: "3rem",
      right: "-20px",
      width: "40px",
      height: "40px",
      backgroundColor: "var(--button-bg)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      zIndex: 99,
      opacity: 1,
      outline: "none",
    },
    nav: {
      padding: "1rem 0rem",
      marginLeft: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      flex: 1,
      overflowY: "auto",
      minHeight: 0,
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.85rem 1.25rem",
      color: "var(--text-primary)",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderRadius: "12px",
      fontSize: "1rem",
    },
    menuIcon: {
      fontSize: "1.4rem",
      display: "flex",
      alignItems: "center",
    },
    menuTitle: {
      flex: 1,
      fontSize: "1rem",
      whiteSpace: "nowrap",
    },
    menuArrow: {
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
    },
    submenu: {
      paddingLeft: "2.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginTop: "0.5rem",
      animation: "fadeSlide 0.3s ease forwards",
    },
    submenuItem: {
      padding: "0.35rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      fontWeight: 500,
      color: theme === "dark" ? "var(--color-primary)" : "var(--color-warning)",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "var(--background-main)",
    },
    header: {
      padding: "0 2rem",
      height: "70px",
      minHeight: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "var(--background-header)",
      borderBottom: "1px solid var(--border-color)",
    },
    avatar: {
      width: "40px",
      height: "40px",
      background:
        theme === "dark"
          ? "var(--color-primary)"
          : "var(--color-secondary, #eee)",
      borderRadius: "50%",
      color: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  };

  const menus = [
    {
      title: "Admin Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard/admin",
      isMain: true,
    },
    {
      title: "Purchase Tokens",
      icon: <MdShoppingCart />,
      children: [
        { name: "Pending", path: "/dashboard/user/purchase/silver" },
        { name: "Approved", path: "/dashboard/user/purchase/gold" },
        { name: "Rejected", path: "/dashboard/user/purchase/agua" },
      ],
    },
    {
      title: "Redeem Tokens",
      icon: <MdRedeem />,
      children: [
        { name: "Pending", path: "/dashboard/user/redeem/silver" },
        { name: "Approved", path: "/dashboard/user/redeem/gold" },
        { name: "Rejected", path: "/dashboard/user/redeem/agua" },
      ],
    },
    {
      title: "Mint Tokens",
      icon: <MdBolt />,
      children: [
        { name: "Pending", path: "/dashboard/user/mint/silver" },
        { name: "Approved", path: "/dashboard/user/mint/gold" },
        { name: "Rejected", path: "/dashboard/user/mint/agua" },
      ],
    },
    {
      title: "Users Requests",
      icon: <MdPerson />,
      children: [
        { name: "Pending", path: "/dashboard/user/token/pending" },
        { name: "Approved", path: "/dashboard/user/token/approved" },
        { name: "Blacklisted", path: "/dashboard/user/token/rejected" },
      ],
    },
    {
      title: "Notifications",
      icon: <MdNotifications />,
      children: [
        { name: "Announcements", path: "/dashboard/user/token/pending" },
        { name: "New Notification", path: "/dashboard/user/token/approved" },
        { name: "Notifications History", path: "/dashboard/user/token/rejected" },
      ],
    },
    {
      title: "Reports",
      icon: <TbReport />,
      children: [
        { name: "Announcements", path: "/dashboard/user/token/pending" },
        { name: "New Notification", path: "/dashboard/user/token/approved" },
        { name: "Notifications History", path: "/dashboard/user/token/rejected" },
      ],
    },
    {
      title: "Payments",
      icon: <MdOutlinePayments />,
      children: [
        { name: "Announcements", path: "/dashboard/user/token/pending" },
        { name: "New Notification", path: "/dashboard/user/token/approved" },
        { name: "Notifications History", path: "/dashboard/user/token/rejected" },
      ],
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

  const connectWallet = async () => {
    try {
      if (!web3ModalRef.current) {
        web3ModalRef.current = new Web3Modal({
          cacheProvider: false,
          providerOptions,
        });
      }

      const instance = await web3ModalRef.current.connect();
      const provider = new BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setSigner(signer);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });

      web3Modal.clearCachedProvider();

      if (window.ethereum?.disconnect) {
        await window.ethereum.disconnect();
      }

      setWalletAddress(null);
      setSigner(null);
      logout();
      router.push("/");
    } catch (error) {
      console.log("Error disconnecting wallet:", error);
    }
  };

  const handleNavigation = async (path, name) => {
    try {
      setCurrentPage(name);
      clearBreadcrumbs(); // Clear existing breadcrumbs

      // Find the parent menu for this path
      const parentMenu = menus.find((menu) =>
        menu.children?.some((child) => child.path === path)
      );

      // Add breadcrumbs in correct order
      if (name !== "Dashboard") {
        // addBreadcrumb(   "/dashboard/user");
        if (parentMenu) {
          console.log("parentMenu==>", parentMenu);
          addBreadcrumb(parentMenu.title, `#${parentMenu.title.toLowerCase()}`);
        }
        addBreadcrumb(name, path);
      } else {
        addBreadcrumb("Dashboard", "/dashboard/user");
      }

      await router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div
      style={{
        ...styles.dashboard,
        backgroundColor: "var(--background-main)",
        color: "var(--text-primary)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? "100px" : "280px",
          backgroundColor: "var(--background-sidebar)",
          borderRight: "1px solid var(--border-color)",
          position: "relative",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <div style={styles.logo}>
          <span style={styles.logoIcon}>
            <Image src="/Agua-logo1.png" alt="logo" width={96} height={96} />
          </span>
          {/* {!collapsed && <span style={styles.logoText}>AGUA</span>} */}
        </div>
        <button
          style={{
            ...styles.collapseBtn,
            opacity: 1,
            fontSize: 25,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--button-hover-bg)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--button-bg)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
        </button>

        <nav style={styles.nav}>
          {menus.map((menu) => (
            <div key={menu.title}>
              <div
                style={{
                  ...styles.menuItem,
                  backgroundColor:
                    openMenu === menu.title
                      ? "var(--background-submenu)"
                      : "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--menu-active)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    openMenu === menu.title
                      ? "var(--background-submenu)"
                      : "transparent")
                }
                onClick={() => {
                  if (menu.isMain) {
                    handleNavigation(menu.path, "Dashboard");
                  } else {
                    if (collapsed) setCollapsed(false);
                    setOpenMenu((prev) =>
                      prev === menu.title ? null : menu.title
                    );
                  }
                }}
              >
                <span style={styles.menuIcon}>{menu.icon}</span>
                {!collapsed && (
                  <span style={styles.menuTitle}>{menu.title}</span>
                )}
                {!collapsed && !menu.isMain && (
                  <span style={styles.menuArrow}>
                    {openMenu === menu.title ? (
                      <MdExpandLess />
                    ) : (
                      <MdExpandMore />
                    )}
                  </span>
                )}
              </div>

              {!menu.isMain && openMenu === menu.title && !collapsed && (
                <div style={styles.submenu}>
                  {menu.children.map((child, index) => (
                    <div
                      key={child.name}
                      style={{
                        ...styles.submenuItem,
                        animation: `fadeSlide 0.3s ease ${index * 0.05}s both`,
                      }}
                      onClick={() => handleNavigation(child.path, child.name)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--menu-active)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      {child.name}
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
        <header
          style={{
            ...styles.header,
            backgroundColor: "var(--background-header)",
            borderBottom: "1px solid var(--border-color)",
            height: "70px",
            minHeight: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path}>
                {index > 0 && " / "}
                {crumb.label}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            <button
              onClick={walletAddress ? disconnectWallet : connectWallet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor:
                  theme === "dark"
                    ? "var(--color-primary)"
                    : "var(--color-warning)",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
                fontSize: "0.9rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <MdAccountBalanceWallet size={18} />
              {walletAddress
                ? `Connected: ${walletAddress.slice(
                    0,
                    6
                  )}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </button>

            <ThemeToggle />

            <div
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              style={styles.avatar}
            >
              <MdAccountCircle size={36} />
            </div>

            {avatarMenuOpen && (
              <div
                ref={menuRef}
                style={{
                  position: "absolute",
                  top: "40px",
                  right: -10,
                  backgroundColor: "var(--background-header)",
                  zIndex: 1000,
                }}
              >
                <AvatarMenu
                  auth={auth}
                  walletAddress={walletAddress}
                  disconnectWallet={disconnectWallet}
                  onLogout={() => {
                    localStorage.removeItem("authToken");
                    disconnectWallet();
                    router.push("/");
                  }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "0rem", flex: 1, overflow: "auto" }}>
          {children || <h2>{currentPage}</h2>}
        </div>
      </main>
    </div>
  );
}
