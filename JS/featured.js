document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const countdowns = document.querySelectorAll('.countdown');
    const updateCountdown = () => {
        countdowns.forEach(countdown => {
            const endDate = new Date(countdown.getAttribute('data-end-date')).getTime();
            const now = new Date().getTime();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                countdown.querySelector('.countdown-timer').textContent = 'Offer Expired';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdown.querySelector('.countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        });
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            destinationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Keyboard accessibility for filter buttons
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Detailed Booking Modal Functionality
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');
    
    // Function to populate and show modal
    function showBookingModal(cardData) {
        // Populate modal with card data
        document.getElementById('modalDestinationName').textContent = cardData.name;
        document.getElementById('modalDestinationImage').src = cardData.image;
        document.getElementById('modalDestinationImage').alt = cardData.name;
        document.getElementById('modalPrice').textContent = cardData.price;
        document.getElementById('modalRating').textContent = cardData.rating;
        document.getElementById('modalDescription').textContent = cardData.description;
        document.getElementById('modalDuration').textContent = cardData.duration;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to extract card data
    function extractCardData(card) {
        const isOffer = card.classList.contains('offer-card');
        const nameElement = card.querySelector('.card-title, .offer-title');
        const imageElement = card.querySelector('.card-image img, .offer-image img');
        const priceElement = card.querySelector('.price, .offer-price');
        const ratingElement = card.querySelector('.rating');
        const descriptionElement = card.querySelector('.card-description, .offer-description');
        const durationElement = card.querySelector('.duration, .offer-duration');
        
        return {
            name: nameElement ? nameElement.textContent : 'Unknown Destination',
            image: imageElement ? imageElement.src : 'Images/default-image.jpg',
            price: priceElement ? priceElement.textContent : 'Price on request',
            rating: ratingElement ? ratingElement.textContent : '★★★★☆',
            description: descriptionElement ? descriptionElement.textContent : 'Experience this amazing destination with our expertly crafted tour package.',
            duration: durationElement ? durationElement.textContent : '7 days',
            category: isOffer ? 'offer' : 'destination'
        };
    }
    
    // Add click listeners to all booking buttons
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.destination-card, .offer-card');
            const cardData = extractCardData(card);
            showBookingModal(cardData);
        });
    });
    
    // Add click listeners to card images for quick booking
    document.querySelectorAll('.card-image, .offer-image').forEach(image => {
        image.addEventListener('click', (e) => {
            e.preventDefault();
            const card = image.closest('.destination-card, .offer-card');
            const cardData = extractCardData(card);
            showBookingModal(cardData);
        });
        
        // Add cursor pointer to indicate clickable
        image.style.cursor = 'pointer';
    });
    
    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Handle booking form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = {
            destination: document.getElementById('modalDestinationName').textContent,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            travelers: formData.get('travelers'),
            checkin: formData.get('checkin'),
            checkout: formData.get('checkout'),
            specialRequests: formData.get('specialRequests')
        };
        
        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate booking process (replace with actual API call)
        setTimeout(() => {
            // Show success message
            alert(`Thank you, ${bookingData.name}! Your booking request for ${bookingData.destination} has been submitted. We'll contact you within 24 hours to confirm your reservation.`);
            
            // Reset form and close modal
            bookingForm.reset();
            closeModal();
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
});