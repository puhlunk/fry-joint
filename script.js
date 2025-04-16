// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        // Toggle navigation display
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
            // Reset hamburger
            document.querySelectorAll('.bar').forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        } else {
            nav.style.display = 'block';
            // Animate hamburger to X
            document.querySelectorAll('.bar')[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            document.querySelectorAll('.bar')[1].style.opacity = '0';
            document.querySelectorAll('.bar')[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        }
    });

    // Responsive navigation (close mobile menu when clicking a link)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
                // Reset hamburger
                document.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
            // Reset hamburger
            document.querySelectorAll('.bar').forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });

    // Initialize on page load
    if (window.innerWidth > 768) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }

    // Form submission (prevent default and add alert for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for your message! This is a demo site, so the form is not actually submitting data.');
            contactForm.reset();
        });
    }

    // Scroll animation for sections
    const sections = document.querySelectorAll('section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Function to add 'visible' class to elements in viewport
    function checkVisibility() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animations
    sections.forEach(section => {
        if (section.classList.contains('hero')) return; // Don't animate hero section
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run on scroll and on load
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
    // Initial check
    checkVisibility();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});