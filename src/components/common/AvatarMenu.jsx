import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

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
          Change Password
        </h2>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className={
              " w-full h-10 mb-2 p-2 rounded border pr-10 border-gray-300 bg-white text-gray-900 placeholder-gray-500 "
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-2 top-2 ${
              theme === "dark"
                ? "text-neutral-400 hover:text-neutral-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className={
              " w-full h-10 mb-2 p-2 rounded border pr-10 border-gray-300 bg-white text-gray-900 placeholder-gray-500 "
            }
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-2  top-2 ${
              theme === "dark"
                ? "text-neutral-400 hover:text-neutral-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`flex-1 h-10 rounded font-semibold text-sm ${
              theme === "dark"
                ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-100"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`flex-1 h-10 rounded font-semibold text-sm ${
              theme === "dark"
                ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-white"
            }`}
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
      ></button>
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
              src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"
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
