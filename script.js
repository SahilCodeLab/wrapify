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
// Razorpay Payment Integration
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXXXX'; // REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const apkFile = this.getAttribute('data-apk');
        initiatePayment(apkFile);
    });
});

function initiatePayment(apkFile) {
    const options = {
        "key": RAZORPAY_KEY_ID,
        "amount": "9900", // Amount is in currency subunits. Default currency is INR. Hence, 9900 refers to 9900 paise = ₹99.
        "currency": "INR",
        "name": "Wrapify — SahilCodeLab",
        "description": "Unlock Cinematic Chat Analytics (One-time Payment)",
        "image": "icon.jpg",
        "handler": function (response) {
            // This function runs on SUCCESSFUL payment
            console.log("Payment Successful:", response.razorpay_payment_id);
            triggerDownload(apkFile);

            // Optional: Show a success message
            alert("Payment Successful! Your download will start automatically.");
        },
        "prefill": {
            "name": "", // Can be pre-filled if you have user data
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": "Wrapify Digital Purchase"
        },
        "theme": {
            "color": "#00ff88" // Emerald Green accent color from the site
        }
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
        console.error("Payment Error:", response.error);
    });

    rzp1.open();
}

function triggerDownload(apkFile) {
    const link = document.createElement('a');
    link.href = apkFile;
    link.download = apkFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
