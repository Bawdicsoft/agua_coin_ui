"use client";
import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
