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
});