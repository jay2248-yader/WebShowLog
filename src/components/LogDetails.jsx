import React, { useState, useEffect } from "react";

function LogDetails({ log, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!log) return null;

  const formatTimestamp = (timestamp) => {
    if (!timestamp || timestamp === "N/A") return "N/A";

    try {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } catch {
      return timestamp;
    }
  };

  const formatData = (dataString) => {
    try {
      const parsed = JSON.parse(dataString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return dataString;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F75BC] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">ລາຍລະອຽດ Log</h2>
          <button
            onClick={handleClose}
            className="hover:bg-blue-700 rounded-full p-1 transition-all duration-200 hover:rotate-90"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                <label className="text-sm font-medium text-gray-600">ລຳດັບ</label>
                <p className="mt-1 text-gray-900 font-semibold">
                  {log.displayNum || log.id}
                </p>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
                <label className="text-sm font-medium text-gray-600">
                  ລະຫັດຜູ້ໃຊ້
                </label>
                <p className="mt-1 text-gray-900 font-semibold">
                  {log.userCode}
                </p>
              </div>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <label className="text-sm font-medium text-gray-600">ເຫດການ</label>
              <p className="mt-1 text-gray-900">{log.action}</p>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: "0.25s" }}>
              <label className="text-sm font-medium text-gray-600">
                ວັນທີ ແລະ ເວລາ
              </label>
              <p className="mt-1 text-gray-900">
                {formatTimestamp(log.timestamp)}
              </p>
            </div>


  <div>
              <label className="text-sm font-medium text-gray-600">ຂໍ້ມູນ</label>
              <div className="mt-1 bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-900 overflow-auto max-w-full" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {log.fullText || formatData(log.data)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-[#0F75BC]  text-white rounded-lg hover:bg-blue-800 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            ປິດ
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default LogDetails;
