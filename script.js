document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollDown = document.querySelector('.scroll-down');
    const contactForm = document.querySelector('.contact-form');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .skill-card, .education-card, .contact-item').forEach(el => {
        observer.observe(el);
    });

    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        skillObserver.observe(card);
    });

    const eduCards = document.querySelectorAll('.education-card');
    const eduObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                eduObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    eduCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        eduObserver.observe(card);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            if (name && email && subject && message) {
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
                this.reset();
            }
        });
    }

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        heroImage.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }

    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-content p:first-child');
    if (footerYear) {
        footerYear.textContent = `© ${currentYear} Novry Jhonatan. All Rights Reserved.`;
    }
});