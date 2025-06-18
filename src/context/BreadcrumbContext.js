"use client";
import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Dashboard", path: "/dashboard" }
  ]);

  const addBreadcrumb = (label, path) => {
    setBreadcrumbs(prev => [...prev, { label, path }]);
  };

  const removeBreadcrumb = (index) => {
    setBreadcrumbs(prev => prev.slice(0, index + 1));
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([{ label: "Dashboard", path: "/dashboard" }]);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, addBreadcrumb, removeBreadcrumb, clearBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
