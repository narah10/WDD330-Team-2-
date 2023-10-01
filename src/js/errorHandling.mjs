export function showError(message, selector) {
    const errorElement = document.querySelector(selector);
    errorElement.innerHTML = `<h1 class="error-message">${message}</h1>`; // Corrected class name
    errorElement.style.display = "block";
  }
  