document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor2.style.left = e.clientX + 'px';
        cursor2.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursor2.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor2.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-card, .skill-card, .education-card').forEach(el => {
        observer.observe(el);
    });

    const typedTexts = ['QA Professional', 'Quality Assurance Specialist', 'Software Tester'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.querySelector('.typed-text');

    function type() {
        const currentText = typedTexts[textIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typedTexts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typedElement) {
        type();
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            if (name && email && subject && message) {
                const btn = this.querySelector('.btn-submit');
                btn.innerHTML = '<i class="fas fa-check"></i><span>Sent!</span>';
                btn.style.background = '#22c55e';
                
                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent successfully.`);
                    this.reset();
                    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    btn.style.background = '';
                }, 500);
            }
        });
    }

    const currentYear = new Date().getFullYear();
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.textContent = `© ${currentYear} All Rights Reserved.`;
    }

    const allCards = document.querySelectorAll('.skill-card, .education-card, .timeline-card');
    
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    allCards.forEach(card => {
        cardObserver.observe(card);
    });

    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(function(e) {
            console.log('Autoplay blocked, user interaction required');
        });
    }
});