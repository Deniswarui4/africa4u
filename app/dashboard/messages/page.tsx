import { MessageSquare, Send, Clock } from "lucide-react";

export default function MessagesPage() {
  const messages = [
    { id: "1", from: "KenyanJustForYou Team", subject: "Your Bush & Beach itinerary is ready!", preview: "Hi John, we've finished crafting your personalized 10-day itinerary. Click here to review the day-by-day plan...", time: "2 hours ago", unread: true },
    { id: "2", from: "KenyanJustForYou Team", subject: "Deposit confirmed — you're all set!", preview: "Great news! We've received your deposit of $930 for the Bush & Beach Retreat. Your trip is now confirmed...", time: "3 days ago", unread: false },
    { id: "3", from: "KenyanJustForYou Team", subject: "Welcome to KenyanJustForYou!", preview: "Thank you for creating your account. We're thrilled to help you plan the perfect Kenyan adventure...", time: "1 week ago", unread: false },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-2">Messages</h1>
      <p className="text-muted-foreground mb-8">Communication history with our travel team.</p>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">Messages from our team will appear here.</p>
          </div>
        ) : (
          <div className="divide-y">
            {messages.map(msg => (
              <div key={msg.id} className={`p-5 hover:bg-muted/30 transition-colors cursor-pointer ${msg.unread ? "bg-primary/5" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {msg.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <p className={`text-sm ${msg.unread ? "font-bold" : "font-medium"} truncate`}>{msg.from}</p>
                    </div>
                    <p className={`text-sm ${msg.unread ? "font-semibold text-foreground" : "text-foreground"} mb-1`}>{msg.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
