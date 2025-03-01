// SWE 642 - Assignment 2
// Submitted by: Hamaad Zuberi
// This file contains the JavaScript code for the survey form.

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("data-field").addEventListener("blur", function () {
    const dataField = document.getElementById("data-field").value.trim();
    const errorMessage = document.getElementById("error-message");
    const averageField = document.getElementById("average");
    const maxField = document.getElementById("maximum");

    // Split the string by comma, and remove any unnecessary spaces around each number
    const numbers = dataField.split(",").map((str) => parseFloat(str.trim()));

    // Validate the input data to check that each number is between 1 and 100
    const validNumbers = numbers.filter(
      (num) => !isNaN(num) && num >= 1 && num <= 100
    );

    // Check if exactly 10 numbers are provided and are within the correct range
    if (validNumbers.length === 10) {
      errorMessage.style.display = "none";
      const { average, max } = calculateAverageAndMaximum(validNumbers);
      averageField.value = average.toFixed(2);
      maxField.value = max;
    } else {
      // Show error message if there are not exactly 10 valid numbers
      errorMessage.style.display = "block";
      averageField.value = "";
      maxField.value = "";
    }
  });

  // Function to calculate average and maximum
  function calculateAverageAndMaximum(numbers) {
    let sum = 0;
    let max = numbers[0];
    for (let num of numbers) {
      sum += num;
      if (num > max) {
        max = num;
      }
    }
    const average = sum / numbers.length;
    return { average, max };
  }

  // Helper function to get a cookie by name
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, "\\$1") + "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  // Determine the greeting based on the current time
  function getTimeBasedGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  // Display greeting based on the cookie
  function displayGreeting() {
    const userName = getCookie("username");
    const greetingElement = document.getElementById("greeting");

    if (userName) {
      // Display a personalized greeting
      const greeting = `${getTimeBasedGreeting()} ${userName}, Welcome to SWE642 Survey!`;
      greetingElement.textContent = greeting;
      greetingElement.style.display = "block";

      // Show a link to update the name
      const updateLink = document.createElement("a");
      updateLink.href = "#";
      updateLink.textContent = " Not you? Click here to update your name.";
      updateLink.style.marginLeft = "10px";
      updateLink.style.textDecoration = "underline";
      updateLink.style.cursor = "pointer";
      updateLink.onclick = function () {
        setCookie("username", "", -1); // Delete the cookie
        const newName = prompt("Please enter your name:");
        if (newName) {
          setCookie("username", newName, 7);
          window.location.reload(); // Reload the page to reflect the new cookie
        }
      };
      greetingElement.appendChild(updateLink);
    } else {
      // Prompt user to enter their name if no cookie is set
      const name = prompt("Welcome! Please enter your name to proceed:");
      if (name) {
        setCookie("username", name, 7);
        window.location.reload(); // Reload the page to reflect the new cookie
      }
    }
  }

  // On page load, display the greeting
  window.onload = displayGreeting;

  // Enhanced form validation with comprehensive pop-up error messages
  document
    .getElementById("survey-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get all the form fields and error elements
      const nameField = document.getElementById("username");
      const streetField = document.getElementById("street");
      const zipField = document.getElementById("zip");
      const phoneField = document.getElementById("phone");
      const emailField = document.getElementById("email");

      const nameError = document.getElementById("username-error");
      const streetError = document.getElementById("street-error");
      const zipError = document.getElementById("zip-error");
      const phoneError = document.getElementById("phone-error");
      const emailError = document.getElementById("email-error");

      let isValid = true;

      // Clear all error messages before validation
      nameError.style.display = "none";
      streetError.style.display = "none";
      zipError.style.display = "none";
      phoneError.style.display = "none";
      emailError.style.display = "none";

      // Validate Name (Alphabets only)
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(nameField.value.trim())) {
        nameError.style.display = "block";
        isValid = false;
      }

      // Validate Street Address (Alphanumeric)
      const streetPattern = /^[A-Za-z0-9\s]+$/;
      if (!streetPattern.test(streetField.value.trim())) {
        streetError.style.display = "block";
        isValid = false;
      }

      // Validate Zip Code (5 digits)
      const zipPattern = /^[0-9]{5}$/;
      if (!zipPattern.test(zipField.value.trim())) {
        zipError.style.display = "block";
        isValid = false;
      }

      // Validate Phone Number (XXX-XXX-XXXX)
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (!phonePattern.test(phoneField.value.trim())) {
        phoneError.style.display = "block";
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailPattern.test(emailField.value.trim())) {
        emailError.style.display = "block";
        isValid = false;
      }

      // Validate Checkboxes (at least two must be checked)
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const checkedCount = Array.from(checkboxes).filter(
        (checkbox) => checkbox.checked
      ).length;
      const checkboxError = document.getElementById("checkbox-error");

      if (checkedCount < 2) {
        checkboxError.style.display = "block";
        isValid = false;
      } else {
        checkboxError.style.display = "none";
      }

      // Validate Radio Buttons (at least one must be selected)
      const radios = document.querySelectorAll('input[name="interestSource"]');
      const radioSelected = Array.from(radios).some((radio) => radio.checked);
      const radioError = document.getElementById("radio-error");

      if (!radioSelected) {
        radioError.style.display = "block";
        isValid = false;
      } else {
        radioError.style.display = "none";
      }

      // If the form is valid, submit it
      if (isValid) {
        alert("Form submitted successfully!");
        event.target.submit();
      } else {
        // Scroll to the first error if there is any
        document
          .querySelector('.error-message[style="display: block"]')
          .scrollIntoView({ behavior: "smooth" });
      }
    });

  // Reset button functionality to clear all error messages and reset city/state fields
  document.getElementById("survey-form").addEventListener("reset", function () {
    // Reset the error messages
    document.querySelectorAll(".error-message").forEach(function (error) {
      error.style.display = "none";
    });

    // Reset city and state fields
    document.getElementById("city").textContent =
      "City will be populated automatically.";
    document.getElementById("state").textContent =
      "State will be populated automatically.";

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  });
});
