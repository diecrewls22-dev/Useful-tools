// Complete JavaScript Chatbot with Authentication Integration
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
        
        auth: [
            "You can log in to access premium features and save your preferences!",
            "Login to unlock exclusive tools and personalized experiences.",
            "Create an account to save your work and access advanced features."
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
        const user = window.authIntegration?.getCurrentUser();
        
        // Greetings
        if (lowerMessage.match(/\b(hello|hi|hey|greetings|howdy)\b/)) {
            if (user) {
                return `Hello ${user.name}! Welcome back to Useful Tools. How can I help you today?`;
            }
            return this.getRandomResponse(this.knowledge.greetings);
        }
        
        // Authentication related
        if (lowerMessage.match(/\b(login|sign in|register|sign up|account|profile)\b/)) {
            if (user) {
                return `You're already logged in as ${user.name}! You can access premium features.`;
            }
            return this.getRandomResponse(this.knowledge.auth) + " Visit the login page to get started!";
        }
        
        // Premium features
        if (lowerMessage.match(/\b(premium|pro|advanced|exclusive)\b/)) {
            if (user) {
                return "You have access to premium features! Check out the Premium section on the homepage for advanced tools.";
            }
            return "Premium features are available for logged-in users! Please log in to access advanced encryption, data analytics, and enhanced AI tools.";
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
            const baseResponse = this.getRandomResponse(this.knowledge.tools);
            if (user) {
                return baseResponse + "\n\nAs a logged-in user, you also have access to premium features!";
            }
            return baseResponse;
        }
        
        // Thanks
        if (lowerMessage.match(/\b(thanks|thank you|appreciate|grateful)\b/)) {
            return "You're welcome! Let me know if you need help with any of our tools. 🛠️";
        }
        
        // Logout
        if (lowerMessage.match(/\b(logout|sign out|exit)\b/)) {
            if (user) {
                return "You can logout by clicking on your username in the navigation bar and selecting 'Logout'.";
            }
            return "You're not currently logged in. Would you like to log in to access premium features?";
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
        const user = window.authIntegration?.getCurrentUser();
        let welcomeMessage = "Hello! I'm your Useful Tools assistant. I can help you with Morse code, Base64 decoding, contact info, and more!";
        
        if (user) {
            welcomeMessage = `Welcome back, ${user.name}! I'm your Useful Tools assistant. You have access to premium features!`;
        }
        
        this.displayMessage(welcomeMessage, 'bot-msg');
    },

    // Reset chat (clear messages)
    resetChat: function() {
        this.elements.chatbox.innerHTML = '';
        this.addWelcomeMessage();
    }
};

// Authentication Integration
class AuthIntegration {
    constructor() {
        this.authSystem = null;
        this.init();
    }

    init() {
        // Wait for auth system to be available
        if (window.authSystem) {
            this.authSystem = window.authSystem;
            this.updateUIBasedOnAuth();
        } else {
            // Retry after a short delay
            setTimeout(() => this.init(), 100);
        }
    }

    updateUIBasedOnAuth() {
        const user = this.getCurrentUser();
        const authElements = document.getElementById('authElements');
        const premiumSection = document.getElementById('premiumSection');
        
        if (!authElements) return;

        if (user) {
            authElements.innerHTML = `
                <div class="user-menu">
                    <div class="user-welcome">👤 ${user.name}</div>
                    <div class="user-dropdown">
                        <a href="#" onclick="authIntegration.showProfile()">Profile</a>
                        <a href="#" onclick="authIntegration.logout()">Logout</a>
                    </div>
                </div>
            `;
            
            // Show premium section
            if (premiumSection) {
                premiumSection.style.display = 'block';
            }
        } else {
            authElements.innerHTML = `
                <a href="login.html" class="nav-link">Login</a>
            `;
            
            // Hide premium section
            if (premiumSection) {
                premiumSection.style.display = 'none';
            }
        }
    }

    setupAuthEventListeners() {
        // Listen for auth state changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                this.updateUIBasedOnAuth();
                // Refresh chatbot welcome message
                if (window.chatManager) {
                    window.chatManager.resetChat();
                }
            }
        });
    }

    showProfile() {
        const user = this.getCurrentUser();
        if (user) {
            alert(`User Profile:\nName: ${user.name}\nEmail: ${user.email}\nProvider: ${user.provider}\nMember since: ${new Date(user.createdAt).toLocaleDateString()}`);
        }
    }

    logout() {
        if (this.authSystem) {
            this.authSystem.logout();
        } else {
            // Fallback logout
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    }

    getCurrentUser() {
        if (this.authSystem) {
            return this.authSystem.getCurrentUser();
        }
        // Fallback
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth integration
    window.authIntegration = new AuthIntegration();
    
    // Initialize chat manager
    window.chatManager = chatManager;
    chatManager.init();
    
    // Add welcome message after a short delay
    setTimeout(() => {
        chatManager.addWelcomeMessage();
    }, 500);
    
    // Setup auth event listeners
    window.authIntegration.setupAuthEventListeners();
    
    console.log("Useful Tools Website loaded successfully!");
});

// Global function for premium buttons
function handlePremiumFeature(feature) {
    const user = window.authIntegration?.getCurrentUser();
    if (user) {
        alert(`Accessing ${feature}...\nWelcome ${user.name}! This premium feature is now available.`);
    } else {
        alert('Please log in to access premium features!');
        window.location.href = 'login.html';
    }
}

// Add click handlers for premium buttons
document.addEventListener('DOMContentLoaded', function() {
    // This will run after the page loads
    setTimeout(() => {
        const premiumButtons = document.querySelectorAll('.premium-btn');
        premiumButtons.forEach(button => {
            button.addEventListener('click', function() {
                const feature = this.closest('.tool-card').querySelector('h3').textContent;
                handlePremiumFeature(feature);
            });
        });
    }, 1000);
});

// CSS for premium cards
const premiumStyles = `
    .premium-card {
        border: 2px solid #ffd700;
        background: linear-gradient(135deg, #fff9e6, #fff3cc);
    }
    
    .premium-card h3 {
        color: #b8860b;
    }
    
    .premium-btn {
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #8b6914;
    }
    
    .premium-btn:hover {
        background: linear-gradient(135deg, #ffed4e, #ffd700);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
    }
    
    .premium-section {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        margin-top: 3rem;
    }
`;

// Add premium styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = premiumStyles;
document.head.appendChild(styleSheet);
