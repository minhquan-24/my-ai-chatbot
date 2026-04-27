// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
// import ReactMarkdown from 'react-markdown';

// export default function Home() {
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "Xin chào! Mình là AI Chatbot chạy trên nền tảng Serverless Cloud. Mình có thể giúp gì cho bạn hôm nay?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Hàm tự động cuộn xuống tin nhắn mới nhất
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   },[messages]);

//   // Hàm xử lý gửi tin nhắn
//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     // Thêm tin nhắn của user vào màn hình ngay lập tức
//     setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // Gọi lên Serverless Function API mà chúng ta vừa tạo
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Thêm câu trả lời của AI vào màn hình
//         setMessages((prev) =>[...prev, { role: "bot", text: data.reply }]);
//       } else {
//         setMessages((prev) => [...prev, { role: "bot", text: "❌ Oops, có lỗi từ Serverless: " + data.error }]);
//       }
//     } catch (error) {
//       setMessages((prev) =>[...prev, { role: "bot", text: "❌ Mất kết nối đến Cloud Serverless." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // Background gradient bắt mắt
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      
//       {/* Khung Chat - Hiệu ứng kính (Glassmorphism) */}
//       <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-white/50 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI Cloud Chatbot</h1>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <span className="relative flex h-2.5 w-2.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
//                 </span>
//                 Serverless Active
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Khung hiển thị tin nhắn (Scrollable) */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
              
//               {/* Avatar Bot */}
//               {msg.role === "bot" && (
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center border border-purple-200 mb-1 shrink-0">
//                   <Bot className="w-5 h-5 text-purple-600" />
//                 </div>
//               )}

//               {/* Bong bóng tin nhắn */}
//               <div
//                 className={`max-w-[75%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm ${
//                   msg.role === "user"
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
//                     : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <ReactMarkdown className="prose">{msg.text}</ReactMarkdown>
//               </div>

//               {/* Avatar User */}
//               {msg.role === "user" && (
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center border border-blue-200 mb-1 shrink-0">
//                   <User className="w-5 h-5 text-blue-600" />
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Hiệu ứng "Đang gõ..." khi đợi API trả về */}
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

//         {/* Khung nhập tin nhắn */}
//         <div className="p-4 bg-white/50 border-t border-gray-100">
//           <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-inner">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder="Nhập câu hỏi của bạn vào đây..."
//               className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-700 placeholder-gray-400"
//               disabled={isLoading}
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={isLoading || !input.trim()}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-200 ease-in-out shadow-md"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, Copy, Check, Trash2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const DEFAULT_MESSAGE = { 
  role: "bot", 
  text: "Xin chào! Mình là AI Chatbot chạy trên nền tảng Serverless Cloud. Mình có thể giúp gì cho bạn hôm nay?" 
};

export default function Home() {
  const [messages, setMessages] = useState([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChat = localStorage.getItem("chat_history");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  const handleClearChat = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?")) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem("chat_history");
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", text: userMessage }];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = newMessages.filter((msg, index) => !(index === 0 && msg.text === DEFAULT_MESSAGE.text));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      } else {
        setMessages((prev) =>[...prev, { role: "bot", text: "❌ Oops, có lỗi từ Serverless: " + data.error }]);
      }
    } catch (error) {
      setMessages((prev) =>[...prev, { role: "bot", text: "❌ Mất kết nối đến Cloud Serverless." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4 bg-white/50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI Cloud Chatbot</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Serverless Active
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Xóa lịch sử chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2 group`}>
              
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center border border-purple-200 mb-1 shrink-0">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
              )}

              <div
                className={`relative max-w-[75%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none whitespace-pre-wrap"
                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.role === "bot" ? (
  <div className="prose prose-sm md:prose-base max-w-none prose-p:my-1 text-gray-800">
    <ReactMarkdown>
      {msg.text}
    </ReactMarkdown>
  </div>) : (
                  <span>{msg.text}</span>
                )}

                {msg.role === "bot" && (
                  <button
                    onClick={() => handleCopy(msg.text, index)}
                    className="absolute -right-10 bottom-2 p-1.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md border border-gray-100 shadow-sm"
                    title="Copy text"
                  >
                    {copiedIndex === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center border border-blue-200 mb-1 shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center border border-purple-200 mb-1">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-none flex gap-1 shadow-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white/50 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập câu hỏi của bạn vào đây..."
              className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-200 ease-in-out shadow-md"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}