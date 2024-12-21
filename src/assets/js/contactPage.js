// contactPage.js
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("contact-form");
  const submitButton = document.querySelector(".submit-button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Disable the submit button and show a spinner
    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="spinner"></span> Sending...`;

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
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      // Re-enable the button and restore its original state
      submitButton.disabled = false;
      submitButton.innerHTML = "Send Message";
    }
  });
});
