// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Send, Bot, User, HeartPulse, Loader2, Copy, Check, Trash2, X } from "lucide-react";
// import ReactMarkdown from 'react-markdown';

// const DEFAULT_MESSAGE = { 
//   role: "bot", 
//   text: "Xin chào! Mình là AI Chatbot chạy trên nền tảng Serverless Cloud. Mình có thể giúp gì cho bạn hôm nay?" 
// };

// export default function Home() {
//   const[messages, setMessages] = useState([DEFAULT_MESSAGE]);
//   const [input, setInput] = useState("");
//   const[isLoading, setIsLoading] = useState(false);
//   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const SUGGESTED_PROMPTS =[
//   "Trị ho tại nhà",
//   "Thực đơn giảm cân",
//   "Cách sơ cứu bỏng nước sôi",
//   "Dấu hiệu sốt xuất huyết"
// ];

//   useEffect(() => {
//     const savedChat = localStorage.getItem("chat_history");
//     if (savedChat) {
//       setMessages(JSON.parse(savedChat));
//     }
//   },[]);

//   useEffect(() => {
//     localStorage.setItem("chat_history", JSON.stringify(messages));
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleCopy = (text: string, index: number) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000); 
//   };

//   // Hàm xóa TẤT CẢ tin nhắn
//   const handleClearAll = () => {
//     if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?")) {
//       setMessages([DEFAULT_MESSAGE]);
//       localStorage.removeItem("chat_history");
//     }
//   };

//   // Hàm xóa MỘT tin nhắn cụ thể
//   const handleDeleteMessage = (indexToDelete: number) => {
//     setMessages(prevMessages => prevMessages.filter((_, index) => index !== indexToDelete));
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     const newMessages = [...messages, { role: "user", text: userMessage }];
    
//     setMessages(newMessages);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const apiMessages = newMessages.filter((msg, index) => !(index === 0 && msg.text === DEFAULT_MESSAGE.text));

//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: apiMessages }), 
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
//       } else {
//         setMessages((prev) =>[...prev, { role: "bot", text: "❌ Oops, có lỗi từ Serverless: " + data.error }]);
//       }
//     } catch (error) {
//       setMessages((prev) =>[...prev, { role: "bot", text: "❌ Mất kết nối đến Cloud Serverless." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-100 p-2 md:p-4">
//       <div className="w-full max-w-3xl h-[90vh] md:h-[85vh] flex flex-col bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white/50 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
//               <HeartPulse className="w-5 h-5 md:w-6 md:h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">AI Cloud Chatbot</h1>
//               <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
//                 <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-green-500"></span>
//                 </span>
//                 Serverless Active
//               </div>
//             </div>
//           </div>
          
//           <button 
//             onClick={handleClearAll}
//             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
//             title="Xóa toàn bộ lịch sử"
//           >
//             <Trash2 className="w-5 h-5" />
//             <span className="hidden md:inline text-sm font-medium">Clear All</span>
//           </button>
//         </div>

//         {/* Khung tin nhắn */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2 group`}>
              
//               {/* Avatar Bot */}
//               {msg.role === "bot" && (
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center border border-purple-200 mb-1 shrink-0">
//                   <Bot className="w-5 h-5 text-purple-600" />
//                 </div>
//               )}

//               {/* Bong bóng tin nhắn */}
//               <div className="relative max-w-[75%] md:max-w-[70%] flex flex-col gap-1">
//                 <div
//                   className={`px-4 py-3 md:px-5 md:py-3 rounded-2xl text-[14px] md:text-[15px] leading-relaxed shadow-sm ${
//                     msg.role === "user"
//                       ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none whitespace-pre-wrap"
//                       : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
//                   }`}
//                 >
//                   {msg.role === "bot" ? (
//                     <div className="prose prose-sm md:prose-base max-w-none prose-p:my-1 text-gray-800">
//                       <ReactMarkdown>{msg.text}</ReactMarkdown>
//                     </div>
//                   ) : (
//                     <span>{msg.text}</span>
//                   )}
//                 </div>

//                 {/* Các nút hành động (Copy & Xóa) cho từng tin nhắn */}
//                 <div className={`flex gap-1 items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 ${msg.role === "user" ? "justify-end mr-1" : "justify-start ml-1"}`}>
                  
//                   {/* Nút Copy */}
//                   <button
//                     onClick={() => handleCopy(msg.text, index)}
//                     className="p-1.5 text-gray-400 hover:text-blue-600 bg-white/50 hover:bg-white rounded-md transition-colors"
//                     title="Copy text"
//                   >
//                     {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
//                   </button>

//                   {/* Nút Xóa một tin nhắn (Không cho xóa câu chào mặc định đầu tiên) */}
//                   {index !== 0 && (
//                      <button
//                       onClick={() => handleDeleteMessage(index)}
//                       className="p-1.5 text-gray-400 hover:text-red-500 bg-white/50 hover:bg-white rounded-md transition-colors"
//                       title="Xóa tin nhắn này"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Avatar User */}
//               {msg.role === "user" && (
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center border border-blue-200 mb-1 shrink-0">
//                   <User className="w-5 h-5 text-blue-600" />
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Hiệu ứng Loading */}
//           {isLoading && (
//             <div className="flex justify-start items-end gap-2">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center border border-purple-200 mb-1">
//                 <Bot className="w-5 h-5 text-purple-600" />
//               </div>
//               <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-none flex gap-1 shadow-sm">
//                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
        
//         <div className="flex gap-2 p-2 overflow-x-auto hide-scrollbar">
//   {SUGGESTED_PROMPTS.map((prompt, index) => (
//     <button
//       key={index}
//       onClick={() => setInput(prompt)}
//       className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full text-sm font-medium transition-colors border border-blue-200"
//     >
//       {prompt}
//     </button>
//   ))}
// </div>

//         {/* Khung nhập */}
//         <div className="p-3 md:p-4 bg-white/50 border-t border-gray-100">
//           <div className="flex items-center gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-2xl border border-gray-200 shadow-inner">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder="Nhập câu hỏi..."
//               className="flex-1 bg-transparent px-3 py-2 outline-none text-sm md:text-base text-gray-700 placeholder-gray-400"
//               disabled={isLoading}
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={isLoading || !input.trim()}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white p-2.5 md:p-3 rounded-xl transition-all duration-200 ease-in-out shadow-md"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// }

// src/app/page.tsx
import Link from "next/link";
import { Activity, Stethoscope, MapPin, MessageSquare, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans text-gray-800">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-900">MediCloud</span>
        </div>
        <Link 
          href="/dashboard/chat" 
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg"
        >
          Vào ứng dụng
        </Link>
      </header>

      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Trợ lý Y tế thông minh <br className="hidden md:block"/> 
          <span className="text-blue-600">Dành cho mọi nhà</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tra cứu triệu chứng, tìm kiếm cơ sở y tế gần nhất và nhận tư vấn sức khỏe miễn phí 24/7 từ AI tiên tiến trên nền tảng Serverless Cloud.
        </p>
        
        <Link 
          href="/dashboard/chat" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-lg font-bold rounded-full transition-all shadow-xl hover:-translate-y-1"
        >
          Trải nghiệm ngay <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto text-left">
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chatbot AI Y tế</h3>
            <p className="text-gray-500">Hỏi đáp triệu chứng, tư vấn dinh dưỡng và sơ cứu khẩn cấp với độ chính xác cao.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tìm bệnh viện gần bạn</h3>
            <p className="text-gray-500">Xác định cơ sở y tế, phòng khám và nhà thuốc gần nhất chỉ với 1 cú click.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Theo dõi chỉ số (BMI)</h3>
            <p className="text-gray-500">Đánh giá tình trạng cơ thể và nhận gợi ý thực đơn phù hợp để cải thiện sức khỏe.</p>
          </div>
        </div>
      </main>
    </div>
  );
}