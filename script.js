/**
 * BroadCastWeb - Background Star System & Animations
 */

function initStars() {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let shootingStars = [];

    const STAR_COUNT = 150;
    const STAR_COLOR = '#00ff9c';
    const SHOOTING_STAR_CHANCE = 0.01;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createStars();
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5,
                opacity: Math.random(),
                speed: Math.random() * 0.05 + 0.01
            });
        }
    }

    function createShootingStar() {
        if (Math.random() < SHOOTING_STAR_CHANCE) {
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                len: Math.random() * 80 + 20,
                speed: Math.random() * 10 + 5,
                opacity: 1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw Stars
        stars.forEach(star => {
            ctx.fillStyle = STAR_COLOR;
            ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 * star.speed + star.opacity * 10));
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Shooting Stars
        shootingStars.forEach((ss, index) => {
            ctx.strokeStyle = STAR_COLOR;
            ctx.lineWidth = 1;
            ctx.globalAlpha = ss.opacity;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.len, ss.y + ss.len);
            ctx.stroke();

            ss.x += ss.speed;
            ss.y -= ss.speed;
            ss.opacity -= 0.02;

            if (ss.opacity <= 0) {
                shootingStars.splice(index, 1);
            }
        });

        createShootingStar();
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
}

// Scroll Reveal Animation
let revealHandler = null;
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    if (revealHandler) {
        window.removeEventListener('scroll', revealHandler);
    }
    revealHandler = reveal;
    window.addEventListener('scroll', revealHandler);
    reveal(); // Initial check
}

// Image Carousel Logic
function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    const interval = 4000;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        items[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        current = (current + 1) % items.length;
        showSlide(current);
    }

    setInterval(nextSlide, interval);

    // Manual control via dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            current = index;
            showSlide(current);
        });
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Process Fan Accordion
function initProcessFan() {
    const items = document.querySelectorAll('.fan-item');
    
    items.forEach(item => {
        const header = item.querySelector('.fan-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            items.forEach(i => i.classList.remove('active'));
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = toggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = toggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initScrollReveal();
    initNavbar();
    initCarousel();
    initProcessFan();
    initMobileMenu();
    initBackToTop();
});
