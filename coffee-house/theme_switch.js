const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelectorAll('.theme__switch');

    function toggleTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(newTheme);
    }

    themeSwitch.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});