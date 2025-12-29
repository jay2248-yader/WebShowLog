import React from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ title = "CSC Sale" }) {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">ກັບຄືນ</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
            {title}
          </h1>
         <button
  onClick={() => navigate('/home', { replace: true })}
  className="
    flex items-center gap-2
    bg-[#0F75BC]
    hover:bg-[#0C5FA0]
    active:bg-[#094A7D]
    text-white px-4 py-2
    rounded-lg
    transition-colors
  "
>

            <Home className="w-4 h-4" />
            <span className="text-sm font-bold">home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
