// contactPage.js
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => (jsonData[key] = value));
  
      try {
        const response = await fetch(`${BASE_URL}/contacts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
  
        const result = await response.json();
        if (response.ok) {
          window.location.href = "/success.html";
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
})