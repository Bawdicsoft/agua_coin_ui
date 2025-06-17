"use client";
import React, { createContext, useState, useCallback } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ message, type = "info" }) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`flex items-center text-gray-900 px-6 py-3 rounded shadow-md max-w-xs mx-auto bg-white border-l-8
      ${
        {
          success: "border-green-500",
          error: "border-red-500",
          warning: "border-yellow-400",
          info: "border-blue-500",
        }[toast.type] || "border-blue-500"
      }
    `}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
