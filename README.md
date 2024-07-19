# Vulnerable XSS Demonstration Website

## Description

This project is a demonstration website designed to showcase vulnerable stored XSS (Cross-Site Scripting) attacks. It includes both a backend and a frontend component to illustrate how such vulnerabilities can be exploited and provides a practical example of how stored XSS can impact a web application.

## Features

- **User Registration and Login**: Allows users to register and log in.
- **Profile Management**: Users can update and view their profiles.
- **Comment Submission**: Users can submit comments, which are stored and displayed.
- **Session Management**: Users can log out and their sessions are managed using `express-session`.

## Vulnerabilities Demonstrated

The website is intentionally vulnerable to stored XSS attacks, allowing users to inject and store malicious scripts through comment and profile update submissions. This setup is a penetration attempt practice.

## Getting Started

### Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine.
- **MySQL**: Ensure MySQL is installed and running.
- **Python**: Required to serve the frontend files.

### Installation

#### If you want to Clone the Repository

git clone here's the url: (https://github.com/MnaseemMuhammadi/Stored-XSS-Demonstration)

### SQL Database Setup (QUERY)
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `user_id` int NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `bio` text,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

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
