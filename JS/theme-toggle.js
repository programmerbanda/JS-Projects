// theme-toggle.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleTheme');
    
    // Check if button exists
    if (!toggleBtn) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check local storage for theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateButton(true);
    } else {
        updateButton(false);
    }
    
    // Function to update button text and icon
    function updateButton(isDark) {
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (isDark) {
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
    
    // Toggle the theme and save preference
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        updateButton(isDarkMode);
    };
    
    // Add event listener
    toggleBtn.addEventListener('click', toggleTheme);
});
