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

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("username");
  document.getElementById("welcomeMessage").textContent = user
    ? `Welcome, ${user}!`
    : "Welcome!";

  function fetchComments() {
    fetch("http://localhost:3000/api/auth/comments")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const commentsHtml = data.comments
            .map(
              (comment) =>
                `<div class="comment">
                    <strong>${comment.username}</strong>: ${comment.content}
                  </div>`
            )
            .join("");
          document.getElementById("commentsContainer").innerHTML = commentsHtml;
        }
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }

  document.getElementById("commentForm").onsubmit = function (event) {
    event.preventDefault();
    const content = document.getElementById("commentContent").value;
    fetch("http://localhost:3000/api/auth/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1, content: content }), // Replace 1 with actual user ID
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Comment submitted successfully");
          document.getElementById("commentContent").value = "";
          fetchComments(); // Refresh comments
        } else {
          alert("Error submitting comment");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Initial fetch of comments
  fetchComments();
});

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Logout successful") {
          alert("You have been logged out");
          window.location.href = "login.html";
        } else {
          alert("Error logging out");
        }
      })
      .catch((error) => console.error("Logout error:", error));
  });
}

// Prevent multiple script execution
if (window.hasRun) {
  console.log("Script has already run, skipping execution");
} else {
  window.hasRun = true;
  setupForms();
}
