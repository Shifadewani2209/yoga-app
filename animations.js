// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only trigger animation once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Function to animate elements on scroll
const animateOnScroll = () => {
    // Get all elements to animate
    const fadeElements = document.querySelectorAll('.fade-in-element, .fade-in');
    
    fadeElements.forEach(element => {
        // Get element position relative to viewport
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        // Add animation class when element is in view
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero section immediately
    document.querySelector('.video-container').classList.add('visible');
    
    // Observe elements for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe section titles
    const sections = document.querySelectorAll('.section-title');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial check for elements in view
    animateOnScroll();
});

// Smooth scroll functionality
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

// Throttle function to limit scroll event firing
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Add throttled scroll listener
window.addEventListener('scroll', throttle(animateOnScroll, 50));

// Refresh animations on window resize
window.addEventListener('resize', throttle(() => {
    animateOnScroll();
}, 100));

// Previous animation code remains the same

// Header animation on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

const handleHeaderAnimation = () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
};

// Add scroll event listener for header animation
window.addEventListener('scroll', throttle(handleHeaderAnimation, 50));

// Smooth scroll to sections with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize header state on page load
document.addEventListener('DOMContentLoaded', () => {
    handleHeaderAnimation();
    // Previous initialization code remains the same
});