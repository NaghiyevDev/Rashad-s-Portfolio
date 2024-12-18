// utils.js

export function getShortContent(content, maxCount) {
    // Create a temporary DOM element to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Extract only the text content (stripping out HTML tags)
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
    // Truncate the text to the desired length
    if (textContent.length > maxCount) {
      return textContent.slice(0, maxCount) + '...';
    }
  
    return textContent;
  }

export function escapeForHTML(input) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
        '/': '&#x2F;'
    };
    return input.replace(/[&<>"'`/]/g, char => map[char]);
}
