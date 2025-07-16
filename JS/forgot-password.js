document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            showSuccessMessage();
        });
    }
    
    function showSuccessMessage() {
        const successHTML = `
            <div class="reset-success">
                <p>If an account exists with this email, you'll receive a password reset link shortly.</p>
            </div>
        `;
        
        const form = document.querySelector('.login-form');
        form.insertAdjacentHTML('beforebegin', successHTML);
        form.reset();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});