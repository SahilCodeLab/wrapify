// Cosmic Background Animation - Star Creation
function createStars() {
    const starContainer = document.getElementById('star-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'stars';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starContainer.appendChild(star);
    }
}

// AOS Core Initialization
AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease-out-back',
    offset: 150
});

// Header scroll effect with refined control
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all internal navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax/Hover intensity for Hero Image
const heroImage = document.querySelector('.hero-screenshot img');
window.addEventListener('scroll', () => {
    if (heroImage) {
        const scrolled = window.scrollY;
        const rotateVal = (scrolled * 0.02) + 10;
        heroImage.style.transform = `rotateX(${Math.min(rotateVal, 25)}deg) translateY(${scrolled * 0.05}px)`;
    }
});

// Final check and launch
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    console.log("Wrapify Genesis Protocol Initiated.");
});
