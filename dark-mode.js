// Dark Mode functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
