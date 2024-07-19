console.log("Script loaded");

function setupForms() {
  console.log("Setting up forms");

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm && !registerForm.hasListener) {
    console.log("Register form found");
    registerForm.hasListener = true;
    registerForm.addEventListener("submit", function (event) {
      console.log("Register form submitted");
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      console.log("Sending registration data:", { username, password });

      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          console.log("Registration response received:", response);
          return response.text();
        })
        .then((data) => {
          console.log("Registration response data:", data);
          alert(data);
          if (data === "User registered successfully") {
            console.log("Redirecting to login page");
            window.location.href = "login.html";
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          alert("An error occurred during registration. Please try again.");
        });
    });
  } else if (!registerForm) {
    console.log("Register form not found on this page");
  }

  if (loginForm && !loginForm.hasListener) {
    console.log("Login form found");
    loginForm.hasListener = true;
    loginForm.addEventListener("submit", function (event) {
      console.log("Login form submitted");
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      console.log("Sending login data:", { username, password });

      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          console.log("Login response received:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Login response data:", data);
          if (data.success) {
            console.log("Login successful, redirecting to welcome page");
            window.location.href = `welcome.html?username=${encodeURIComponent(
              data.username
            )}`;
          } else {
            console.log("Login failed:", data.message);
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("An error occurred during login. Please try again.");
        });
    });
  } else if (!loginForm) {
    console.log("Login form not found on this page");
  }
}

// Set up forms when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setupForms);

// Prevent multiple script execution
if (window.hasRun) {
  console.log("Script has already run, skipping execution");
} else {
  window.hasRun = true;
  setupForms();
}
