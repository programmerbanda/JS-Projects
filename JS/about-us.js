document.addEventListener('DOMContentLoaded', function() {
    // Navbar Toggle Functionality
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarCollapse = document.getElementById('navbarCollapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close navbar when clicking on a link (for mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Book Now button functionality
    const bookNowBtn = document.querySelector('.book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            // Redirect to booking page or show modal
            window.location.href = '/HTML/index.html#tours';
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                alert('Thank you for subscribing! We\'ll keep you updated with our latest offers.');
                emailInput.value = '';
            }
        });
    }
});