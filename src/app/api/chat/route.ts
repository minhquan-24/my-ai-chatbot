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

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest",
      systemInstruction: `Bạn là một trợ lý Y tế thông minh tên là MediCloud AI. 
      Nhiệm vụ của bạn là tư vấn sức khỏe, dinh dưỡng và hướng dẫn sơ cứu.
      Quy tắc bắt buộc:
      1. Luôn xưng hô là "MediCloud" và gọi người dùng là "Bạn".
      2. Trả lời đủ thông tin, súc tích, chia gạch đầu dòng rõ ràng.
      3. Ở cuối mỗi câu trả lời liên quan đến bệnh tật, LUÔN LUÔN thêm dòng cảnh báo in nghiêng: "*Lưu ý: Thông tin trên chỉ mang tính chất tham khảo sơ bộ. Vui lòng đến cơ sở y tế để được bác sĩ thăm khám chính xác.*"`
    });

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