// Search Functionality for Tours and Destinations
class SearchManager {
    constructor() {
        this.tours = [];
        this.destinations = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupSearchBar();
        this.setupFilters();
    }

    loadData() {
        // Sample tour data
        this.tours = [
            { id: 1, name: 'Adventure Tour', price: 999, duration: '5 Days', category: 'adventure', location: 'Kerala' },
            { id: 2, name: 'Beach Tour', price: 799, duration: '3 Days', category: 'beach', location: 'Goa' },
            { id: 3, name: 'Cultural Tour', price: 899, duration: '4 Days', category: 'cultural', location: 'Rajasthan' },
            { id: 4, name: 'Mountain Escape', price: 1200, duration: '6 Days', category: 'mountain', location: 'Himachal' },
            { id: 5, name: 'City Tour', price: 1500, duration: '9 Days', category: 'city', location: 'Delhi' },
            { id: 6, name: 'Cruise Tour', price: 2099, duration: '6 Days', category: 'cruise', location: 'Mumbai' },
            { id: 7, name: 'Desert Safari', price: 1200, duration: '6 Days', category: 'desert', location: 'Rajasthan' },
            { id: 8, name: 'Hiking & Trekking', price: 15999, duration: '14 Days', category: 'adventure', location: 'Himachal' },
            { id: 9, name: 'Historical Tour', price: 699, duration: '3 Days', category: 'cultural', location: 'Agra' },
            { id: 10, name: 'Island Hopping', price: 9999, duration: '7 Days', category: 'island', location: 'Andaman' }
        ];

        // Sample destination data
        this.destinations = [
            { id: 1, name: 'Dubai', price: 1270, rating: 5.0, country: 'UAE' },
            { id: 2, name: 'Switzerland', price: 1350, rating: 4.5, country: 'Switzerland' },
            { id: 3, name: 'Venice', price: 780, rating: 4.0, country: 'Italy' }
        ];
    }

    setupSearchBar() {
        // Create search bar if it doesn't exist
        if (!document.querySelector('.search-container')) {
            this.createSearchBar();
        }

        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }
    }

    createSearchBar() {
        const searchHTML = `
            <div class="search-container">
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Search tours, destinations...">
                    <button class="search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="search-filters">
                    <select class="filter-category">
                        <option value="">All Categories</option>
                        <option value="adventure">Adventure</option>
                        <option value="beach">Beach</option>
                        <option value="cultural">Cultural</option>
                        <option value="mountain">Mountain</option>
                        <option value="city">City</option>
                        <option value="cruise">Cruise</option>
                        <option value="desert">Desert</option>
                    </select>
                    <select class="filter-price">
                        <option value="">All Prices</option>
                        <option value="0-1000">$0 - $1000</option>
                        <option value="1000-2000">$1000 - $2000</option>
                        <option value="2000+">$2000+</option>
                    </select>
                    <select class="filter-duration">
                        <option value="">All Durations</option>
                        <option value="1-3">1-3 Days</option>
                        <option value="4-7">4-7 Days</option>
                        <option value="8+">8+ Days</option>
                    </select>
                </div>
                <div class="search-results" id="searchResults"></div>
            </div>
        `;

        // Insert search bar after main navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.insertAdjacentHTML('afterend', searchHTML);
        }
    }

    setupFilters() {
        const categoryFilter = document.querySelector('.filter-category');
        const priceFilter = document.querySelector('.filter-price');
        const durationFilter = document.querySelector('.filter-duration');

        [categoryFilter, priceFilter, durationFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => {
                    this.applyFilters();
                });
            }
        });
    }

    performSearch(query) {
        if (!query.trim()) {
            this.hideResults();
            return;
        }

        const results = this.tours.filter(tour => 
            tour.name.toLowerCase().includes(query.toLowerCase()) ||
            tour.location.toLowerCase().includes(query.toLowerCase()) ||
            tour.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(results);
    }

    applyFilters() {
        const category = document.querySelector('.filter-category').value;
        const price = document.querySelector('.filter-price').value;
        const duration = document.querySelector('.filter-duration').value;

        let filteredTours = this.tours;

        if (category) {
            filteredTours = filteredTours.filter(tour => tour.category === category);
        }

        if (price) {
            filteredTours = filteredTours.filter(tour => {
                if (price === '0-1000') return tour.price <= 1000;
                if (price === '1000-2000') return tour.price > 1000 && tour.price <= 2000;
                if (price === '2000+') return tour.price > 2000;
                return true;
            });
        }

        if (duration) {
            filteredTours = filteredTours.filter(tour => {
                const days = parseInt(tour.duration);
                if (duration === '1-3') return days >= 1 && days <= 3;
                if (duration === '4-7') return days >= 4 && days <= 7;
                if (duration === '8+') return days >= 8;
                return true;
            });
        }

        this.displayResults(filteredTours);
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No tours found matching your criteria.</p>';
            resultsContainer.style.display = 'block';
            return;
        }

        const resultsHTML = results.map(tour => `
            <div class="search-result-item">
                <h4>${tour.name}</h4>
                <p class="result-details">
                    <span class="location">${tour.location}</span> • 
                    <span class="duration">${tour.duration}</span> • 
                    <span class="price">$${tour.price}</span>
                </p>
                <button class="book-result-btn" onclick="bookTour('${tour.name}')">Book Now</button>
            </div>
        `).join('');

        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.style.display = 'block';
    }

    hideResults() {
        const resultsContainer = document.getElementById('searchResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
}

// Book tour function
function bookTour(tourName) {
    // Store selected tour in localStorage
    localStorage.setItem('selectedTour', tourName);
    // Redirect to booking page
    window.location.href = '/HTML/booking.html';
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
});

// Auto-fill tour name in booking form if coming from search
document.addEventListener('DOMContentLoaded', () => {
    const selectedTour = localStorage.getItem('selectedTour');
    const tourNameInput = document.getElementById('tour-name');
    
    if (selectedTour && tourNameInput) {
        tourNameInput.value = selectedTour;
        localStorage.removeItem('selectedTour'); // Clear after use
    }
});
