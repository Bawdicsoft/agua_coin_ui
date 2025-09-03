"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTheme } from "@/context/ThemeContext";

const Page = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("/api/getOrderDetails");
        const allRecords = res.data.getOrders || [];
        setAllData(allRecords);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    fetchAllData();
  }, []);
  const { theme } = useTheme();

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UserData");
    XLSX.writeFile(workbook, "user_data.xlsx");
  };

  //   const handlePdfDownload = () => {
  //     const doc = new jsPDF();

  //     const tableColumn = [
  //       "User",
  //       "Email",
  //       "Status",
  //       "Token Type",
  //       "Token Quantity",
  //       "Amount",
  //       "Date",
  //     ];

  //     const tableRows = allData.map((item) => [
  //       item?.name || "N/A",
  //       item?.email || "N/A",
  //       item?.status || "N/A",
  //       item?.tokenStatus || "N/A",
  //       item?.quantity || "N/A",
  //       item?.totalAmount || "N/A",
  //       new Date(item?.createdAt).toLocaleDateString() || "N/A",
  //     ]);

  //     doc.autoTable({
  //       head: [tableColumn],
  //       body: tableRows,
  //     });

  //     doc.save("user_data.pdf");
  //   };
  //   const handlePdfDownload = async () => {
  //     const jsPDF = (await import("jspdf")).default;
  //     const autoTable = (await import("jspdf-autotable")).default;

  //     const doc = new jsPDF();

  //     const tableColumn = [
  //       "User",
  //       "Email",
  //       "Status",
  //       "Token Type",
  //       "Token Quantity",
  //       "Amount",
  //       "Date",
  //     ];

  //     const tableRows = allData.map((item) => [
  //       item?.name || "N/A",
  //       item?.email || "N/A",
  //       item?.status || "N/A",
  //       item?.tokenStatus || "N/A",
  //       item?.quantity || "N/A",
  //       item?.totalAmount || "N/A",
  //       new Date(item?.createdAt).toLocaleDateString() || "N/A",
  //     ]);

  //     autoTable(doc, {
  //       head: [tableColumn],
  //       body: tableRows,
  //     });

  //     doc.save("user_data.pdf");
  //   };
  //   const handlePdfDownload = async () => {
  //     const jsPDF = (await import("jspdf")).default;
  //     const autoTable = (await import("jspdf-autotable")).default;

  //     const doc = new jsPDF();

  //     // Draw a page border (rectangle)
  //     doc.setLineWidth(0.5);
  //     doc.rect(5, 5, 200, 287); // (x, y, width, height)

  //     const tableColumn = [
  //       "User",
  //       "Email",
  //       "Status",
  //       "Token Type",
  //       "Token Quantity",
  //       "Amount",
  //       "Date",
  //     ];

  //     const tableRows = allData.map((item) => [
  //       item?.name || "N/A",
  //       item?.email || "N/A",
  //       item?.status || "N/A",
  //       item?.tokenStatus || "N/A",
  //       item?.quantity || "N/A",
  //       item?.totalAmount || "N/A",
  //       new Date(item?.createdAt).toLocaleDateString() || "N/A",
  //     ]);

  //     autoTable(doc, {
  //       head: [tableColumn],
  //       body: tableRows,
  //       startY: 10, // table position
  //       theme: "grid", // adds lines around cells
  //       headStyles: {
  //         fillColor: [41, 128, 185], // header background (blue)
  //         textColor: [255, 255, 255], // white text
  //         fontSize: 10,
  //         halign: "center",
  //       },
  //       styles: {
  //         fontSize: 9,
  //         cellPadding: 3,
  //       },
  //       alternateRowStyles: {
  //         fillColor: [245, 245, 245], // light gray background on alternate rows
  //       },
  //     });

  //     doc.save("user_data.pdf");
  //   };
  //   const handlePdfDownload = async () => {
  //     const jsPDF = (await import("jspdf")).default;
  //     const autoTable = (await import("jspdf-autotable")).default;

  //     const doc = new jsPDF();

  //     // 🔵 Draw page border
  //     doc.setLineWidth(0.5);
  //     doc.rect(5, 5, 200, 287);

  //     // 🔵 Add logo (must be base64 or public URL)
  //     const logo = "/Agua-logo1.png"; // change this to your actual path or base64 string

  //     const img = new Image();
  //     img.src = logo;

  //     img.onload = () => {
  //       doc.addImage(img, "PNG", 50, 10, 30, 15); // (image, format, x, y, width, height)

  //       // 🔵 Table headers
  //       const tableColumn = [
  //         "User",
  //         "Email",
  //         "Status",
  //         "Token Type",
  //         "Token Quantity",
  //         "Amount",
  //         "Date",
  //       ];

  //       const tableRows = allData.map((item) => [
  //         item?.name || "N/A",
  //         item?.email || "N/A",
  //         item?.status || "N/A",
  //         item?.tokenStatus || "N/A",
  //         item?.quantity || "N/A",
  //         item?.totalAmount || "N/A",
  //         new Date(item?.createdAt).toLocaleDateString() || "N/A",
  //       ]);

  //       // 🔵 Add the table
  //       autoTable(doc, {
  //         head: [tableColumn],
  //         body: tableRows,
  //         startY: 30, // below logo + heading
  //         theme: "grid",
  //         headStyles: {
  //           fillColor: [41, 128, 185],
  //           textColor: [255, 255, 255],
  //           fontSize: 10,
  //           halign: "center",
  //         },
  //         styles: {
  //           fontSize: 9,
  //           cellPadding: 3,
  //         },
  //         alternateRowStyles: {
  //           fillColor: [245, 245, 245],
  //         },
  //       });

  //       // 🔵 Save the PDF
  //       doc.save("user_data.pdf");
  //     };
  //   };
  //   const handlePdfDownload = async () => {
  //     const jsPDF = (await import("jspdf")).default;
  //     const autoTable = (await import("jspdf-autotable")).default;

  //     const doc = new jsPDF();

  //     // 🔵 Draw page border
  //     doc.setLineWidth(0.5);
  //     doc.rect(5, 5, 200, 287); // x, y, width, height

  //     // 🔵 Load logo image
  //     const logo = new Image();
  //     logo.src = "/Agua-logo1.png"; // Path must be relative to public folder (e.g. public/Agua-logo1.png)

  //     logo.onload = () => {
  //       const pageWidth = doc.internal.pageSize.getWidth();
  //       const imageWidth = 30;
  //       const imageHeight = 15;
  //       const imageX = (pageWidth - imageWidth) / 2; // Center horizontally

  //       // 🔵 Add logo
  //       doc.addImage(logo, "PNG", imageX, 10, imageWidth, imageHeight);

  //       // 🔵 Add heading text under the logo
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       const companyName = "AGUA";
  //       const textWidth = doc.getTextWidth(companyName);
  //       doc.text(companyName, (pageWidth - textWidth) / 2, 30); // center heading at Y = 30

  //       // 🔵 Table data
  //       const tableColumn = [
  //         "User",
  //         "Email",
  //         "Status",
  //         "Token Type",
  //         "Token Quantity",
  //         "Amount",
  //         "Date",
  //       ];

  //       const tableRows = allData.map((item) => [
  //         item?.name || "N/A",
  //         item?.email || "N/A",
  //         item?.status || "N/A",
  //         item?.tokenStatus || "N/A",
  //         item?.quantity || "N/A",
  //         item?.totalAmount || "N/A",
  //         new Date(item?.createdAt).toLocaleDateString() || "N/A",
  //       ]);

  //       // 🔵 Add table
  //       autoTable(doc, {
  //         head: [tableColumn],
  //         body: tableRows,
  //         startY: 35, // start below logo + heading
  //         theme: "grid",
  //         headStyles: {
  //           fillColor: [41, 128, 185], // Blue header
  //           textColor: [255, 255, 255],
  //           fontSize: 10,
  //           halign: "center",
  //         },
  //         styles: {
  //           fontSize: 9,
  //           cellPadding: 3,
  //         },
  //         alternateRowStyles: {
  //           fillColor: [245, 245, 245], // Light gray
  //         },
  //       });

  //       // 🔵 Save PDF
  //       doc.save("user_data.pdf");
  //     };
  //   };
  const handlePdfDownload = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    // 🔵 Draw page border
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287); // x, y, width, height

    // 🔵 Load logo image
    const logo = new Image();
    logo.src = "/Agua-logo1.png"; // Make sure this image exists in your public folder

    logo.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imageWidth = 30;
      const imageHeight = 15;
      const imageX = (pageWidth - imageWidth) / 2; // Centered X

      // 🔵 Add centered logo
      doc.addImage(logo, "PNG", imageX, 10, imageWidth, imageHeight);

      // 🔵 Table data
      const tableColumn = [
        "User",
        "Email",
        "Status",
        "Token Type",
        "Token Quantity",
        "Amount",
        "Date",
      ];

      const tableRows = allData.map((item) => [
        item?.name || "N/A",
        item?.email || "N/A",
        item?.status || "N/A",
        item?.tokenStatus || "N/A",
        item?.quantity || "N/A",
        item?.totalAmount || "N/A",
        new Date(item?.createdAt).toLocaleDateString() || "N/A",
      ]);

      // 🔵 Add table after logo
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30, // Position below the logo
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontSize: 10,
          halign: "center",
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // 🔵 Save the PDF
      doc.save("user_data.pdf");
    };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">User History</h1>
        <div className="space-x-2">
          <button
            onClick={handleExcelDownload}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>
          <button
            onClick={handlePdfDownload}
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`min-w-full shadow-lg rounded-lg overflow-hidden
        ${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"}
      `}>
          <thead className={`
          ${
            theme === "dark"
              ? "bg-[#262626] text-gray-200"
              : "bg-gray-300 text-gray-700"
          }
          `}>
            <tr>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Token Type</th>
              <th className="py-2 px-4 border">Token Quantity</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{item?.name || "N/A"}</td>
                <td className="py-2 px-4 border">{item.email}</td>
                <td className="py-2 px-4 border">{item.status}</td>
                <td className="py-2 px-4 border">{item.tokenStatus}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">
                  {item.totalAmount || "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allData.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
