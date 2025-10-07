// Complete JavaScript Chatbot - No external dependencies needed
const chatbot = {
    // Chatbot knowledge base
    knowledge: {
        greetings: [
            "Hello! Welcome to Useful Tools Website! How can I help you today?",
            "Hi there! Ready to explore some useful tools?",
            "Hey! I'm here to help you with our tools and resources."
        ],
        
        morse: [
            "You can use our Morse Code Encoder/Decoder tool to convert text to Morse code and vice versa.",
            "The Morse Code tool lets you encode text to Morse code or decode Morse code back to text.",
            "For Morse code conversion, check out our dedicated tool - it supports both encoding and decoding."
        ],
        
        base64: [
            "Our Base64 Decoder tool runs 100% in your browser - your data never leaves your computer!",
            "The Base64 decoder is perfect for decoding text, JSON, and detecting encoding issues securely.",
            "All Base64 decoding happens locally in your browser for maximum security and privacy."
        ],
        
        contact: [
            "You can contact us via:\n• Instagram: @diecrewls22\n• Discord: @diecrewls22_vortex\n• Email: diecrewls22@gmail.com\n• Reddit: r/CrewStudios",
            "Reach out to us on:\nInstagram: @diecrewls22\nDiscord: @diecrewls22_vortex\nEmail: diecrewls22@gmail.com\nReddit: r/CrewStudios"
        ],
        
        contributions: [
            "We'd love your contributions! You can:\n• Make a Pull Request on our GitHub repository\n• Start a discussion on our Reddit page: r/CrewStudios",
            "Help us improve by:\n• Submitting pull requests on GitHub\n• Joining discussions on our Reddit community"
        ],
        
        tools: [
            "I can help you with:\n• Morse Code encoding/decoding\n• Base64 decoding\n• Contact information\n• How to contribute",
            "Our website offers:\n• Morse Code tool\n• Base64 decoder\n• Contact resources\n• Contribution guidelines"
        ],
        
        fallback: [
            "I'm here to help you with our useful tools! You can ask me about Morse code, Base64 decoding, contact info, or how to contribute.",
            "I can help with:\n• Morse Code tools\n• Base64 decoding\n• Contact information\n• Contribution methods\nWhat would you like to know?",
            "I specialize in helping with our tools! Try asking about Morse code, Base64, contact details, or how to contribute to our project."
        ]
    },

    // Get a random response from an array
    getRandomResponse: function(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Process user message and generate response
    processMessage: function(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Greetings
        if (lowerMessage.match(/\b(hello|hi|hey|greetings|howdy)\b/)) {
            return this.getRandomResponse(this.knowledge.greetings);
        }
        
        // Morse Code
        if (lowerMessage.match(/\b(morse|encode|decode|dots|dashes)\b/)) {
            return this.getRandomResponse(this.knowledge.morse);
        }
        
        // Base64
        if (lowerMessage.match(/\b(base64|decode|encode|base|64)\b/)) {
            return this.getRandomResponse(this.knowledge.base64);
        }
        
        // Contact
        if (lowerMessage.match(/\b(contact|email|instagram|discord|reddit|reach|support|help)\b/)) {
            return this.getRandomResponse(this.knowledge.contact);
        }
        
        // Contributions
        if (lowerMessage.match(/\b(contribute|github|pull request|pr|reddit|discussion|help improve)\b/)) {
            return this.getRandomResponse(this.knowledge.contributions);
        }
        
        // Tools overview
        if (lowerMessage.match(/\b(tool|what can you do|help|features|what do you have)\b/)) {
            return this.getRandomResponse(this.knowledge.tools);
        }
        
        // Thanks
        if (lowerMessage.match(/\b(thanks|thank you|appreciate|grateful)\b/)) {
            return "You're welcome! Let me know if you need help with any of our tools. 🛠️";
        }
        
        // Fallback for unknown queries
        return this.getRandomResponse(this.knowledge.fallback);
    }
};

// Chatbot UI Management
const chatManager = {
    // DOM elements
    elements: {
        chatToggle: null,
        chatWidget: null,
        closeChat: null,
        chatbox: null,
        userInput: null,
        sendBtn: null
    },

    // Initialize the chatbot
    init: function() {
        this.getDOMElements();
        this.setupEventListeners();
        console.log("Chatbot initialized successfully!");
    },

    // Get all DOM elements
    getDOMElements: function() {
        this.elements.chatToggle = document.getElementById('chatToggle');
        this.elements.chatWidget = document.getElementById('chatWidget');
        this.elements.closeChat = document.getElementById('closeChat');
        this.elements.chatbox = document.getElementById('chatbox');
        this.elements.userInput = document.getElementById('userInput');
        this.elements.sendBtn = document.getElementById('sendBtn');
    },

    // Setup all event listeners
    setupEventListeners: function() {
        const { chatToggle, chatWidget, closeChat, userInput, sendBtn } = this.elements;

        // Toggle chat visibility
        chatToggle.addEventListener('click', () => this.openChat());
        closeChat.addEventListener('click', () => this.closeChat());

        // Send message on button click
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-focus input when chat opens
        chatWidget.addEventListener('click', () => {
            userInput.focus();
        });

        // Close chat when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (!chatWidget.contains(e.target) && 
                !chatToggle.contains(e.target) && 
                !chatWidget.classList.contains('hidden')) {
                this.closeChat();
            }
        });
    },

    // Open chat widget
    openChat: function() {
        this.elements.chatWidget.classList.remove('hidden');
        this.elements.chatToggle.classList.add('hidden');
        this.elements.userInput.focus();
    },

    // Close chat widget
    closeChat: function() {
        this.elements.chatWidget.classList.add('hidden');
        this.elements.chatToggle.classList.remove('hidden');
    },

    // Send user message and get bot response
    sendMessage: function() {
        const message = this.elements.userInput.value.trim();
        
        if (!message) return;

        // Display user message immediately
        this.displayMessage(message, 'user-msg');
        this.elements.userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate processing delay for natural feel
        setTimeout(() => {
            this.hideTypingIndicator();
            const botResponse = chatbot.processMessage(message);
            this.displayMessage(botResponse, 'bot-msg');
        }, 800 + Math.random() * 800); // Random delay between 0.8-1.6 seconds
    },

    // Display message in chat
    displayMessage: function(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(className);
        
        // Format message with line breaks and basic formatting
        const formattedText = this.formatMessage(text);
        messageElement.innerHTML = formattedText;
        
        this.elements.chatbox.appendChild(messageElement);
        this.scrollToBottom();
    },

    // Format message text (convert line breaks, etc.)
    formatMessage: function(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Basic bold
            .replace(/_(.*?)_/g, '<em>$1</em>'); // Basic italic
    },

    // Show typing indicator
    showTypingIndicator: function() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing';
        typingIndicator.textContent = 'Assistant is typing';
        typingIndicator.id = 'typing-indicator';
        this.elements.chatbox.appendChild(typingIndicator);
        this.scrollToBottom();
    },

    // Hide typing indicator
    hideTypingIndicator: function() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    },

    // Scroll chat to bottom
    scrollToBottom: function() {
        this.elements.chatbox.scrollTop = this.elements.chatbox.scrollHeight;
    },

    // Add a welcome message (optional)
    addWelcomeMessage: function() {
        const welcomeMessage = "Hello! I'm your Useful Tools assistant. I can help you with Morse code, Base64 decoding, contact info, and more! How can I help you today?";
        this.displayMessage(welcomeMessage, 'bot-msg');
    },

    // Reset chat (clear messages)
    resetChat: function() {
        this.elements.chatbox.innerHTML = '';
        this.addWelcomeMessage();
    }
};

// Enhanced chatbot with conversation memory
const enhancedChatbot = {
    ...chatbot,
    
    // Conversation history
    conversationHistory: [],
    
    // Enhanced message processing with context
    processMessage: function(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Add to conversation history (limit to last 10 messages)
        this.conversationHistory.push({ user: message, timestamp: new Date() });
        if (this.conversationHistory.length > 10) {
            this.conversationHistory.shift();
        }
        
        // Check for follow-up questions
        const lastUserMessage = this.conversationHistory.length > 1 ? 
            this.conversationHistory[this.conversationHistory.length - 2].user.toLowerCase() : '';
        
        // Handle follow-ups about contact methods
        if (lastUserMessage.includes('contact') && lowerMessage.match(/\b(instagram|discord|email|reddit)\b/)) {
            if (lowerMessage.includes('instagram')) {
                return "Our Instagram is @diecrewls22 - we post updates and announcements there!";
            }
            if (lowerMessage.includes('discord')) {
                return "You can find us on Discord as @diecrewls22_vortex - great for real-time discussions!";
            }
            if (lowerMessage.includes('email')) {
                return "Send us an email at diecrewls22@gmail.com for direct communication!";
            }
            if (lowerMessage.includes('reddit')) {
                return "Join our Reddit community at r/CrewStudios for discussions and updates!";
            }
        }
        
        // Use original processing for other messages
        return chatbot.processMessage(message);
    }
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace the original chatbot with enhanced version
    window.chatbot = enhancedChatbot;
    
    // Initialize chat manager
    chatManager.init();
    
    // Add welcome message
    setTimeout(() => {
        chatManager.addWelcomeMessage();
    }, 500);
    
    console.log("Useful Tools Chatbot loaded successfully!");
});

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { chatbot, chatManager };
}
