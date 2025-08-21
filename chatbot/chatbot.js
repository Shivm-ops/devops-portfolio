// AI Chatbot for Portfolio Website

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            greetings: [
                "Hello! I'm your AI assistant. How can I help you today?",
                "Hi there! Welcome to the portfolio. What would you like to know?",
                "Greetings! I'm here to help you explore this portfolio."
            ],
            about: [
                "I'm Shivam Patil, a DevOps Engineer focused on automation, CI/CD, and cloud infrastructure.",
                "I have 5+ years of experience building and maintaining scalable infrastructure using tools like Jenkins, GitHub Actions, Docker, Kubernetes, AWS, and Azure.",
                "I specialize in container orchestration with Kubernetes, infrastructure as code with Terraform, and robust CI/CD pipelines."
            ],
            projects: [
                "I've worked on various projects including CI/CD pipeline automation, infrastructure as code, and monitoring solutions.",
                "My recent projects include automated deployment pipelines and cloud infrastructure provisioning.",
                "I've completed 50+ projects ranging from simple automation scripts to complex enterprise infrastructure setups."
            ],
            skills: [
                "My technical skills include Docker, Kubernetes, Jenkins, AWS, Terraform, Ansible, and many more.",
                "I'm proficient in container orchestration, CI/CD pipelines, and cloud infrastructure management.",
                "I work with modern DevOps tools like Docker, Kubernetes, Jenkins, AWS, and various monitoring solutions."
            ],
            contact: [
                "You can reach me via the contact form or connect on LinkedIn/GitHub from the footer.",
                "Prefer email? Share your details in the contact form and I'll get back to you.",
                "I'm open to new opportunities and collaborations. Let's connect!"
            ],
            default: [
                "That's an interesting question! Could you tell me more about what you're looking for?",
                "I'm not sure I understand. Could you rephrase that or ask about my projects, skills, or experience?",
                "I'd be happy to help! You can ask me about my work, skills, projects, or how to get in touch."
            ]
        };
        
        this.init();
    }

    init() {
        this.createChatbotElements();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatbotElements() {
        // Chatbot elements are already in HTML, just get references
        this.toggle = document.querySelector('.chatbot-toggle');
        this.window = document.querySelector('.chatbot-window');
        this.messagesContainer = document.querySelector('.chatbot-messages');
        this.input = document.querySelector('.chatbot-input input');
        this.sendBtn = document.querySelector('.send-btn');
        this.closeBtn = document.querySelector('.chatbot-close');
    }

    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleChatbot());
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeChatbot());
        }
        
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.window.classList.add('active');
            this.input.focus();
        } else {
            this.window.classList.remove('active');
        }
    }

    closeChatbot() {
        this.isOpen = false;
        this.window.classList.remove('active');
    }

    addWelcomeMessage() {
        const welcomeMessage = this.getRandomResponse('greetings');
        this.addMessage(welcomeMessage, 'bot');
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({ text, sender, timestamp: new Date() });
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for different types of questions
        if (this.containsAny(message, ['hello', 'hi', 'hey', 'greetings'])) {
            return this.getRandomResponse('greetings');
        }
        
        if (this.containsAny(message, ['about', 'who are you', 'tell me about yourself'])) {
            return this.getRandomResponse('about');
        }
        
        if (this.containsAny(message, ['project', 'work', 'portfolio', 'build'])) {
            return this.getRandomResponse('projects');
        }
        
        if (this.containsAny(message, ['skill', 'technology', 'tech', 'programming', 'code'])) {
            return this.getRandomResponse('skills');
        }
        
        if (this.containsAny(message, ['contact', 'email', 'reach', 'get in touch', 'hire'])) {
            return this.getRandomResponse('contact');
        }
        
        if (this.containsAny(message, ['experience', 'years', 'background'])) {
            return "I have over 5 years of experience in DevOps engineering, working with various automation tools and cloud platforms. I've completed 50+ infrastructure projects and worked with clients from different industries.";
        }
        
        if (this.containsAny(message, ['docker', 'kubernetes', 'jenkins', 'terraform'])) {
            return "I'm proficient in Docker for containerization, Kubernetes for orchestration, Jenkins for CI/CD pipelines, and Terraform for infrastructure as code. I also work with Ansible, AWS, and various monitoring tools.";
        }
        
        if (this.containsAny(message, ['available', 'freelance', 'hire', 'work'])) {
            return "I'm currently available for freelance projects and full-time opportunities. I'm particularly interested in challenging projects that involve infrastructure automation, CI/CD optimization, and cloud migration.";
        }
        
        if (this.containsAny(message, ['rate', 'price', 'cost', 'budget'])) {
            return "My rates vary depending on the project scope and complexity. I'm happy to discuss your specific needs and provide a detailed quote. Feel free to reach out with your project requirements!";
        }
        
        if (this.containsAny(message, ['location', 'where', 'timezone'])) {
            return "I'm based in San Francisco, CA, but I work with clients globally. I'm flexible with time zones and can accommodate different schedules for meetings and collaboration.";
        }
        
        // Default response
        return this.getRandomResponse('default');
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Add typing indicator
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<p>AI is typing<span class="dots">...</span></p>';
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return typingDiv;
    }

    hideTypingIndicator(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.remove();
        }
    }
}

// Add CSS for typing indicator
const typingIndicatorCSS = `
    .typing-indicator .dots {
        animation: typing 1.5s infinite;
    }
    
    @keyframes typing {
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .chatbot-window {
        transition: all 0.3s ease;
    }
    
    .chatbot-toggle {
        transition: all 0.3s ease;
    }
    
    .chatbot-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = typingIndicatorCSS;
document.head.appendChild(style);

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioChatbot();
});

// Add some fun Easter eggs
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.querySelector('.chatbot-toggle');
    
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger special effect
            document.body.style.animation = 'glitch 0.5s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
            
            // Reset konami code
            konamiCode = [];
        }
    });
    
    // Add glitch animation for easter egg
    const glitchCSS = `
        @keyframes glitch {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = glitchCSS;
    document.head.appendChild(glitchStyle);
});
