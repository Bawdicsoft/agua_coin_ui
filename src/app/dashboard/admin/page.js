"use client";
import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCardsForAdmin from "@/components/admin/SummaryCardsForAdmin";
import { AuthContext } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isLoggedIn || auth?.user?.role !== "admin") {
      // router.push("/unauthorized");
      console.log("You are unauthorized person");
    }
  }, [auth]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="flex flex-col gap-4 w-full lg:w-3/4 order-1 lg:order-1">
        <SummaryCardsForAdmin />
        <EarningsChart />
      </div>
      <div className="w-full lg:w-1/4 order-3 lg:order-2">
        <RightSidebar />
      </div>
    </div>
  );
}

export const fetchUserData = async (setUser) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded); // Store decoded user data
      console.log("Decoded User:", decoded);
    } catch (err) {
      console.error("Invalid Token", err);
      setUser(null);
    }
  }
};
