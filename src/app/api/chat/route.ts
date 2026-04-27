// import { GoogleGenerativeAI } from '@google/generative-ai';
// // Tạo cấu hình lấy API Key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const userMessage = body.messages;

//     if (!userMessage) {
//       return new Response(JSON.stringify({ error: "Vui lòng nhập tin nhắn" }), { status: 400 });
//     }

//     // Gọi model Gemini 1.5 Flash
//     const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

//     // Gửi câu hỏi sang Gemini
//     const result = await model.generateContent(userMessage);
//     const responseText = result.response.text();

//     // Trả kết quả về
//     return new Response(JSON.stringify({ reply: responseText }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });

//   } catch (error) {
//     console.error("Lỗi Serverless Function:", error);
//     return new Response(JSON.stringify({ error: "Có lỗi xảy ra khi gọi AI" }), { status: 500 });
//   }
// }

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body.messages; 

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Vui lòng nhập tin nhắn" }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.text;

    
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Lỗi Serverless Function:", error);
    return new Response(JSON.stringify({ error: "Có lỗi xảy ra khi gọi AI" }), { status: 500 });
  }
}