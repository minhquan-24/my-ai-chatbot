"use client";

import { useState } from "react";
import { Calculator, Activity, ArrowRight, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function BMIPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const result = w / (h * h);
      setBmi(Math.round(result * 10) / 10);
    } else {
      alert("Vui lòng nhập chiều cao và cân nặng hợp lệ!");
    }
  };

  const getStatus = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Thiếu cân (Gầy)", color: "text-blue-500", bg: "bg-blue-50", isNormal: false };
    if (bmiValue < 24.9) return { label: "Bình thường", color: "text-green-500", bg: "bg-green-50", isNormal: true };
    if (bmiValue < 29.9) return { label: "Thừa cân", color: "text-orange-500", bg: "bg-orange-50", isNormal: false };
    return { label: "Béo phì", color: "text-red-500", bg: "bg-red-50", isNormal: false };
  };

  const statusInfo = bmi !== null ? getStatus(bmi) : null;
  const promptText = `Tôi có chỉ số BMI là ${bmi} (${statusInfo?.label}). Hãy gợi ý cho tôi một thực đơn ăn uống và chế độ tập luyện chi tiết để cải thiện chỉ số này về mức bình thường.`;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <Calculator className="text-purple-600 w-8 h-8" />
          Đánh giá chỉ số cơ thể (BMI)
        </h1>
        <p className="text-gray-500">Nhập chiều cao và cân nặng để xem tình trạng dinh dưỡng của bạn.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chiều cao (cm)</label>
            <input 
              type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Ví dụ: 170"
              className="w-full px-4 py-3 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cân nặng (kg)</label>
            <input 
              type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ví dụ: 65"
              className="w-full px-4 py-3 text-gray-800 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
            />
          </div>
        </div>
        <button onClick={calculateBMI} className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-md">
          Tính BMI
        </button>
      </div>

      {bmi !== null && statusInfo && (
        <div className={`p-6 rounded-3xl border ${statusInfo.bg} transition-all`}>
          <div className="flex items-center gap-4 mb-4">
            <Activity className={`w-10 h-10 ${statusInfo.color}`} />
            <div>
              <p className="text-sm text-gray-600 font-medium">Chỉ số BMI của bạn</p>
              <h2 className={`text-4xl font-extrabold ${statusInfo.color}`}>{bmi}</h2>
            </div>
          </div>
          <p className="text-lg text-gray-800 font-medium mb-4">
            Đánh giá: <span className={statusInfo.color}>{statusInfo.label}</span>
          </p>
          
          {statusInfo.isNormal ? (
             <div className="flex items-center gap-2 text-green-700 bg-green-100 px-4 py-3 rounded-lg font-medium">
               <HeartHandshake className="w-5 h-5" /> Tuyệt vời! Hãy tiếp tục duy trì lối sống lành mạnh nhé.
             </div>
          ) : (
            <Link 
              href="/dashboard/chat"
              onClick={() => sessionStorage.setItem("medicloud_autoprompt", promptText)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
               Nhờ AI tư vấn khắc phục <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}