"use client";

import { useState } from "react";
import { Search, MapPin, Navigation } from "lucide-react";

export default function HospitalsPage() {
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("Bệnh viện gần nhất");

  const handleSearch = () => {
    if (address.trim()) {
      setSearchQuery(`Bệnh viện, cơ sở y tế gần ${address}`);
    }
  };

  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <MapPin className="text-green-600 w-8 h-8" />
          Tra cứu Cơ sở Y tế
        </h1>
        <p className="text-gray-500">Nhập khu vực của bạn để tìm bệnh viện. Chọn "Chỉ đường chi tiết" để mở ứng dụng Bản đồ.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Ví dụ: Quận 10, TP Hồ Chí Minh..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-md flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span className="hidden md:inline">Tìm kiếm</span>
        </button>
      </div>

      <div className="mb-4 flex justify-end">
        <button 
          onClick={openGoogleMaps}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors border border-blue-200"
        >
          <Navigation className="w-4 h-4" />
          Xem danh sách & Chỉ đường chi tiết
        </button>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-[60vh] min-h-[400px]">
        <iframe
          width="100%"
          height="100%"
          className="rounded-xl border-none"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}