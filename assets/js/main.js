// main.js
import { getBlogs } from './fetchBlogList.js'
import { getProjects } from './fetchMyProjects.js'

// Get the toggle button and icons
const toggleButton = document.getElementById('dark-mode-toggle');
const lightIcon = document.getElementById('icon-light');
const darkIcon = document.getElementById('icon-dark');

// Apply saved theme preference from localStorage
const isDarkMode = localStorage.getItem('theme') === 'dark';
document.body.classList.toggle('dark-mode', isDarkMode);
lightIcon.style.display = isDarkMode ? 'block' : 'none';
darkIcon.style.display = isDarkMode ? 'none' : 'block';

// Add event listener to the button
toggleButton.addEventListener('click', () => {
    const darkModeEnabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
    
    lightIcon.style.display = darkModeEnabled ? 'block' : 'none';
    darkIcon.style.display = darkModeEnabled ? 'none' : 'block';
});
  

getBlogs();
getProjects();