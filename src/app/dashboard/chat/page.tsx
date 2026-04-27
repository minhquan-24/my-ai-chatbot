// src/app/dashboard/chat/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Copy, Check, Trash2, X, Volume2, HeartPulse } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const DEFAULT_MESSAGE = { 
  role: "bot", 
  text: "Xin chào! Mình là MediCloud AI. Mình có thể giúp gì cho sức khỏe của bạn hôm nay?" 
};

const SUGGESTED_PROMPTS =[
  "Tôi bị đau đầu kèm sốt nhẹ",
  "Thực đơn giảm cân an toàn",
  "Cách sơ cứu người bị bỏng",
  "Mẹo giúp dễ ngủ ban đêm"
];

export default function ChatPage() {
  const [messages, setMessages] = useState([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChat = localStorage.getItem("medicloud_chat");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
    setIsLoaded(true); 
  },[]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("medicloud_chat", JSON.stringify(messages));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },[messages, isLoaded]);

  useEffect(() => {
    const autoPrompt = sessionStorage.getItem("medicloud_autoprompt");
    if (autoPrompt) {
      setInput(autoPrompt); 
      sessionStorage.removeItem("medicloud_autoprompt"); 
    }
  },[]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN'; 
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ đọc giọng nói.");
    }
  };

  const handleClearAll = () => {
    if (confirm("Xóa lịch sử trò chuyện?")) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem("medicloud_chat");
    }
  };

  const handleDeleteMessage = (indexToDelete: number) => {
    setMessages(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  const handleSendMessage = async (msg = input) => {
    if (!msg.trim()) return;
    const newMessages =[...messages, { role: "user", text: msg.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = newMessages.filter((m, i) => !(i === 0 && m.text === DEFAULT_MESSAGE.text));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }), 
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(prev =>[...prev, { role: "bot", text: data.reply }]);
      } else {
        setMessages(prev =>[...prev, { role: "bot", text: "❌ Lỗi: " + data.error }]);
      }
    } catch (error) {
      setMessages(prev =>[...prev, { role: "bot", text: "❌ Mất kết nối máy chủ." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-2 md:p-6 bg-slate-50">
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Chat */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">MediCloud Assistant</h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={handleClearAll} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Khung tin nhắn */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2 group`}>
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center shrink-0">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
              )}

              <div className="relative max-w-[80%] md:max-w-[70%] flex flex-col gap-1">
                <div className={`px-4 py-3 rounded-2xl text-[15px] shadow-sm ${
                  msg.role === "user" ? "bg-blue-600 text-white rounded-br-none whitespace-pre-wrap" : "bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-none"
                }`}>
                  {msg.role === "bot" ? (
                    <div className="prose prose-sm max-w-none text-gray-800"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                  ) : (<span>{msg.text}</span>)}
                </div>

                <div className={`flex gap-1 items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <button onClick={() => handleCopy(msg.text, index)} className="p-1.5 text-gray-400 hover:text-blue-600 bg-white rounded-md shadow-sm">
                    {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {msg.role === "bot" && (
                    <button onClick={() => handleSpeak(msg.text)} className="p-1.5 text-gray-400 hover:text-purple-600 bg-white rounded-md shadow-sm">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {index !== 0 && (
                     <button onClick={() => handleDeleteMessage(index)} className="p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-md shadow-sm">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div className="bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-none flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pb-1">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button key={idx} onClick={() => handleSendMessage(prompt)} className="whitespace-nowrap px-4 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full text-sm font-medium border border-blue-100 transition-colors">
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder="Nhập triệu chứng của bạn..."
              className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-700"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-md"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}