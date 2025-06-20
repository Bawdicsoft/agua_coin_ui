import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function ProfileModal({ open, onClose, user }) {
  const { theme } = useTheme();
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        className={`bg-white dark:bg-neutral-900 rounded-xl p-6 min-w-[400px] max-w-[90vw] shadow-xl ${
          theme === "dark"
            ? "border border-neutral-700"
            : "border border-gray-200"
        }`}
      >
        <h2
          className={`text-lg font-bold mb-4 ${
            theme === "dark" ? "text-gray-700" : "text-gray-700"
          }`}
        >
          Profile
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-yellow-400 overflow-hidden">
            <img
              src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"
              alt="User avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div
              className={`font-semibold text-base ${
                theme === "dark" ? "text-gray-700" : "text-gray-700"
              }`}
            >
              {user?.name || "User"}
            </div>
            <div
              className={`text-xs ${
                theme === "dark" ? "text-neutral-500" : "text-gray-500"
              }`}
            >
              {user?.email || "-"}
            </div>
          </div>
        </div>
        <button
          className={`w-full h-10 rounded font-semibold text-xs ${
            theme === "dark"
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-100"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ChangePasswordModal({ open, onClose }) {
  const { theme } = useTheme();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        className={`max-w-lg w-full font-lora rounded-2xl shadow-lg border transition-colors bg-white dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 p-8`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight dark:text-neutral-100 text-neutral-900">
          Change Password
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors ${theme === "dark" ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-200"}`}>
            <label className="text-sm font-semibold">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition ${theme === "dark" ? "bg-neutral-900 border-neutral-700 text-neutral-100 focus:ring-neutral-600" : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300"}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-neutral-400 hover:text-neutral-300" : "text-gray-500 hover:text-gray-700"}`}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <div className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors ${theme === "dark" ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-200"}`}>
            <label className="text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition ${theme === "dark" ? "bg-neutral-900 border-neutral-700 text-neutral-100 focus:ring-neutral-600" : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300"}`}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-neutral-400 hover:text-neutral-300" : "text-gray-500 hover:text-gray-700"}`}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            className={`flex-1 px-6 py-3 rounded-lg text-base font-bold shadow transition ${theme === "dark" ? "bg-neutral-700 text-neutral-100 hover:bg-neutral-600" : "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`flex-1 px-6 py-3 rounded-lg text-base font-bold shadow transition ${theme === "dark" ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white" : "bg-yellow-400 hover:bg-yellow-500 text-white"}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AvatarMenu({
  auth,
  walletAddress,
  disconnectWallet,
  onLogout,
}) {
  const { setBreadcrumb } = useBreadcrumb();
  const router = useRouter();
  const { theme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="dropdown dropdown-end relative">
      <button
        tabIndex={0}
        className="avatar cursor-pointer border-0 bg-transparent p-0 m-0 flex items-center justify-center"
        aria-label="User menu"
        style={{ boxShadow: "none", width: "32px", height: "32px" }}
      >
      </button>
      <div
        tabIndex={0}
        className={`dropdown-content z-50 min-w-44 border rounded-xl p-3 space-y-2 ${
          theme === "dark"
            ? "bg-neutral-900 text-neutral-100 border-neutral-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
        style={{
          minWidth: "180px",
          maxWidth: "200px",
          marginTop: -20,
          marginRight: 25,
          boxShadow: "none",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-full border-2 border-yellow-400 overflow-hidden ${
              theme === "dark" ? "bg-neutral-800" : "bg-white"
            }`}
          >
            <img
              src={auth?.user?.profilePicture || "https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"}
              alt="User avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold truncate">
              {auth?.user?.name || "User"}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {auth?.user?.email || "-"}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-600 space-y-1 mb-1">
          <p>
            <span className="font-medium">Wallet:</span>{" "}
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Not connected"}
          </p>
        </div>
        <button
          className={`w-full py-1 rounded-md font-semibold text-xs transition ${
            theme === "dark"
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-100"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
          style={{ fontSize: "0.84rem" }}
          onClick={() => setShowProfile(true)}
        >
          Profile
        </button>
        <button
          className={`w-full py-1 rounded-md font-semibold text-xs transition ${
            theme === "dark"
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-100"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
          style={{ fontSize: "0.84rem" }}
          onClick={() => setShowChangePassword(true)}
        >
          Change Password
        </button>
        <button
          className={`w-full py-1 rounded-md font-semibold text-xs transition ${
            theme === "dark"
              ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-white"
          }`}
          style={{ fontSize: "0.84rem" }}
          onClick={() => {
            localStorage.removeItem("authToken");
            disconnectWallet();
            if (onLogout) onLogout();
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={auth?.user}
      />
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
