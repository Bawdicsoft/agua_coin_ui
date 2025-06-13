import UserDashboard from "@/components/user/UserDashboard";

export default function UserDashboardLayout({ children }) {
  return (
    <UserDashboard>
      {children}
    </UserDashboard>
  );
}
