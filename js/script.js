// Chatbot functionality
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxluVIs1IbniMLpOw40NcrqMfXw-bOL08Vfowpmx48h_R3ZN3oKM6SCYbebN_SKTOTErg/exec";

// DOM elements
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const closeChat = document.getElementById('closeChat');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Toggle chat visibility
chatToggle.addEventListener('click', () => {
    chatWidget.classList.remove('hidden');
    chatToggle.classList.add('hidden');
    userInput.focus();
});

closeChat.addEventListener('click', () => {
    chatWidget.classList.add('hidden');
    chatToggle.classList.remove('hidden');
});

// Send message function
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    displayMessage(message, 'user-msg');
    userInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing';
    typingIndicator.textContent = 'Assistant is typing';
    chatbox.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;

    // Send message to Google Apps Script
    fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: message})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Remove typing indicator
        chatbox.removeChild(typingIndicator);
        // Display bot response
        displayMessage(data.response, 'bot-msg');
    })
    .catch(error => {
        console.error('Error:', error);
        chatbox.removeChild(typingIndicator);
        displayMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot-msg');
    });
}

// Display message in chat
function displayMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(className);
    
    // Format message with line breaks
    const formattedText = text.replace(/\n/g, '<br>');
    messageElement.innerHTML = formattedText;
    
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Auto-focus input when chat opens
chatWidget.addEventListener('click', () => {
    userInput.focus();
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (!chatWidget.contains(e.target) && !chatToggle.contains(e.target) && !chatWidget.classList.contains('hidden')) {
        chatWidget.classList.add('hidden');
        chatToggle.classList.remove('hidden');
    }
});
