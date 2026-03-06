// AOS Core Initialization
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-quad',
        offset: 100
    });

    console.log("Wrapify Premium UI — Handcrafted by SahilCodeLab.");
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

// Smooth scrolling for all internal navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId.startsWith('#') && targetId.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax/Hover intensity for Hero Mockup
const mockup = document.querySelector('.mockup-container');
if (mockup) {
    window.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        mockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    window.addEventListener('mouseleave', () => {
        mockup.style.transform = `rotateY(-15deg) rotateX(10deg)`;
    });
}
