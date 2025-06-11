// "use client";

// import Link from "next/link";

// export default function Button({
//   children,
//   onClick,
//   href,
//   variant = "primary", // "primary", "secondary", "outline", "ghost"
//   size = "md",         // "sm", "md", "lg"
//   className = "",
//   disabled = false,
//   iconLeft = null,
//   iconRight = null,
//   type = "button",
// }) {
//   const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition";

//   const variants = {
//     primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
//     secondary: "bg-[var(--color-secondary-bg)] text-[var(--color-secondary-text)] hover:bg-gray-200",
//     outline: "border border-[var(--color-outline-border)] text-[var(--color-outline-border)] hover:bg-[var(--color-outline-hover)]",
//     ghost: "text-[var(--color-outline-border)] hover:bg-[var(--color-ghost-hover)]",
//   };

//   const sizes = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//   };

//   const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

//   if (href) {
//     return (
//       <Link href={href} className={combinedClass}>
//         {iconLeft && <span className="mr-2">{iconLeft}</span>}
//         {children}
//         {iconRight && <span className="ml-2">{iconRight}</span>}
//       </Link>
//     );
//   }

//   return (
//     <button onClick={onClick} disabled={disabled} className={combinedClass} type={type}>
//       {iconLeft && <span className="mr-2">{iconLeft}</span>}
//       {children}
//       {iconRight && <span className="ml-2">{iconRight}</span>}
//     </button>
//   );
// }



"use client";

import Link from "next/link";

export default function Button({
  children,
  onClick,
  href,
  variant = "primary", // new variants added: "primary", "secondary", "outline", "ghost", "success", "danger", "warning"
  size = "md",         // "sm", "md", "lg"
  className = "",
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition duration-200 shadow-md";

  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
    secondary: "bg-[var(--color-secondary-bg)] text-[var(--color-secondary-text)] hover:bg-[var(--color-secondary-hover)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
    outline: "border border-[var(--color-outline-border)] text-[var(--color-outline-border)] hover:bg-[var(--color-outline-hover)]",
    ghost: "text-[var(--color-outline-border)] hover:bg-[var(--color-ghost-hover)]",
    success: "bg-[var(--color-success)] text-white hover:bg-[var(--color-success-hover)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
    danger: "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
    warning: "bg-[var(--color-warning)] text-black hover:bg-[var(--color-warning-hover)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={combinedClass} type={type}>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
}
