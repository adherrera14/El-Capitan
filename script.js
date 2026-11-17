// Language Management
let currentLanguage = localStorage.getItem('language') || 'es';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-es and data-en attributes
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        const text = lang === 'es' ? element.getAttribute('data-es') : element.getAttribute('data-en');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Handle form field placeholders
            const phAttr = lang === 'es' ? 'data-es-ph' : 'data-en-ph';
            const placeholder = element.getAttribute(phAttr);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        } else {
            // For all other elements, set the innerHTML
            element.innerHTML = text;
        }
    });
    
    // Update nav links
    updateNavLinks();
    
    // Update form placeholders for inputs without data-es-ph/data-en-ph
    document.querySelectorAll('input[data-es-ph], textarea[data-en-ph]').forEach(element => {
        const phAttr = lang === 'es' ? 'data-es-ph' : 'data-en-ph';
        const placeholder = element.getAttribute(phAttr);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update language button display
    const langDisplay = document.querySelector('.lang-current');
    if (langDisplay) {
        langDisplay.textContent = lang.toUpperCase();
    }
}

function updateNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link[data-es][data-en]');
    navLinks.forEach(link => {
        const text = currentLanguage === 'es' ? link.getAttribute('data-es') : link.getAttribute('data-en');
        link.textContent = text;
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
    
    // Setup language button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLanguage === 'es' ? 'en' : 'es';
            changeLanguage(newLang);
        });
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = e.target[0].value;
        const email = e.target[1].value;
        
        // Create message based on language
        const messages = {
            'es': `Gracias ${name}! Nos pondremos en contacto en ${email} pronto.`,
            'en': `Thank you ${name}! We will contact you at ${email} soon.`
        };
        
        alert(messages[currentLanguage]);
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Add fade-in animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Observe all cards and items for animation
const animatedElements = document.querySelectorAll(
    '.experience-card, .service-item, .package-card'
);
animatedElements.forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

console.log('El Capitan Website Loaded Successfully');
