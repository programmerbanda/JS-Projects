document.addEventListener('DOMContentLoaded', () => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(urlParams.get('name') || 'Unknown Destination');
    const location = decodeURIComponent(urlParams.get('location') || 'Unknown Location');
    const image = decodeURIComponent(urlParams.get('image') || '/Images/burj-khalifa-2212978.jpg');
    const rating = decodeURIComponent(urlParams.get('rating') || '⭐ 5.0 Superb');
    const price = decodeURIComponent(urlParams.get('price') || '$1270');
    const description = decodeURIComponent(urlParams.get('description') || 'Discover the wonders of this amazing place.');
    const highlights = JSON.parse(decodeURIComponent(urlParams.get('highlights') || '["Stunning landscapes", "Rich cultural heritage", "Exciting activities"]'));

    // Populate the page
    document.getElementById('destination-name').textContent = name;
    document.getElementById('destination-location').textContent = location;
    document.getElementById('destination-image').src = image;
    document.getElementById('destination-rating').textContent = rating;
    document.getElementById('destination-price').textContent = price;
    document.getElementById('destination-description').textContent = description;
    const highlightsList = document.getElementById('destination-highlights');
    highlightsList.innerHTML = highlights.map(highlight => `<li>${highlight}</li>`).join('');

    // Booking button redirect
    const bookButton = document.querySelector('.book-btn');
    if (bookButton) {
        bookButton.addEventListener('click', () => {
            console.log('Booking button clicked for:', name); // Debug log
            window.location.href = `/HTML/booking.html?tour=${encodeURIComponent(name)}`;
        });
    } else {
        console.error('Book button not found in the document.');
    }
});