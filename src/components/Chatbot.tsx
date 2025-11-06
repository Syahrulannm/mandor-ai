import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Ganti URL ini dengan webhook n8n Anda
const N8N_WEBHOOK_URL = "https://n8n-szgskgyd09wp.sate.sumopod.my.id/webhook/chatbot";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Halo! Ada yang bisa saya bantu?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log("Response dari n8n:", data);

      // Coba berbagai format response dari n8n
      let botReply = "";
      if (data.reply) {
        botReply = data.reply;
      } else if (data.output) {
        botReply = data.output;
      } else if (data.message) {
        botReply = data.message;
      } else if (data.text) {
        botReply = data.text;
      } else if (typeof data === "string") {
        botReply = data;
      } else {
        // Jika tidak ada field yang cocok, tampilkan seluruh response
        botReply = JSON.stringify(data, null, 2);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply || "Maaf, saya tidak mengerti.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });

      // Fallback response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[500px] bg-card border border-border rounded-lg shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-accent">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ketik pesan Anda..." disabled={isLoading} className="flex-1" />
                <Button onClick={sendMessage} disabled={isLoading || !inputValue.trim()} size="icon" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }} className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow glow-effect">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </>
  );
};

export default Chatbot;
