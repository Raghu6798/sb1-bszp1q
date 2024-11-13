import { useChat } from 'ai/react';
import { Bot, SendHorizontal, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <ScrollArea className="h-[600px] p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg p-4',
                message.role === 'assistant'
                  ? 'bg-muted/50'
                  : 'bg-background'
              )}
            >
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
                {message.role === 'assistant' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-4">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}