// import { useBreadcrumb } from "@/context/BreadcrumbContext";
// import { MdAccountCircle, MdVpnKey, MdLogout } from "react-icons/md";

// export default function AvatarMenu({ collapsed, onSelect, onLogout }) {
//       const { setBreadcrumb } = useBreadcrumb();
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         right: 15,
//         backgroundColor: "var(--menu-background)", // <- use this for proper background
//         border: "1px solid var(--border-color)",
//         borderRadius: "6px",
//         overflow: "hidden",
//         zIndex: 999,
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//         minWidth: collapsed ? "40px" : "200px",
//       }}
//     >
//       <div
//         style={{
//           padding: "0.5rem 1rem",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           color: "var(--text-primary)",
//           borderBottom: "1px solid var(--border-color)",
//         }}
//         onClick={() => onSelect("Profile")}
//       >
//         <MdAccountCircle size={18} />
//         {!collapsed && <span style={{ marginLeft: "8px" }}>Profile</span>}
//       </div>

//       <div
//         style={{
//           padding: "0.5rem 1rem",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           color: "var(--text-primary)",
//           borderBottom: "1px solid var(--border-color)",
//         }}
//         onClick={() => onSelect("Change Password")}
//       >
//         <MdVpnKey size={18} />
//         {!collapsed && (
//           <span style={{ marginLeft: "8px" }}>Change Password</span>
//         )}
//       </div>

//       <div
//         style={{
//           padding: "0.5rem 1rem",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           color: "var(--text-danger, #f44336)",
//         }}
//         onClick={onLogout}
//       >
//         <MdLogout size={18} />
//         {!collapsed && <span style={{ marginLeft: "8px" }}>Logout</span>}
//       </div>
//     </div>
//   );
// }


import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { MdAccountCircle, MdLogout, MdVpnKey } from "react-icons/md";

export default function AvatarMenu({ collapsed, onLogout }) {
  const { setBreadcrumb } = useBreadcrumb();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 15,
        backgroundColor: "var(--menu-background)",
        border: "1px solid var(--border-color)",
        borderRadius: "6px",
        overflow: "hidden",
        zIndex: 999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: collapsed ? "40px" : "200px",
      }}
    >
      <div
        style={itemStyle}
        onClick={() => setBreadcrumb("Profile")}
      >
        <MdAccountCircle size={18} />
        {!collapsed && <span style={{ marginLeft: "8px" }}>Profile</span>}
      </div>

      <div
        style={itemStyle}
        onClick={() => setBreadcrumb("Change Password")}
      >
        <MdVpnKey size={18} />
        {!collapsed && <span style={{ marginLeft: "8px" }}>Change Password</span>}
      </div>

      <div
        style={{ ...itemStyle, color: "var(--text-danger, #f44336)" }}
        onClick={onLogout}
      >
        <MdLogout size={18} />
        {!collapsed && <span style={{ marginLeft: "8px" }}>Logout</span>}
      </div>
    </div>
  );
}

const itemStyle = {
  padding: "0.5rem 1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "var(--text-primary)",
  borderBottom: "1px solid var(--border-color)",
};
