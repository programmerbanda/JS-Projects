document.addEventListener('DOMContentLoaded', () => {
    // Modal Toggle
    const modals = document.querySelectorAll('.modal');
    const openButtons = document.querySelectorAll('.login-btn, .signup-btn, .book-btn');
    const closeButtons = document.querySelectorAll('.close-btn');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('onclick')?.match(/open(\w+)Modal/)?.[1].toLowerCase() || 'auth';
            document.getElementById(`${modalId}-modal`).style.display = 'block';
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target == modal) modal.style.display = 'none';
        });
    });
});