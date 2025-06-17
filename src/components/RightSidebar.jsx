"use client";

import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function RightSidebar() {
  const { setBreadcrumb } = useBreadcrumb();

  const links = [
    { label: "Profile Settings", href: "#" },
    { label: "Transaction History", href: "#" },
    { label: "Security Options", href: "#" },
    { label: "Support", href: "#" },
  ];

  const handleClick = (label) => {
    setBreadcrumb(label);
  };

  return (
    <div className="h-full w-full bg-[var(--menu-background)] p-4 rounded-xl text-[var(--text-primary)] box-border self-stretch">
      <h3 className="mb-4 text-lg font-medium">Quick Links</h3>

      <ul className="flex flex-col gap-2">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              onClick={() => handleClick(label)}
              className="block w-full text-[var(--accent-yellow)] text-[0.95rem] no-underline hover:underline transition"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
