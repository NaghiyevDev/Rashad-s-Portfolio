// global.js


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


// Nav Extra area Animation Script //
const texts = [
  "Write for humans, not just machines.",
  "Understand promises and async/await.",
  "Use 'htop' to monitor system resources interactively.",
  "Commit often and write meaningful commit messages.",
  "Use aliases for frequently used commands like 'll'.",
  "Understand 'for', 'if', and list comprehensions.",
  "Use indexing to speed up queries.",
  "Use 'nginx' for lightweight and high-performance hosting.",
  "Disable root login and enable firewall.",
  "Use console.log() sparingly, prefer breakpoints.",
];

  
  const textContainer = document.getElementById("text-container");
  
  let textIndex = 0;
  let charIndex = 0;
  
  function typeText() {
    if (charIndex < texts[textIndex].length) {
      // Add the next character
      textContainer.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 30); // Adjust typing speed here
    } else {
      // Pause, then delete text
      setTimeout(deleteText, 1000);
    }
  }
  
  function deleteText() {
    if (charIndex > 0) {
      // Remove the last character
      textContainer.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteText, 30); // Adjust deleting speed here
    } else {
      // Move to the next text
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeText, 500); // Start typing the next text
    }
  }
  
  // Start the animation
  typeText();
  