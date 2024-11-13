import { StreamingTextResponse, Message } from 'ai';
import { Groq } from 'groq-sdk';

export const runtime = 'edge';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const response = await groq.chat.completions.create({
    messages: messages.map((m: Message) => ({
      content: m.content,
      role: m.role,
    })),
    model: model || 'mixtral-8x7b-32768',
    temperature: 0.7,
    max_tokens: 1000,
    stream: true,
  });

  return new StreamingTextResponse(response);
}