/**
 * Wrapify — Cinematic WhatsApp Chat Analytics
 * Handcrafted by SahilCodeLab
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Animation Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-quad',
            offset: 100
        });
    }

    // 2. Razorpay Integration (₹99)
    const RAZORPAY_KEY_ID = 'rzp_test_SOg4TjdLaE94QV';

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const apkFile = this.getAttribute('data-apk') || 'app-release.apk';

            if (typeof Razorpay === 'undefined') {
                alert("Payment gateway is loading. Please try again in a second.");
                return;
            }

            const options = {
                "key": RAZORPAY_KEY_ID,
                "amount": "9900", // ₹99 in paise
                "currency": "INR",
                "name": "SahilCodeLab",
                "description": "Wrapify Premium APK",
                "image": "icon.jpg",
                "handler": function (response) {
                    // Payment Success
                    console.log("Payment Successful:", response.razorpay_payment_id);
                    triggerDownload(apkFile);
                },
                "prefill": {
                    "name": "",
                    "email": "",
                    "contact": ""
                },
                "theme": {
                    "color": "#c9a84c" // Gold theme color
                }
            };

            const rzp = new Razorpay(options);

            rzp.on('payment.failed', function (response) {
                alert("Payment failed, please try again");
                console.error("Payment Failed:", response.error.description);
            });

            rzp.open();
        });
    });

    function triggerDownload(apkFile) {
        const link = document.createElement('a');
        link.href = apkFile;
        link.download = apkFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 3. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                // Close mobile menu if active
                document.querySelector('.nav-links')?.classList.remove('active');
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (toggle) toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // 5. Mobile Menu Toggle & Styles Injection
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    if (navContainer && navLinks) {
        // Injecting essential mobile styles to keep script.js self-contained
        const style = document.createElement('style');
        style.innerHTML = `
            .mobile-menu-toggle { display: none; font-size: 1.5rem; color: white; cursor: pointer; transition: 0.3s; }
            @media (max-width: 768px) {
                .mobile-menu-toggle { display: block; order: 2; }
                .nav-links { 
                    display: none; position: absolute; top: 100%; left: 0; width: 100%; 
                    background: rgba(5, 5, 5, 0.98); backdrop-filter: blur(20px);
                    flex-direction: column; padding: 40px; gap: 24px; text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                .nav-links.active { display: flex; }
                .btn-download { display: none; }
                header.scrolled .nav-links { top: 60px; }
            }
        `;
        document.head.appendChild(style);

        const toggle = document.createElement('div');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navContainer.appendChild(toggle);

        toggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            toggle.innerHTML = isActive
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // 6. Hero Parallax Effect
    const mockup = document.querySelector('.mockup-container');
    if (mockup) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            mockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        window.addEventListener('mouseleave', () => {
            mockup.style.transform = `rotateY(-15deg) rotateX(10deg)`;
        });
    }

    console.log("Wrapify Script Initialized — SahilCodeLab");
});
