import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Bot className="h-12 w-12" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">AI Chat Assistant</h1>
        <p className="mb-8 text-muted-foreground">
          Powered by Groq and Next.js
        </p>
        <Link href="/chat">
          <Button size="lg">
            Start Chatting
            <Bot className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}