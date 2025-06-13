"use client";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function Breadcrumb() {
  const { breadcrumb } = useBreadcrumb();

  return (
    <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
      Dashboard {breadcrumb !== "Dashboard" && ` / ${breadcrumb}`}
    </div>
  );
}
