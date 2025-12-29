import React from "react";

function LogTable({ data, onViewDetails, startIndex = 0 }) {
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


  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#0F75BC] text-white">
            <th className="px-4 py-3 text-left text-sm font-medium">ລຳດັບ</th>
            <th className="px-4 py-3 text-left text-sm font-medium">ລະຫັດ</th>
            <th className="px-4 py-3 text-left text-sm font-medium">ເຫດການ</th>
            <th className="px-4 py-3 text-left text-sm font-medium">ລະຫັດສິນຄ້າ</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              ວັນທີ / ເດືອນ / ປີ ແລະ ເວລາ
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">ຈັດການ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                ບໍ່ມີຂໍ້ມູນ
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const displayNum = String(startIndex + index + 1).padStart(
                3,
                "0"
              );
              return (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {displayNum}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.userCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.action}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.productcode === "N/A" ? "ບໍ່ມີຂໍ້ມູນ" : row.productcode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {formatTimestamp(row.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewDetails({ ...row, displayNum })}
                      className="bg-blue-200 text-[#213F9A] px-4 py-1 rounded text-sm 
             hover:bg-blue-500 hover:text-white transition-all duration-200 hover:shadow-md"
                    >
                      ລາຍລະອຽດ
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LogTable;
