import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';



import Header from "../components/log/Header";
import FilterBar from "../components/log/FilterBar";
import LogTable from "../components/log/LogTable";
import Pagination from "../components/log/Pagination";
import LogDetails from "../components/log/LogDetails";
import { fetchLogs } from "../services/logService";
import { isDateInRange } from "../utils/dateUtils";

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
        
        const data = await fetchLogs(fetchUrl);
        if (mounted) setLogData(data);


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
        matchesDateRange = isDateInRange(row.timestamp, startDate, endDate);

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