'use client';

import { useChat } from 'ai/react';
import { Bot, Send, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector } from '@/components/model-selector';
import { cn } from '@/lib/utils';

export default function Chat() {
  const [model, setModel] = useState('mixtral-8x7b-32768');
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      model,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Card className="w-full max-w-2xl">
        <div className="flex h-[600px] flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
            </div>
            <ModelSelector model={model} onModelChange={setModel} />
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-lg p-3',
                      message.role === 'assistant'
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {message.role === 'assistant' ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t p-4"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}