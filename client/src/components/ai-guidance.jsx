import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, MessageSquare, Target, BookOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// TODO: Remove mock data
const chatHistory = [
  {
    id: 1,
    type: 'ai',
    message: "Hello! I'm your AI Career Counselor. I'm here to help you with career guidance, interview preparation, and personalized learning recommendations. What would you like to discuss today?",
    timestamp: "10:00 AM"
  },
  {
    id: 2,
    type: 'user', 
    message: "I'm preparing for software engineering interviews. Can you help me with common technical questions?",
    timestamp: "10:01 AM"
  },
  {
    id: 3,
    type: 'ai',
    message: "Absolutely! Based on your profile and current SGPA of 9.3, you're well-prepared academically. For technical interviews, I recommend focusing on:\n\n1. **Data Structures & Algorithms**: Arrays, LinkedLists, Trees, Graphs\n2. **System Design**: Basic concepts for entry-level positions\n3. **Coding Practice**: LeetCode easy to medium problems\n4. **Behavioral Questions**: STAR method preparation\n\nWould you like me to create a personalized study plan based on your current skills?",
    timestamp: "10:02 AM"
  },
  {
    id: 4,
    type: 'user',
    message: "Yes, that would be great! I have experience with React and Node.js but need to improve my DSA skills.",
    timestamp: "10:03 AM"
  },
  {
    id: 5,
    type: 'ai',
    message: "Perfect! Given your React and Node.js background, here's a tailored 4-week plan:\n\n**Week 1-2: DSA Fundamentals**\n- Arrays & Strings (5 problems/day)\n- Two pointers technique\n- Hash maps and sets\n\n**Week 3: Advanced Topics**\n- Trees and graph traversals\n- Dynamic programming basics\n- Recursion patterns\n\n**Week 4: Integration**\n- Mock interviews\n- System design basics\n- Full-stack project review\n\n**Recommended Resources:**\n- LeetCode Premium\n- Cracking the Coding Interview\n- Pramp for mock interviews\n\nShall I add this to your learning tasks dashboard?",
    timestamp: "10:05 AM"
  }
]

const quickPrompts = [
  { text: "Help me prepare for interviews", icon: MessageSquare },
  { text: "Create a learning roadmap", icon: BookOpen },
  { text: "Review my career goals", icon: Target },
  { text: "Suggest skill improvements", icon: Sparkles },
]

export function AIGuidance() {
  const [messages, setMessages] = useState(chatHistory)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' ,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' ,
        message: "Thank you for your question! I'm processing your request and will provide personalized guidance based on your profile and current academic performance. This is a simulated response - in the actual implementation, this would connect to your FastAPI backend with Gemini integration.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      console.log('AI response sent')
    }, 2000)
  }

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6" data-testid="ai-guidance">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Career Counselor</h2>
            <p className="text-muted-foreground">Powered by Gemini AI</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Get personalized career guidance, interview preparation tips, and learning recommendations 
          tailored to your academic performance and career goals.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="text-center hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current SGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">9.3</div>
            <p className="text-xs text-muted-foreground">Above average performance</p>
          </CardContent>
        </Card>

        <Card className="text-center hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">67%</div>
            <p className="text-xs text-muted-foreground">12 of 18 skills completed</p>
          </CardContent>
        </Card>

        <Card className="text-center hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Career Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">85%</div>
            <p className="text-xs text-muted-foreground">Ready for entry-level roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Counselor</CardTitle>
              <CardDescription>Always ready to help with your career questions</CardDescription>
            </div>
            <div className="flex-1"></div>
            <Badge variant="secondary" className="text-xs">
              <div className="w-2 h-2 bg-chart-2 rounded-full mr-1"></div>
              Online
            </Badge>
          </div>
        </CardHeader>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                data-testid={`message-${message.id}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.type === 'ai' ? 'bg-chart-1 text-white' : 'bg-chart-2 text-white'}>
                    {message.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'ai' 
                      ? 'bg-muted' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-chart-1 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Prompts */}
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt.text)}
                data-testid={`quick-prompt-${index}`}
              >
                <prompt.icon className="h-3 w-3 mr-2" />
                {prompt.text}
              </Button>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your career..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              data-testid="input-ai-message"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* API Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-chart-1" />
            <span>FastAPI Integration Endpoints</span>
          </CardTitle>
          <CardDescription>Connect to your existing Gemini-powered backend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm font-mono bg-muted p-4 rounded-lg">
            <div><span className="text-chart-1">POST</span> /api/chat/guidance - Send career guidance queries</div>
            <div><span className="text-chart-2">POST</span> /api/chat/interview-prep - Get interview preparation help</div>
            <div><span className="text-chart-3">POST</span> /api/recommendations/skills - Get personalized skill recommendations</div>
            <div><span className="text-chart-4">POST</span> /api/recommendations/learning-path - Generate learning roadmaps</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            These endpoints will be used to connect the frontend to your existing FastAPI backend with Gemini integration.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}