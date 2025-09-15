// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initTypingEffect();
    initScrollEffects();
    initProjectCards();
    initContactForm();
    initVibrationEffects();
    initThemeToggle();
    initScrollProgress();
    initParticles();
    initPageTransitions();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll-triggered Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up', 'glow-on-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .stat-item, .contact-item, .skill-category, .section-header, .hero-content');
    animateElements.forEach(el => observer.observe(el));
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Typing Effect for Terminal
function initTypingEffect() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const commands = [
        'npm start',
        'git commit -m "feat: add new feature"',
        'docker build -t myapp .',
        'kubectl apply -f deployment.yaml'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typeSpeed = 500; // Pause before next command
        }

        setTimeout(typeCommand, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeCommand, 2000);
}

// Scroll Effects for Header
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for header styling
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Project Card Interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            const inquiryType = this.querySelector('select') ? this.querySelector('select').value : 'general';
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show sending notification
            showNotification('Preparing message...', 'info');
            
            // Create message content
            const messageContent = createMessageContent(name, email, subject, message, inquiryType);
            
            // Show options to send via WhatsApp or Email
            showMessageOptions(messageContent, name, email, subject);
        });
    }
}

// Create formatted message content
function createMessageContent(name, email, subject, message, inquiryType) {
    const timestamp = new Date().toLocaleString();
    const inquiryTypeText = inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1);
    
    return `📧 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📋 *Subject:* ${subject}
🏷️ *Type:* ${inquiryTypeText}
⏰ *Time:* ${timestamp}

💬 *Message:*
${message}

---
Sent from Shivam Patil's Portfolio Website`;
}

// Show message sending options
function showMessageOptions(messageContent, name, email, subject) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create options modal
    const modal = document.createElement('div');
    modal.className = 'message-options-modal';
    modal.innerHTML = `
        <div class="message-options-content">
            <h3>📤 Send Message</h3>
            <p>Choose how you'd like to send this message:</p>
            <div class="message-options-buttons">
                <button class="option-btn whatsapp-btn" data-action="whatsapp">
                    <i class="fab fa-whatsapp"></i> Send via WhatsApp
                </button>
                <button class="option-btn email-btn" data-action="email">
                    <i class="fas fa-envelope"></i> Send via Email
                </button>
                <button class="option-btn copy-btn" data-action="copy">
                    <i class="fas fa-copy"></i> Copy Message
                </button>
            </div>
            <button class="close-modal">×</button>
        </div>
    `;
    
    // Store data for later use
    modal.messageData = {
        messageContent: messageContent,
        name: name,
        email: email,
        subject: subject
    };
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const content = modal.querySelector('.message-options-content');
    content.style.cssText = `
        background: var(--bg-secondary);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid var(--primary-color);
        max-width: 500px;
        width: 90%;
        position: relative;
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
    `;
    
    // Add button styles
    const style = document.createElement('style');
    style.textContent = `
        .message-options-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .option-btn {
            padding: 12px 20px;
            border: 2px solid var(--primary-color);
            background: transparent;
            color: var(--primary-color);
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Share Tech Mono', monospace;
            font-weight: 700;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }
        
        .option-btn:hover {
            background: var(--primary-color);
            color: var(--bg-color);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.3);
        }
        
        .whatsapp-btn:hover {
            background: #25D366;
            border-color: #25D366;
        }
        
        .email-btn:hover {
            background: #007bff;
            border-color: #007bff;
        }
        
        .copy-btn:hover {
            background: #6c757d;
            border-color: #6c757d;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
        }
        
        .close-modal:hover {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const whatsappBtn = modal.querySelector('[data-action="whatsapp"]');
    const emailBtn = modal.querySelector('[data-action="email"]');
    const copyBtn = modal.querySelector('[data-action="copy"]');
    const closeBtn = modal.querySelector('.close-modal');
    
    whatsappBtn.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        sendToWhatsApp(modal.messageData.messageContent);
    });
    
    emailBtn.addEventListener('click', function() {
        console.log('Email button clicked');
        sendToEmail(modal.messageData.name, modal.messageData.email, modal.messageData.subject, modal.messageData.messageContent);
    });
    
    copyBtn.addEventListener('click', function() {
        console.log('Copy button clicked');
        copyToClipboard(modal.messageData.messageContent);
    });
    
    closeBtn.addEventListener('click', function() {
        console.log('Close button clicked');
        closeMessageModal();
    });
    
    // Add vibration
    if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
    }
}

// Send to WhatsApp
window.sendToWhatsApp = function(message) {
    console.log('sendToWhatsApp called with message:', message);
    const phoneNumber = '917499404640'; // Your WhatsApp number with country code
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    console.log('WhatsApp URL:', whatsappUrl);
    
    try {
        window.open(whatsappUrl, '_blank');
        closeMessageModal();
        showNotification('Opening WhatsApp...', 'success');
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        showNotification('Error opening WhatsApp', 'error');
    }
}

// Send to Email
window.sendToEmail = function(name, email, subject, message) {
    console.log('sendToEmail called with:', {name, email, subject, message});
    const yourEmail = 'shivampatil2309@gmail.com';
    const emailSubject = `Portfolio Contact: ${subject}`;
    const emailBody = `From: ${name} (${email})\n\n${message}`;
    const mailtoUrl = `mailto:${yourEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    console.log('Email URL:', mailtoUrl);
    
    try {
        window.location.href = mailtoUrl;
        closeMessageModal();
        showNotification('Opening email client...', 'success');
    } catch (error) {
        console.error('Error opening email:', error);
        showNotification('Error opening email', 'error');
    }
}

// Copy to Clipboard
window.copyToClipboard = function(message) {
    navigator.clipboard.writeText(decodeURIComponent(message)).then(() => {
        showNotification('Message copied to clipboard!', 'success');
        closeMessageModal();
    }).catch(() => {
        showNotification('Failed to copy message', 'error');
    });
}

// Close modal
window.closeMessageModal = function() {
    const modal = document.querySelector('.message-options-modal');
    if (modal) {
        modal.remove();
    }
}

// Test functions for debugging
window.testWhatsApp = function() {
    const testMessage = "Test message from portfolio website";
    const phoneNumber = '917499404640';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(testMessage)}`;
    console.log('WhatsApp URL:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
    showNotification('Testing WhatsApp...', 'info');
}

window.testEmail = function() {
    const yourEmail = 'shivampatil2309@gmail.com';
    const emailSubject = 'Test from Portfolio';
    const emailBody = 'This is a test message from your portfolio website.';
    const mailtoUrl = `mailto:${yourEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    console.log('Email URL:', mailtoUrl);
    window.location.href = mailtoUrl;
    showNotification('Testing Email...', 'info');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff41' : type === 'error' ? '#ff0080' : '#00d4ff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Share Tech Mono', monospace;
        font-weight: 700;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax
initParallax();

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .header.scrolled {
        background: rgba(10, 10, 10, 0.98);
        box-shadow: 0 2px 20px rgba(0, 255, 65, 0.1);
    }
    
    .header {
        transition: all 0.3s ease;
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingCSS = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);

// Vibration Effects
function initVibrationEffects() {
    // Check if vibration API is supported
    const supportsVibration = 'vibrate' in navigator;
    
    // Elements that should trigger vibration
    const vibrateElements = document.querySelectorAll(
        '.btn, .project-link, .social-link, .nav-link, .contact-item, .project-card, button, a'
    );
    
    vibrateElements.forEach(element => {
        // Add click vibration
        element.addEventListener('click', function(e) {
            // Visual vibration effect
            addVisualVibration(this);
            
            // Device vibration (mobile only)
            if (supportsVibration) {
                navigator.vibrate([50]); // Short vibration
            }
        });
        
        // Add hover effects
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.1s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Visual vibration effect
function addVisualVibration(element) {
    // Remove existing vibration class
    element.classList.remove('vibrating');
    
    // Add vibration class
    element.classList.add('vibrating');
    
    // Remove class after animation
    setTimeout(() => {
        element.classList.remove('vibrating');
    }, 200);
}

// Add CSS for vibration effects
const vibrationCSS = `
    .vibrating {
        animation: shake 0.1s ease-in-out 2;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(0.98); }
        25% { transform: translateX(-2px) scale(0.98); }
        75% { transform: translateX(2px) scale(0.98); }
    }
    
    /* Enhanced click effects */
    .btn:active, .project-link:active, .social-link:active, .nav-link:active {
        transform: scale(0.95) !important;
        transition: transform 0.05s ease !important;
    }
    
    .contact-item:active, .project-card:active {
        transform: translateY(0) scale(0.98) !important;
        transition: transform 0.05s ease !important;
    }
    
    /* Glow effect on hover */
    .btn:hover, .project-link:hover, .social-link:hover, .nav-link:hover {
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
        text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
    }
    
    .contact-item:hover, .project-card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 65, 0.1);
    }
`;

// Inject vibration CSS
const vibrationStyle = document.createElement('style');
vibrationStyle.textContent = vibrationCSS;
document.head.appendChild(vibrationStyle);

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add vibration effect
            if ('vibrate' in navigator) {
                navigator.vibrate([30]);
            }
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Particle Background Effect
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
}

// Page Transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            // Create transition overlay
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
            
            // Activate transition
            setTimeout(() => {
                transition.classList.add('active');
            }, 10);
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Enhanced Skills Animation
function initSkillsAnimation() {
    const skillsElements = document.querySelectorAll('.tech-tag, .skill-category');
    
    skillsElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add CSS for new features
const newFeaturesCSS = `
    /* Scroll Progress Bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1000;
    }

    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        transition: width 0.1s ease;
    }

    /* Theme Toggle Button */
    .theme-toggle {
        background: transparent;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        padding: 8px 12px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .theme-toggle:hover {
        background: var(--primary-color);
        color: var(--bg-color);
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
    }

    /* Light Theme */
    [data-theme="light"] {
        --bg-color: #ffffff;
        --bg-secondary: #f8f9fa;
        --text-color: #333333;
        --text-secondary: #666666;
        --primary-color: #00ff41;
        --secondary-color: #ff0080;
        --border-color: #e0e0e0;
        --glow-color: rgba(0, 255, 65, 0.3);
    }

    [data-theme="light"] .terminal-window {
        background: #f8f9fa;
        border-color: #e0e0e0;
        color: #333333;
    }

    [data-theme="light"] .project-card,
    [data-theme="light"] .contact-item {
        background: rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.1);
    }

    [data-theme="light"] .project-card:hover,
    [data-theme="light"] .contact-item:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    /* Particle Background */
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }

    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
        opacity: 0.6;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }

    /* Page Transitions */
    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.5s ease;
    }

    .page-transition.active {
        transform: translateY(0);
    }
`;

// Inject new features CSS
const newFeaturesStyle = document.createElement('style');
newFeaturesStyle.textContent = newFeaturesCSS;
document.head.appendChild(newFeaturesStyle);

// Add CSS for new reveal/ripple animations
const extraAnimationsCSS = `
    /* Reveal base state */
    .project-card, .stat-item, .contact-item, .skill-category, .section-header, .hero-content {
        opacity: 0;
        transform: translateY(20px);
    }

    /* Reveal animation */
    .fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 600ms ease, transform 600ms ease, box-shadow 800ms ease;
    }

    /* Soft glow after reveal */
    .glow-on-reveal {
        box-shadow: 0 0 0 rgba(0,255,65,0);
        animation: revealGlow 1200ms ease forwards;
    }

    @keyframes revealGlow {
        0% { box-shadow: 0 0 0 rgba(0,255,65,0); }
        40% { box-shadow: 0 0 25px rgba(0,255,65,0.25); }
        100% { box-shadow: 0 0 0 rgba(0,255,65,0); }
    }

    /* Ripple effect container */
    .ripple-container { position: relative; overflow: hidden; }
    .ripple {
        position: absolute; border-radius: 50%; transform: scale(0);
        background: rgba(0,255,65,0.35); pointer-events: none;
        animation: rippleAnim 600ms ease-out forwards;
    }
    @keyframes rippleAnim {
        to { transform: scale(12); opacity: 0; }
    }
`;

const extraAnimationsStyle = document.createElement('style');
extraAnimationsStyle.textContent = extraAnimationsCSS;
document.head.appendChild(extraAnimationsStyle);

// Attach ripple to interactive elements
(function initRipple() {
    const rippleTargets = document.querySelectorAll('.btn, .nav-link, .project-link, .social-link');
    rippleTargets.forEach(el => {
        el.classList.add('ripple-container');
        el.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
})();
