// Enhanced Form Validation
class FormValidator {
    constructor() {
        this.init();
    }

    init() {
        this.setupBookingValidation();
        this.setupContactValidation();
        this.setupLoginValidation();
    }

    // Booking form validation
    setupBookingValidation() {
        const bookingForm = document.querySelector('.booking-form');
        if (!bookingForm) return;

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tour = document.getElementById('tour-name').value;
            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const travelDate = document.getElementById('travel-date').value;
            const returnDate = document.getElementById('return-date').value;

            if (!this.validateBookingForm(tour, name, email, phone, travelDate, returnDate)) {
                return;
            }

            // Store booking data in localStorage
            this.saveBookingData({
                tour, name, email, phone, travelDate, returnDate,
                adults: document.getElementById('adults').value,
                children: document.getElementById('children').value,
                insurance: document.getElementById('insurance').checked,
                bookingId: this.generateBookingId(),
                timestamp: new Date().toISOString()
            });

            this.showBookingSuccess();
        });
    }

    validateBookingForm(tour, name, email, phone, travelDate, returnDate) {
        let isValid = true;

        // Tour validation
        if (!tour) {
            this.showError('tour-name', 'Please select a tour');
            isValid = false;
        }
        // Name validation
        if (name.length < 2) {
            this.showError('full-name', 'Name must be at least 2 characters');
            isValid = false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        // Phone validation
        const phoneRegex = /^[+]?[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            this.showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        // Date validation
        const today = new Date();
        const travel = new Date(travelDate);
        const returnD = new Date(returnDate);
        if (travel <= today) {
            this.showError('travel-date', 'Travel date must be in the future');
            isValid = false;
        }
        if (returnD <= travel) {
            this.showError('return-date', 'Return date must be after travel date');
            isValid = false;
        }
        return isValid;
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';

        // Remove existing error
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'red';
    }

    generateBookingId() {
        return 'BK' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    saveBookingData(data) {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(data);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    showBookingSuccess() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Booking Confirmed!</h2>
                <p>Your booking has been saved successfully.</p>
                <p>You can view your bookings in the profile section.</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; justify-content: center;
            align-items: center; z-index: 1000;
        `;
        document.body.appendChild(modal);
    }

    // Contact form validation
    setupContactValidation() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (name.length < 2 || !email.includes('@') || message.length < 10) {
                alert('Please fill all fields correctly');
                return;
            }

            // Save contact message
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push({
                name, email, message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contacts', JSON.stringify(contacts));

            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Login validation
    setupLoginValidation() {
        const loginForm = document.querySelector('.login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Simple demo login
            if (email === 'demo@exploremore.com' && password === 'demo123') {
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    name: 'Demo User',
                    loggedIn: true
                }));
                alert('Login successful!');
                window.location.href = '/HTML/index.html';
            } else {
                alert('Invalid credentials. Use: demo@exploremore.com / demo123');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});
