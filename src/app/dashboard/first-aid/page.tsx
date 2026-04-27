"use client";

import { useState } from "react";
import { Flame, AlertTriangle, Droplet, Wind, ChevronDown, ChevronUp, Stethoscope } from "lucide-react";

export default function FirstAidPage() {
  const[openIndex, setOpenIndex] = useState<number | null>(0);

  const guides =[
    {
      title: "Sơ cứu Bỏng (Nước sôi, Lửa)",
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      content:[
        "1. Lập tức ngâm phần bị bỏng vào nước mát (không dùng nước đá lạnh) từ 15-20 phút.",
        "2. Không làm vỡ các bọng nước trên da.",
        "3. Che phủ vết thương bằng gạc vô trùng hoặc vải sạch, không có nilon.",
        "4. Nếu vết bỏng lớn hơn bàn tay hoặc ở mặt, háng... hãy đến bệnh viện ngay."
      ]
    },
    {
      title: "Sơ cứu Hóc dị vật (Nghiệm pháp Heimlich)",
      icon: <Wind className="w-6 h-6 text-red-500" />,
      content:[
        "1. Đứng ra sau lưng nạn nhân, vòng hai tay ôm lấy eo.",
        "2. Nắm chặt bàn tay thành nắm đấm, đặt ngón cái ngay trên rốn nạn nhân.",
        "3. Bàn tay kia ôm lấy nắm đấm.",
        "4. Giật mạnh từ trước ra sau, từ dưới lên trên 5 lần dứt khoát.",
        "5. Lặp lại cho đến khi dị vật văng ra."
      ]
    },
    {
      title: "Sơ cứu Chảy máu nghiêm trọng",
      icon: <Droplet className="w-6 h-6 text-red-600" />,
      content:[
        "1. Yêu cầu nạn nhân nằm hoặc ngồi xuống.",
        "2. Dùng gạc sạch hoặc mảnh vải dày ấn chặt trực tiếp lên vết thương để cầm máu.",
        "3. Nâng cao vùng bị thương cao hơn tim (nếu là tay hoặc chân).",
        "4. Nếu máu thấm ướt băng, KHÔNG tháo ra, hãy đắp thêm một lớp băng khác lên trên.",
        "5. Gọi ngay cấp cứu 115."
      ]
    },
    {
      title: "Sơ cứu khi bị Động vật cắn",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      content:[
        "1. Rửa vết thương ngay lập tức dưới vòi nước chảy liên tục trong 10-15 phút.",
        "2. Rửa lại nhẹ nhàng bằng xà phòng, cồn hoặc povidine-iodine.",
        "3. Lau khô và băng nhẹ vết thương lại.",
        "4. Đến ngay cơ sở y tế gần nhất để tiêm phòng Dại và Uốn ván. KHÔNG TỰ CHỮA MẸO."
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <Stethoscope className="text-red-600 w-8 h-8" />
          Cẩm nang Sơ cứu Khẩn cấp
        </h1>
        <p className="text-gray-500">
          Hướng dẫn xử lý nhanh các tình huống tai nạn thường gặp. Hãy giữ bình tĩnh và thao tác đúng cách trước khi y bác sĩ tới.
        </p>
      </div>

      <div className="space-y-4">
        {guides.map((guide, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-xl">
                  {guide.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-left">{guide.title}</h3>
              </div>
              {openIndex === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-5 bg-red-50/30 border-t border-gray-100">
                <ul className="space-y-3">
                  {guide.content.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-700 font-medium">
                      {step}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Ghi nhớ: Luôn gọi 115 trong các trường hợp nguy hiểm đến tính mạng!
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}