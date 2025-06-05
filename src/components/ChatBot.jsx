import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your KKR Region travel assistant. Ask me about tourist places, hotels, or travel tips!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    let botResponse = '';
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    try {
      // Always try AI API first
      const aiRes = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are a helpful travel assistant for the KKR region of Karnataka, India. Answer questions about tourist places, hotels, food, weather, and travel tips." },
            ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
            { role: 'user', content: input }
          ],
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      botResponse = aiRes.data.choices[0].message.content.trim();
    } catch {
      // Fallback to local logic if API fails
      const query = input.toLowerCase();
      if (query.includes('kalaburagi') || query.includes('gulbarga')) {
        botResponse = "Kalaburagi (formerly Gulbarga) is known for its historical monuments like Gulbarga Fort, Khwaja Banda Nawaz Dargah, and Sharana Basaveshwara Temple. The city has a rich cultural heritage from the Bahmani dynasty.";
      } else if (query.includes('bidar')) {
        botResponse = "Bidar is famous for its fort, Mahmud Gawan Madrasa, and Bidar's unique metalwork called Bidriware. The city has significant historical importance from the Bahmani and Barid Shahi periods.";
      } else if (query.includes('raichur')) {
        botResponse = "Raichur has the impressive Raichur Fort, ancient temples, and is situated between the Krishna and Tungabhadra rivers. It's known for its historical significance during various dynasties.";
      } else if (query.includes('koppal')) {
        botResponse = "Koppal is home to the Mahadeva Temple, Pampa Sarovar, and is close to Hampi. The region has beautiful landscapes and religious significance.";
      } else if (query.includes('bellary') || query.includes('ballari')) {
        botResponse = "Bellary features the magnificent Bellary Fort, Bellary Jama Masjid, and is a gateway to Hampi. The region has interesting geological formations and historical sites.";
      } else if (query.includes('hotel') || query.includes('stay')) {
        botResponse = "The KKR region offers various accommodation options from luxury hotels to budget stays. Major cities like Kalaburagi, Bidar, and Bellary have 3-4 star hotels, while smaller towns have comfortable lodges and homestays.";
      } else if (query.includes('food') || query.includes('cuisine')) {
        botResponse = "The region is known for its unique North Karnataka cuisine including Jolada Rotti, Ennegai, Byadagi Mirchi dishes, and various biryanis influenced by Hyderabadi cuisine. Don't miss trying the local sweets!";
      } else if (query.includes('travel') || query.includes('transportation')) {
        botResponse = "The KKR region is well-connected by road and rail. Major cities have railway stations, and KSRTC buses connect most towns. For local travel, auto-rickshaws and taxis are readily available.";
      } else if (query.includes('weather') || query.includes('climate')) {
        botResponse = "The KKR region has a hot semi-arid climate. Summers (March-June) are very hot with temperatures reaching 40°C. Monsoon (July-September) brings moderate rainfall. Winter (November-February) is pleasant with temperatures between 15-30°C.";
      } else if (query.includes('itinerary') || query.includes('plan')) {
        botResponse = "For a complete KKR region tour, I recommend 7-10 days. You can start from Kalaburagi (2 days), then visit Bidar (2 days), Raichur (1 day), Koppal (1-2 days), and Bellary (2 days). Check our Itinerary page for detailed plans!";
      } else {
        botResponse = "I'm your KKR Region guide! You can ask me about tourist places in Kalaburagi, Bidar, Raichur, Koppal, Bellary, or about hotels, food, weather, and travel tips in the region.";
      }
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat} 
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center w-14 h-14 focus:outline-none"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">KKR Travel Assistant</h3>
              <p className="text-xs opacity-80">Ask me anything about the KKR region!</p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-3">
                <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;