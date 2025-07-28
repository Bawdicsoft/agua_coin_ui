"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { MdSearch, MdFilterList, MdSort } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function PendingTokenTable({ type }) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [paymentData, setPaymentData] = useState([]);
  const [redeemData, setRedeemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loader

      const token = localStorage.getItem("authToken");
      if (!token) {
        console.warn("No authToken found in localStorage.");
        return null;
      }
      // // console.log(token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;
      try {
        const response = await axios.get("/api/getSingleUserPaymentDetail", {
          params: { userId }, // 👈 send userId as query param
        });
        const result = response.data;
        const ordersArray = result.getPayment || [];
        const filteredTokens = ordersArray.filter(
          (order) => order.status === type
        );
        const response2 = await axios.get(
          "/api/getSingleUserRedeemTokenDetail",
          {
            params: { userId }, // 👈 send userId as query param
          }
        );
        const result2 = response2.data;
        const redeemsArray = result2.getRedeem || [];
        setRedeemData(redeemsArray);
        setPaymentData(filteredTokens);
        console.log("Fetched payment data:", filteredTokens);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setIsLoading(false); // Stop loader
      }
    };
    // const fetchRedeemData = async () => {
    //   try {
    //     const response = await axios.get("/api/getRedeemTokens");
    //     const result = response.data;
    //     const redeemsArray = result.RedeemDetail || [];
    //     setRedeemData(redeemsArray);
    //   } catch (error) {
    //     console.error("Error fetching redeem data:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchRedeemData();

    fetchData();
  }, [type]);

  const allData = [...paymentData, ...redeemData];

  const filteredData = allData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="w-full h-full p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold mb-2"
          style={{
            color:
              theme === "dark"
                ? "var(--color-primary)"
                : "var(--color-warning)",
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Tokens
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and manage your {type.toLowerCase()} token requests
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <MdSearch size={20} />
          </div>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          } transition-colors`}
          onClick={() => {
            /* Handle filter */
          }}
        >
          <MdFilterList size={20} />
          Filter
        </button>
      </div>

      {/* Table Section */}
      <div
        className={`rounded-xl shadow-sm overflow-hidden ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={theme === "dark" ? "bg-gray-800" : "bg-gray-200"}>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  // onClick={() => requestSort("tokenType")}
                >
                  <div className="flex items-center gap-2">
                    S.No
                    <MdSort size={16} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("tokenType")}
                >
                  <div className="flex items-center gap-2">
                    Token Type
                    <MdSort size={16} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("tokenQuantity")}
                >
                  <div className="flex items-center gap-2">
                    Quantity
                    <MdSort size={16} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("tokenStatus")}
                >
                  <div className="flex items-center gap-2">
                    TokenStatus
                    <MdSort size={16} />
                  </div>
                </th>

                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("totalAmount")}
                >
                  <div className="flex items-center gap-2">
                    Total Amount
                    <MdSort size={16} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("createdAt")}
                >
                  <div className="flex items-center gap-2">
                    Date
                    <MdSort size={16} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => requestSort("tokenStatus")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    <MdSort size={16} />
                  </div>
                </th>
                {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  TokenAddress
                </th> */}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                theme === "dark" ? "divide-gray-800" : "divide-gray-200"
              }`}
            >
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No {type} tokens found
                  </td>
                </tr>
              ) : (
                sortedData.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className={`hover:bg-opacity-50 transition-colors ${
                      theme === "dark"
                        ? "hover:bg-gray-800 bg-gray-900"
                        : "hover:bg-gray-200 bg-gray-100"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.tokenType}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.tokenQuantity}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.tokenStatus || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.totalAmount || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className={`${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {item.tokenAddress}
                      </button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{sortedData.length}</span> of{" "}
          <span className="font-medium">{sortedData.length}</span> results
        </div>
      </div>
    </div>
  );
}
