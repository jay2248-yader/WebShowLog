import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';


import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import LogTable from "../components/LogTable";
import Pagination from "../components/Pagination";
import LogDetails from "../components/LogDetails";

function ShowLogScreen() {

  
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);

  const location = useLocation();
  

  useEffect(() => {
    let mounted = true;
    const doFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        // allow overriding source via query param ?source=
        const params = new URLSearchParams(location.search);
        const source = params.get('source');
        const fetchUrl = source || "/api/out.txt";
        const response = await fetch(fetchUrl);
        const text = await response.text();

        const lines = text.trim().split("\n");
        const parsedData = lines.map((line, index) => {
          const userMatch = line.match(/USER:\s*(\d+)/);
          const actionMatch = line.match(/,\s*([^,]+),\s*Data:/);
          const dataMatch = line.match(/Data:\s*({[^}]+})/);
          const dateMatch = line.match(/Date:\s*(.+)$/);

          return {
            id: String(index + 1).padStart(3, "0"),
            userCode: userMatch ? userMatch[1] : "N/A",
            action: actionMatch ? actionMatch[1].trim() : "N/A",
            data: dataMatch ? dataMatch[1] : "{}",
            productcode: (() => {
              try {
                const parsed = JSON.parse(dataMatch ? dataMatch[1] : "{}");
                return parsed.productcode || parsed.productCode || "N/A";
              } catch {
                return "N/A";
              }
            })(),
            timestamp: dateMatch ? dateMatch[1] : "N/A",
            fullText: `USER: ${userMatch ? userMatch[1] : "N/A"}, ${actionMatch ? actionMatch[1].trim() : "N/A"}, Data: ${dataMatch ? dataMatch[1] : "{}"}, Date: ${dateMatch ? dateMatch[1] : "N/A"}`,
            status: "True",
          };
        });

        if (mounted) setLogData(parsedData);
      } catch (err) {
        if (mounted) setError("ไม่สามารถโหลดข้อมูลได้: " + err.message);
        console.error("Error fetching logs:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    doFetch();

    return () => { mounted = false; };
  }, [location.search]);

  const filteredData = React.useMemo(() => {
    return logData.filter((row) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        row.userCode.toLowerCase().includes(searchLower) ||
        row.action.toLowerCase().includes(searchLower) ||
        (row.productcode && row.productcode.toLowerCase().includes(searchLower)) ||
        row.data.toLowerCase().includes(searchLower);

      let matchesDateRange = true;
      if (row.timestamp && row.timestamp !== "N/A") {
        try {
          const rowDate = new Date(row.timestamp);
          const rowDateOnly = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());
          const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
          const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
          
          matchesDateRange = rowDateOnly >= startDateOnly && rowDateOnly <= endDateOnly;
        } catch {
          matchesDateRange = true;
        }
      }

      return matchesSearch && matchesDateRange;
    });
  }, [logData, searchQuery, startDate, endDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, searchQuery]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (row) => {
    setSelectedLog(row);
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
  };

  const headerTitle = location.state && location.state.title ? location.state.title : 'CSC Sale';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={headerTitle} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">ກຳລັງໂຫລດຂໍ້ມູນ..</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <LogTable data={currentData} startIndex={startIndex} onViewDetails={handleViewDetails} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        )}
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <LogDetails log={selectedLog} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default ShowLogScreen;