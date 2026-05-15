// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    mobileBtn.classList.toggle('active');
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 24px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border-top: 1px solid #E2E8F0;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Form submission handler
const contactForm = document.querySelector('.contact-form-page');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Smooth scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section:not(.hero-home):not(.page-header)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Enhanced navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.padding = '16px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '20px 0';
    }
});

// Animate stats on scroll
const statItems = document.querySelectorAll('.stat-item h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue);
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                    }
                }, 30);
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => statsObserver.observe(item));
