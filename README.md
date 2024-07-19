# Vulnerable XSS Demonstration Website

## Description

This project is a demonstration website designed to showcase vulnerable stored XSS (Cross-Site Scripting) attacks. It includes both a backend and a frontend component to illustrate how such vulnerabilities can be exploited and provides a practical example of how stored XSS can impact a web application.

## Features

- **User Registration and Login**: Allows users to register and log in.
- **Profile Management**: Users can update and view their profiles.
- **Comment Submission**: Users can submit comments, which are stored and displayed.
- **Session Management**: Users can log out and their sessions are managed using `express-session`.

## Vulnerabilities Demonstrated

The website is intentionally vulnerable to stored XSS attacks, allowing users to inject and store malicious scripts through comment submissions. This setup is useful for educational purposes, security training, or penetration testing exercises.

## Getting Started

### Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine.
- **MySQL**: Ensure MySQL is installed and running.
- **Python**: Required to serve the frontend files.

### Installation

#### If you want to Clone the Repository

git clone <repository-url>
cd <repository-directory>

#### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the backend server:

   ```
   node app.js
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Serve the frontend files using Python’s HTTP server:

   ```
   python -m http.server 8000
   ```

## Dependencies

- `body-parser`
- `express`
- `express-session`
- `cors`
- `mysql`
- `node`

## Usage

### Access the Website

Open your browser and go to `http://localhost:8000` to view the frontend.

### Interact with the Website

- Register a new user or log in with existing credentials.
- Update your profile and submit comments.
- Observe the stored XSS vulnerability through comment submissions.

## Security Notice

This project is intentionally vulnerable to demonstrate stored XSS attacks. It is not intended for production use and should be used solely for educational purposes.
